export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  description: string
  id: string
  name: string
  strengths?: string
  type: Type
}
const models: Model<ModelType>[] = [
    {
      description:
        'Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.',
      id: 'c305f976-8e38-42b1-9fb7-d21b2e34f0da',
      name: 'text-davinci-003',
      strengths:
        'Complex intent, cause and effect, creative generation, search, summarization for audience',
      type: 'GPT-3'
    },
    {
      description: 'Very capable, but faster and lower cost than Davinci.',
      id: '464a47c3-7ab5-44d7-b669-f9cb5a9e8465',
      name: 'text-curie-001',
      strengths: 'Language translation, complex classification, sentiment, summarization',
      type: 'GPT-3'
    },
    {
      description: 'Capable of straightforward tasks, very fast, and lower cost.',
      id: 'ac0797b0-7e31-43b6-a494-da7e2ab43445',
      name: 'text-babbage-001',
      strengths: 'Moderate classification, semantic search',
      type: 'GPT-3'
    },
    {
      description:
        'Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.',
      id: 'be638fb1-973b-4471-a49c-290325085802',
      name: 'text-ada-001',
      strengths: 'Parsing text, simple classification, address correction, keywords',
      type: 'GPT-3'
    },
    {
      description:
        'Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.',
      id: 'b43c0ea9-5ad4-456a-ae29-26cd77b6d0fb',
      name: 'code-davinci-002',
      type: 'Codex'
    },
    {
      description:
        'Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.',
      id: 'bbd57291-4622-4a21-9eed-dd6bd786fdd1',
      name: 'code-cushman-001',
      strengths: 'Real-time application where low-latency is preferable',
      type: 'Codex'
    }
  ],
  types = ['GPT-3', 'Codex'] as const

export { models, types }
