import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">🧠</span>
            Quiz Master
          </h1>
          <p className="app-subtitle">
            Test your knowledge with our interactive quiz!
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="quiz-card">
          <Quiz />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React + Vite ⚡</p>
      </footer>
    </div>
  );
}

export default App;
