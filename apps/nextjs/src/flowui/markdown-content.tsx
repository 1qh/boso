import type * as React from 'react'
import type { Components } from 'react-markdown'

import { cn } from '@a/ui'
import { marked } from 'marked'
import { isValidElement, memo, Suspense, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DEFAULT_PRE_BLOCK_CLASS =
    'my-4 overflow-x-auto w-fit rounded-xl bg-zinc-950 text-zinc-50 dark:bg-zinc-900 border border-border p-4',
  extractTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractTextContent).join('')
    if (isValidElement(node))
      return extractTextContent(
        (
          node.props as {
            children: React.ReactNode
          }
        ).children
      )
    return ''
  }

interface HighlightedPreProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string
}

const HighlightedPre = memo(async ({ children, className, language, ...props }: HighlightedPreProps) => {
  const { bundledLanguages, codeToTokens } = await import('shiki'),
    code = extractTextContent(children)

  if (!(language in bundledLanguages))
    return (
      <pre {...props} className={cn(DEFAULT_PRE_BLOCK_CLASS, className)}>
        <code className='whitespace-pre-wrap'>{children}</code>
      </pre>
    )

  const { tokens } = await codeToTokens(code, {
    lang: language as keyof typeof bundledLanguages,
    themes: {
      dark: 'github-dark',
      light: 'github-dark'
    }
  })

  return (
    <pre {...props} className={cn(DEFAULT_PRE_BLOCK_CLASS, className)}>
      <code className='whitespace-pre-wrap'>
        {tokens.map((line, lineIndex) => (
          <span key={`line-${lineIndex}`}>
            {line.map((token, tokenIndex) => {
              const style = typeof token.htmlStyle === 'string' ? undefined : token.htmlStyle

              return (
                <span key={`token-${tokenIndex}`} style={style}>
                  {token.content}
                </span>
              )
            })}
            {lineIndex !== tokens.length - 1 && '\n'}
          </span>
        ))}
      </code>
    </pre>
  )
})

HighlightedPre.displayName = 'HighlightedPre'

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language: string
}

const CodeBlock = ({ children, className, language, ...props }: CodeBlockProps) => (
  <Suspense
    fallback={
      <pre {...props} className={cn(DEFAULT_PRE_BLOCK_CLASS, className)}>
        <code className='whitespace-pre-wrap'>{children}</code>
      </pre>
    }>
    <HighlightedPre language={language} {...props}>
      {children}
    </HighlightedPre>
  </Suspense>
)

CodeBlock.displayName = 'CodeBlock'

const components: Partial<Components> = {
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className='font-medium underline underline-offset-4' rel='noreferrer' target='_blank' {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote className='mt-4 border-l-2 pl-6 italic' {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const match = /language-(?<lang>\w+)/u.exec(className ?? '')
      if (match?.length && match.groups?.lang)
        return (
          <CodeBlock className={className} language={match.groups.lang} {...props}>
            {children}
          </CodeBlock>
        )

      return (
        <code className={cn('rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props}>
          {children}
        </code>
      )
    },
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className='mt-2 scroll-m-20 text-4xl font-bold' {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className='mt-8 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0' {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className='mt-4 scroll-m-20 text-xl font-semibold tracking-tight' {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className='mt-4 scroll-m-20 text-lg font-semibold tracking-tight' {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5 className='mt-4 scroll-m-20 text-lg font-semibold tracking-tight' {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6 className='mt-4 scroll-m-20 text-base font-semibold tracking-tight' {...props}>
        {children}
      </h6>
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className='my-4 md:my-8' {...props} />,
    img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} className='rounded-md' {...props} />
    ),
    li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li className='mt-2' {...props}>
        {children}
      </li>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className='my-4 ml-6 list-decimal' {...props}>
        {children}
      </ol>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className='leading-6 [&:not(:first-child)]:mt-4' {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <span className='font-semibold' {...props}>
        {children}
      </span>
    ),
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className='my-6 w-full overflow-y-auto'>
        <table className='relative w-full overflow-hidden border-none text-sm' {...props}>
          {children}
        </table>
      </div>
    ),
    td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td className='px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right' {...props}>
        {children}
      </td>
    ),
    th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th className='px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right' {...props}>
        {children}
      </th>
    ),
    tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr className='last:border-b-none m-0 border-b' {...props}>
        {children}
      </tr>
    ),
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className='my-4 ml-6 list-disc' {...props}>
        {children}
      </ul>
    )
  },
  parseMarkdownIntoBlocks = (markdown: string): string[] => {
    if (!markdown) return []

    const tokens = marked.lexer(markdown)
    return tokens.map(token => token.raw)
  },
  MemoizedMarkdownBlock = memo(
    ({
      content
    }: {
      content: string
    }) => (
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    ),
    (prevProps, nextProps) => {
      if (prevProps.content !== nextProps.content) return false

      return true
    }
  )

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock'

interface MarkdownContentProps {
  content: string
  id: string
}

export const MarkdownContent = memo(({ content, id }: MarkdownContentProps) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content || ''), [content])

  return blocks.map((block, index) => <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />)
})

MarkdownContent.displayName = 'MarkdownContent'
