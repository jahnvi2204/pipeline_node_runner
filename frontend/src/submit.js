// submit.js

import { useCallback } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges, clearPipeline } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        clearPipeline: state.clearPipeline,
    }));

    const handleClick = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const result = await response.json();
            const { num_nodes, num_edges, is_dag } = result;

            window.alert(
                `Pipeline analysis:\n\n` +
                `• Number of nodes: ${num_nodes}\n` +
                `• Number of edges: ${num_edges}\n` +
                `• Is DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`
            );
        } catch (err) {
            console.error(err);
            window.alert('Failed to analyze pipeline. Please ensure the backend is running.');
        }
    }, [nodes, edges]);

    const handleClear = useCallback(() => {
        if (nodes.length === 0 && edges.length === 0) {
            return; // Nothing to clear
        }
        
        if (window.confirm('Are you sure you want to clear the entire pipeline? This action cannot be undone.')) {
            clearPipeline();
        }
    }, [nodes.length, edges.length, clearPipeline]);

    return (
        <footer className="submit-shell">
            <div className="submit-actions">
                <button type="button" className="secondary-button" onClick={handleClear}>
                    <span className="secondary-button-icon">🗑️</span>
                    <span>Clear Pipeline</span>
                </button>
                <button type="button" className="primary-button" onClick={handleClick}>
                    <span className="primary-button-icon">▶</span>
                    <span>Run pipeline</span>
                </button>
            </div>
        </footer>
    );
}

