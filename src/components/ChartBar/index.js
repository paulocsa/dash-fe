import { useContext } from "react";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { TurmaContext } from "../../context/TurmaContext"
import styles from "../ChartSemanal/ChartSemanal.module.css"

const ChartBar = () => {
    const { turmaData, selectedCurso } = useContext(TurmaContext);
    
    const getData = () => {
        if (selectedCurso === "todos") {
            const allTurmas = [];
            
            if (turmaData.dsm) {
                turmaData.dsm.forEach(turma => {
                    allTurmas.push({
                        ...turma,
                        curso: "DSM"
                    });
                });
            }
            
            if (turmaData.gestao) {
                turmaData.gestao.forEach(turma => {
                    allTurmas.push({
                        ...turma,
                        curso: "GE"
                    });
                });
            }
            
            return allTurmas;
        } else if (selectedCurso && turmaData[selectedCurso]) {
            return turmaData[selectedCurso];
        }
        
        return [];
    };

    const data = getData();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <span className={styles.title}>Total de Votos</span>
            <BarChart
                data={data}
                margin={{ top: 15, right: 25, left: -15, bottom: 5 }}
            >
                <XAxis
                    dataKey="name"
                    style={{ fontSize: "12px" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, data.length > 0 ? Math.max(...data.map((item) => item.votos)) + 10 : 100]}
                    tickFormatter={(value) => `${value}`}
                    style={{ fontSize: "12px" }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip formatter={(value) => `${value}`} />
                <Legend
                    wrapperStyle={{
                        fontSize: "12px",
                        top: 0,
                        left: 0,
                        lineHeight: "15px",
                    }}
                    iconType="circle"
                    iconSize={10}
                />
                <Bar
                    dataKey="votos"
                    fill="#B20000"
                    name="Total de Votos"
                    barSize={50}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ChartBar;
