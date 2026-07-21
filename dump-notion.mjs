import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import fs from 'fs'

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((a, l) => {
  const m = l.match(/^\s*([A-Z_]+)=(.*)$/)
  if (m) a[m[1]] = m[2].trim()
  return a
}, {})
const notion = new Client({ auth: env.NOTION_TOKEN })
const dbId = env.NOTION_DATABASE_ID

const db = await notion.databases.retrieve({ database_id: dbId })
const dsId = db.data_sources?.[0]?.id
const res = await notion.dataSources.query({ data_source_id: dsId })
const n2m = new NotionToMarkdown({ notionClient: notion })

const out = []
for (const p of res.results) {
  const props = p.properties
  const get = (n) => props[n]
  const title = (get('Name')?.title || []).map((t) => t.plain_text).join('')
  const slug = (get('Slug')?.rich_text || []).map((t) => t.plain_text).join('')
  const date = get('Date')?.date?.start || ''
  const tags = (get('Tags')?.multi_select || []).map((t) => t.name)
  const type = get('Type')?.select?.name || 'Post'
  const published = get('Published')?.checkbox || false
  const excerpt = (get('Excerpt')?.rich_text || []).map((t) => t.plain_text).join('')
  const md = await n2m.pageToMarkdown(p.id)
  const markdown = n2m.toMarkdownString(md).parent || ''
  out.push({ title, slug, date, tags, type, published, excerpt, markdown })
}
fs.writeFileSync('notion-dump.json', JSON.stringify(out, null, 2))
console.log('dumped', out.length, 'posts:', out.map((o) => o.title))
