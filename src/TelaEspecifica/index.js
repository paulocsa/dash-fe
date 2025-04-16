import "../App.css";
import Header from "../header";
import { TurmaProvider } from "../context/TurmaContext";
import styles from "./Index.module.css";
import RegistroVotos from "../components/ListRegistroVotos";
import DashInternoTela from "../dashInternoTela";
import ContainerChart from "../components/ContainerChart/index"
import ChartSemanal from "../components/ChartSemanal/index"
import ChartBar from "../components/ChartBar";
import ChartDonut from "../components/ChartDonut"

function TelaEspecifica() {

  const chartData = [
    { name: "Votos Confirmados", value: 50 },
    { name: "Não Votaram", value: 50 },
  ];

  return (
    <TurmaProvider>
      <div>
        <Header />
        <div>
          <DashInternoTela />
        </div>
        <div className={styles. telaContainer}>
        {/* <div className={styles.chartContainer}>
          <ContainerChart props={<ChartBar/>}/>
          <ContainerChart props={<ChartDonut title="Quantidade de Votos" data={chartData} />}/>
          <ContainerChart props={<ChartSemanal/>}/>
        </div>
        <div className={styles.listContainer}>
          <RegistroVotos />
        </div> */}
        </div>
      </div>
    </TurmaProvider>
  );
}

export default TelaEspecifica;
