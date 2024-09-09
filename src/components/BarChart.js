import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const BarChart = ({ projectData }) => {
    const barData = {
      labels: projectData.map((p) => p.id),
      datasets: [
        {
          label: 'Total Budget',
          data: projectData.map((p) => p.budgetStatus.totalBudget),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Spent to Date',
          data: projectData.map((p) => p.budgetStatus.spentToDate),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  
    return (
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>
    );
  };
  
  export default BarChart;
  