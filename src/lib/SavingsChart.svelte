<script lang="ts">
  import { Line } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  interface SavingsTrendItem {
    month: string;
    savings: number;
  }

  export let data: SavingsTrendItem[] = [];
  let hovered = false;

  $: chartData = {
    labels: data?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Monthly Savings",
        data: data?.map((item) => item.savings) || [],
        borderColor: "#7E57C2", // Aurora color
        backgroundColor: "rgba(126, 87, 194, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  $: chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: `rgba(255, 255, 255, ${hovered ? 0.7 : 0.1})`,
        },
        grid: {
          color: `rgba(255, 255, 255, ${hovered ? 0.01 : 0})`,
        },
      },
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };
</script>

<div
  class="min-h-[260px] max-h-[50%]"
  role="figure"
  aria-label="Monthly savings trend chart"
  on:mouseenter={() => {
    hovered = true;
  }}
  on:mouseleave={() => {
    hovered = false;
  }}
>
  <Line data={chartData} options={chartOptions} />
</div>
