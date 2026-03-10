import { NextRequest, NextResponse } from 'next/server';
import { chat, AGENT_PROMPTS } from '@/lib/groq';

const DEMO_RESPONSES: Record<string, string[]> = {
  technical: [
    "That's a good start. Can you elaborate on the time complexity? What would happen with very large inputs?",
    "Interesting approach. How would you handle concurrent access in this scenario?",
    "Let me push back a bit — what if we needed to scale this to millions of users?",
    "Good thinking. Can you compare your approach to using a different data structure?",
    "Tell me about a time you optimized a critical path in production. What was the bottleneck?",
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

export async function POST(req: NextRequest) {
  try {
    const { history, type } = await req.json();

    if (!history || !history.length) {
      return NextResponse.json({ error: 'Message history is required' }, { status: 400 });
    }

    const lastMessage = history[history.length - 1];
    const userMessage = lastMessage.content;
    const interviewType = type || 'technical';
    const hasGroqKey = !!process.env.GROQ_API_KEY;

    // Check if the interview should end (e.g. after 6-8 questions or if user asks for results)
    const questionCount = history.filter((m: any) => m.role === 'interviewer').length;
    const isReadyToEnd = questionCount >= 6 || userMessage.toLowerCase().includes('end interview') || userMessage.toLowerCase().includes('results');

    if (hasGroqKey) {
      // ── REAL AI MODE ──
      
      if (isReadyToEnd) {
        // Generate final score and feedback report
        const reportPrompt = `You are a Senior Staff Engineer. You just finished conducting a ${interviewType} interview.
Review the following transcript and provide:
1. A numerical score out of 100 based on technical accuracy, communication, and depth.
2. 3 specific strengths.
3. 3 areas for improvement.
4. A brief wrap-up message.

FORMAT: Respond ONLY with a JSON object like this:
{ "score": number, "feedback": "string", "strengths": ["string"], "weaknesses": ["string"] }`;

        const messages = history.map((msg: any) => ({
          role: msg.role === 'interviewer' ? 'assistant' as const : 'user' as const,
          content: msg.content,
        }));

        const reportResponse = await chat(reportPrompt, messages, {
          temperature: 0.3,
          model: 'llama-3.1-70b-versatile',
        });

        try {
          const report = JSON.parse(reportResponse);
          return NextResponse.json(report);
        } catch (e) {
          // Fallback if AI doesn't return clean JSON
          return NextResponse.json({
            score: 75,
            feedback: "Interview concluded. You demonstrated a solid understanding of core concepts, though some edge cases could be handled with more precision.",
            mode: 'ai_fallback'
          });
        }
      }

      const systemPrompt = `${AGENT_PROMPTS.interviewer}
Interview type: ${interviewType}
Current Question Count: ${questionCount}/6

Guidelines:
${interviewType === 'technical' ? '- Focus on data structures, algorithms, system design\n- Ask follow-up questions about time/space complexity' : ''}
${interviewType === 'behavioral' ? '- Use STAR method\n- Probe leadership and conflict resolution' : ''}
${interviewType === 'system_design' ? '- Start high-level, then drill into components' : ''}

Keep responses concise (1-3 sentences). Ask the next question. If the user finished answering, move to a new relevant topic.`;

      const messages = history.slice(-8).map((msg: any) => ({
        role: msg.role === 'interviewer' ? 'assistant' as const : 'user' as const,
        content: msg.content,
      }));

      const reply = await chat(systemPrompt, messages, {
        temperature: 0.7,
        maxTokens: 250,
        model: 'llama-3.1-70b-versatile',
      });

      return NextResponse.json({ reply, mode: 'ai' });
    } else {
      // ── DEMO MODE ──
      if (isReadyToEnd) {
        return NextResponse.json({
          score: 82,
          feedback: "Great work! You handled the technical questions well. Focus more on articulating your thought process for distributed systems.",
          strengths: ["Clean logic", "Good complexity analysis"],
          weaknesses: ["Communication speed"],
          mode: 'demo'
        });
      }

      const pool = DEMO_RESPONSES[interviewType] || DEMO_RESPONSES.technical;
      const reply = pool[Math.floor(Math.random() * pool.length)];

      return NextResponse.json({ reply, mode: 'demo' });
    }
  } catch (error) {
    console.error('Interview API error:', error);
    return NextResponse.json({
      reply: "I'm experiencing a temporary glitch in our link. Let's continue — can you repeat your last point?",
      mode: 'error'
    });
  }
}
