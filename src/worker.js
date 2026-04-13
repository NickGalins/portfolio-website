// =============================================================================
// CLOUDFLARE WORKER — API proxy for Interactive Demos
// =============================================================================
// Routes:
//   /api/style-check → Style Guide Editor (Anthropic Claude)
//   /api/chat        → GskiFlix Support Chatbot (Anthropic Claude)
// Everything else falls through to static assets (Eleventy _site/)
// =============================================================================

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';
const FALLBACK_MODEL = 'claude-haiku-4-5-20251001';
const MAX_INPUT_LENGTH = 2000;

// ---------------------------------------------------------------------------
// Microsoft Writing Style Guide rules, organized by content type
// ---------------------------------------------------------------------------

const SHARED_RULES = `
## Core Microsoft Style Guide Principles
1. **Use bigger ideas, fewer words.** Shorter is always better. Cut every excess word.
2. **Write like you speak.** Read your text aloud. If it sounds stiff or formal, rewrite it.
3. **Project friendliness.** Use contractions: it's, you'll, you're, we're, let's.
4. **Get to the point fast.** Lead with what's most important. Front-load keywords for scanning.
5. **Sentence-style capitalization.** Capitalize only the first word and proper nouns. Never Use Title Case Like This.
6. **Skip end punctuation** on headings, UI labels, and short list items (three or fewer words).
7. **Use the Oxford comma.** In lists of three or more: "Android, iOS, and Windows" not "Android, iOS and Windows."
8. **No spaces around em dashes.** Use "pipelines—logical groups" not "pipelines — logical groups."
9. **Revise weak writing.** Start with verbs. Cut "you can," "there is," "there are," "please," and "in order to."
10. **Use active voice.** "Save the file" not "The file should be saved." Address the user as "you."
`;

const CONTENT_TYPE_RULES = {
  'error-message': `
## Error Message Guidelines (Microsoft Style Guide)
- **Don't blame the user.** Say "Something went wrong" not "You did something wrong."
- **Be specific about what happened** and what the user can do next. Every error needs a clear next step.
- **Use plain language.** "Can't connect to the server" not "HTTP 503 Service Unavailable."
- **Keep it short.** One to two sentences max. Lead with the problem, follow with the action.
- **Don't use "Oops," "Uh oh," or cutesy language.** Be direct and helpful, not playful.
- **Don't use "please."** Just tell the user what to do: "Try again" not "Please try again."
- **Don't say "Error" or "Error occurred."** Describe the actual problem.
- **Use sentence-style capitalization** for the error text.
- **Don't use exclamation marks** in error messages.
- **Don't use technical jargon** unless the audience is developers. Avoid error codes in user-facing copy.
`,

  'ui-label': `
## UI Label & Button Text Guidelines (Microsoft Style Guide)
- **Use sentence-style capitalization.** "Save changes" not "Save Changes."
- **Keep labels short.** One to three words for buttons. Be ruthlessly concise.
- **Start buttons with a verb.** "Save," "Delete," "Create account" — not "Saving" or "Your account."
- **Be specific.** "Save changes" is better than "OK." "Delete project" is better than "Delete."
- **Don't use "Click here"** or "Click." Use the action: "Learn more" or "See details."
- **Avoid jargon and abbreviations** unless space-constrained and the audience knows them.
- **Don't use periods** on buttons, labels, menu items, or headings.
- **Don't use ampersands (&).** Write "and" unless space is extremely limited.
- **Use parallel construction** in groups of related labels or menu items.
- **Toggle labels** should describe what the setting does, not the current state: "Show notifications" not "Notifications are on."
`,

  'help-documentation': `
## Help Documentation Guidelines (Microsoft Style Guide)
- **Use second person ("you").** Address the reader directly: "You can save..." not "Users can save..."
- **Use active voice.** "Select the file" not "The file can be selected."
- **Write in present tense.** "The dialog box appears" not "The dialog box will appear."
- **Use numbered steps for procedures.** Start each step with a verb. One action per step.
- **Don't use "please" or "kindly."** Just tell the user what to do.
- **Front-load important info.** Put the goal before the method: "To save your work, select File > Save" not "Select File > Save to save your work."
- **Use bold for UI elements** the user interacts with: "Select **Save**."
- **Don't hedge.** "Select the file" not "You might want to select the file."
- **Keep paragraphs short.** Three to five sentences max. Use headings and lists to break up walls of text.
- **Define acronyms on first use.** Write the full phrase, then the acronym in parentheses.
`
};

// ---------------------------------------------------------------------------
// Build the system prompt for a given content type
// ---------------------------------------------------------------------------

