import developerService from "@/api/developerService";
import type { ReportType } from "@/components/types/interfaces/report/report-types";
import type React from "react";
import { useEffect, useState } from "react";

const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return {
      isTruncated: true,
      text: words.slice(0, wordLimit).join(" ") + "...",
    };
  }
  return {
    isTruncated: false,
    text,
  };
};

const CardReportForCustomer: React.FC<ReportType> = ({
  startWork,
  endWork,
  track,
  report,
  date,
  developerId,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [developer, setDeveloper] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (developerId) {
        const dev = await developerService.findById(developerId);
        setDeveloper(dev.data.name);
      }
    };

    fetchData();
  }, [developerId]);

  const { isTruncated, text: truncatedReport } = truncateText(report, 10);

  return (
    <div className="bg-cardColor rounded-lg flex flex-col gap-2 p-4">
      <div className="justify-around flex gap-2 py-2">
        <div className="ml-2 py-2 pr-4 flex flex-col justify-center items-center border-r-2 border-brown">
          <p>Track</p>
          <p className="text-[20px]">{track}</p>
        </div>
        <div className="p-2 flex flex-col justify-between">
          <p>
            Work time: {startWork} - {endWork}
          </p>
          <p>Date: {date}</p>
          <p>Developer: {developer}</p>
        </div>
      </div>
      <div className="px-2 border-t-2 border-brown mx-2 py-2">
        {isTruncated && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-brown text-white py-1 px-4 rounded-lg hover:bg-darkBrown float-right ml-4"
          >
            More
          </button>
        )}
        <p>{isExpanded ? report : truncatedReport}</p>
      </div>
    </div>
  );
};

export default CardReportForCustomer;
