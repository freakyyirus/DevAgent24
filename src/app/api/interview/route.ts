import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history, type } = await req.json();

    // In production: use Groq API with interviewer agent prompt
    // For demo: return contextual follow-up questions
    const responses: Record<string, string[]> = {
      technical: [
        "That's a good start. Can you elaborate on the time complexity? What would happen with very large inputs?",
        "Interesting approach. How would you handle concurrent access in this scenario?",
        "Let me push back a bit — what if we needed to scale this to millions of users?",
        "Good thinking. Can you compare your approach to using a different data structure?",
      ],
      behavioral: [
        "Thank you for sharing that. What specific actions did YOU take in that situation?",
        "How did the team respond to your approach? Was there any pushback?",
        "If you could do it again, what would you do differently?",
        "That shows great initiative. Tell me about the measurable impact of your actions.",
      ],
      system_design: [
        "Good high-level overview. Let's drill into the database layer — what schema would you use?",
        "How would you handle failover? What if one of your services goes down?",
        "Let's talk about caching. Where would you add cache layers and what strategy would you use?",
        "What about data consistency? Would you use eventual consistency or strong consistency?",
      ],
    };

    const pool = responses[type] || responses.technical;
    const response = pool[Math.floor(Math.random() * pool.length)];

    return NextResponse.json({ response, score: Math.floor(Math.random() * 20) + 70 });
  } catch (error) {
    return NextResponse.json({ error: 'Interview API error' }, { status: 500 });
  }
}
