import VtInternaCards from "./components/VtInternaCards";
import styles from "./DashInternoMain.module.css";
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const curso = [ {
    name: "DSM",
    value: "dsm"
}, {
    name: "Gestão Empresarial",
    value: "gestao"
}]

export default function DashInternoMain() {
  const [selectedCurso, setSelectedCurso] = useState(null);
  return (
    <div className={styles.dashContainer}>
      <div className={styles.dashHeader}>
        <h4 className={styles.votacaoText}>Votação Interna</h4>
        <Dropdown value={selectedCurso} onChange={(e) => setSelectedCurso(e.value)} options={curso} optionLabel="name" 
                placeholder="Curso" className={styles.cursoSelector} />
      </div>
      <div className={styles.cardContent}>
        <VtInternaCards/>
      </div>
    </div>
  );
}
