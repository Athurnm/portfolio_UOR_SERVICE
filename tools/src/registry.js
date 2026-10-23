export const blueprintTools = [
  {
    slug: 'llm-token-economics',
    title: 'LLM Token & Margin Simulator',
    category: 'AI Economics',
    status: 'blueprint',
    version: '0.1.0-alpha',
    order: 1,
    description: 'Model gross margin impact, token window usage, and pricing tiers across multi-agent MCP workflows.',
    blueprintFeatures: [
      'Interactive token consumption sliders (Prompt tokens vs Completion tokens)',
      'Tiered margin analysis across OpenAI, Anthropic, and local self-hosted models',
      'Batch vs Streaming real-time latency cost calculator',
    ],
  },
  {
    slug: 'prd-prompt-compiler',
    title: 'PRD Prompt Compiler & Gherkin Engine',
    category: 'PM Automation',
    status: 'blueprint',
    version: '0.1.0-alpha',
    order: 2,
    description: 'Transforms unstructured product ideas into INVEST-compliant Gherkin user stories and acceptance criteria.',
    blueprintFeatures: [
      'Edge-case generator for negative authorization & error UX',
      'One-click export to standard Jira/Linear markdown format',
      'Poka-Yoke error-proofing validation against PRD templates',
    ],
  },
  {
    slug: 'asr-model-selector',
    title: 'Multilingual ASR Model Selector',
    category: 'Speech AI',
    status: 'blueprint',
    version: '0.1.0-alpha',
    order: 3,
    description: 'Comparative evaluation matrix for multilingual Southeast Asian enterprise transcription & code-switching.',
    blueprintFeatures: [
      'Benchmarks Whisper, Conformer, and regional foundation models',
      'Normalized Word Error Rate (WER) vs Mixed Error Rate (MER) metrics',
      'Continuous language identification & speaker diarization trade-off engine',
    ],
  },
];

export function getToolBySlug(slug) {
  return blueprintTools.find((t) => t.slug === slug);
}
