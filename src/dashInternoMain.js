import VtInternaCards from "./components/VtInternaCards";
import styles from "./DashInternoMain.module.css";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ChartSemanal from "./components/ChartSemanal";
import ChartBar from "./components/ChartBar";

const curso = [
  {
    name: "DSM",
    value: "dsm",
  },
  {
    name: "Gestão Empresarial",
    value: "gestao",
  },
];

const votacaoType = [{name: "Votação Interna", value: 0}, {name: "Votação Externa", value: 1}];

export default function DashInternoMain() {
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [selectedVotacaoType, setSelectedVotacaoType] = useState(0); //0 é interna
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
