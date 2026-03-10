import { NextRequest, NextResponse } from 'next/server';
import { chat } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const { destination, days, purpose } = await req.json();

    if (!destination || !days || !purpose) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const systemPrompt = `You are an expert travel planner specializing in tech-focused trips.
Generate an itinerary for a trip with the following details:
Destination: ${destination}
Duration: ${days} days
Purpose: ${purpose}

FORMAT: Respond ONLY with a valid JSON object. No other text.
JSON Structure:
{
  "destination": "string",
  "days": [
    {
      "day": number,
      "title": "string",
      "activities": ["string", "string", "string", "string"]
    }
  ]
}

Ensure the activities are specific to the destination and purpose.`;

    const response = await chat(systemPrompt, [], {
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      maxTokens: 2000,
    });

    try {
      // Clean up response in case of markdown blocks
      const jsonContent = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const itinerary = JSON.parse(jsonContent);
      return NextResponse.json(itinerary);
    } catch (e) {
      console.error('JSON parsing error:', e, response);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }
  } catch (error) {
    console.error('Travel Planner API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
