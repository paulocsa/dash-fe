import { useState } from "react";
import styles from "./ContainerChart.module.css";


function ContainerChart({props}) {
    return(
        <div className={styles.containerChart}>
                {props}
        </div>
    );
}
export default ContainerChart;
