import { NextResponse } from 'next/server';
import { PropertyContractSchema } from '../../schemas/property';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/properties.json');

function getStoredProperties() {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(fileData);
}

// GET /api/properties - Retrieve all property listings
export async function GET() {
  try {
    const properties = getStoredProperties();
    return NextResponse.json({ success: true, data: properties }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read property data.' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create and validate a new property listing
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Enforce runtime data contract validation
    const parseResult = PropertyContractSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data Contract Violation',
          errors: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Append valid record to JSON data file
    const existingProperties = getStoredProperties();
    existingProperties.push(parseResult.data);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingProperties, null, 2));

    return NextResponse.json(
      { success: true, data: parseResult.data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body or server error.' },
      { status: 400 }
    );
  }
}