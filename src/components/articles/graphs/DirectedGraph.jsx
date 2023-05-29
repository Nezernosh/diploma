import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const DirectedGraph = () => {
    const directedRef = useRef(null);

    useEffect(() => {
        const directedData = {
            nodes: [
                { id: 'u' },
                { id: 'v' },
                { id: 'w' },
                { id: 'x' },
                { id: 'y' },
                { id: 'z' },
            ],
            links: [
                { source: 'u', target: 'v' },
                { source: 'u', target: 'x' },
                { source: 'v', target: 'y' },
                { source: 'w', target: 'y' },
                { source: 'w', target: 'z' },
                { source: 'x', target: 'v' },
                { source: 'y', target: 'x' },
                { source: 'z', target: 'z' },
            ],
        };

        const directedContainer = d3.select(directedRef.current);
        const directedWidth = directedContainer.node().getBoundingClientRect().width;
        const directedHeight = directedContainer.node().getBoundingClientRect().height;

        let svgDirected = directedContainer.select('svg');

        if (svgDirected.empty()) {
            svgDirected = directedContainer
                .append('svg')
                .attr('width', directedWidth)
                .attr('height', directedHeight);
        } else {
            svgDirected.selectAll('*').remove();
        }

        const simulationDirected = d3
            .forceSimulation(directedData.nodes)
            .force('link', d3.forceLink(directedData.links).id((d) => d.id))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(directedWidth / 2, directedHeight / 2));

        const nodeRadius = Math.min(directedWidth, directedHeight) * 0.05;

        const directedLinks = svgDirected
            .selectAll('line')
            .data(directedData.links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('marker-end', (d) => (d.source === 6 ? 'url(#arrowhead-self)' : 'url(#arrowhead)'));

        const directedNodes = svgDirected
            .selectAll('circle')
            .data(directedData.nodes)
            .enter()
            .append('circle')
            .attr('r', nodeRadius)
            .attr('fill', '#1eb2a6')
            .call(drag(simulationDirected));

        const directedNodeLabels = svgDirected
            .selectAll('text')
            .data(directedData.nodes)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 5)
            .text((d) => d.id);

        svgDirected
            .append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '-0 -5 10 10')
            .attr('refX', 15)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#000')
            .style('stroke', 'none');

        svgDirected
            .append('defs')
            .append('marker')
            .attr('id', 'arrowhead-self')
            .attr('viewBox', '-10 -5 10 10')
            .attr('refX', -7)
            .attr('refY', 0)
            .attr('orient', 'auto')
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('xoverflow', 'visible')
            .append('svg:path')
            .attr('d', 'M -10,-5 L -10 ,5 L 0,0')
            .attr('fill', '#000')
            .style('stroke', 'none');

        simulationDirected.on('tick', () => {
            directedLinks
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);

            directedNodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
            directedNodeLabels.attr('x', (d) => d.x).attr('y', (d) => d.y);
        });

        function drag(simulation) {
            function dragStarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragEnded(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = event.x;
                d.fy = event.y;
            }

            return d3
                .drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded);
        }
    }, []);

    return (
        <div style={{ display: 'flex', height: '25vh', width: '100%' }}>
            <div ref={directedRef} style={{ flex: 1 }} />
        </div>
    );
};