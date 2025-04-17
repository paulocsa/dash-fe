import "./App.css";
import styles from "../src/TelaEspecifica/Index.module.css";


import ContainerChart from "./components/ContainerChart/index"
import ChartSemanal from "./components/ChartSemanal/index"
import ChartBar from "./components/ChartBar";
import ChartDonut from "./components/ChartDonut"

function Charts(){
    const chartData = [
        { name: "Votos Confirmados", value: 50 },
        { name: "Não Votaram", value: 50 },
      ];

      return(
        <div className={styles.chartContainer}>
        <ContainerChart props={<ChartBar/>}/>
        <ContainerChart props={<ChartDonut title="Quantidade de Votos" data={chartData} />}/>
        <ContainerChart props={<ChartSemanal/>}/>
      </div>
      );
}

export default Charts;