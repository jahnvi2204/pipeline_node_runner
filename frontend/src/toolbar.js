// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <section className="toolbar-shell">
            <div className="toolbar-title">Nodes</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='http' label='HTTP' />
                <DraggableNode type='branch' label='Branch' />
                <DraggableNode type='logger' label='Logger' />
            </div>
        </section>
    );
};
