import { useContext } from "react";
import VtInternaCards from "./components/VtInternaCards";
import RegistroVotos from "./components/ListRegistroVotos/index";
import styles from "./dashInternoTela.module.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { TurmaContext } from "./context/TurmaContext";
import ContainerChart from "./components/ContainerChart";
import ChartBar from "./components/ChartBar";
import ChartDonut from "./components/ChartDonut";
import ChartSemanal from "./components/ChartSemanal";

export default function DashInternoMain() {
  const {
    selectedCurso,
    selectedVotacaoType,
    curso,
    votacaoType,
    setSelectedCurso,
    setSelectedVotacaoType,
  } = useContext(TurmaContext);

  const chartData = [
    { name: "Votos Confirmados", value: 50 },
    { name: "Não Votaram", value: 50 },
  ];

  return (
    <>
      {/* Área vermelha */}
      <div className={styles.dashContainer}>
        <div className={styles.dashHeader}>
          <Dropdown
            value={selectedVotacaoType}
            onChange={(e) => setSelectedVotacaoType(e.value)}
            options={votacaoType}
            optionLabel="name"
            placeholder="Votação"
            style={{
              backgroundColor: "#b71c1c",
              color: "white",
              border: "none",
            }}
            valueTemplate={(option) => (
              <span style={{ color: "white", fontSize: "1.2rem" }}>
                {option ? option.name : "Votação"}
              </span>
            )}
            panelStyle={{
              backgroundColor: "white",
            }}
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
      </div>

      {/* Fora da div vermelha, abaixo normalmente */}
      <>
        <div className={styles.cardContent}>
          <VtInternaCards
            conteudo={
              <div>
                <h2 className={styles.titleChart}>Overview</h2>
                <div className={styles.chartContainer}>
                  <ContainerChart props={<ChartBar />} />
                  <ContainerChart
                    props={
                      <ChartDonut
                        title="Quantidade de Votos"
                        data={chartData}
                      />
                    }
                  />
                  <ContainerChart props={<ChartSemanal />} />
                </div>
                <div className={styles.listContainer}>
                  <RegistroVotos />
                </div>
              </div>
            }
          />
        </div>
      </>
    </>
  );
}
