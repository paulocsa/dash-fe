'use client';

import React, { createContext, useState } from "react";

export const TurmaContext = createContext();

const turmaDataVotos = {
  dsm: [
    {
      name: "DSM 1",
      votos: 60,
      feedback: { otimo: 25, bom: 45 },
      total: 95,
      representantes: [
        { name: "Lucas Martins", foto: "/imgs/rep1.png" },
        { name: "Amanda Rocha", foto: "/imgs/rep2.png" },
        { name: "Henrique Silva", foto: "/imgs/rep3.png" },
        { name: "Jéssica Lima", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 2",
      votos: 30,
      feedback: { otimo: 15, bom: 15 },
      total: 80,
      representantes: [
        { name: "Pedro Carvalho", foto: "/imgs/rep1.png" },
        { name: "Bruna Teixeira", foto: "/imgs/rep2.png" },
        { name: "Gabriel Souza", foto: "/imgs/rep3.png" },
        { name: "Lívia Costa", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 3",
      votos: 20,
      feedback: { otimo: 18, bom: 2 },
      total: 60,
      representantes: [
        { name: "João Pedro", foto: "/imgs/rep1.png" },
        { name: "Marina Duarte", foto: "/imgs/rep2.png" },
        { name: "Tiago Nunes", foto: "/imgs/rep3.png" },
        { name: "Ana Paula", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 4",
      votos: 70,
      feedback: { otimo: 35, bom: 35 },
      total: 110,
      representantes: [
        { name: "Ricardo Melo", foto: "/imgs/rep1.png" },
        { name: "Camila Borges", foto: "/imgs/rep2.png" },
        { name: "Felipe Ramos", foto: "/imgs/rep3.png" },
        { name: "Isabela Fontes", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 5",
      votos: 80,
      feedback: { otimo: 60, bom: 20 },
      total: 130,
      representantes: [
        { name: "Rafael Torres", foto: "/imgs/rep1.png" },
        { name: "Laura Mendes", foto: "/imgs/rep2.png" },
        { name: "Daniel Almeida", foto: "/imgs/rep3.png" },
        { name: "Vanessa Reis", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "DSM 6",
      votos: 40,
      feedback: { otimo: 20, bom: 20 },
      total: 90,
      representantes: [
        { name: "Carlos Eduardo", foto: "/imgs/rep1.png" },
        { name: "Natália Silva", foto: "/imgs/rep2.png" },
        { name: "Bruno Castro", foto: "/imgs/rep3.png" },
        { name: "Fernanda Lopes", foto: "/imgs/rep4.png" },
      ],
    },
  ],
  gestao: [
    {
      name: "GE 1",
      votos: 100,
      feedback: { otimo: 40, bom: 60 },
      total: 150,
      representantes: [
        { name: "Mateus Brito", foto: "/imgs/rep1.png" },
        { name: "Tatiane Gomes", foto: "/imgs/rep2.png" },
        { name: "Rodrigo Fernandes", foto: "/imgs/rep3.png" },
        { name: "Elaine Souza", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "GE 2",
      votos: 80,
      feedback: { otimo: 35, bom: 45 },
      total: 100,
      representantes: [
        { name: "Vinícius Rocha", foto: "/imgs/rep1.png" },
        { name: "Débora Pires", foto: "/imgs/rep2.png" },
        { name: "Caio Augusto", foto: "/imgs/rep3.png" },
        { name: "Simone Vieira", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "GE 3",
      votos: 43,
      feedback: { otimo: 30, bom: 13 },
      total: 85,
      representantes: [
        { name: "Eduardo Lima", foto: "/imgs/rep1.png" },
        { name: "Giovana Farias", foto: "/imgs/rep2.png" },
        { name: "Alexandre Prado", foto: "/imgs/rep3.png" },
        { name: "Letícia Amorim", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "GE 4",
      votos: 30,
      feedback: { otimo: 20, bom: 10 },
      total: 70,
      representantes: [
        { name: "Samuel Ribeiro", foto: "/imgs/rep1.png" },
        { name: "Juliana Matos", foto: "/imgs/rep2.png" },
        { name: "Leonardo Dias", foto: "/imgs/rep3.png" },
        { name: "Clara Azevedo", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "GE 5",
      votos: 20,
      feedback: { otimo: 10, bom: 10 },
      total: 55,
      representantes: [
        { name: "Igor Santana", foto: "/imgs/rep1.png" },
        { name: "Patrícia Lima", foto: "/imgs/rep2.png" },
        { name: "Wesley Andrade", foto: "/imgs/rep3.png" },
        { name: "Renata Silva", foto: "/imgs/rep4.png" },
      ],
    },
    {
      name: "GE 6",
      votos: 90,
      feedback: { otimo: 45, bom: 45 },
      total: 120,
      representantes: [
        { name: "Otávio Martins", foto: "/imgs/rep1.png" },
        { name: "Carolina Nunes", foto: "/imgs/rep2.png" },
        { name: "Douglas Moreira", foto: "/imgs/rep3.png" },
        { name: "Sabrina Costa", foto: "/imgs/rep4.png" },
      ],
    },
  ],
};

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
  const [selectedCurso, setSelectedCurso] = useState("null");
  const [selectedVotacaoType, setSelectedVotacaoType] = useState(0);
  const [selectedCard, setSelectedCard] = useState('');  // Adiciona o estado selectedCard

  return (
    <TurmaContext.Provider
      value={{
        selectedCurso,
        setSelectedCurso,
        selectedVotacaoType,
        setSelectedVotacaoType,
        selectedCard,       // Passa selectedCard
        setSelectedCard,    // Passa setSelectedCard
        turmaData,
        turmaDataVotos,
        curso,
        votacaoType,
        dataweek,
      }}
    >
      {children}
    </TurmaContext.Provider>
  );
};
