# VoiceCraft AI - Android Mobile Text-to-Speech Studio

[![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=flat-square&logo=android&logoColor=white)](https://android.com)
[![Kotlin](https://img.shields.io/badge/Kotlin-2.2.10-7F52FF?style=flat-square&logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![Compose](https://img.shields.io/badge/Jetpack-Compose%20M3-4285F4?style=flat-square&logo=jetpackcompose&logoColor=white)](https://developer.android.com/jetpack/compose)
[![GitHub Release](https://img.shields.io/github/v/release/nt894285/VoiceCraft-AI?label=Latest%20Release&style=flat-square&color=blue)](../../releases/latest)
[![Build Status](https://img.shields.io/badge/Build-GitHub%20Actions-brightgreen?style=flat-square&logo=githubactions&logoColor=white)](../../actions)

**VoiceCraft AI** is a professional Android mobile application built for YouTube creators, YouTube Shorts/Reels creators, storytellers, educational content makers, devotional readers, and voice-over artists. It converts written Hindi, English, and regional Indian language text into natural-sounding, studio-grade speech using Google's official AI audio models and high-definition speech synthesis.

---

## 📱 Download APK

Download the latest Android APK directly from GitHub Releases:

[![Download Latest APK](https://img.shields.io/badge/Download-Latest%20APK-2563EB?style=for-the-badge&logo=android&logoColor=white)](../../releases/latest)

👉 **[Download Latest APK from GitHub Releases](../../releases/latest)**

*Note: The button and links above dynamically direct to the latest release page of this repository (`https://github.com/<owner>/<repo>/releases/latest`).*

### 📥 Android Installation Instructions:
1. Tap the **Download Latest APK** button above or navigate to [Releases](../../releases/latest).
2. Download the **`VoiceCraft-AI-v1.0.0.apk`** file onto your Android device.
3. Open the downloaded APK file from your notification tray or Files app.
4. If prompted with *"For your security, your phone is not allowed to install unknown apps from this source"*:
   - Tap **Settings**.
   - Toggle **Allow from this source** to ON.
5. Tap **Install** and open **VoiceCraft AI**.

---

## 🌟 Key Features

1. **Mobile-First Studio Experience**
   - Clean, dark-mode ready Jetpack Compose & Material 3 UI.
   - Large script editor with real-time character and word counters.
   - 100% preservation of Hindi characters (Devanagari), Sanskrit shlokas, English, Unicode, and emojis.
   - Quick script tools: Paste, Clear, Format Paragraphs, Remove Empty Lines, Clean Spaces, and Curated Samples.

2. **Multi-Language & Curated Voice Catalog**
   - **Supported Languages:** Hindi (हिन्दी), English (US), English (UK), Bengali (বাংলা), Marathi (मराठी), Tamil (தமிழ்), Telugu (తెలుగు), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം).
   - **Compatible AI Voices:** Curated voices for every language (Aanya, Aarav, Diya, Kabir, Rohan, Kore, Charon, Aoede, Fenrir, Puck) mapped to Google's official audio models.
   - **5-Second Voice Auditions**: Instant narrator preview clips for every voice catalog entry with local audio caching and 5-second automatic limiters.
   - **Voice Favorites:** Star favorite voices for quick access.

3. **Audio Format Selection**
   - **MP3 (Compressed)**: Smaller file sizes, universal social media and web playback.
   - **WAV (Studio Master)**: Lossless 24kHz 16-bit uncompressed PCM audio quality for video editors.
   - Available directly in synthesis settings on the Home Screen and persisted in Settings.

4. **Creator-Focused Modes**
   - **YouTube Script Builder:** Guided fields for Hook, Main Narrative, and Call-to-Action (CTA) compiled directly into your speech flow.
   - **Shorts & Reels Duration Estimator:** Target word badges for 15s, 30s, 45s, and 60s clips.
   - **Voice Styles:** Natural, Narrator, Storytelling, Professional, Friendly, News, Calm, Energetic, Motivational, Devotional, Educational, and Advertisement.
   - **Speech Rate / Speed Control:** 0.5x to 2.0x playback and pacing control.

5. **Integrated Audio Player & Media Management**
   - Live waveform equalizer animation.
   - Scrub seeking slider, current/duration timers, replay 5s, forward 5s, speed control chips.
   - **Download Audio:** Saves directly to Android `Music/VoiceCraft` using scoped storage (no intrusive storage permissions required).
   - **Share Audio:** Share audio files via Android's native share sheet (WhatsApp, Telegram, Gmail, Google Drive, YouTube).
   - **Projects & History:** Room local database saves script history, audio references, dates, and durations for offline replay.

---

## 🛠 Technologies & Architecture

- **Language:** Kotlin 2.2.10
- **UI Framework:** Jetpack Compose with Material 3 (M3)
- **Architecture:** MVVM (Model-View-ViewModel) + Clean Architecture Repository Pattern
- **Local Persistence:** AndroidX Room Database with KSP
- **Networking:** Retrofit 2 + OkHttp 4 + Moshi
- **Media Playback:** Android `MediaPlayer` & `AudioTrack`
- **Speech Engines:** Google Gemini AI Audio Model (`gemini-2.5-flash-preview-tts`), Google Cloud Text-to-Speech API, and Device Neural Speech Synthesis
- **File Sharing:** AndroidX `FileProvider`

---

## 🏷️ How to Release a New APK

The repository includes an automated GitHub Actions release pipeline (`.github/workflows/android-release.yml`). When you push a version tag, GitHub automatically builds, tests, signs, packages, and creates a GitHub Release with the APK attached.

### Step-by-Step Release Workflow:

#### 1. Update Version Code and Version Name
Open `app/build.gradle.kts` and locate the `defaultConfig` block:
```kotlin
android {
    defaultConfig {
        applicationId = "com.aistudio.voicecraftai.vckdpl"
        minSdk = 26
        targetSdk = 36
        versionCode = 2        // 👈 Increment integer by 1 for each new release
        versionName = "1.0.1"  // 👈 Update semantic version string (e.g., 1.0.1)
    }
}
```

#### 2. Commit and Tag Your Release
Run the following Git commands in your terminal:
```bash
# 1. Stage and commit updated version
git add .
git commit -m "Release v1.0.1"

# 2. Create an annotated version tag
git tag -a v1.0.1 -m "Release VoiceCraft AI v1.0.1"

# 3. Push commit and tag to GitHub
git push origin main
git push origin v1.0.1
```

#### 3. Automatic GitHub Actions Processing
Once the tag `v1.0.1` is pushed:
1. GitHub Actions initiates the **Build & Publish Release APK** workflow.
2. Checks out the code and sets up Java JDK 17 and Android SDK.
3. Decodes the production signing keystore (or utilizes a secure build keystore).
4. Runs automated unit tests (`./gradlew testDebugUnitTest`).
5. Executes the release build (`./gradlew assembleRelease`).
6. Verifies and renames the APK to `VoiceCraft-AI-v1.0.1.apk`.
7. Uploads the APK as an Actions workflow artifact.
8. Automatically creates a GitHub Release titled **VoiceCraft AI v1.0.1** and attaches the generated APK.
9. Users can immediately download the new APK at `../../releases/latest`.

---

## 🔐 Configuring Production Signing Secrets (GitHub Secrets)

To sign your release APKs with your official developer key on GitHub Actions:

### 1. Generate an Upload Keystore (if you do not have one):
```bash
keytool -genkey -v -keystore my-upload-key.jks \
  -alias upload \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -dname "CN=VoiceCraft AI, OU=VoiceCraft, O=VoiceCraft, L=Mountain View, ST=CA, C=US"
```

### 2. Convert Keystore to Base64:
- **On Linux / macOS:**
  ```bash
  base64 -i my-upload-key.jks | tr -d '\n' > keystore_base64.txt
  ```
- **On Windows (PowerShell):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("my-upload-key.jks")) | Out-File -Encoding utf8 keystore_base64.txt
  ```

### 3. Add Secrets to GitHub:
Go to your repository on GitHub:
1. Navigate to **Settings → Secrets and variables → Actions**.
2. Click **New repository secret** and add:
   - `ANDROID_KEYSTORE_BASE64`: Copy and paste the entire contents of `keystore_base64.txt`.
   - `STORE_PASSWORD`: The password chosen for the keystore.
   - `KEY_ALIAS`: `upload` (or your custom alias).
   - `KEY_PASSWORD`: The password chosen for the key.

> **Note on Security & Fallback**: Private keys and passwords must **never** be committed to source code. If GitHub Secrets are not configured, the GitHub Actions workflow automatically creates a temporary signing key to ensure a valid, installable APK is produced without failing the build.

---

## 💻 Local Development & Building

### Prerequisites
- Android Studio Meerkat / Ladybug or newer
- JDK 17+
- Android SDK with API 36 support

### Local Commands
```bash
# Run unit tests
gradle :app:testDebugUnitTest

# Build debug APK
gradle :app:assembleDebug

# Build release APK
gradle :app:assembleRelease
```

The generated APKs are saved to:
- Debug: `app/build/outputs/apk/debug/app-debug.apk`
- Release: `app/build/outputs/apk/release/`

---

## 📄 License & Distribution

VoiceCraft AI is distributed under the Apache 2.0 License.
For the latest updates and release assets, visit [GitHub Releases](../../releases).
