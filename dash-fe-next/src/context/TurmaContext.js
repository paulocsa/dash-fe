'use client';

import React, { createContext, useState } from "react";

export const TurmaContext = createContext();

const turmaData = {
  dsm: [
    { totalAlunos: 20, votosValidos: 15, candidatosAtivos: 15 },
  ],
  gestao: [
    { totalAlunos: 50, votosValidos: 30, candidatosAtivos: 10 },
  ],
};

const curso = [
  { name: "DSM", value: "dsm" },
  { name: "Gestão Empresarial", value: "gestao" },
  { name: "Todos", value: "todos" },
];

const votacaoType = [
  { name: "Votação Interna", value: 0 },
  { name: "Votação Externa", value: 1 },
];

const dataweek = {
  dsm: {
    week1: [
      { day: "2024-04-01", visitantes: 20 },
      { day: "2024-04-02", visitantes: 25 },
      { day: "2024-04-03", visitantes: 15 },
      { day: "2024-04-04", visitantes: 10 },
      { day: "2024-04-05", visitantes: 30 },
      { day: "2024-04-06", visitantes: 50 },
      { day: "2024-04-07", visitantes: 40 },
    ],
    week2: [
      { day: "2024-04-08", visitantes: 40 },
      { day: "2024-04-09", visitantes: 30 },
      { day: "2024-04-10", visitantes: 15 },
      { day: "2024-04-11", visitantes: 25 },
      { day: "2024-04-12", visitantes: 35 },
      { day: "2024-04-13", visitantes: 2 },
      { day: "2024-04-14", visitantes: 10 },
    ],
  },
  gestao: {
    week1: [
      { day: "2024-04-01", visitantes: 10 },
      { day: "2024-04-02", visitantes: 30 },
      { day: "2024-04-03", visitantes: 30 },
      { day: "2024-04-04", visitantes: 55 },
      { day: "2024-04-05", visitantes: 38 },
      { day: "2024-04-06", visitantes: 55 },
      { day: "2024-04-07", visitantes: 45 },
    ],
    week2: [
      { day: "2024-04-08", visitantes: 50 },
      { day: "2024-04-09", visitantes: 65 },
      { day: "2024-04-10", visitantes: 15 },
      { day: "2024-04-11", visitantes: 70 },
      { day: "2024-04-12", visitantes: 45 },
      { day: "2024-04-13", visitantes: 55 },
      { day: "2024-04-14", visitantes: 35 },
    ],
  },
};

export const TurmaProvider = ({ children }) => {
  const [selectedCurso, setSelectedCurso] = useState("dsm");
  const [selectedVotacaoType, setSelectedVotacaoType] = useState(0);

  return (
    <TurmaContext.Provider
      value={{
        selectedCurso,
        setSelectedCurso,
        selectedVotacaoType,
        setSelectedVotacaoType,
        turmaData,
        curso,
        votacaoType,
        dataweek,
      }}
    >
      {children}
    </TurmaContext.Provider>
  );
};
