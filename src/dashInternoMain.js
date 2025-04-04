import { useContext } from "react";
import VtInternaCards from "./components/VtInternaCards";
import styles from "./DashInternoMain.module.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ChartSemanal from "./components/ChartSemanal";
import ChartBar from "./components/ChartBar";
import { TurmaContext } from "./context/TurmaContext";

export default function DashInternoMain() {
  const { selectedCurso, selectedVotacaoType, curso, votacaoType, setSelectedCurso, setSelectedVotacaoType } = useContext(TurmaContext);
  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashHeader}>
        <Dropdown
          value={selectedVotacaoType}
          onChange={(e) => setSelectedVotacaoType(e.value)}
          options={votacaoType}
          optionLabel="name"
          placeholder="Votação"
          className="custom-dropdown" 
        />
        <Dropdown
          value={selectedCurso}
          onChange={(e) => setSelectedCurso(e.value)}
          options={curso}
          optionLabel="name"
          placeholder="CURSO"
          className={styles.cursoSelector}
        />
      </div>
      <div className={styles.cardContent}>
        <VtInternaCards />
      </div>
      <div className={styles.chartContainers}>
        <div className={styles.chartContainer}>
          <ChartSemanal />
        </div>
        <div className={styles.chartContainer}>
          <ChartBar/>
        </div>
      </div>
    </div>
  );
}
