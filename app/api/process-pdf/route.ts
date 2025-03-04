// app/api/process-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Instead of using pdf-parse, we'll create a simple mock response
// In a real application, you'd want to use a different PDF parsing library
// or handle the PDF processing differently

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();

    // Get the file from the form data
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({
        error: 'No file provided'
      }, { status: 400 });
    }

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json({
        error: 'Only PDF files are allowed'
      }, { status: 400 });
    }

    // Log file information
    console.log('Received file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Instead of actually parsing the PDF, return a mock response
    // In a real application, you'd want to use a different PDF parsing library
    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileSize: file.size,
      message: 'Resume uploaded successfully',
      mockData: {
        // This is mock data that would normally come from parsing the PDF
        wordCount: 1250,
        characterCount: 7500,
        pageCount: 2,
        textPreview: "This is a mock preview of the resume text. In a real application, this would be the actual text extracted from the PDF file."
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({
      error: 'Server error processing request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}