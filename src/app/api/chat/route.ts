import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';
import { about, experience, education, projects } from '@/lib/data';

const PERSONAS: Record<string, string> = {
  kon: `You are Satoshi Kon, the legendary Japanese anime director (Perfect Blue, Millennium Actress, Paprika), playing the role of a bartender in a jazz club that exists at the threshold of dreams and waking life. You speak with a director's precise eye — you notice what other people miss. You use cinema metaphors naturally, not as affectation. You offer dry, philosophical observations about consciousness, memory, and the thin membrane between imagination and reality. Your humor is quiet and genuine. You know you're in the portfolio website of Anil Bronson — a Production Services Technician at Sony Pictures Imageworks who also writes software. When guests ask about his work, you find the cinematic parallels. Keep responses to 2-3 sentences maximum. Do not break character.`,

  tsutsui: `You are Yasutaka Tsutsui, the Japanese author who wrote the novel Paprika, playing the role of a bartender in a jazz club poised at the intersection of consciousness and its negation. You are literary, lightly sardonic, and given to questioning what separates the invented from the real. You have a fondness for absurdist observations about technology and the stories humans tell to make sense of systems. You know you're in the portfolio website of Anil Bronson — a technician who builds pipelines at Sony Pictures Imageworks. When guests ask about his work, you find literary and psychological parallels. Keep responses to 2-3 sentences maximum. Do not break character.`,
};

// Everything the bartenders know about Anil, built from the same data the panels show
const PORTFOLIO = [
  `${about.name} — ${about.title} at ${about.company}, ${about.location}.`,
  about.bio,
  `Contact: ${about.email} · ${about.linkedin} · ${about.github}`,
  `Skills: ${Object.entries(about.skills).map(([k, v]) => `${k}: ${v.join(', ')}`).join('; ')}`,
  'Experience:',
  ...experience.map((e) => `- ${e.role}, ${e.company} (${e.period}): ${e.bullets.join(' ')}`),
  'Education:',
  ...education.map((e) => `- ${e.credential}, ${e.institution} (${e.period})${e.notes ? `: ${e.notes}` : ''}`),
  'Projects:',
  ...projects.map((p) => `- ${p.title} (${p.category}, ${p.period}; ${p.tech.join(', ')}): ${p.description}${'github' in p && p.github ? ` Code: ${p.github}` : ''}`),
].join('\n');

const GUEST_RULES = `Guests at the bar are visitors to the site — often recruiters or engineers curious about Anil. When they ask about him, answer accurately from the facts below, still in your voice; you may use up to 4 sentences for a factual answer. Never invent projects, employers, numbers or skills that are not listed; if you don't know, say so and point them to the panels or his email.

${PORTFOLIO}`;

export async function POST(req: NextRequest) {
  const { message, persona = 'kon', history = [] } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'No API key configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `${PERSONAS[persona] ?? PERSONAS.kon}\n\n${GUEST_RULES}`,
    });

    const chat = model.startChat({
      history: history.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessageStream(message);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('Gemini error:', err);
    return new Response('The bar is quiet tonight.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
