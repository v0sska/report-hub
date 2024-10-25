export interface ReportType {
  id: string;
  created_at: string;
  startWork: string;
  endWork: string;
  track: string;
  report: string;
  date: string;
  customerId: string;
  developerId: string;
  income: {
    id: string;
    payed: string;
    date: string;
    reportId: string;
    isPay: boolean;
  };
}
