import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data }) => {
  const svgRef = useRef();

  // State to store the width and height of the SVG container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set dimensions according to the client's
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Calculate and update the dimensions
    const updateDimensions = () => {
      const width = svg.node().clientWidth;
      const height = svg.node().clientHeight;
      setDimensions({ width, height });
    };

    // Initial dimensions calculation
    updateDimensions();

    // Add event listener for window resize to update dimensions
    window.addEventListener('resize', updateDimensions);

    // Cleanup on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  //updates whenever the data or dimensions changes
  useEffect(() => {

    // Transform the data to match D3 treemap's expected structure
    const treeMapData = {
      name: "root",
      children: Object.keys(data).map(key => ({
        name: key,
        children: data[key].map(event => ({
          name: `${event.City} ${event.Year}`, // Unique name for each event
          value: 1, // Assign a value to each event; this determines the size in the treemap
          ...event // Spread the rest of the event details for potential use
        }))
      }))
    };


    const { width, height } = dimensions;

    if (width === 0 || height === 0) return; // Don't render until dimensions are known

    // Create a hierarchy element for the treemap layout
    const root = d3.hierarchy(treeMapData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);


    // Create the treemap layout
    const treeGenerator = d3.treemap()
      .size([width, height])
      .padding(2);

    // Use the generator on the hierarchy object built in previous section
    treeGenerator(root);

    // Select the SVG element and clear any previous content
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous nodes before re-rendering
    svg.selectAll('*').remove();

    // Extract unique categories for color scaling
    const categories = Array.from(new Set(root.descendants().map(d => d.parent ? d.parent.data.name : 'root')));

    // Define color scale
    const color = d3.scaleOrdinal()
      .domain(categories)
      .range(d3.schemeCategory10); // Use D3's category10 color scheme

    // Define opacity scale
    const valueExtent = d3.extent(root.leaves(), d => d.data.value);
    const opacity = d3.scaleLinear()
      .domain(valueExtent)
      .range([0.5, 1]);

    // Create separate groups (layers) for leaves, nodes, and node texts
    //because we want the node's rect to be as a background but it's text to be on top
    const leafLayer = svg.append("g").attr("class", "leaves");
    const nodeLayer = svg.append("g").attr("class", "nodes");
    const nodeTextLayer = svg.append("g").attr("class", "node-texts");

    // Add leaves
    const leaves = leafLayer.selectAll("g.leaf")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("class", "leaf")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    leaves.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => {
        const parentCategory = d.parent ? d.parent.data.name : 'root';
        return color(parentCategory);
      })
      .attr("opacity", d => opacity(d.data.value)) // Use opacity scale
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("stroke", "#000")  // Add a black border on hover
          .attr("stroke-width", 2) // Thicken the border on hover
          .attr("opacity", 1);     // Increase opacity on hover
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .attr("stroke", "none")  // Remove the border
          .attr("opacity", d => opacity(d.data.value)); // Restore original opacity
      });

    // Add nodes
    const nodes = nodeLayer.selectAll("g.node")
      .data(root.children)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => color(d.data.name))
      .attr("opacity", d => opacity(0.95))
      .attr("pointer-events", "none"); // Disable pointer events on node rects

    // Calculate font size based on the rectangle's height or width
    const fontSize = ((rectWidth, rectHeight) => {
      return (Math.min(rectWidth, rectHeight) / 6) + "px";
    })


    // Add node texts (on top of everything)
    nodeTextLayer.selectAll("text")
      .data(root.children)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${d.x0 + 4},${d.y0})`)
      .text(d => d.data.name)
      .attr("fill", "black")
      .attr("pointer-events", "none") // Disable pointer events on text
      .attr("font-size", d => {
        const rectWidth = d.x1 - d.x0;
        const rectHeight = d.y1 - d.y0;
        return fontSize(rectWidth, rectHeight);
      })
      //adjusting the position of the text because the font-size changed
      .attr("dy", d => {
        const rectWidth = d.x1 - d.x0;
        const rectHeight = d.y1 - d.y0;
        return fontSize(rectWidth, rectHeight); // Adjust the divisor to position the text
      });




  }, [data, dimensions]);

  return (
    <svg ref={svgRef} style={{ width: '100%', height: '60vh' }}></svg>

  );
};

export default Treemap;
