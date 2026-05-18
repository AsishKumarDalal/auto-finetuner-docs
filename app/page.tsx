export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AutoFinetuner | Premium One-Liner LLM Fine-Tuning & QLoRA Library",
    "description": "AutoFinetuner is a zero-boilerplate, highly optimized Python library for LLM fine-tuning with QLoRA/LoRA on consumer hardware. Natively tune Qwen, Llama 3, Phi-3, and Gemma.",
    "inLanguage": "en",
    "mainEntityOfPage": "https://asishkumardalal.github.io/auto-finetuner-docs",
    "author": {
      "@type": "Organization",
      "name": "AutoFinetuner Team"
    },
    "about": [
      {
        "@type": "SoftwareApplication",
        "name": "AutoFinetuner",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Linux, Windows, macOS",
        "programmingLanguage": "Python",
        "description": "Orchestrate high-performance QLoRA fine-tuning in a single line of code. Natively supports Qwen, Llama, Gemma, and Phi."
      }
    ]
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="article-header">
        <div style={{ marginBottom: "1rem" }}>
          <span className="badge">Python 3.8+</span>
          <span className="badge">HuggingFace</span>
          <span className="badge">QLoRA</span>
        </div>
        <h1>AutoFinetuner Documentation</h1>
        <p className="article-meta">Enterprise-Grade, Zero-Boilerplate LLM Fine-Tuning</p>
      </header>

      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          <strong>AutoFinetuner</strong> is a robust, high-level Python library designed to streamline the complexities of fine-tuning Large Language Models (LLMs). It acts as an intelligent orchestration layer on top of the HuggingFace ecosystem (<code>transformers</code>, <code>peft</code>, <code>trl</code>, and <code>bitsandbytes</code>).
        </p>
        <p>
          By abstracting away intricate boilerplate, AutoFinetuner ensures optimized memory efficiency, rapid prototyping, and maximum throughput. Train massive language models on consumer hardware in a single line of code!
        </p>
      </section>

      <section id="quickstart">
        <h2>Quickstart</h2>
        <p>Ensure you have a CUDA-compatible environment, then install the required dependencies:</p>
        <pre><code>pip install accelerate peft bitsandbytes transformers trl datasets torch</code></pre>
        <p>For rapid prototyping, use the <code>finetune_quick</code> API:</p>
        <pre><code>{`from auto_finetuner import finetune_quick
from utility import load_domain_dataset

# 1. Load a curated coding dataset (auto-applies LLaMA 3 templates)
ds = load_domain_dataset("coding", dataset_index=1, template_style="llama3")

# 2. Train and save in one function call
model = finetune_quick(
    model="unsloth/Llama-3.2-3B-Instruct",
    hf_dataset=ds,
    save_path="./my-custom-model",
    quantization_bits=4, 
    epochs=1
)`}</code></pre>
      </section>

      <section id="finetune-quick">
        <h2><code>finetune_quick()</code> API</h2>
        <p>The simplest way to start fine-tuning. It handles dataset loading, tokenization, model preparation, LoRA setup, and training in one go.</p>
        
        <pre><code>{`def finetune_quick(
    model: str,
    save_path: str,
    hf_dataset: Dataset = None,
    dataset_name: str = None,
    alpaca_path: str = None,
    template_style: str = None,
    prompt_template: str = None,
    prompt_template_no_input: str = None,
    quantization_bits: int = 4,
    epochs: int = 1,
    max_seq_length: int = 512,
    max_samples: int = None,
    rank: int = 64
) -> AutoFinetuner`}</code></pre>

        <p>You must provide exactly ONE dataset source (<code>hf_dataset</code>, <code>dataset_name</code>, or <code>alpaca_path</code>).</p>
      </section>

      <section id="autofinetuner-class">
        <h2>AutoFinetuner Class</h2>
        <p>For object-oriented control, instantiate the <code>AutoFinetuner</code> class. It exposes <code>prepare()</code>, <code>train()</code>, and <code>generate()</code> methods.</p>
        <pre><code>{`from auto_finetuner import AutoFinetuner

finetuner = AutoFinetuner(
    model_name="Qwen/Qwen2.5-7B-Instruct",
    save_path="./out",
    alpaca_path="./data/alpaca_data.json",
    template_style="qwen",
)

finetuner.prepare()
finetuner.train(epochs=2, batch_size=4)
print(finetuner.generate("Explain quantum computing"))`}</code></pre>
      </section>

      <section id="dataset-modes">
        <h2>Dataset Modes</h2>
        <p>The library natively supports three distinct dataset formats via <code>utility.py</code>:</p>
        <ul>
          <li><strong>Alpaca Style:</strong> <code>{`{"instruction": "...", "input": "...", "output": "..."}`}</code></li>
          <li><strong>Chat Style:</strong> <code>{`{"conversations": [{"role": "user", "content": "..."}, ...]}`}</code></li>
          <li><strong>Raw Text Style:</strong> <code>{`{"text": "..."}`}</code> or plain <code>.txt</code> files</li>
        </ul>
        <p>When using <code>finetune_quick</code>, supply data via:</p>
        <ol>
          <li><code>hf_dataset</code>: Pass an already-loaded HuggingFace <code>Dataset</code> object.</li>
          <li><code>dataset_name</code>: Pass a string (e.g., <code>"tatsu-lab/alpaca"</code>) to download from the Hub.</li>
          <li><code>alpaca_path</code>: Path to a local JSON file formatted in the Alpaca style.</li>
        </ol>
      </section>

      <section id="domain-datasets">
        <h2>Domain Datasets</h2>
        <p>AutoFinetuner includes a powerful helper to instantly fetch curated domain-specific datasets for Medical, Legal, Coding, and Finance domains.</p>
        <pre><code>{`from utility import load_domain_dataset, list_domain_datasets

# View all curated datasets
list_domain_datasets("medical")

# Load a dataset with auto-applied domain templates
ds = load_domain_dataset("medical", dataset_index=0, max_samples=5000)`}</code></pre>
      </section>

      <section id="prompt-templates">
        <h2>Prompt Templates (chat_templates.py)</h2>
        <p>Proper formatting is critical for fine-tuning instruct models. <code>chat_templates.py</code> provides a centralized registry for modern template formats like Qwen, LLaMA-3, ChatML, Phi-3, and Gemma.</p>
        <p>If you don't specify a <code>template_style</code>, the library <strong>automatically detects the optimal template</strong> based on the model name.</p>
        <blockquote>
          <p><strong>Note:</strong> Templates include both a standard format and a "no input" variant to seamlessly handle missing context fields.</p>
        </blockquote>
      </section>

      <section id="custom-prompts">
        <h2>Custom Prompts</h2>
        <p>Need a proprietary template? Override the defaults by passing <code>prompt_template</code> and <code>prompt_template_no_input</code>.</p>
        <pre><code>{`finetuner = finetune_quick(
    model="meta-llama/Llama-3.2-3B-Instruct",
    dataset_name="tatsu-lab/alpaca",
    prompt_template="<s>[INST] {instruction}\\n{input} [/INST] {output} </s>",
    prompt_template_no_input="<s>[INST] {instruction} [/INST] {output} </s>",
    save_path="./custom-template-model",
)`}</code></pre>
      </section>

      <section id="edge-cases">
        <h2>Edge Cases & Custom Fields Mapping</h2>
        <p>Real-world datasets rarely match perfect structures. <code>utility.py</code> gracefully handles missing or custom column names.</p>
        
        <h3>Custom Column Mapping</h3>
        <p>If your dataset uses different column names (e.g., <code>question</code> instead of <code>instruction</code>), map them using `load_hf_dataset`:</p>
        <pre><code>{`from utility import load_hf_dataset

ds = load_hf_dataset(
    "your-org/weird-dataset",
    instruction_field="question",
    input_field="context",     # Optional
    output_field="answer",
    template_style="chatml"
)`}</code></pre>

        <h3>Automatic Clean-up</h3>
        <p>The library automatically drops all extraneous columns from the dataset right before training, ensuring the <code>SFTTrainer</code> only sees the formatted <code>text</code> column, preventing hard-to-debug crashes.</p>
        
        <h3>Precision Edge Cases</h3>
        <p>AutoFinetuner automatically detects hardware capabilities. It attempts to use <code>bfloat16</code> if supported (e.g., Ampere architectures and newer) for better numerical stability. If unavailable (e.g., older Turing GPUs), it safely falls back to <code>float16</code> (fp16).</p>
      </section>

      <section id="hardware-guide">
        <h2>Hardware / VRAM Guide</h2>
        <p>Built to train massive models on consumer GPUs (e.g., RTX 3090 Ti / A5000 / A4500, ~24 GB VRAM).</p>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>4-bit QLoRA</th>
              <th>8-bit</th>
              <th>BF16 Full</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Qwen2.5-0.5B</td>
              <td>~1.5 GB</td>
              <td>~1.8 GB</td>
              <td>~2.0 GB</td>
            </tr>
            <tr>
              <td>Llama-3.2-1B</td>
              <td>~1.5 GB</td>
              <td>~2.0 GB</td>
              <td>~3.0 GB</td>
            </tr>
            <tr>
              <td>Llama-3.2-3B</td>
              <td>~2.5 GB</td>
              <td>~4.0 GB</td>
              <td>~7.0 GB</td>
            </tr>
            <tr>
              <td>Qwen2.5-7B / Llama-3.1-8B</td>
              <td>~6.0 GB</td>
              <td>~9.0 GB</td>
              <td>~16.0 GB</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="inference">
        <h2>Inference & Testing</h2>
        <p>After fine-tuning, load your LoRA adapter on top of the quantized base model using <code>PeftModel</code> (see <code>inference.py</code> for the full script).</p>
        <pre><code>{`from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# 1. Load base model (quantized)
base_model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-7B-Instruct",
    quantization_config=bnb_config,
    device_map="auto",
)

# 2. Attach your trained LoRA adapter
model = PeftModel.from_pretrained(base_model, "./my-custom-model")
tokenizer = AutoTokenizer.from_pretrained("./my-custom-model")
model.eval()

# 3. Generate!
# ... (standard generation loop)
`}</code></pre>
      </section>
      
      <section id="troubleshooting">
        <h2>Troubleshooting & Common Errors</h2>
        <p>When working with diverse, wild datasets from the HuggingFace Hub, you might occasionally run into structure mismatch errors. Here are the most common ones and their solutions.</p>

        <h3>1. Cannot auto-detect dataset structure</h3>
        <p><strong>The Error:</strong></p>
        <pre><code>{`ValueError: Cannot auto-detect dataset structure.
  Columns found : ['question', 'context', 'answer']
  Expected either a 'text' column OR 'instruction' + 'output' columns.
  Use instruction_field= / output_field= to remap column names.`}</code></pre>
        <p><strong>Why it happens:</strong> By default, <code>AutoFinetuner</code> expects your dataset to either already have a pre-formatted <code>text</code> column, or have Alpaca-style columns named exactly <code>instruction</code> and <code>output</code>. If the dataset uses custom column names (like <code>question</code> and <code>answer</code>), the pipeline doesn't know how to inject them into the prompt template.</p>
        <p><strong>The Solution:</strong> Remap your columns using the mapping arguments in <code>load_hf_dataset()</code> before passing it to <code>finetune_quick()</code>:</p>
        <pre><code>{`from utility import load_hf_dataset
from auto_finetuner import finetune_quick

# Explicitly map 'question' -> instruction, and 'answer' -> output
ds = load_hf_dataset(
    "your-org/weird-dataset",
    instruction_field="question",
    input_field="context", # optional
    output_field="answer"
)

finetuner = finetune_quick(model="Qwen/Qwen2.5-7B-Instruct", hf_dataset=ds, save_path="./out")`}</code></pre>

        <h3>2. Could not find conversation key</h3>
        <p><strong>The Error:</strong></p>
        <pre><code>{`ValueError: Could not find conversation key. Keys found: ['chat_history', 'metadata']. Pass conv_key= explicitly.`}</code></pre>
        <p><strong>Why it happens:</strong> When loading a conversational JSON file via <code>load_chat_json()</code>, the utility automatically searches for standard keys like <code>conversations</code>, <code>messages</code>, <code>dialog</code>, or <code>chat</code>. If your JSON uses a completely different key to hold the array of messages (e.g., <code>chat_history</code>), the parser fails.</p>
        <p><strong>The Solution:</strong> Tell the parser exactly which key holds the conversation array by passing <code>conv_key</code>:</p>
        <pre><code>{`from utility import load_and_format_chat

ds = load_and_format_chat(
    path="./data/my_chats.json",
    conv_key="chat_history", # explicitly define the key
    model_style="qwen"
)`}</code></pre>

      </section>
      
      <footer style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-color)", textAlign: "center", color: "var(--text-secondary)" }}>
        <p>Built with ❤️ by the open-source community. Licensed under MIT.</p>
      </footer>
    </article>
  );
}
