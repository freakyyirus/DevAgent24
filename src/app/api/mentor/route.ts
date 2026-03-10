import { NextRequest, NextResponse } from 'next/server';
import { chat, AGENT_PROMPTS } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const { code, language, instruction } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const hasGroqKey = !!process.env.GROQ_API_KEY;

    if (hasGroqKey) {
      // ── REAL AI MODE ──
      const systemPrompt = `${AGENT_PROMPTS.mentor}
      
The user is currently writing ${language} code. 
They have requested a hint or guidance.
Here is their current code:
\`\`\`${language}
${code}
\`\`\`

Provide a short, contextual hint. DO NOT write the exact solution for them. Point them in the right direction (e.g., mention a specific method, point out a syntax error, or suggest a data structure approach). Keep the response under 3 sentences.`;

      const response = await chat(systemPrompt, [{ role: 'user', content: instruction || 'I need a hint for this code.' }], {
        temperature: 0.6,
        maxTokens: 150,
        model: 'llama-3.1-70b-versatile',
      });

      return NextResponse.json({ hint: response, mode: 'ai' });
    } else {
      // ── DEMO MODE ──
      const hints = [
        "Take a look at how you're iterating through the array. Could a pointer approach be more efficient here?",
        "It seems like you might be missing a base case in your recursive function. What happens when the input is empty?",
        "Consider using a Hash Map (Dictionary) to cache the results you've already seen. That will drop the time complexity to O(N).",
        "Check line 4. Are you sure that variable is within scope when you try to return it?",
      ];
      const hint = hints[Math.floor(Math.random() * hints.length)];
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      return NextResponse.json({ hint, mode: 'demo' });
    }
  } catch (error) {
    console.error('Mentor API error:', error);
    return NextResponse.json({ 
      hint: "I'm having trouble analyzing your code right now. Try reviewing your variable assignments.", 
      mode: 'error' 
    });
  }
}
