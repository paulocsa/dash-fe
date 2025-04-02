import React from "react";
import {
    LineChart,
    AreaChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const data = {
    week1: [
        { day: "2024-04-01", percentage: 20 },
        { day: "2024-04-02", percentage: 25 },
        { day: "2024-04-03", percentage: 15 },
        { day: "2024-04-04", percentage: 10 },
        { day: "2024-04-05", percentage: 30 },
        { day: "2024-04-06", percentage: 50 },
        { day: "2024-04-07", percentage: 40 },
    ],
    week2: [
        { day: "2024-04-08", percentage: 40 },
        { day: "2024-04-09", percentage: 55 },
        { day: "2024-04-10", percentage: 5 },
        { day: "2024-04-11", percentage: 60 },
        { day: "2024-04-12", percentage: 35 },
        { day: "2024-04-13", percentage: 45 },
        { day: "2024-04-14", percentage: 25 },
    ],
};

const daysOfWeek = ["seg.", "ter.", "qua.", "qui.", "sex.", "sáb.", "dom."];

const formatDay = (isoDate) => {
    return format(parseISO(isoDate), "eee", { locale: ptBR });
};

const ChartSemanal = () => {
    const combinedData = daysOfWeek.map((day, index) => {
        const week1Data = data.week1[index];
        const week2Data = data.week2[index];

        return {
            day,
            week1: week1Data ? week1Data.percentage : null,
            week2: week2Data ? week2Data.percentage : null,
        };
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                data={combinedData}
                title="Votos por Semana"
                margin={{ top: 15, right: 25, left: -15, bottom: 5 }}
            >
                <defs>
                    <linearGradient id="colorWeek1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B20000" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#B20000" stopOpacity={0.0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="day"
                    style={{ fontSize: "12px" }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    style={{ fontSize: "12px" }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip formatter={(value) => `${value}%`} />
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
                <Area
                    type="monotone"
                    dataKey="week1"
                    stroke="#B20000"
                    fill="url(#colorWeek1)"
                    name="Semana 1"
                    dot={false}
                />
                <Line
                    type="monotone"
                    dataKey="week2"
                    stroke="#A2A2A2"
                    name="Semana 2"
                    strokeDasharray="5 5"
                    dot={false}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ChartSemanal;