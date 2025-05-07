'use client';
import React, { useState, useEffect } from "react";
import styles from "./DashInternoMain.module.css";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import ChartSemanal from "../ChartSemanal";
import ChartPie from "../ChartPie";
import VotacaoInternaCards from "../VotacaoIntCards";
import axios from "axios";

// Função para transformar dados em formato para o gráfico
const mapDataToWeekDays = (dadosAPI, cursoSelecionado) => {
  const diasSemana = ["seg.", "ter.", "qua.", "qui.", "sex.", "sáb.", "dom."];
  const votosPorDia = {};

  // Inicializa todos os dias com zero
  diasSemana.forEach((dia) => {
    votosPorDia[dia] = 0;
  });

  const eventosFiltrados = cursoSelecionado === "Todos"
    ? dadosAPI
    : dadosAPI.filter(evento =>
        evento.curso_semestre.toLowerCase().includes(cursoSelecionado.toLowerCase())
      );

      eventosFiltrados.forEach((evento) => {
        if (Array.isArray(evento.votos_por_dia)) {
          evento.votos_por_dia.forEach((voto) => {
            const date = new Date(voto.data);
            const nomeDia = diasSemana[date.getDay()];
            votosPorDia[nomeDia] += voto.qtd_votos;
          });
        }
      });
      

  return diasSemana.map((dia) => ({
    day: dia,
    week1: votosPorDia[dia],
  }));
};

const DashInternoMain = () => {
  const [selectedCurso, setSelectedCurso] = useState({ name: "Todos" });
  const [selectedVotacaoType, setSelectedVotacaoType] = useState(null);
  const [dataweek, setDataweek] = useState([]);

  const curso = [
    { name: "Todos" },
    { name: "DSM" },
    { name: "Gestão Empresarial" }
  ];

  const votacaoType = [
    { name: "Interna" },
    { name: "Externa" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/dashboard/interno/ativo"); // Substitua pela URL correta
        setDataweek(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const chartData = mapDataToWeekDays(dataweek, selectedCurso.name);

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
        <VotacaoInternaCards cursoSelecionado={selectedCurso.name} />
      </div>

      <div className={styles.chartContainers}>
        <div className={styles.chartContainer}>
          <ChartSemanal data={chartData} />
        </div>
        <div className={styles.chartContainer}>
          <ChartPie />
        </div>
      </div>
    </div>
  );
};

export default DashInternoMain;
