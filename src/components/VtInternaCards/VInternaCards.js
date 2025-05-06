import React, { useContext, useEffect, useRef, useState } from "react";
import { Carousel } from "primereact/carousel";
import dynamic from "next/dynamic";
import styles from "./VtInternaCards.module.css";
import { TurmaContext } from "../../context/TurmaContext";
import { useIsClient } from "../../hooks/useIsClient";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";

const VtInternaCards = ({ conteudo }) => {
  const { selectedCurso, selectedCard, setSelectedCard, setSelectedCurso } = useContext(TurmaContext);
  const isClient = useIsClient();
  const carouselRef = useRef(null);
  const [eventosAtivos, setEventosAtivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turmaDataVotos, setTurmaDataVotos] = useState({ dsm: [], gestao: [] });

  // Buscar eventos ativos e dados das turmas
  useEffect(() => {
    const fetchEventosAtivos = async () => {
      try {
        console.log('Iniciando busca de eventos ativos...');
        const response = await axios.get('http://localhost:5000/v1/dashboard/interno/ativo');
        console.log('Resposta da API:', response.data);
        
        if (!response.data || response.data.length === 0) {
          console.log('Nenhum evento ativo encontrado');
          setLoading(false);
          return;
        }
  
        const eventos = response.data;
        const dsmData = [];
        const gestaoData = [];
        
        for (const evento of eventos) {
          console.log('Processando evento:', evento.curso_semestre);
          
          const turmaData = {
            name: evento.curso_semestre,
            votos: evento.votos_validos,
            totalAlunos: parseInt(evento.total_alunos),
            votosValidos: parseInt(evento.votos_validos),
            votosPendentes: parseInt(evento.votos_pendentes),
            candidatosAtivos: parseInt(evento.candidatos_ativos),
            total: parseInt(evento.total_alunos),
            representantes: [],
            feedback: {
              otimo: Math.floor(Math.random() * 100),
              bom: Math.floor(Math.random() * 100)
            }
          };
          
          try {
            console.log(`Buscando candidatos para ${evento.curso_semestre}...`);
            const candidatosResponse = await axios.get(`http://localhost:5000/v1/dashboard/interno/ativo/curso/${evento.curso_semestre}`);
            console.log(`Candidatos para ${evento.curso_semestre}:`, candidatosResponse.data);
            
            turmaData.representantes = candidatosResponse.data.candidatos.map(c => ({
              name: c.nome,
              foto: c.foto_url || '/default-user.png',
              votos: c.qtd_votos_recebidos
            }));
          } catch (error) {
            console.error(`Erro ao buscar candidatos para ${evento.curso_semestre}:`, error);
          }
          
          if (evento.curso_semestre.includes('DSM')) {
            dsmData.push(turmaData);
          } else {
            gestaoData.push(turmaData);
          }
        }
        
        console.log('Dados DSM:', dsmData);
        console.log('Dados Gestão:', gestaoData);
        
        setTurmaDataVotos({
          dsm: dsmData,
          gestao: gestaoData,
          todos: [...dsmData, ...gestaoData]
        });
        
        setEventosAtivos(eventos);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar eventos ativos:', error);
        setLoading(false);
      }
    };
    
    fetchEventosAtivos();
    setSelectedCurso("dsm");
  }, [setSelectedCurso]);

  const responsiveOptions = [
    { breakpoint: "1400px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "767px", numVisible: 2, numScroll: 1 },
    { breakpoint: "575px", numVisible: 1, numScroll: 1 },
  ];

  const getSortedData = () => {
    if (selectedCurso === "todos") {
      const allTurmas = [];
      if (turmaDataVotos.dsm)
        turmaDataVotos.dsm.forEach((t) => allTurmas.push({ ...t, curso: "DSM" }));
      if (turmaDataVotos.gestao)
        turmaDataVotos.gestao.forEach((t) => allTurmas.push({ ...t, curso: "GE" }));
      return allTurmas.sort((a, b) => b.votos - a.votos);
    } else if (selectedCurso && turmaDataVotos[selectedCurso]) {
      return [...turmaDataVotos[selectedCurso]].sort((a, b) => b.votos - a.votos);
    }
    return [];
  };

  const getTotals = () => {
    if (selectedCurso === "todos") {
      const dsmData = turmaDataVotos.dsm || [];
      const gestaoData = turmaDataVotos.gestao || [];

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
      const cursoData = turmaDataVotos[selectedCurso] || [];

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

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && carouselRef.current.element) {
        setTimeout(() => {
          carouselRef.current.element.dispatchEvent(new Event("resize"));
        }, 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <div className={styles.cardContainer}>Carregando dados...</div>;
  }

  return (
    <>
      <div className={styles.cardContainer}>
        <Carousel
          ref={carouselRef}
          showIndicators={false}
          value={sortedData}
          responsiveOptions={responsiveOptions}
          itemTemplate={(item, index) => {
            const sortedIndex = sortedData.findIndex((sortedItem) => sortedItem.name === item.name) + 1;

            return (
              <div
                className={`${styles.card} ${selectedCard?.name === item.name ? styles.selected : ""}`}
                onClick={() => setSelectedCard(selectedCard?.name === item.name ? null : item)}
                key={item.name}
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
                      {item?.feedback ? (
                        isClient ? (
                          <PieChart width={150} height={100} style={{ zIndex: 5000 }}>
                            <Pie
                              data={[
                                { name: "Ótimo", value: item.feedback.otimo || 0 },
                                { name: "Bom", value: item.feedback.bom || 0 },
                              ]}
                              dataKey="value"
                              innerRadius="65%"
                              outerRadius="75%"
                              labelLine={false}
                              label={renderCustomLabel}
                            >
                              <Cell fill="#00C49F" />
                              <Cell fill="#FFBB28" />
                            </Pie>
                          </PieChart>
                        ) : (
                          <div style={{ width: 150, height: 100 }}>Carregando...</div>
                        )
                      ) : (
                        <div>No Feedback Available</div>
                      )}
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
                    <span>Votos: {rep.votos}</span>
                  </div>
                </div>
              ))}
            </div>
            <hr className={styles.hrSeparador} />
          </div>
          <div className={styles.telaContainer}>{conteudo}</div>
        </>
      )}

      {!selectedCard && (
        <div className={styles.cardExtraContentGlobal}>
          <h3 className={styles.nomesemcurso}>
            SELECIONE UMA TURMA
          </h3>
        </div>
      )}
    </>
  );
};

export default VtInternaCards;