import { create } from 'zustand';
import { DailyReport, ReportStore } from '../types/report';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const REPORTS_COLLECTION = 'reports';

export const useReportStore = create<ReportStore>((set, get) => ({
  reports: [],

  addReport: async (report) => {
    const newReport: DailyReport = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, REPORTS_COLLECTION), newReport);
    
    set((state) => ({
      reports: [...state.reports, { ...newReport, id: docRef.id }],
    }));
  },

  updateReport: async (id, updates) => {
    const reportRef = doc(db, REPORTS_COLLECTION, id);
    await updateDoc(reportRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? { ...report, ...updates } : report
      ),
    }));
  },

  deleteReport: async (id) => {
    await deleteDoc(doc(db, REPORTS_COLLECTION, id));
    
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    }));
  },

  getReportsByDate: (date) => {
    return get().reports.filter((report) => report.date === date);
  },

  getReportsByEmployee: (employeeId) => {
    return get().reports.filter((report) => report.employeeId === employeeId);
  },

  loadReports: async () => {
    const querySnapshot = await getDocs(collection(db, REPORTS_COLLECTION));
    const reports = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DailyReport[];
    
    set({ reports });
  },
}));