function buildSystemPrompt(contentType) {
  const typeRules = CONTENT_TYPE_RULES[contentType] || '';

  return `You are a Microsoft Style Guide expert editor. Your job is to revise copy to conform to the Microsoft Writing Style Guide and explain every change you make.

${SHARED_RULES}
${typeRules}

## Your Task
1. Revise the user's copy to conform to the Microsoft Writing Style Guide rules above.
2. For each change, cite the specific rule and explain why the original violated it.
3. If the copy already conforms to the style guide, say so — don't make changes for the sake of it.

## Response Format
Respond with valid JSON only. No markdown, no code fences, no explanation outside the JSON.

{
  "revised": "The complete rewritten copy.",
  "changes": [
    {
      "original": "The exact phrase you changed",
      "revised": "What you changed it to",
      "rule": "Short rule name (e.g., 'Active voice', 'Sentence-style capitalization')",
      "explanation": "One sentence explaining why this change was needed per the Microsoft Style Guide."
    }
  ],
  "summary": "One to two sentence overall assessment of the copy quality and key issues found."
}

If the copy is already style-guide compliant, return:
{
  "revised": "(same as input)",
  "changes": [],
  "summary": "This copy already follows the Microsoft Writing Style Guide. No changes needed."
}`;
}

// ---------------------------------------------------------------------------
// Handle the /api/style-check POST endpoint
// ---------------------------------------------------------------------------

async function handleStyleCheck(request, env) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  const { contentType, text } = body;

  // Validate content type
  if (!CONTENT_TYPE_RULES[contentType]) {
    return Response.json(
      { error: `Invalid content type. Use: ${Object.keys(CONTENT_TYPE_RULES).join(', ')}` },
      { status: 400 }
    );
  }

  // Validate text
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return Response.json({ error: 'Text is required' }, { status: 400 });
  }

  if (text.length > MAX_INPUT_LENGTH) {
    return Response.json(
      { error: `Text too long. Maximum ${MAX_INPUT_LENGTH} characters.` },
      { status: 400 }
    );
  }

  // Check for API key
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'API key not configured. Add ANTHROPIC_API_KEY to Worker environment variables.' },
      { status: 500 }
    );
  }

  // Call Anthropic API with retry + fallback model
  try {
    const systemPrompt = buildSystemPrompt(contentType);
    const userMessage = `Content type: ${contentType}\n\nCopy to review:\n${text.trim()}`;

    // Try primary model (Sonnet) with retries, then fall back to Haiku
    const models = [MODEL, MODEL, FALLBACK_MODEL];
    let anthropicResponse;
    let lastStatus;

    for (let attempt = 0; attempt < models.length; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, 1000));
      }

      anthropicResponse = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: models[attempt],
          max_tokens: 2048,
          messages: [{ role: 'user', content: userMessage }],
          system: systemPrompt,
        }),
      });

      lastStatus = anthropicResponse.status;

      if (lastStatus !== 529 && lastStatus !== 429) break;
      console.log(`${models[attempt]} returned ${lastStatus}, attempt ${attempt + 1}/${models.length}`);
    }

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('Anthropic API error:', lastStatus, errorText);

      if (lastStatus === 401) {
        return Response.json(
          { error: 'API authentication failed. The API key may be invalid or expired.' },
          { status: 502 }
        );
      }
      if (lastStatus === 429) {
        return Response.json(
          { error: 'Rate limit reached. Wait a moment and try again.' },
          { status: 429 }
        );
      }
      if (lastStatus === 529) {
        return Response.json(
          { error: 'The AI service is temporarily overloaded. Try again in a few seconds.' },
          { status: 502 }
        );
      }

      return Response.json(
        { error: 'Style check service is temporarily unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const anthropicData = await anthropicResponse.json();
    const content = anthropicData.content?.[0]?.text;

    if (!content) {
      return Response.json(
        { error: 'Received empty response from style checker.' },
        { status: 502 }
      );
    }

    // Parse the JSON from Claude's response
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      // If Claude didn't return valid JSON, try to extract it
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        return Response.json(
          { error: 'Style checker returned an unexpected format. Please try again.' },
          { status: 502 }
        );
      }
    }

    return Response.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Worker error:', err);
    return Response.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// GskiFlix Support Chatbot — system prompt and handler
// ---------------------------------------------------------------------------

const MAX_CHAT_TURNS = 20;

