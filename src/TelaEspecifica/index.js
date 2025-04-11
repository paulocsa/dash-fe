import "../App.css";
import Header from "../header";
import { TurmaProvider } from "../context/TurmaContext";
import styles from "./Index.module.css";
import RegistroVotos from "../components/ListRegistroVotos";
import DashInternoTela from "../dashInternoTela";
function TelaEspecifica() {
  return (
    <TurmaProvider>
      <div>
        <Header />
        <div>
          <DashInternoTela />
        </div>
        <div className={styles.telaContainer}>
          <RegistroVotos />
        </div>
      </div>
    </TurmaProvider>
  );
}

export default TelaEspecifica;
