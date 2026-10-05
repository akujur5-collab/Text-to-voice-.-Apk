/**
 * VoiceCraft AI - Secure TTS Proxy Backend
 * 
 * Protects Google AI & Cloud TTS credentials on the server side.
 * Validates text inputs, lengths, supported languages, and voices.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

// Supported languages and voice map
const SUPPORTED_LANGUAGES = [
  'hi-IN', 'en-US', 'en-GB', 'bn-IN', 'mr-IN',
  'ta-IN', 'te-IN', 'gu-IN', 'pa-IN', 'kn-IN', 'ml-IN'
];

const PREBUILT_VOICES = {
  'hi-IN': 'Kore',
  'en-US': 'Kore',
  'en-GB': 'Aoede',
  'bn-IN': 'Kore',
  'mr-IN': 'Aoede',
  'ta-IN': 'Kore',
  'te-IN': 'Aoede',
  'gu-IN': 'Kore',
  'pa-IN': 'Kore',
  'kn-IN': 'Aoede',
  'ml-IN': 'Kore'
};

const STYLE_INSTRUCTIONS = {
  'NATURAL': 'Speak in a natural, friendly conversational tone.',
  'NARRATOR': 'Speak like a documentary narrator with clear enunciation and measured pacing.',
  'STORYTELLING': 'Speak like an engaging storyteller with expressive emotion and pauses.',
  'PROFESSIONAL': 'Speak in a crisp, confident, and professional broadcast tone.',
  'FRIENDLY': 'Speak in a warm, welcoming, and smiling friendly voice.',
  'NEWS': 'Speak like a seasoned news anchor with authoritative cadence and clear articulation.',
  'CALM': 'Speak in a soft, calm, and soothing manner with gentle breaths.',
  'ENERGETIC': 'Speak with high energy, enthusiasm, and punchy excitement.',
  'MOTIVATIONAL': 'Speak like an inspiring motivational speaker with strong conviction.',
  'DEVOTIONAL': 'Speak in a peaceful, reverent, and sacred devotional cadence.',
  'EDUCATIONAL': 'Speak clearly like a patient teacher, emphasizing key concepts.',
  'ADVERTISEMENT': 'Speak like a charismatic commercial voiceover with engaging excitement.'
};

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'VoiceCraft AI Backend',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/tts
 * 
 * Body:
 * {
 *   "text": "नमस्ते दोस्तों",
 *   "language": "hi-IN",
 *   "voice": "hi_in_kore",
 *   "style": "NATURAL",
 *   "speed": 1.0
 * }
 */
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'hi-IN', voice, style = 'NATURAL', speed = 1.0 } = req.body;

    // 1. Validate Input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Text cannot be empty.' });
    }

    if (text.length > 5000) {
      return res.status(400).json({ success: false, error: 'Text exceeds maximum length of 5000 characters.' });
    }

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({ success: false, error: `Language ${language} is not supported.` });
    }

    if (!GOOGLE_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'GOOGLE_API_KEY is not configured on the server. Please set it in your environment variables.'
      });
    }

    const selectedVoiceName = PREBUILT_VOICES[language] || 'Kore';
    const styleInstruction = STYLE_INSTRUCTIONS[style] || STYLE_INSTRUCTIONS['NATURAL'];

    // Construct request to Gemini TTS model (gemini-2.5-flash-preview-tts)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GOOGLE_API_KEY}`;

    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              text: `${styleInstruction}\nText to speak:\n${text}`
            }
          ]
        }
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: selectedVoiceName
            }
          }
        }
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google AI API error:', errText);
      return res.status(response.status).json({
        success: false,
        error: `Google AI Speech synthesis failed: ${response.statusText}`
      });
    }

    const data = await response.json();
    const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!inlineData || !inlineData.data) {
      return res.status(502).json({
        success: false,
        error: 'Audio data was not returned in the Google AI response.'
      });
    }

    return res.json({
      success: true,
      audioBase64: inlineData.data,
      mimeType: inlineData.mimeType || 'audio/wav',
      language,
      voice: selectedVoiceName,
      style
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`VoiceCraft AI TTS Proxy server running on port ${PORT}`);
});
