import { memo, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { randomColorsChart } from "../../utils/RandomColorsChart";

const PieChartReceiveRiceTypes = ({ plainData }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData({
            labels: plainData.map(item => item.riceName),
            datasets: [
                {
                    data: plainData.map(item => item.total),
                    width: 50,
                    height: 50,
                    backgroundColor: plainData.map(() => randomColorsChart()),
                },
            ],
        });
    }, [plainData]);

    return (
        data &&
        <Doughnut
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
                        text: 'Biểu đồ sản lượng các loại gạo nhập đã nhập trong kho theo thời gian đã chọn',
                    },
                },
            }}
        />
    )
}

export default memo(PieChartReceiveRiceTypes);