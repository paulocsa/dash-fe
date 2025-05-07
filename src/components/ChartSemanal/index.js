'use client';
import React from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import styles from "./ChartSemanal.module.css";

const ChartSemanal = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <span className={styles.title}>Votos - Semana 1</span>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: -20 }}>
            <defs>
              <linearGradient id="colorWeek1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B20000" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#B20000" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" style={{ fontSize: "12px" }} axisLine={false} tickLine={false} />
            <YAxis style={{ fontSize: "12px" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend
              wrapperStyle={{ fontSize: "12px", top: 0, left: 0, lineHeight: "15px" }}
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
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSemanal;
