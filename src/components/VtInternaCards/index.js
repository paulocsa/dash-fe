import React, { useContext } from "react";
import { Carousel } from "primereact/carousel";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./VtInternaCards.module.css";
import { TurmaContext } from "../../context/TurmaContext";

// Importando o ícone de pessoas
const COLORS = ["#ff0000", "#000000"];

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline={y > cy ? "hanging" : "baseline"}
        style={{ fontSize: "12px" }}
      >
        {`${name}`}
      </text>
      <text
        x={x}
        y={y + 15}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline={y > cy ? "hanging" : "baseline"}
        style={{ fontSize: "10px" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

const responsiveOptions = [
  { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
  { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
  { breakpoint: "767px", numVisible: 2, numScroll: 1 },
  { breakpoint: "575px", numVisible: 1, numScroll: 1 },
];

const VtInternaCards = () => {
  const { turmaData, selectedCurso, selectedCard, setSelectedCard } =
    useContext(TurmaContext);

  const getSortedData = () => {
    if (selectedCurso === "todos") {
      const allTurmas = [];
      if (turmaData.dsm)
        turmaData.dsm.forEach((t) => allTurmas.push({ ...t, curso: "DSM" }));
      if (turmaData.gestao)
        turmaData.gestao.forEach((t) => allTurmas.push({ ...t, curso: "GE" }));
      return allTurmas.sort((a, b) => b.votos - a.votos);
    } else if (selectedCurso && turmaData[selectedCurso]) {
      return [...turmaData[selectedCurso]].sort((a, b) => b.votos - a.votos);
    }
    return [];
  };

  const sortedData = getSortedData();

  return (
    <>
      <div className={styles.cardContainer}>
        <Carousel
          showIndicators={false}
          value={sortedData}
          responsiveOptions={responsiveOptions}
          itemTemplate={(item, index) => {
            const sortedIndex =
              sortedData.findIndex(
                (sortedItem) => sortedItem.name === item.name
              ) + 1;

            return (
              <div
                className={`${styles.card} ${
                  selectedCard?.name === item.name ? styles.selected : ""
                }`}
                onClick={() =>
                  setSelectedCard(
                    selectedCard?.name === item.name ? null : item
                  )
                }
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.positionBadge}>{sortedIndex}°</div>
                    <span className={styles.classID}>{item.name}</span>
                    {selectedCurso === "todos" && (
                      <span className={styles.cursoBadge}>{item.curso}</span>
                    )}
                  </div>

                  <div className={styles.cardInnerContent}>
                    <div className={styles.votacaoInfoText}>
                      <p className={styles.totalVotes}>{item.votos}</p>
                      <span className={styles.votosText}>Votos</span>
                    </div>
                    <div className={styles.pieChartContainer}>
                      <PieChart
                        width={150}
                        height={100}
                        margin={{ top: 0, right: 25, bottom: 10, left: 0 }}
                        style={{ cursor: "pointer" }}
                      >
                        <Pie
                          data={[
                            { name: "Ótimo", value: item.feedback.otimo },
                            { name: "Bom", value: item.feedback.bom },
                          ]}
                          label={renderCustomLabel}
                          labelLine={false}
                          dataKey="value"
                          innerRadius="65%"
                          outerRadius="75%"
                        >
                          <Cell fill={COLORS[0]} />
                          <Cell fill={COLORS[1]} />
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
          numVisible={4}
          numScroll={2}
          className={styles.carouselShifted} // <-- Classe aplicada aqui
        />
      </div>

      {/* Área de detalhes, fora da div do card */}
      {selectedCard && (
        <>
          <div className={styles.cardExtraContentGlobal}>
            <h3 className={styles.nomedocurso}>
              Dashboard | {selectedCard.name}
            </h3>
            <p className={styles.alunosCor}>
              {selectedCard.total} Alunos{" "}
              <img
                src="/people.png"
                alt="ícone de pessoas"
                className={styles.peopleIcon}
              />
            </p>
          </div>
          <div className={styles.hrWrapper}>
            <hr className={styles.hrSeparador} />
          </div>
          <div className={styles.cardContentAlunos}>
            <div className={styles.cardAlunos}>
              <h2 className={styles.candidato}>Candidatos a representantes</h2>
              {selectedCard.representantes?.map((rep, index) => (
                <div className={styles.representanteCard} key={index}>
                  <img
                    src={rep.foto}
                    alt={`Foto de ${rep.name}`}
                    className={styles.representanteFoto}
                  />
                  <div className={styles.representanteInfo}>
                    <strong>{rep.name}</strong> {/* Corrigido para rep.name */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VtInternaCards;
