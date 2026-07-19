import { Client } from '@notionhq/client'
import type {
  PageObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

let dataSourceId: string | null = null

async function getDataSourceId(): Promise<string | null> {
  if (dataSourceId) return dataSourceId
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) return null

  const database = await notion.databases.retrieve({ database_id: databaseId })
  const dataSources = 'data_sources' in database ? database.data_sources : []
  dataSourceId = dataSources[0]?.id ?? null
  return dataSourceId
}

export type PostType = 'Post' | 'Thought'

export interface PostSummary {
  id: string
  slug: string
  title: string
  date: string
  tags: string[]
  type: PostType
  excerpt: string
  cover: string | null
}

export interface Post extends PostSummary {
  markdown: string
}

function isFullPage(
  page: QueryDataSourceResponse['results'][number]
): page is PageObjectResponse {
  return 'properties' in page
}

function mapPageToSummary(page: PageObjectResponse): PostSummary {
  const props = page.properties

  const title =
    props.Name?.type === 'title'
      ? props.Name.title.map((t) => t.plain_text).join('')
      : ''

  const slug =
    props.Slug?.type === 'rich_text'
      ? props.Slug.rich_text.map((t) => t.plain_text).join('')
      : ''

  const date =
    props.Date?.type === 'date' && props.Date.date
      ? props.Date.date.start
      : ''

  const tags =
    props.Tags?.type === 'multi_select'
      ? props.Tags.multi_select.map((t) => t.name)
      : []

  const type: PostType =
    props.Type?.type === 'select' && props.Type.select?.name === 'Thought'
      ? 'Thought'
      : 'Post'

  const excerpt =
    props.Excerpt?.type === 'rich_text'
      ? props.Excerpt.rich_text.map((t) => t.plain_text).join('')
      : ''

  const cover =
    page.cover?.type === 'external'
      ? page.cover.external.url
      : page.cover?.type === 'file'
      ? page.cover.file.url
      : null

  return { id: page.id, slug, title, date, tags, type, excerpt, cover }
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data_source_id = await getDataSourceId()
  if (!data_source_id) return []

  const res = await notion.dataSources.query({
    data_source_id,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Date', direction: 'descending' }],
  })

  return res.results.filter(isFullPage).map(mapPageToSummary)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  const summary = posts.find((p) => p.slug === slug)
  if (!summary) return null

  const mdBlocks = await n2m.pageToMarkdown(summary.id)
  const markdown = n2m.toMarkdownString(mdBlocks).parent

  return { ...summary, markdown }
}
