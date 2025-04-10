import React, { useContext } from "react";
import styles from "./VtInternaCards.module.css";
import { TurmaContext } from "../../context/TurmaContext";

const VtInternaCards = () => {
  const { turmaData, selectedCurso } = useContext(TurmaContext);

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

  const cards = [
    {
      name: "Votos Válidos",
      votos: totals.votosValidos,
      color: "#666666",
      image: "/dash/vote.svg",
      bottomColor: "#d32f2f"
    },
    {
      name: "Votos Pendentes",
      votos: (totals.totalAlunos - totals.votosValidos),
      color: "#666666",
      image: "/dash/vote.svg"
    },
    {
      name: "Total de Alunos",
      votos: totals.totalAlunos,
      color: "#666666",
      image: "/dash/people.svg"
    },
    {
      name: "Candidatos Ativos",
      votos: totals.candidatosAtivos,
      color: "#666666",
      image: "/dash/people.svg"
    }
  ];

  return (
    <div className={styles.cardContainer}>
      {cards.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <span className={styles.classID}>{item.name}</span>
            </div>
            <div className={styles.cardInnerContent}>
              <div className={styles.votacaoInfoText}>
                <p className={styles.totalVotes} style={{ color: item.color }}>{item.votos}</p>
                <img src={item.image} alt={item.name} />
              </div>
            </div>
          </div>
          {item.bottomColor && (
            <div 
              className={styles.bottomBar} 
              style={{ backgroundColor: item.bottomColor }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default VtInternaCards;
