import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphsExample = () => {
    const undirectedRef = useRef(null);
    const directedRef = useRef(null);

    useEffect(() => {
        const undirectedData = {
            nodes: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
            ],
            links: [
                { source: 1, target: 2 },
                { source: 1, target: 5 },
                { source: 2, target: 5 },
                { source: 2, target: 3 },
                { source: 3, target: 4 },
                { source: 2, target: 4 },
                { source: 4, target: 5 },
            ],
        };

        const directedData = {
            nodes: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
            ],
            links: [
                { source: 1, target: 2 },
                { source: 1, target: 6 },
                { source: 2, target: 5 },
                { source: 3, target: 5 },
                { source: 3, target: 6 },
                { source: 4, target: 2 },
                { source: 5, target: 4 },
                { source: 6, target: 6 },
            ],
        };

        const undirectedContainer = d3.select(undirectedRef.current);
        const undirectedWidth = undirectedContainer.node().getBoundingClientRect().width;
        const undirectedHeight = undirectedContainer.node().getBoundingClientRect().height;

        const directedContainer = d3.select(directedRef.current);
        const directedWidth = directedContainer.node().getBoundingClientRect().width;
        const directedHeight = directedContainer.node().getBoundingClientRect().height;

        let svgUndirected = undirectedContainer.select('svg');
        let svgDirected = directedContainer.select('svg');

        if (svgUndirected.empty()) {
            svgUndirected = undirectedContainer
                .append('svg')
                .attr('width', undirectedWidth)
                .attr('height', undirectedHeight);
        } else {
            svgUndirected.selectAll('*').remove();
        }

        if (svgDirected.empty()) {
            svgDirected = directedContainer
                .append('svg')
                .attr('width', directedWidth)
                .attr('height', directedHeight);
        } else {
            svgDirected.selectAll('*').remove();
        }

        const simulationUndirected = d3
            .forceSimulation(undirectedData.nodes)
            .force('link', d3.forceLink(undirectedData.links).id((d) => d.id))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(undirectedWidth / 2, undirectedHeight / 2));

        const simulationDirected = d3
            .forceSimulation(directedData.nodes)
            .force('link', d3.forceLink(directedData.links).id((d) => d.id))
            .force('charge', d3.forceManyBody().strength(-50))
            .force('center', d3.forceCenter(directedWidth / 2, directedHeight / 2));

        const nodeRadius = Math.min(undirectedWidth, undirectedHeight) * 0.05;

        const undirectedLinks = svgUndirected
            .selectAll('line')
            .data(undirectedData.links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

        const directedLinks = svgDirected
            .selectAll('line')
            .data(directedData.links)
            .enter()
            .append('line')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('marker-end', (d) => (d.source === 6 ? 'url(#arrowhead-self)' : 'url(#arrowhead)'));

        const undirectedNodes = svgUndirected
            .selectAll('circle')
            .data(undirectedData.nodes)
            .enter()
            .append('circle')
            .attr('r', nodeRadius)
            .attr('fill', '#4169E1')
            .call(drag(simulationUndirected));

        const directedNodes = svgDirected
            .selectAll('circle')
            .data(directedData.nodes)
            .enter()
            .append('circle')
            .attr('r', nodeRadius)
            .attr('fill', '#FF6347')
            .call(drag(simulationDirected));

        const undirectedNodeLabels = svgUndirected
            .selectAll('text')
            .data(undirectedData.nodes)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', 5)
            .text((d) => d.id);

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
            .attr('fill', '#999')
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
            .attr('fill', '#999')
            .style('stroke', 'none');

        simulationUndirected.on('tick', () => {
            undirectedLinks
                .attr('x1', (d) => d.source.x)
                .attr('y1', (d) => d.source.y)
                .attr('x2', (d) => d.target.x)
                .attr('y2', (d) => d.target.y);

            undirectedNodes.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
            undirectedNodeLabels.attr('x', (d) => d.x).attr('y', (d) => d.y);
        });

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
            <div ref={undirectedRef} style={{ flex: 1 }} />
            <div ref={directedRef} style={{ flex: 1 }} />
        </div>
    );
};

export default GraphsExample;
