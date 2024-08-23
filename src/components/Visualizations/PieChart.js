import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
    const svgRef = useRef();

    // State to store the width and height of the SVG container
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });


    // We have to change the data format to fit with the expected input for D3 PieChart
    const pieChartData = Object.keys(data).map(key => ({
        label: key,
        value: data[key].length
    }));
    pieChartData.sort();

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

    useEffect(() => {
        const { width, height } = dimensions;
        const svg = d3.select(svgRef.current);

        // Clear previous drawing
        svg.selectAll('*').remove();

        const radius = Math.min(width, height) / 2;

        // Set the viewBox to make the SVG responsive
        svg.attr("viewBox", `0 0 ${width} ${height}`);
            

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2},${radius})`);

        // Setting the color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Computing the position of each group on the pie (and sorting them from biggest to smallest)
        const pie = d3.pie()
            .value(d => d.value)
            .sort((a, b) => b.value - a.value);

        const arc = d3.arc()
            .outerRadius(radius)
            .innerRadius(0.6 * radius);

        const arcHover = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 40);

        const dataReady = pie(pieChartData);

        g.selectAll('.arc')
            .data(dataReady)
            .enter().append('g')
            .attr('class', 'arc')
            .on('mouseover', function (event, d) {
                d3.select(this).select('path').transition().duration(200).attr('d', arcHover);
            })
            .on('mouseout', function (event, d) {
                d3.select(this).select('path').transition().duration(200).attr('d', arc);
            })
            .append('path')
            .attr('d', arc)
            .style('fill', d => color(d.data.label));

        g.selectAll('.arc')
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '.45em')
            .style('text-anchor', 'middle')
            .text(d => d.data.label);

        g.selectAll('.arc')
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dx', '2em')
            .style('text-anchor', 'middle')
            .text(d => d.data.value);
    }, [pieChartData, dimensions]); // Adding dimensions to the dependencies array

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="50vh"
            preserveAspectRatio="xMidYMin meet"
        />
    );
};

export default PieChart;
