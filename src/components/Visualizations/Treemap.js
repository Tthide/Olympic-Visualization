import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data }) => {
  const svgRef = useRef();

  // State to store the width and height of the SVG container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });



  // We have to change the data format to fit with the expected input for D3 Treemap
  const treeMapData = Object.keys(data).map(key => ({
    type: 'node',
    name: key,
    value: data[key].length,
  }));


  console.log(treeMapData);




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
    const hierarchy = d3.hierarchy({ children: treeMapData })
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);


    console.log("hierarchy :", hierarchy);

    // Create the treemap layout
    const treeGenerator = d3.treemap()
      .size([width, height])
      .padding(2);

    // Use the generator on the hierarchy object built in previous section
    treeGenerator(hierarchy);

    // Select the SVG element and clear any previous content
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous nodes before re-rendering
    svg.selectAll('*').remove();

    // Create groups for each node
    const nodes = svg.selectAll('g')
      .data(hierarchy.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    // Draw rectangles for each node
    nodes.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => d3.scaleOrdinal(d3.schemeCategory10)(d.data.name));

    // Add labels to each rectangle
    nodes.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text(d => d.data.name);
  }, [treeMapData, dimensions]);

  return (
    <svg ref={svgRef} style={{ width: '100%', height: '60vh' }}></svg>

  );
};

export default Treemap;
