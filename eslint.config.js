import ts from 'typescript-eslint'
import tailwind from 'eslint-plugin-tailwindcss'
import sortKeysCustomOrder from 'eslint-plugin-sort-keys-custom-order'

export default [
  {
    ignores: [
      '**/.*',
      '**/dist/*',
      '**/env.ts',
      '**/packages/ui/src/chart.tsx',
      '**/packages/ui/src/command.tsx',
      '**/tailwind/web.ts',
      '**/trpc/react.tsx'
    ]
  },
  sortKeysCustomOrder.configs['flat/recommended'],
  ...ts.configs.stylistic,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
        config: './tooling/tailwind/web.ts',
        whitelist: ['toaster', 'notranslate']
      }
    }
  }
]
