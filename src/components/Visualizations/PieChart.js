// src/Visualizations/PieChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
    const svgRef = useRef();

    //we have to change the data format to fit with the expected input for d3 PieChart
    const pieChartData = Object.keys(data).map(key => ({
        label: key,
        value: data[key]
    }));
    pieChartData.sort();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = svg.node().clientWidth;
        const height = svg.node().clientHeight;
        const radius = Math.min(width, height) / 2;

        // Clear previous drawing
        svg.selectAll('*').remove();

        const g = svg.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.value)
            .sort((a, b) => b.value - a.value);

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const arcHover = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(radius - 40);

        const dataReady = pie(pieChartData);

        g.selectAll('.arc')
            .data(dataReady)
            .enter().append('g')
            .attr('class', 'arc')
            .on('mouseover', function(event, d) {
                d3.select(this).select('path').transition().duration(200).attr('d', arcHover);
            })
            .on('mouseout', function(event, d) {
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
            .text(d => d.data.label)

            g.selectAll('.arc')
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dx', '2em')
            .style('text-anchor', 'middle')
            .text(d => d.data.value);


    }, [pieChartData]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 400 400" // Set a default viewBox to ensure responsiveness
            preserveAspectRatio="xMidYMid meet" // Maintain aspect ratio
        />
    );
};

export default PieChart;
