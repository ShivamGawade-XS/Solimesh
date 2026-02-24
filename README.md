# Solimesh
A zero-cost, offline-first PWA for community resilience. Features AI pantry scanning, neuro-adaptive UI, relationship tracking, and a real-time mutual aid mesh.
# Solimesh 🌱

**A mobile-first Progressive Web App (PWA) bridging food waste reduction, neuro-adaptive accessibility, and local mutual aid.**

Solimesh transforms individual pantry tracking into a community resilience network. By combining AI-driven inventory management with real-time mutual aid signaling, it ensures surplus food reaches those who need it, while supporting the mental bandwidth and relationships of its users.

---

## 👁️ The "Many Eyes" Principle (Security & Trust)

Given the sensitive nature of the data Solimesh handles—including mood logs, relationship tracking, and geolocation for mutual aid—transparency is our primary security mechanism. 

We operate on Linus's Law: *"Given enough eyeballs, all bugs are shallow."* To build and maintain community trust:
* **Row-Level Security (RLS):** Enforced at the Supabase PostgreSQL level. Users can *only* read and write their own private data.
* **Public Auditing:** Our AI routing, database migrations, and trigger logic are entirely open source for community review.
* **SBOM Available:** We maintain a Software Bill of Materials to track all dependencies for known vulnerabilities.
* **Offline-First:** Critical functionality is cached locally on the device to ensure availability during connectivity drops.

---

## 🏗️ Core Architecture (Zero-Cost Stack)

Solimesh is built strictly within free-tier limits to ensure the project remains financially sustainable and horizontally scalable.
* **Frontend:** Next.js 15 (App Router), styled with Tailwind CSS, hosted on Vercel.
* **Backend & Auth:** Supabase (PostgreSQL, Realtime, Email/Social Auth). Limits: 500MB DB storage, 50k monthly active users.
* **AI Logic Layer:** * Gemini 2.5 Flash via Google AI Studio (Multimodal OCR & Data Mapping). Limit: 15 Requests Per Minute.
  * DeepSeek R1 via OpenRouter (Complex reasoning tasks).
* **Specialized APIs:** Mapbox/OpenStreetMap (Mapping), Tabscanner (Backup OCR), Hugging Face Inference API (Zero-shot text classification).

---

## 🧩 App Modules

1. **The Scanner (Module A):** Users snap a photo of a receipt or grocery item. Gemini 2.5 Flash extracts the text and maps it directly to the USDA FoodKeeper JSON structure to predict shelf life and generate storage tips.
2. **Neuro-Adaptive UI (Module B):** A 'Low-Stimulation' toggle that immediately shifts the app to monochromatic colors, increases font contrast, and simplifies navigation to reduce cognitive load.
3. **Support CRM (Module C):** Tracks support contacts and visualizes "Relationship Health," generating gentle nudges if a user is losing touch (no contact in > 3 days).
4. **The Mesh (Module D):** A real-time map displaying local "Signals of Abundance." The system auto-generates a mutual aid signal if a user has an item < 48 hours from expiry AND logs a stress level > 7/10.

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/ShivamGawade-XS/Solimesh.git
cd Solimesh
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a \`.env.local\` file in the root directory and add the following keys:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
\`\`\`

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

We welcome contributions! Please focus on the "Execution Guidelines for Beginners":
1. Validate neighborhood demand before pushing large feature changes.
2. Build modularly (ensure the basic database works before tweaking AI prompts).
3. Respect the free-tier constraints in all API integrations.

**License:** MIT
