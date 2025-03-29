import './App.css';    // Mantenha esta importação (estilos globais)
import Header from './header';
import './Header.module.css'; // Adicione esta linha (estilos do Header)

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;