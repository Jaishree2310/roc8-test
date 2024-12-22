// types/chart.ts

export interface DataPoint {
    Day: string;
    Age: string;
    Gender: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
  }
  
  export interface FilterState {
    ageGroup: string;
    gender: string;
    startDate: string;
    endDate: string;
  }
  
  export interface ChartDataPoint {
    feature: string;
    timeSpent: number;
  }
  
  export interface FilterProps {
    onFilterChange: (filters: FilterState) => void;
  }
  
  export interface BarChartProps {
    data: DataPoint[];
    onBarClick: (entry: any, index: number) => void;
  }
  
  export interface LineChartProps {
    data: DataPoint[];
  }