import React, { useContext, useEffect, useRef } from "react";
import { Carousel } from "primereact/carousel";
import { PieChart, Pie, Cell } from "recharts";
import styles from "./VtInternaCards.module.css";
import { TurmaContext } from "../../context/TurmaContext";

const VtInternaCards = ({ conteudo }) => {
  const { turmaData, selectedCurso, selectedCard, setSelectedCard } =
    useContext(TurmaContext);

  const carouselRef = useRef(null);

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

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

  const getTotals = () => {
    if (selectedCurso === "todos") {
      const dsmData = turmaData.dsm || [];
      const gestaoData = turmaData.gestao || [];

      const totalAlunos = dsmData.reduce((sum, turma) => sum + turma.totalAlunos, 0) +
                         gestaoData.reduce((sum, turma) => sum + turma.totalAlunos, 0);

      const votosValidos = dsmData.reduce((sum, turma) => sum + turma.votosValidos, 0) +
                          gestaoData.reduce((sum, turma) => sum + turma.votosValidos, 0);

      const candidatosAtivos = dsmData.reduce((sum, turma) => sum + turma.candidatosAtivos, 0) +
                              gestaoData.reduce((sum, turma) => sum + turma.candidatosAtivos, 0);

      const votosPendentes = totalAlunos - votosValidos;

      return {
        totalAlunos,
        votosValidos,
        votosPendentes,
        candidatosAtivos
      };
    } else {
      const cursoData = turmaData[selectedCurso] || [];
      
      const totalAlunos = cursoData.reduce((sum, turma) => sum + turma.totalAlunos, 0);
      const votosValidos = cursoData.reduce((sum, turma) => sum + turma.votosValidos, 0);
      const candidatosAtivos = cursoData.reduce((sum, turma) => sum + turma.candidatosAtivos, 0);
      const votosPendentes = totalAlunos - votosValidos;

      return {
        totalAlunos,
        votosValidos,
        votosPendentes,
        candidatosAtivos
      };
    }
  };

  const totals = getTotals();
  const sortedData = getSortedData();

  const COLORS = ["#00C49F", "#FFBB28"];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // 👇 Corrigindo problema do Carousel invisível após redimensionamento
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && carouselRef.current.element) {
        // força re-renderização com timeout
        setTimeout(() => {
          carouselRef.current.element.dispatchEvent(new Event("resize"));
        }, 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={styles.cardContainer}>
        <Carousel
          ref={carouselRef} // 👈 Importante!
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
          className={styles.carouselShifted}
        />
      </div>

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
            <h2 className={styles.candidato}>Candidatos a representantes</h2>
            <div className={styles.cardAlunos}>
              {selectedCard.representantes?.map((rep, index) => (
                <div className={styles.representanteCard} key={index}>
                  <img
                    src={rep.foto}
                    alt={`Foto de ${rep.name}`}
                    className={styles.representanteFoto}
                  />
                  <div className={styles.representanteInfo}>
                    <strong>{rep.name}</strong>
                  </div>
                </div>
              ))}
            </div>
            <hr className={styles.hrSeparador} />
          </div>
          <div className={styles.telaContainer}>{conteudo}</div>
        </>
      )}
    </>
  );
};

export default VtInternaCards;
