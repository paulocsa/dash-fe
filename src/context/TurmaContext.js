import React, { createContext, useState } from "react";

export const TurmaContext = createContext();

const turmaData = {
  dsm: [
    {
      name: "DSM 1",
      votos: 60,
      feedback: { otimo: 25, bom: 45 },
      total: 100,
      representantes: [
        { name: "Lucas", foto: "/imgs/rep1.png" },
        { name: "Marcelo", foto: "/imgs/rep2.png" },
        { name: "Rodrigo", foto: "/imgs/rep3.png" },
        { name: "Receba", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 2",
      votos: 30,
      feedback: { otimo: 15, bom: 15 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "DSM 3",
      votos: 20,
      feedback: { otimo: 18, bom: 2 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "DSM 4",
      votos: 70,
      feedback: { otimo: 35, bom: 35 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "DSM 5",
      votos: 80,
      feedback: { otimo: 60, bom: 20 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "DSM 6",
      votos: 40,
      feedback: { otimo: 20, bom: 20 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
  ],
  gestao: [
    {
      name: "GE 1",
      votos: 100,
      feedback: { otimo: 40, bom: 60 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "GE 2",
      votos: 80,
      feedback: { otimo: 35, bom: 45 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "GE 3",
      votos: 43,
      feedback: { otimo: 30, bom: 13 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "GE 4",
      votos: 30,
      feedback: { otimo: 20, bom: 10 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "GE 5",
      votos: 20,
      feedback: { otimo: 10, bom: 10 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
    {
      name: "GE 6",
      votos: 90,
      feedback: { otimo: 45, bom: 45 },
      total: 100,
      representantes: [{ name: "Lucas", foto: "" }],
    },
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

export const TurmaProvider = ({ children }) => {
  const [selectedCurso, setSelectedCurso] = useState("dsm");
  const [selectedVotacaoType, setSelectedVotacaoType] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null); // 👈 adicionado

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
        selectedCard, // 👈 novo estado
        setSelectedCard, // 👈 função para atualizar o card selecionado
      }}
    >
      {children}
    </TurmaContext.Provider>
  );
};
