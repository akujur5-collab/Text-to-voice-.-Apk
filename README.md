# VoiceCraft AI - Android Mobile Text-to-Speech Studio

**VoiceCraft AI** is a professional Android mobile application built for YouTube creators, YouTube Shorts/Reels creators, storytellers, educational content makers, devotional readers, and voice-over artists. It converts written Hindi, English, and regional Indian language text into natural-sounding, studio-grade speech using Google's official AI audio models and high-definition speech synthesis.

---

## 🌟 Key Features

1. **Mobile-First Studio Experience**
   - Clean, dark-mode ready Jetpack Compose & Material 3 UI.
   - Large script editor with real-time character and word counters.
   - 100% preservation of Hindi characters (Devanagari), Sanskrit shlokas, English, Unicode, and emojis.
   - Quick tools: Paste, Clear, Sample Scripts, and Text Formatting.

2. **Multi-Language & Voice Catalog**
   - **Supported Languages:** Hindi, English (US), English (UK), Bengali, Marathi, Tamil, Telugu, Gujarati, Punjabi, Kannada, Malayalam.
   - **Compatible AI Voices:** Curated voices for every language (Aanya, Aarav, Diya, Kabir, Rohan, Kore, Charon, Aoede, Fenrir, Puck) mapped to Google's official audio models.
   - **Instant Voice Preview:** Test any voice with authentic sample phrases without erasing your active script.
   - **Voice Favorites:** Star favorite voices for quick access.

3. **Creator-Focused Modes**
   - **YouTube Script Builder:** Guided fields for Hook, Main Narrative, and Call-to-Action (CTA) compiled directly into your speech flow.
   - **Shorts & Reels Duration Estimator:** Target word badges for 15s, 30s, 45s, and 60s clips.
   - **Voice Styles:** Natural, Narrator, Storytelling, Professional, Friendly, News, Calm, Energetic, Motivational, Devotional, Educational, and Advertisement.
   - **Speech Rate / Speed Control:** 0.5x to 2.0x playback and pacing control.

4. **Reliable Audio Synthesis Engine**
   - Multi-tier speech generation:
     - **Google Gemini AI Audio API (`gemini-2.5-flash-preview-tts`)**
     - **Secure Backend Proxy Server** (`POST /api/tts`)
     - **Device High-Quality Neural Synthesis Engine (Guaranteed Real Audio, Offline & Fallback)**
   - Automatic text chunking for long articles and scripts without breaking words or punctuation.
   - Concatenates audio sections into a single standard `.wav` audio file.

5. **Integrated Audio Player & Media Management**
   - Live waveform equalizer animation.
   - Scrub seeking slider, current/duration timers, replay 5s, forward 5s, speed control chips.
   - **Download Audio:** Saves directly to Android `Music/VoiceCraft` using scoped storage (no intrusive storage permissions required).
   - **Share Audio:** Share audio files via Android's native share sheet (WhatsApp, Telegram, Gmail, Google Drive, YouTube).
   - **Projects & History:** Room local database saves script history, audio references, dates, and durations for offline replay.

---

## 🛠 Technologies Used

- **Language:** Kotlin 2.2.10
- **UI Framework:** Jetpack Compose with Material 3 (M3)
- **Architecture:** MVVM (Model-View-ViewModel) + Clean Architecture Repository Pattern
- **Local Persistence:** AndroidX Room Database with KSP
- **Networking:** Retrofit 2 + OkHttp 4 + Moshi
- **Media Playback:** Android `MediaPlayer` & `AudioTrack`
- **Speech Engines:** Google Gemini AI Audio Model (`gemini-2.5-flash-preview-tts`) + Android `TextToSpeech`
- **File Sharing:** AndroidX `FileProvider`

---

## 🔒 Security Architecture

In compliance with Google Play and enterprise security best practices:
- Secret API keys are never hardcoded inside Kotlin source files.
- Keys are managed securely via the AI Studio Secrets panel and `.env` / `BuildConfig`.
- For production deployments, a secure proxy backend (`/backend/server.js`) can handle API keys server-side.

---

## 🚀 How to Run the Android App

### Running in Android Studio

1. Clone or export the repository ZIP.
2. Open the project folder in **Android Studio Meerkat / Ladybug or newer**.
3. Let Gradle sync dependencies automatically.
4. Run on a connected Android phone or emulator running Android 8.0 (API 26) or higher.

### Building APK

```bash
# Debug APK
gradle assembleDebug

# Release APK
gradle assembleRelease
```
The generated APK will be located at:
`app/build/outputs/apk/debug/app-debug.apk`

---

## 🌐 Deploying the Backend Proxy (Optional)

1. Navigate to `/backend`:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` file:
   ```env
   PORT=8080
   GOOGLE_API_KEY=your_gemini_api_key
   ```
3. Deploy to Google Cloud Run:
   ```bash
   gcloud run deploy voicecraft-backend --source . --region asia-southeast1 --allow-unauthenticated
   ```
4. Enter the Cloud Run endpoint URL in the app's **Settings → Backend Service & API Key**.

---

## 🧪 Testing

Unit tests for Critical User Journeys (text splitting, word counting, WAV formatting, and catalog):
```bash
gradle :app:testDebugUnitTest
```
