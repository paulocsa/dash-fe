'use client';
import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import styles from "./ChartPie.module.css";
import axios from "axios";

const COLORS = ["#d32f2f", "#252525"];

const renderCustomizedLabel = ({ name, percent, index }) => {
    const x = index === 0 ? "30%" : "70%";
    const textAnchor = index === 0 ? "end" : "start";

    return (
        <text
            x={x}
            y={x}
            fill="#666666"
            textAnchor={textAnchor}
            dominantBaseline="central"
            style={{
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                fontSize: '14px',
            }}
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const ChartPie = () => {
    const [turmaData, setTurmaData] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState("Todos");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/v1/dashboard/interno/ativo");
                setTurmaData(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados da API:", error);
            }
        };

        fetchData();
    }, []);

    const getData = () => {
        if (!turmaData || turmaData.length === 0) return [];

        let eventosFiltrados = turmaData;

        if (selectedCurso && selectedCurso !== "Todos") {
            const filtro = selectedCurso.toLowerCase().includes("gest")
                ? "ge"
                : "dsm";
            eventosFiltrados = turmaData.filter(evento =>
                evento.curso_semestre?.toLowerCase().startsWith(filtro)
            );
        }

        const totalAlunos = eventosFiltrados.reduce((sum, turma) => sum + Number(turma.total_alunos), 0);
        const votosValidos = eventosFiltrados.reduce((sum, turma) => sum + Number(turma.votos_validos), 0);
        const votosPendentes = totalAlunos - votosValidos;

        return [
            { name: "Votos Confirmados", value: votosValidos },
            { name: "Não Votaram", value: votosPendentes }
        ];
    };

    const data = getData();

    return (
        <div className={styles.chartContainer}>
            <span className={styles.title}>Quantidade de Votos</span>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} votos`, '']} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartPie;
