declare module 'jspdf' {
    interface jsPDF {
      autoTable: (columns: any[], rows: any[]) => void;
    }
  }
  