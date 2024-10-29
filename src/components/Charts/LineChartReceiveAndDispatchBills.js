import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { formatDate } from "../../utils/FormatDate";
import { memo } from "react";

const LineChartReceiveAndDispatchBills = ({ receiveBillsData, dispatchBillsData }) => {
    const labels1 = receiveBillsData.map(bill => formatDate(bill.time));
    const labels2 = dispatchBillsData.map(bill => formatDate(bill.time));
    const uniqueLabels = labels2.filter(label => !labels1.includes(label));
    labels1.push(...uniqueLabels);

    const data1 = receiveBillsData.map(bill => bill.amount);
    const data2 = dispatchBillsData.map(bill => bill.amount);

    const data = {
        labels: labels1,
        datasets: [
            {
                label: 'Nhập lúa',
                data: data1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.3
            },
            {
                label: 'Xuất lúa',
                data: data2,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.3
            },
        ],
    };

    return (
        <Bar
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
                        text: 'Sản lượng gạo đã nhập - xuất',
                    },
                },
            }}
        />
    );
}

export default memo(LineChartReceiveAndDispatchBills);