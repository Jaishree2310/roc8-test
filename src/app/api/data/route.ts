import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { ParseResult, ParseError, ParseConfig } from 'papaparse';

interface DataRow {
  Age: string;
  Gender: string;
  Day: string;
  [key: string]: string; 
}

async function loadData(): Promise<DataRow[]> {
  try {
    const filePath = path.join(process.cwd(), 'src/public', 'data.csv');
    
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    return new Promise((resolve, reject) => {
      Papa.parse<DataRow>(fileContent, {
        header: true,
        complete: (results: Papa.ParseResult<DataRow>) => resolve(results.data),
        error: (error: Papa.ParseError) => reject(error),
        skipEmptyLines: true
      } as Papa.ParseConfig<DataRow>);
    });
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ageGroup = searchParams.get('ageGroup');
    const gender = searchParams.get('gender');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let data = await loadData();

    if (ageGroup) {
      const [minAge, maxAge] = ageGroup.split('-').map(Number);
      data = data.filter((item) => {
        const age = item.Age.split('-').map(Number);
        return age[0] >= minAge && age[1] <= maxAge;
      });
    }

    if (gender) {
      data = data.filter((item) => 
        item.Gender.toLowerCase() === gender.toLowerCase()
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      data = data.filter((item) => {
        const date = new Date(item.Day);
        return date >= start && date <= end;
      });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
}