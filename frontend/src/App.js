import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="app-title">VectorFlow</div>
          <div className="app-subtitle">Design and orchestrate AI pipelines visually</div>
        </div>
      </header>
      <main className="app-main">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
