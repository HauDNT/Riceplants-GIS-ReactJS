import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { randomColorsChart } from "../../utils/RandomColorsChart";
import { memo } from "react";

const PieChartDispatchRiceTypes = ({ plainData }) => {
    const data = {
        labels: plainData.map(item => item.riceName),
        datasets: [
            {
                data: plainData.map(item => item.total),
                width: 50,
                height: 50,
                backgroundColor: plainData.map(() => randomColorsChart()),
            },
        ],
    };
    
    return (
        <Doughnut
            className="mt-1-5em"
            data={data}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Biểu đồ sản lượng các loại gạo nhập đã xuất trong kho theo thời gian đã chọn',
                    },
                },
            }}
        />
    )
}

export default memo(PieChartDispatchRiceTypes);