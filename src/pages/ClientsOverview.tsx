"use client";

import reportService from "@/api/reportService";
import workAccountService from "@/api/workAccountService";
import { ReportType } from "@/components/types/interfaces/report/report-types";
import { ReportTypeForTable } from "@/components/types/interfaces/report/report-types-for-table";
import { ResWorkAccWithCustomerTypes } from "@/components/types/interfaces/work_account/res-work-acc-with-customer-types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClientsOverview = () => {
  const [workAccounts, setWorkAccounts] = useState<
    ResWorkAccWithCustomerTypes[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substr(0, 7)
  );
  const [checkBoxStates, setCheckBoxStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<ReportType[]>([]);
  const [reportsData, setReportsData] = useState<ReportTypeForTable[]>([]);

  const params = useParams();
  const navigate = useNavigate();

  const daysInMonth = (month: string) => {
    const date = new Date(month);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getDayLabels = (month: string) => {
    const date = new Date(month);
    const labels = [];
    for (let i = 1; i <= daysInMonth(month); i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      labels.push({
        label: `${i} ${day.toLocaleDateString("en-US", { weekday: "short" })}`,
        day,
      });
    }
    return labels;
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    setCheckBoxStates({});
  };

  const handleCheckBoxChange = (dayKey: string) => {
    setCheckBoxStates((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const renderTableHeader = () => {
    const dayLabels = getDayLabels(selectedMonth);
    return (
      <>
        <th className="border p-2">Client</th>
        {dayLabels.map((item, index) => (
          <>
            <th key={`day-${index}`} className="border p-2 min-w-[120px]">
              {item.label}
            </th>
            {item.day.getDay() === 0 && (
              <th key={`eow-${index}`} className="p-2 min-w-[170px]">
                End of Week
              </th>
            )}
          </>
        ))}
      </>
    );
  };

  const customerDataToRender = () => {
    const newReportsData = customers.flatMap((customer) => {
      return customer.map((el: ReportTypeForTable) => {
        return {
          customerId: el.customerId,
          payed: el.income.payed,
          track: el.track,
          date: el.date,
        };
      });
    });

    setReportsData(newReportsData);
  };

  console.log(reportsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataWorkAccounts = await workAccountService.getBySaleId();
        const filteredBySale = dataWorkAccounts.filter(
          (sale) => sale.id === params.id
        );
        if (filteredBySale.length > 0) {
          setWorkAccounts(filteredBySale);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (workAccounts.length > 0) {
        try {
          const firstDate = new Date(selectedMonth);
          firstDate.setDate(1);
          const formattedFirstDate = firstDate.toISOString().split("T")[0];

          const lastDate = new Date(selectedMonth);
          lastDate.setDate(daysInMonth(selectedMonth));
          const formattedLastDate = lastDate.toISOString().split("T")[0];

          const customerPromises = workAccounts[0].customer.map(
            async (customer) => {
              const data = await reportService.getByIdCustomer(
                customer.id,
                formattedFirstDate,
                formattedLastDate
              );
              return data;
            }
          );

          const customersData = await Promise.all(customerPromises);
          setCustomers(customersData);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCustomer();
  }, [workAccounts, selectedMonth]);

  useEffect(() => {
    if (customers.length > 0) {
      customerDataToRender();
    }
  }, [customers]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Clients Overview</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-[30px] flex flex-row justify-between items-center">
            <p className="text-[25px]">Sale: {workAccounts[0]?.name}</p>
            <Button onClick={() => navigate(-1)}>back</Button>
          </div>
          <div className="my-4">
            <label htmlFor="month-select" className="mr-2">
              Select Month:
            </label>
            <Select onValueChange={handleMonthChange} value={selectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, index) => {
                  const month = new Date(new Date().getFullYear(), index)
                    .toISOString()
                    .substr(0, 7);
                  return (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div style={{ overflowY: "auto" }}>
            <table className="border-collapse border w-full">
              <thead>
                <tr>{renderTableHeader()}</tr>
              </thead>
              <tbody>
                {workAccounts.map((account) =>
                  account.customer.map((el) => {
                    const dailyReports = reportsData.filter(
                      (report) => report.customerId === el.id
                    );

                    return (
                      <tr key={el.id}>
                        <td className="border p-2 flex justify-center items-center min-h-[100px]">
                          {el.name}
                        </td>
                        {Array.from(
                          { length: daysInMonth(selectedMonth) },
                          (_, index) => {
                            const dayDate = new Date(
                              new Date(selectedMonth).getFullYear(),
                              new Date(selectedMonth).getMonth(),
                              index + 1
                            );
                            const dayKey = `${el.id}-${index + 1}`;

                            const reportForDay = dailyReports.find((report) => {
                              console.log(
                                report.date,
                                dayDate,
                                "1DA1TE1",
                                new Date(report.date)
                                  .toISOString()
                                  .split("T")[0] ===
                                  dayDate.toISOString().split("T")[0]
                              );
                              return (
                                new Date(report.date)
                                  .toISOString()
                                  .split("T")[0] ===
                                dayDate.toISOString().split("T")[0]
                              );
                            });

                            console.log(reportForDay, "MAYBE HERE");
                            return (
                              <>
                                <td key={`day-${index}`} className="border p-2">
                                  {reportForDay ? (
                                    <>
                                      <p>Paid: {reportForDay.payed}</p>
                                      <span>Tracked: {reportForDay.track}</span>
                                    </>
                                  ) : (
                                    "No Report"
                                  )}
                                </td>

                                {dayDate.getDay() === 0 && (
                                  <td
                                    key={`checkbox-${dayKey}`}
                                    className="border flex justify-center items-center min-h-[100px]"
                                  >
                                    <label className="flex items-center">
                                      Paid:
                                      <input
                                        type="checkbox"
                                        checked={
                                          checkBoxStates[dayKey] || false
                                        }
                                        onChange={() =>
                                          handleCheckBoxChange(dayKey)
                                        }
                                        className="ml-2"
                                      />
                                    </label>
                                  </td>
                                )}
                              </>
                            );
                          }
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientsOverview;
