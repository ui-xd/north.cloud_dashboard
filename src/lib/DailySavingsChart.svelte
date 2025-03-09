<script lang="ts">
  import { Bar } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  import type { ChartOptions, Scale, Tick } from "chart.js";

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  interface DetailedSaving {
    date: string;
    service: string;
    amount: number;
  }

  export let data: DetailedSaving[] = [];

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  $: chartData = {
    labels: data?.map((item) => formatDate(item.date)) || [],
    datasets: [
      {
        label: "Daily Savings",
        data: data?.map((item) => item.amount) || [],
        backgroundColor:
          data?.map((item) => {
            // Different color for each service
            switch (item.service) {
              case "EC2":
                return "rgba(126, 87, 194, 0.7)"; // Aurora
              case "S3":
                return "rgba(66, 165, 245, 0.7)"; // Nebula
              case "RDS":
                return "rgba(38, 50, 56, 0.7)"; // Zenix
              case "Lambda":
                return "rgba(120, 144, 156, 0.7)"; // Light
              default:
                return "rgba(126, 87, 194, 0.7)";
            }
          }) || [],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            if (!context.length || !data[context[0].dataIndex]) return "";
            const index = context[0].dataIndex;
            return `${data[index].date} - ${data[index].service}`;
          },
          label: function (context: any) {
            return `Savings: $${context.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Daily Savings by Service",
        color: "rgba(255, 255, 255, 0.9)",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: function (
            this: Scale<any>,
            tickValue: string | number
          ): string {
            return "$" + tickValue;
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
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
  class="chart-container"
  style="position: relative; height:240px; width:100%"
>
  <Bar data={chartData} options={chartOptions} />
</div>

<style>
  .chart-container {
    margin-top: 1rem;
  }
</style>
