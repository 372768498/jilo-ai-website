'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'

interface ExportReportProps {
  report: {
    title: string;
    industry: string;
    date: string;
    highlights: string[];
    opportunities: string[];
    risks: string[];
    recommendations: string[];
    marketSize?: string;
    growthRate?: string;
    keyPlayers?: string[];
    regulations?: string[];
    trends?: string[];
  };
  reportElementRef: React.RefObject<HTMLDivElement>;
}

export default function ExportReport({ report, reportElementRef }: ExportReportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!reportElementRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportElementRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${report.title}_${report.date}.pdf`);
    } catch (error) {
      console.error('PDF导出失败:', error);
      alert('PDF导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      const workbook = XLSX.utils.book_new();
      
      // 创建报告概览工作表
      const overviewData = [
        ['报告标题', report.title],
        ['行业', report.industry],
        ['生成日期', report.date],
        ['', ''],
        ['市场信息', ''],
        ['市场规模', report.marketSize || 'N/A'],
        ['增长率', report.growthRate || 'N/A'],
        ['', ''],
        ['行业亮点', ''],
        ...report.highlights.map(highlight => ['', highlight]),
        ['', ''],
        ['市场机会', ''],
        ...report.opportunities.map(opportunity => ['', opportunity]),
        ['', ''],
        ['潜在风险', ''],
        ...report.risks.map(risk => ['', risk]),
        ['', ''],
        ['策略建议', ''],
        ...report.recommendations.map(recommendation => ['', recommendation])
      ];
      
      const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(workbook, overviewSheet, '报告概览');
      
      // 如果有主要玩家数据，创建竞争对手工作表
      if (report.keyPlayers && report.keyPlayers.length > 0) {
        const competitorData = [
          ['主要玩家'],
          ...report.keyPlayers.map(player => [player])
        ];
        const competitorSheet = XLSX.utils.aoa_to_sheet(competitorData);
        XLSX.utils.book_append_sheet(workbook, competitorSheet, '主要玩家');
      }
      
      // 如果有趋势数据，创建趋势工作表
      if (report.trends && report.trends.length > 0) {
        const trendData = [
          ['行业趋势'],
          ...report.trends.map(trend => [trend])
        ];
        const trendSheet = XLSX.utils.aoa_to_sheet(trendData);
        XLSX.utils.book_append_sheet(workbook, trendSheet, '行业趋势');
      }
      
      // 如果有法规数据，创建法规工作表
      if (report.regulations && report.regulations.length > 0) {
        const regulationData = [
          ['重要法规'],
          ...report.regulations.map(regulation => [regulation])
        ];
        const regulationSheet = XLSX.utils.aoa_to_sheet(regulationData);
        XLSX.utils.book_append_sheet(workbook, regulationSheet, '重要法规');
      }
      
      XLSX.writeFile(workbook, `${report.title}_${report.date}.xlsx`);
    } catch (error) {
      console.error('Excel导出失败:', error);
      alert('Excel导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToText = () => {
    setIsExporting(true);
    try {
      let textContent = `${report.title}\n`;
      textContent += `生成日期: ${report.date}\n`;
      textContent += `行业: ${report.industry}\n\n`;
      
      if (report.marketSize) textContent += `市场规模: ${report.marketSize}\n`;
      if (report.growthRate) textContent += `增长率: ${report.growthRate}\n\n`;
      
      textContent += '行业亮点:\n';
      report.highlights.forEach((highlight, index) => {
        textContent += `${index + 1}. ${highlight}\n`;
      });
      
      textContent += '\n市场机会:\n';
      report.opportunities.forEach((opportunity, index) => {
        textContent += `${index + 1}. ${opportunity}\n`;
      });
      
      textContent += '\n潜在风险:\n';
      report.risks.forEach((risk, index) => {
        textContent += `${index + 1}. ${risk}\n`;
      });
      
      textContent += '\n策略建议:\n';
      report.recommendations.forEach((recommendation, index) => {
        textContent += `${index + 1}. ${recommendation}\n`;
      });
      
      if (report.keyPlayers && report.keyPlayers.length > 0) {
        textContent += '\n主要玩家:\n';
        report.keyPlayers.forEach((player, index) => {
          textContent += `${index + 1}. ${player}\n`;
        });
      }
      
      if (report.trends && report.trends.length > 0) {
        textContent += '\n行业趋势:\n';
        report.trends.forEach((trend, index) => {
          textContent += `${index + 1}. ${trend}\n`;
        });
      }
      
      if (report.regulations && report.regulations.length > 0) {
        textContent += '\n重要法规:\n';
        report.regulations.forEach((regulation, index) => {
          textContent += `${index + 1}. ${regulation}\n`;
        });
      }
      
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${report.title}_${report.date}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('文本导出失败:', error);
      alert('文本导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            导出中...
          </>
        ) : (
          <>
            📄 PDF
          </>
        )}
      </button>
      
      <button
        onClick={exportToExcel}
        disabled={isExporting}
        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            导出中...
          </>
        ) : (
          <>
            📊 Excel
          </>
        )}
      </button>
      
      <button
        onClick={exportToText}
        disabled={isExporting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            导出中...
          </>
        ) : (
          <>
            📝 文本
          </>
        )}
      </button>
    </div>
  )
}
