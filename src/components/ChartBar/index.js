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

const data = [
    { name: "DSM 1", votos: 78, feedback: { otimo: 40, bom: 60 } },
    { name: "DSM 2", votos: 65, feedback: { otimo: 50, bom: 50 } },
    { name: "DSM 3", votos: 43, feedback: { otimo: 30, bom: 70 } },
    { name: "DSM 4", votos: 31, feedback: { otimo: 20, bom: 80 } },
    { name: "DSM 5", votos: 50, feedback: { otimo: 60, bom: 40 } },
    { name: "DSM 6", votos: 45, feedback: { otimo: 55, bom: 45 } },
];

const ChartBar = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
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
                    domain={[0, Math.max(...data.map((item) => item.votos)) + 10]}
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
