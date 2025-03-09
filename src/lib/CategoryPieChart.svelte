<script lang="ts">
  import { Pie } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  interface SavingsCategory {
    service: string;
    savings: number;
  }

  export let data: SavingsCategory[] = [];

  $: chartData = {
    labels: data?.map((item) => item.service) || [],
    datasets: [
      {
        label: "Savings by Service",
        data: data?.map((item) => item.savings) || [],
        backgroundColor: [
          "rgba(126, 87, 194, 0.7)", // Aurora
          "rgba(66, 165, 245, 0.7)", // Nebula
          "rgba(38, 50, 56, 0.7)", // Zenix
          "rgba(120, 144, 156, 0.7)", // Light variant
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      title: {
        display: true,
        text: "Savings by Category",
        color: "rgba(255, 255, 255, 0.9)",
        font: {
          size: 16,
        },
      },
    },
  };
</script>

<div
  class="chart-container"
  style="position: relative; height:240px; width:100%"
>
  <Pie data={chartData} options={chartOptions} />
</div>

<style>
  .chart-container {
    margin-top: 1rem;
  }
</style>
