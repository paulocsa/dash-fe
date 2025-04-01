import './App.css';    // Mantenha esta importação (estilos globais)
import DashInternoMain from './dashInternoMain';
import Header from './header';
import './Header.module.css'; // Adicione esta linha (estilos do Header)

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{backgroundColor: "#B20000", height: "70px"}}>Simulador da barra vermelha</div>
      <DashInternoMain/>
    </div>
  );
}

export default App;