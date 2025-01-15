import React, { createContext, useContext, useState } from 'react';

type ModuleData = {
  moduleName: string;
  totalTimeSpent: number;
  formattedTimeSpent: string;
  distractors: string[];
  level: number;
  startTime?: Date;
  endTime?: Date;
};

type CSVContextType = {
  modulesForHome: ModuleData[];
  modulesForReport: ModuleData[];
  setModulesForHome: React.Dispatch<React.SetStateAction<ModuleData[]>>;
  setModulesForReport: React.Dispatch<React.SetStateAction<ModuleData[]>>;
  formatTimeSpent: (totalMinutes: number) => string;
  calculateTimeDifference: (start: Date, end: Date) => number;
  processCSVDataForHome: (parsedData: string[][]) => ModuleData[];
  processCSVDataForReport: (parsedData: string[][]) => ModuleData[];
};

const CSVContext = createContext<CSVContextType | undefined>(undefined);

export const useCSVData = () => {
  const context = useContext(CSVContext);
  if (!context) {
    throw new Error('useCSVData must be used within a ModulesProvider');
  }
  return context;
};

export const CSVProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modulesForHome, setModulesForHome] = useState<ModuleData[]>([]);
  const [modulesForReport, setModulesForReport] = useState<ModuleData[]>([]);
  const moduleNames = ['Archeeko', 'Viblio', 'GardenDo', 'Rodja', 'Badminton'];

  const parseDateTime = (dateTimeString: string): Date => {
    try {
      const [datePart, timePart] = dateTimeString.split(' ');
      const [day, month, year] = datePart.split('/').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    } catch (error) {
      console.error('Error parsing date:', dateTimeString);
      return new Date();
    }
  };

  const calculateTimeDifference = (start: Date, end: Date): number => {
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  };

  const formatTimeSpent = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = '';
    if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) {
      if (hours > 0) result += ' and ';
      result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return result || '0 minutes';
  };

  const processCSVData = (
    parsedData: string[][],
    forHome: boolean
  ): ModuleData[] => {
    const modules: { [key: string]: ModuleData } = {};
    let currentModuleName: string | null = null;

    parsedData.forEach((row, index) => {
      const currentRow = row[0]?.trim();

      // Skip header or empty rows
      if (!currentRow || currentRow.toLowerCase() === 'target starting time') {
        return;
      }

      // Check if this row is a module name
      if (moduleNames.includes(currentRow)) {
        currentModuleName = currentRow;
        if (!modules[currentModuleName]) {
          modules[currentModuleName] = {
            moduleName: currentModuleName,
            totalTimeSpent: 0,
            formattedTimeSpent: '',
            distractors: [],
            level: parseInt(row[1]?.trim() || '0', 10),
            startTime: undefined,
            endTime: undefined,
          };
        }
        return;
      }

      // Process timestamps and distractors for current module
      if (currentModuleName && modules[currentModuleName]) {
        try {
          const timestamp = parseDateTime(currentRow);
          const currentModule = modules[currentModuleName];

          if (!currentModule.startTime || timestamp < currentModule.startTime) {
            currentModule.startTime = timestamp;
          }
          if (!currentModule.endTime || timestamp > currentModule.endTime) {
            currentModule.endTime = timestamp;
          }

          // Add distractor if present
          const distractor = row[3]?.trim();
          if (distractor && !currentModule.distractors.includes(distractor)) {
            currentModule.distractors.push(distractor);
          }
        } catch (error) {
          console.error('Error processing row:', row);
        }
      }
    });

    // Calculate total time spent for each module
    Object.values(modules).forEach((module) => {
      if (module.startTime && module.endTime) {
        module.totalTimeSpent = calculateTimeDifference(
          module.startTime,
          module.endTime
        );
        module.formattedTimeSpent = formatTimeSpent(module.totalTimeSpent);
      }
    });

    const processedModules = Object.values(modules);

    if (forHome) {
      setModulesForHome(processedModules);
    } else {
      setModulesForReport(processedModules);
    }

    return processedModules;
  };

  const processCSVDataForHome = (parsedData: string[][]): ModuleData[] => {
    return processCSVData(parsedData, true);
  };

  const processCSVDataForReport = (parsedData: string[][]): ModuleData[] => {
    return processCSVData(parsedData, false);
  };

  return (
    <CSVContext.Provider
      value={{
        modulesForHome,
        setModulesForHome,
        modulesForReport,
        setModulesForReport,
        formatTimeSpent,
        calculateTimeDifference,
        processCSVDataForHome,
        processCSVDataForReport,
      }}
    >
      {children}
    </CSVContext.Provider>
  );
};
