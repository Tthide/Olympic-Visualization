import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data }) => {
  const svgRef = useRef();

  // State to store the width and height of the SVG container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });


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


    // Creating a rectangle for each node(single group item e.g. a country)
    const nodes = svg.selectAll("rect")
      .data(root.children)
      .enter()
      .append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => color(d.data.name))
      .attr("opacity", d => opacity(0.95)); // Use opacity scale

    // Add labels to each node
    nodes.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(d => d.data.name);


    // Creating a rectangle for each leaf (single json item e.g. one medal)
    const leaves = svg.selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => {
        // Color like the parent node (or group)
        const parentCategory = d.parent ? d.parent.data.name : 'root';
        return color(parentCategory);
      })
      .attr("opacity", d => opacity(d.data.value)); // Use opacity scale

    // Add labels to each leaf
    leaves.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(d => d.data.name);



  }, [treeMapData, dimensions]);

  return (
    <svg ref={svgRef} style={{ width: '100%', height: '60vh' }}></svg>

  );
};

export default Treemap;
