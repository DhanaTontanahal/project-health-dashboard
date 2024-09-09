import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const PieChart = ({ projectData }) => {
    const pieData = {
      labels: projectData.map((p) => p.id),
      datasets: [
        {
          label: 'Budget Remaining',
          data: projectData.map((p) => p.budgetStatus.budgetRemaining),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ],
    };
  
    return (
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Pie data={pieData} />
      </div>
    );
  };
  
  export default PieChart;
  