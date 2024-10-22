"use client";

import workAccountService from "@/api/workAccountService";
import { ResWorkAccWithCustomerTypes } from "@/components/types/interfaces/work_account/res-work-acc-with-customer-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const ClientsOverview = () => {
  const [workAccounts, setWorkAccounts] = useState<
    ResWorkAccWithCustomerTypes[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substr(0, 7)
  );

  useEffect(() => {
    const fetchWorkAccounts = async () => {
      const data = await workAccountService.getBySaleId();
      if (data) {
        setWorkAccounts(data);
      }
    };
    fetchWorkAccounts();
  }, []);

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

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    return 0;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Clients Overview</h1>
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
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="border-collapse border w-full">
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>
            {workAccounts.map((account) => (
              <tr key={account.id}>
                <td className="border p-2 flex justify-center items-center">
                  {account.name}
                </td>
                {Array.from(
                  { length: daysInMonth(selectedMonth) },
                  (_, index) => {
                    const dayDate = new Date(
                      new Date(selectedMonth).getFullYear(),
                      new Date(selectedMonth).getMonth(),
                      index + 1
                    );
                    return (
                      <>
                        <td key={`day-${index}`} className="border p-2">
                          {/* Add any logic here for daily data */}
                        </td>
                        {dayDate.getDay() === 0 && (
                          <td
                            key={`row-${index}`}
                            className="border flex justify-center items-center min-h-[100px]"
                          >
                            <input type="checkbox" />
                          </td>
                        )}
                      </>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsOverview;
