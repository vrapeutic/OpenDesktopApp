import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const moduleNames = ['Archeeko', 'Viblio', 'GardenDo', 'Rodja', 'Badminton']; // Replace with your actual module names
  // Function to convert "HH:MM" time string to total minutes
  const parseDateTime = (dateTimeString: string): Date => {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  // Function to calculate time difference in minutes
  const calculateTimeDifference = (start: Date, end: Date): number => {
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  };

  // Function to format time spent
  const formatTimeSpent = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? 's' : ''}`;
    }

    if (minutes > 0) {
      if (hours > 0) {
        result += ' and ';
      }
      result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }

    return result || '0 minutes';
  };

  const processCSVDataForHome = (parsedData: string[][]): ModuleData[] => {
    const modules: ModuleData[] = [];
    let currentModule: ModuleData | null = null;
    let moduleStartTime: Date | null = null;
    let moduleEndTime: Date | null = null;

    parsedData.forEach((row) => {
      const dateTimeString = row[0].trim();
      if (moduleNames.includes(row[0].trim())) {
        if (currentModule) {
          currentModule.totalTimeSpent =
            moduleStartTime && moduleEndTime
              ? calculateTimeDifference(moduleStartTime, moduleEndTime)
              : 0;
          currentModule.formattedTimeSpent = formatTimeSpent(
            currentModule.totalTimeSpent
          );
          modules.push(currentModule);
        }
        currentModule = {
          moduleName: row[0].trim(),
          totalTimeSpent: 0,
          formattedTimeSpent: '',
          distractors: [],
          level: parseInt(row[1].trim(), 10),
        };
        moduleStartTime = null;
        moduleEndTime = null;
      } else if (
        currentModule &&
        row[0].trim().toLowerCase() !== 'target starting time' &&
        row[0].trim() !== ''
      ) {
        const currentDateTime = parseDateTime(dateTimeString);
        if (!moduleStartTime) {
          moduleStartTime = currentDateTime;
        }
        moduleEndTime = currentDateTime;

        const distractorName = row[3].trim(); // Assume distractor name is in the third column
        if (
          distractorName &&
          !currentModule.distractors.includes(distractorName)
        ) {
          currentModule.distractors.push(distractorName);
        }
      }
    });

    if (currentModule) {
      currentModule.totalTimeSpent =
        moduleStartTime && moduleEndTime
          ? calculateTimeDifference(moduleStartTime, moduleEndTime)
          : 0;
      currentModule.formattedTimeSpent = formatTimeSpent(
        currentModule.totalTimeSpent
      );
      modules.push(currentModule);
    }

    setModulesForHome(modules);
    return modules;
  };
  const processCSVDataForReport = (parsedData: string[][]): ModuleData[] => {
    const modules: ModuleData[] = [];
    let currentModule: ModuleData | null = null;
    let moduleStartTime: Date | null = null;
    let moduleEndTime: Date | null = null;

    parsedData.forEach((row) => {
      const dateTimeString = row[0].trim();
      if (moduleNames.includes(row[0].trim())) {
        if (currentModule) {
          currentModule.totalTimeSpent =
            moduleStartTime && moduleEndTime
              ? calculateTimeDifference(moduleStartTime, moduleEndTime)
              : 0;
          currentModule.formattedTimeSpent = formatTimeSpent(
            currentModule.totalTimeSpent
          );
          modules.push(currentModule);
        }
        currentModule = {
          moduleName: row[0].trim(),
          totalTimeSpent: 0,
          formattedTimeSpent: '',
          distractors: [],
          level: parseInt(row[1].trim(), 10),
        };
        moduleStartTime = null;
        moduleEndTime = null;
      } else if (
        currentModule &&
        row[0].trim().toLowerCase() !== 'target starting time' &&
        row[0].trim() !== ''
      ) {
        const currentDateTime = parseDateTime(dateTimeString);
        if (!moduleStartTime) {
          moduleStartTime = currentDateTime;
        }
        moduleEndTime = currentDateTime;

        const distractorName = row[3].trim(); // Assume distractor name is in the third column
        if (
          distractorName &&
          !currentModule.distractors.includes(distractorName)
        ) {
          currentModule.distractors.push(distractorName);
        }
      }
    });

    if (currentModule) {
      currentModule.totalTimeSpent =
        moduleStartTime && moduleEndTime
          ? calculateTimeDifference(moduleStartTime, moduleEndTime)
          : 0;
      currentModule.formattedTimeSpent = formatTimeSpent(
        currentModule.totalTimeSpent
      );
      modules.push(currentModule);
    }
    setModulesForReport(modules);
    return modules;
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
