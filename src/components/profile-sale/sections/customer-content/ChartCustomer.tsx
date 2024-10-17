import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ReportType } from '@/components/types/interfaces/report/report-types';
import developerService from '@/api/developerService';

type Datum = {
    track: number;
    developerId: string;
    date: Date;
};

interface ChartCustomerProps {
    reports: ReportType[] | any;
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartCustomer: React.FC<ChartCustomerProps> = ({ reports }) => {
    const [developerNames, setDeveloperNames] = useState<{ [key: string]: string }>({});

    const fetchDevelopers = async () => {
        const developers = await Promise.all(
            reports.map(async (report: Datum) => {
                if (!developerNames[report.developerId]) { 
                    const data = await developerService.findById(report.developerId);
                    return { developerId: report.developerId, name: data ? data.data.name : 'Unknown' };
                }
                return { developerId: report.developerId, name: developerNames[report.developerId] };
            })
        );
        
        const namesObj = developers.reduce((acc, { developerId, name }) => {
            acc[developerId] = name;
            return acc;
        }, {});
        setDeveloperNames((prevNames) => ({ ...prevNames, ...namesObj }));
    };

    useEffect(() => {
        if (reports && reports.length > 0) {
            fetchDevelopers();
        }
    }, [reports]);

    if (!reports || reports.length === 0) return null;

    const labels = reports.map((report: Datum) => report.date);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Track time',
                data: reports.map((report: Datum) => ({
                    x: report.date,
                    y: report.track,
                    developer: developerNames[report.developerId] || report.developerId, 
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Statistic',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) => {
                        const track = tooltipItem.raw.y;
                        const developer = tooltipItem.raw.developer;
                        return `Track: ${track}, Developer: ${developer}`;
                    },
                },
            },
        },
    };

    return (
        <div>
            {reports.length === 0 ? (
                <div className='w-full text-center pt-4'>
                    No reports found
                </div>
            ) : (
                <Bar data={chartData} options={chartOptions} />
            )}
        </div>
    );
};

export default ChartCustomer;
