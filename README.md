# 🌟 CultureQuest: Gen AI Cultural Travel & Heritage Portal

CultureQuest is an AI-powered, ethical travel dashboard designed to connect travelers with authentic local cultures, historic craft guilds, and local storytellers. By combining **Google Gemini 3.5** with client-side speech synthesis and print optimizations, the platform uncovers hidden wonders while promoting sustainable tourism and respecting indigenous communities.

---

## 🚀 Key Features

*   🗺️ **Dynamic Destination Explorer**: Instantly fetches verified attractions, hidden gems, respect standards, and local guide connections for any city in the world.
*   🎙️ **Immersive Oral Narratives**: Generates rich, sensory, first-person stories told from local perspectives (e.g., master weavers, historic cooks). Supports interactive **audio storytelling** via the browser-native Web Speech API.
*   📅 **Interactive Cultural Itinerary**: Enables custom spot injections, daily scheduling, dynamic shared-link generation (persisting states in URL query strings), and **print-ready exports** (custom CSS page-break print overrides).
*   🌿 **Ethical Tourism & Carbon Offset**: Guides visitors with localized respect rules, native translations, direct artisan guide bio connections, and green travel certifications.
*   ⚡ **Zero-Failure Fallback System**: Instantly and seamlessly falls back to a high-fidelity curated local database (supporting Kyoto, Oaxaca, Rajasthan, Cairo, Rome, Marrakesh, London, Tokyo, Bangkok, etc.) in case of network outages or credential limits.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 15 (App Router, Turbopack compiler)
*   **Language**: TypeScript (Strict typing check)
*   **AI SDK**: `@google/generative-ai` (using `gemini-3.5-flash` with JSON-mode output schemas)
*   **Styling**: Vanilla CSS with Tailwind CSS v4 design tokens and dynamic glassmorphism structures
*   **Icons**: `lucide-react`
*   **Testing**: Custom Node/CLI CLI validation suite via `tsx`

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-link>
cd challenge-2
npm install
```

### 2. Configure Environment Credentials
Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
```
*(Standard Gemini API keys can be generated for free at [Google AI Studio](https://aistudio.google.com/)).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Testing Suite
We maintain an automated schema-integrity validation test checking JSON structure parser outcomes, narrator text generation constraints, and key route fallbacks.

Run the test suite using:
```bash
npx tsx test-runner.ts
```

---

## 🔒 Security, Quality & Efficiency Standards

*   **Credential Security**: The API Key is kept strictly server-side (`process.env.GEMINI_API_KEY`). It is never bundled into or accessible by the client browser. `.env.local` is explicitly git-ignored.
*   **Error Masking**: Backend route catch blocks mask raw Google Gateway exceptions to safeguard internal routes while safely spinning up fallback mock guides.
*   **Client-Side Efficiency**: Audio narration (SpeechSynthesis) and PDF prints (`window.print()`) run purely on the user's local thread. The server consumes **0 memory/rendering resources** for media assets.
*   **Accessibility**: Focus outlines and Aria tab properties are fully declared for keyboard-based navigability.
