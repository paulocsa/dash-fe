import './App.css';    // Mantenha esta importação (estilos globais)
import Header from './header';
import './Header.module.css'; // Adicione esta linha (estilos do Header)
import DashInternoMain from './dashInternoMain';
import { TurmaProvider } from './context/TurmaContext';

function App() {
  return (
    <TurmaProvider>
      <div className="App">
        <Header />
        <DashInternoMain/>
      </div>
    </TurmaProvider>
  );
}

export default App;