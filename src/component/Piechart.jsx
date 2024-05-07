import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const PieChart = ({income,expenses}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  
 

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          //   labels: ['Income', 'Expenses'],
          datasets: [
            {
              data: [income, expenses],
              backgroundColor: ["green", "red"],
              borderColor: "transparent",
              // hoverBackgroundColor: ['#FF6384', '#36A2EB',],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "30%",
        },
      });
    }
  }, [income,expenses]);

  return (
    <canvas ref={chartContainer} className="pie" style={{ width: "200px" }} />
  );
};

export default PieChart;
