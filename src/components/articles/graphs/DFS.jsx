import React, { useState, useEffect } from 'react';
import './dfs.css';

function DFS() {
    const initialGraph = [
        { id: 'u', color: 'white', start: '', end: '' },
        { id: 'v', color: 'white' },
        { id: 'w', color: 'white' },
        { id: 'x', color: 'white' },
        { id: 'y', color: 'white' },
        { id: 'z', color: 'white' },
    ];

    const [graph, setGraph] = useState(initialGraph);
    const [step, setStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const steps = [
            ['u', 'grey', '1', ''],
            ['v', 'grey', '2', ''],
            ['y', 'grey', '3', ''],
            ['x', 'grey', '4', ''],
            ['x', 'black', '4', '5'],
            ['y', 'black', '3', '6'],
            ['v', 'black', '2', '7'],
            ['u', 'black', '1', '8'],
            ['w', 'grey', '9', ''],
            ['z', 'grey', '10', ''],
            ['z', 'black', '10', '11'],
            ['w', 'black', '9', '12'],
        ];
        if (isRunning && step < steps.length) {
            const timer = setTimeout(() => {
                const [nodeId, color, start, end] = steps[step];
                const newGraph = graph.map((node) =>
                    node.id === nodeId ? { ...node, color, start, end } : node
                );
                setGraph(newGraph);
                setStep(step + 1);
            }, 1000);

            // cleanup function to clear the timeout
            return () => clearTimeout(timer);
        }
        if (step >= steps.length) {
            setIsRunning(false);
        }
    }, [step, isRunning, graph]);

    const start = () => {
        setIsRunning(true);
    };

    const reset = () => {
        setGraph(initialGraph);
        setStep(0);
        setIsRunning(false);
    };

    return (
        <div className='dfs'>
            <button onClick={start}>начать обход в глубину</button>
            <button onClick={reset}>сбросить</button>
            {graph.map((node) => (
                <div className='elements' key={node.id}>
                    <p>{node.id}</p>
                    <p style={{ color: 'white', backgroundColor: node.color }}>{node.start}/{node.end}</p>
                </div>
            ))}
        </div>
    );
}

export default DFS;
