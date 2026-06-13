import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import type { Alarms } from "../../entities/Alarms/Alarms";

const getFormattedDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "dd.MM.yyyy HH:mm:ss");
  } catch {
    return dateString;
  }
};

export const exportAlarmsToCsv = (alarms: Alarms[]) => {
  const headers = ["Severity", "NE_ID", "Message", "Created At"];

  const csvRows = alarms.map((alarm) => {
    return [
      alarm.severity,
      alarm.ne_id,
      alarm.message ? alarm.message.replace(/"/g, '""') : "",
      getFormattedDate(alarm.created_at),
    ]
      .map((val) => `"${val}"`)
      .join(",");
  });

  const csvContent = [headers.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `alarms_${format(new Date(), "yyyy-MM-dd_HH-mm")}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportAlarmsToPdf = (alarms: Alarms[]) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text("Alarms Report", 14, 22);

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${format(new Date(), "dd.MM.yyyy HH:mm")}`, 14, 30);

  doc.text(`Total Alarms: ${alarms.length}`, 14, 36);

  const criticalCount = alarms.filter((a) => a.severity === "critical").length;
  const majorCount = alarms.filter((a) => a.severity === "major").length;
  const warningCount = alarms.filter((a) => a.severity === "warning").length;

  doc.text(
    `Critical: ${criticalCount} | Major: ${majorCount} | Warning: ${warningCount}`,
    14,
    42,
  );

  const tableData = alarms.map((alarm) => [
    alarm.severity ? alarm.severity.toUpperCase() : "UNKNOWN",
    alarm.ne_id || "",
    alarm.message || "",
    getFormattedDate(alarm.created_at),
  ]);

  autoTable(doc, {
    startY: 50,
    head: [["Severity", "NE_ID", "Message", "Created At"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [66, 103, 177] },
    styles: { fontSize: 10, cellPadding: 3 },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        const val = data.cell.raw as string;
        if (val === "CRITICAL") {
          data.cell.styles.textColor = [220, 53, 69];
          data.cell.styles.fontStyle = "bold";
        } else if (val === "MAJOR") {
          data.cell.styles.textColor = [253, 126, 20];
          data.cell.styles.fontStyle = "bold";
        } else if (val === "WARNING") {
          data.cell.styles.textColor = [255, 193, 7];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  doc.save(`alarms_report_${format(new Date(), "yyyy-MM-dd_HH-mm")}.pdf`);
};
