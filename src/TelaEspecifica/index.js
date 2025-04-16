import "../App.css";
import Header from "../header";
import { TurmaProvider } from "../context/TurmaContext";
import styles from "./Index.module.css";
import RegistroVotos from "../components/ListRegistroVotos";
import DashInternoTela from "../dashInternoTela";
import ContainerChart from "../components/ContainerChart/index"
import ChartSemanal from "../components/ChartSemanal/index"
import ChartBar from "../components/ChartBar";

function TelaEspecifica() {
  return (
    <TurmaProvider>
      <div>
        <Header />
        <div>
          <DashInternoTela />
        </div>
        <div className={styles. telaContainer}>
        <div className={styles.chartContainer}>
          <ContainerChart props={<ChartBar/>}/>
          <ContainerChart props={<ChartSemanal/>}/>
          <ContainerChart props={<ChartSemanal/>}/>
        </div>
        <div className={styles.listContainer}>
          <RegistroVotos />
        </div>
        </div>
      </div>
    </TurmaProvider>
  );
}

export default TelaEspecifica;