const CHATBOT_SYSTEM_PROMPT = `You are a friendly customer support agent for GskiFlix, a fictional streaming service. Your name is Gski.

## Voice & Tone
- Casual and conversational — like a helpful friend, not a corporate script
- Warm but efficient — empathetic without being over-the-top
- Light humor is okay when the mood is light, but never when someone is frustrated about money or access
- Direct — get to the solution, don't over-explain
- Use "you/your" naturally, avoid jargon

## Scenarios You Handle
You help with these common support issues:

1. **Login / Account Access** — forgotten password, account locked, forgotten email
   - Walk through password reset steps
   - Ask if they're using the right email
   - Suggest checking spam for reset emails
   - Offer account recovery if email is unknown

2. **Billing / Unexpected Charges** — charged after cancelling, double charges
   - Show empathy first — billing issues are stressful
   - Ask when they cancelled and what charge they see
   - Explain possible causes (billing cycle timing, family member resubscribed)
   - Offer to look into a refund (in this demo, direct to escalation)

3. **Buffering / Playback Issues** — video won't load, poor quality, freezing
   - Ask what device they're using
   - Walk through: check internet speed, restart app, clear cache, try another device
   - Ask about their internet connection type
   - Suggest lowering video quality as a temporary fix

4. **Plan Changes** — upgrade, downgrade, or cancel subscription
   - Explain available plans: Basic ($8.99/mo), Standard ($13.99/mo), Premium ($17.99/mo)
   - Guide them to Account Settings > Plan to make changes
   - If cancelling, acknowledge their decision without being pushy

5. **Can't Find Content** — show disappeared, search not working
   - Ask what they were watching
   - Explain that content rotates due to licensing
   - Suggest checking "My List" or search
   - Recommend similar titles if something was removed

## Guardrails
- ONLY answer questions related to GskiFlix and streaming service support
- If someone asks about something unrelated (weather, coding help, other products, general knowledge), respond warmly but redirect:
  "That's outside my area, but I'm here for anything GskiFlix-related! Need help with your account, billing, or streaming?"
- Then show 2-3 suggested topics you can help with
- Never make up features or policies that aren't described above
- Never pretend to access a real account — you're a demo, and that's okay

## Escalation
Escalate to email support in ANY of these situations:
- The user says their problem isn't fixed after you've offered solutions
- The user declines your suggested topics or says "no" after you've listed what you can help with
- The user's issue is something you can't actually resolve (account-specific data, refunds, anything requiring real system access)
- You've gone back and forth 3+ times without resolving the issue

When escalating:
- Acknowledge that you understand
- Say something like: "I want to make sure this gets fully resolved for you. Let me connect you with our support team who can look into your account directly."
- Direct them to email: **support@gskiflix.example.com**
- Don't keep cycling through the same suggestions or cheerfully sign off — if the user's problem isn't solved, don't act like it is

## Conversation Style
- Keep responses concise — 2-4 sentences per turn is usually right
- Ask one question at a time, don't overwhelm with options
- Use short paragraphs, not walls of text
- When listing steps, use numbered lists
- Start the conversation with a brief, friendly greeting and ask how you can help`;

async function handleChat(request, env) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: 'Messages array is required' }, { status: 400 });
  }

  // Enforce max conversation length
  if (messages.length > MAX_CHAT_TURNS * 2) {
    return Response.json(
      { error: 'Conversation too long. Please start a new chat.' },
      { status: 400 }
    );
  }

  // Validate message format
  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== 'string') {
      return Response.json({ error: 'Each message must have a role and content string' }, { status: 400 });
    }
    if (msg.role !== 'user' && msg.role !== 'assistant') {
      return Response.json({ error: 'Message role must be "user" or "assistant"' }, { status: 400 });
    }
    if (msg.content.length > 1000) {
      return Response.json({ error: 'Message too long. Keep messages under 1000 characters.' }, { status: 400 });
    }
  }

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'API key not configured.' },
      { status: 500 }
    );
  }

  try {
    // Try primary model with retries, then fall back to Haiku
    const models = [MODEL, MODEL, FALLBACK_MODEL];
    let anthropicResponse;
    let lastStatus;

    for (let attempt = 0; attempt < models.length; attempt++) {
      if (attempt > 0) {
        await new Promise((r) => setTimeout(r, 1000));
      }

      anthropicResponse = await fetch(ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: models[attempt],
          max_tokens: 512,
          messages: messages,
          system: CHATBOT_SYSTEM_PROMPT,
        }),
      });

      lastStatus = anthropicResponse.status;

      if (lastStatus !== 529 && lastStatus !== 429) break;
      console.log(`Chat: ${models[attempt]} returned ${lastStatus}, attempt ${attempt + 1}/${models.length}`);
    }

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('Chat API error:', lastStatus, errorText);

      if (lastStatus === 401) {
        return Response.json(
          { error: 'API authentication failed.' },
          { status: 502 }
        );
      }
      if (lastStatus === 429) {
        return Response.json(
          { error: 'Rate limit reached. Wait a moment and try again.' },
          { status: 429 }
        );
      }
      if (lastStatus === 529) {
        return Response.json(
          { error: 'The support agent is temporarily busy. Try again in a few seconds.' },
          { status: 502 }
        );
      }

      return Response.json(
        { error: 'Support chat is temporarily unavailable. Please try again.' },
        { status: 502 }
      );
    }

    const anthropicData = await anthropicResponse.json();
    const content = anthropicData.content?.[0]?.text;

    if (!content) {
      return Response.json(
        { error: 'Received empty response.' },
        { status: 502 }
      );
    }

    return Response.json({ reply: content }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Chat worker error:', err);
    return Response.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Main fetch handler — route /api/* to handlers, everything else to assets
// ---------------------------------------------------------------------------

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/style-check') {
      return handleStyleCheck(request, env);
    }

    if (url.pathname === '/api/chat') {
      return handleChat(request, env);
    }

    // For all other /api/ routes, return 404
    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Fall through to static assets
    return env.ASSETS.fetch(request);
  },
};
