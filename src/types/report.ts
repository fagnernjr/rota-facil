export interface DailyReport {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  adSpend: number;
  leads: number;
  scheduledDeliveries: number;
  revenue: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReportStore {
  reports: DailyReport[];
  addReport: (report: Omit<DailyReport, 'id' | 'createdAt'>) => Promise<void>;
  updateReport: (id: string, report: Partial<DailyReport>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  getReportsByDate: (date: string) => DailyReport[];
  getReportsByEmployee: (employeeId: string) => DailyReport[];
  loadReports: () => Promise<void>;
}

export interface ReportMetrics {
  totalAdSpend: number;
  totalLeads: number;
  totalScheduledDeliveries: number;
  totalRevenue: number;
  roas: number;
  costPerLead: number;
  conversionRate: number;
}