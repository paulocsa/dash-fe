'use client';
import React, { useContext } from "react";
import styles from "./DashInternoMain.module.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import ChartSemanal from "../ChartSemanal";
import ChartPie from "../ChartPie";
import { TurmaContext } from "@/context/TurmaContext";
import VotacaoInternaCards from "../VotacaoIntCards";

const DashInternoMain = () => {
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
          className={styles.votacaoSelector}
        />
        <Dropdown
          value={selectedCurso}
          onChange={(e) => setSelectedCurso(e.value)}
          options={curso}
          optionLabel="name"
          placeholder="Selecione um curso"
          className={styles.cursoSelector}
        />
      </div>
      <div className={styles.cardContent}>
        <VotacaoInternaCards />
      </div>
      <div className={styles.chartContainers}>
        <div className={styles.chartContainer}>
          <ChartSemanal />
        </div>
        <div className={styles.chartContainer}>
          <ChartPie/>
        </div>
      </div>
    </div>
  );
};

export default DashInternoMain; 