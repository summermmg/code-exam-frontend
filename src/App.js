import './App.css';
import AssemblyLine from "./components/AssemblyLine/AssemblyLine";

function App() {
  const list = ["Idea", "Development", "Testing", "Deployment"];
  return (
    <div className="App">
      <AssemblyLine stages={list} />
    </div>
  );
}

export default App;
