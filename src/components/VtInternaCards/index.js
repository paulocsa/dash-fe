import React from "react";
import { Carousel } from "primereact/carousel";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import styles from "./VtInternaCards.module.css";

const data = [
    { name: "DSM 1", votos: 78, feedback: { otimo: 40, bom: 60 } },
    { name: "DSM 2", votos: 65, feedback: { otimo: 50, bom: 50 } },
    { name: "DSM 3", votos: 43, feedback: { otimo: 30, bom: 70 } },
    { name: "DSM 4", votos: 31, feedback: { otimo: 20, bom: 80 } },
    { name: "DSM 5", votos: 50, feedback: { otimo: 60, bom: 40 } },
    { name: "DSM 6", votos: 45, feedback: { otimo: 55, bom: 45 } },
];

const COLORS = ["#ff0000", "#000000"];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <>
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline={y > cy ? "hanging" : "baseline"}
                style={{ fontSize: "12px"}}
                
            >
                {`${name}`}
            </text>
            <text
                x={x}
                y={y + 15}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline={y > cy ? "hanging" : "baseline"}
                style={{ fontSize: "10px" }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        </>
    );
};

const VtInternaCards = () => {
    return (
        <div className={styles.cardContainer}>
            <Carousel
                showIndicators={false}
                value={data}
                itemTemplate={(item) => (
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span>{item.name}</span>
                            </div>
                            <div className={styles.cardInnerContent}>
                                <div className={styles.votacaoInfoText}>
                                    <p className={styles.totalVotes}>{item.votos}</p>
                                    <span className={styles.votosText}>Votos</span>
                                </div>
                                <div className={styles.pieChartContainer}>
                                    <PieChart width={150} height={110} margin={{ top: 0, right: 25, bottom: 10, left: 0 }}>
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
                )}
                numVisible={4}
                numScroll={2}
            />
        </div>
    );
};

export default VtInternaCards;
