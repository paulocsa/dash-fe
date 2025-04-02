import './App.css';    // Mantenha esta importação (estilos globais)
import Header from './header';
import './Header.module.css'; // Adicione esta linha (estilos do Header)
import DashInternoMain from './dashInternoMain';

function App() {
  return (
    <div className="App">
      <Header />
      <DashInternoMain/>
    </div>
  );
}

export default App;