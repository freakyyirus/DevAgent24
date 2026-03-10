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
    const { message, history, type } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const interviewType = type || 'technical';
    const hasGroqKey = !!process.env.GROQ_API_KEY;

    if (hasGroqKey) {
      // ── REAL AI MODE: Use Groq with interviewer agent ──
      const systemPrompt = `${AGENT_PROMPTS.interviewer}

Interview type: ${interviewType}
Guidelines for this ${interviewType} interview:
${interviewType === 'technical' ? '- Focus on data structures, algorithms, system design, coding concepts\n- Ask follow-up questions about time/space complexity\n- Challenge assumptions and probe edge cases' : ''}
${interviewType === 'behavioral' ? '- Use STAR method (Situation, Task, Action, Result)\n- Ask about specific examples and measurable outcomes\n- Probe leadership, teamwork, and conflict resolution' : ''}
${interviewType === 'system_design' ? '- Start high-level, then drill into components\n- Ask about trade-offs, scalability, consistency\n- Cover database design, caching, load balancing' : ''}

Keep responses concise (2-4 sentences). Be conversational but challenging.`;

      // Build message history for context
      const messages = (history || [])
        .slice(-10) // Keep last 10 messages for context window
        .map((msg: { role: string; content: string }) => ({
          role: msg.role === 'interviewer' ? 'assistant' as const : 'user' as const,
          content: msg.content,
        }));

      // Add current message
      messages.push({ role: 'user' as const, content: message });

      const response = await chat(systemPrompt, messages, {
        temperature: 0.8,
        maxTokens: 300,
        model: 'llama-3.1-70b-versatile',
      });

      // Simple scoring based on response length and keywords
      const wordCount = message.split(' ').length;
      const hasExamples = /example|instance|case|scenario/i.test(message);
      const hasTechnicalTerms = /complexity|algorithm|data structure|cache|database|api|scale|distributed/i.test(message);
      const baseScore = 65;
      const lengthBonus = Math.min(wordCount / 10, 10);
      const exampleBonus = hasExamples ? 5 : 0;
      const technicalBonus = hasTechnicalTerms ? 8 : 0;
      const score = Math.min(98, Math.round(baseScore + lengthBonus + exampleBonus + technicalBonus));

      return NextResponse.json({
        response,
        score,
        mode: 'ai',
      });
    } else {
      // ── DEMO MODE: Return contextual responses ──
      const pool = DEMO_RESPONSES[interviewType] || DEMO_RESPONSES.technical;
      const response = pool[Math.floor(Math.random() * pool.length)];

      return NextResponse.json({
        response,
        score: Math.floor(Math.random() * 20) + 70,
        mode: 'demo',
      });
    }
  } catch (error) {
    console.error('Interview API error:', error);
    // Fallback to demo on any error
    const pool = DEMO_RESPONSES.technical;
    return NextResponse.json({
      response: pool[Math.floor(Math.random() * pool.length)],
      score: 75,
      mode: 'demo',
    });
  }
}
