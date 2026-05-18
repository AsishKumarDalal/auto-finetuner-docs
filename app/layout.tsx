import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoFinetuner | Premium One-Liner LLM Fine-Tuning & QLoRA Library",
  description: "AutoFinetuner is a zero-boilerplate, highly optimized Python library for LLM fine-tuning. Natively tune Qwen, Llama 3, Phi-3, and Gemma with QLoRA on consumer GPUs. Features automatic template matching, precision fallbacks (BF16/FP16), and domain dataset loaders.",
  keywords: [
    "fine tuning",
    "finetuning",
    "fine tuning library",
    "LLM fine-tuning",
    "QLoRA training",
    "LoRA adapter",
    "HuggingFace fine-tune",
    "Llama 3 fine-tuning",
    "Qwen2.5 training",
    "how to fine-tune LLM",
    "efficient LLM training",
    "machine learning library",
    "consumer GPU LLM training",
    "bfloat16 training",
    "SFTTrainer wrapper"
  ],
  authors: [{ name: "AutoFinetuner Team" }],
  openGraph: {
    title: "AutoFinetuner | Zero-Boilerplate LLM Fine-Tuning Library",
    description: "Orchestrate high-performance QLoRA fine-tuning in a single line of code. Auto-detects templates, optimizes VRAM usage, and streamlines data pipelines for modern LLMs.",
    url: "https://asishkumardalal.github.io/auto-finetuner-docs",
    siteName: "AutoFinetuner",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoFinetuner | One-Liner LLM Fine-Tuning & QLoRA Library",
    description: "Zero-boilerplate QLoRA fine-tuning for Qwen, Llama 3, Phi-3, and Gemma on consumer GPUs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "VkeM36gT2oS-pXvQ_dR_z-pQoDKtsVeLyyV1k7rsybM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Pure CSS Mobile Navigation Toggle */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        
        {/* Mobile top header */}
        <header className="mobile-header">
          <label htmlFor="menu-toggle" className="menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <div className="mobile-logo">⚙️ AutoFinetuner</div>
        </header>

        {/* Overlay to close menu on tap */}
        <label htmlFor="menu-toggle" className="menu-overlay"></label>

        <div className="layout-container">
          <aside className="sidebar">
            <div className="sidebar-title">
              <span style={{ fontSize: "1.5rem" }}>⚙️</span> AutoFinetuner
            </div>
            
            <nav>
              <div className="nav-section">Getting Started</div>
              <a href="#introduction" className="nav-link">Introduction</a>
              <a href="#quickstart" className="nav-link">Quickstart</a>
              
              <div className="nav-section">Core APIs</div>
              <a href="#finetune-quick" className="nav-link">finetune_quick()</a>
              <a href="#autofinetuner-class" className="nav-link">AutoFinetuner Class</a>
              
              <div className="nav-section">Data & Templates</div>
              <a href="#dataset-modes" className="nav-link">Dataset Modes</a>
              <a href="#domain-datasets" className="nav-link">Domain Datasets</a>
              <a href="#prompt-templates" className="nav-link">Prompt Templates</a>
              <a href="#custom-prompts" className="nav-link">Custom Prompts</a>
              
              <div className="nav-section">Advanced</div>
              <a href="#edge-cases" className="nav-link">Edge Cases & Mapping</a>
              <a href="#hardware-guide" className="nav-link">Hardware / VRAM Guide</a>
              <a href="#inference" className="nav-link">Inference</a>
              
              <div className="nav-section">Support</div>
              <a href="#troubleshooting" className="nav-link">Troubleshooting & Errors</a>
            </nav>
          </aside>
          
          <main className="main-content">
            {children}
          </main>
        </div>

        {/* Script to auto-close mobile menu on clicking any link */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' && e.target.closest('.sidebar')) {
                  const toggle = document.getElementById('menu-toggle');
                  if (toggle) toggle.checked = false;
                }
              });
            `
          }}
        />
      </body>
    </html>
  );
}
