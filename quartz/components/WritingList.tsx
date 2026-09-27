import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import { getDate } from "./Date"
import { classNames } from "../util/lang"

// Homepage list of blog posts, split by the `kind` frontmatter field.
// Posts with `kind: research` go under "Research notes"; everything else under "Writing".
// A group only renders once it has a published post, so an empty blog shows nothing.
const groups = [
  { kind: "research", title: "Research notes" },
  { kind: "writing", title: "Writing" },
] as const

export function isPost(slug: string | undefined): boolean {
  return !!slug && slug.startsWith("posts/") && slug !== "posts/index"
}

export function postKind(page: QuartzPluginData): "research" | "writing" {
  return page.frontmatter?.kind === "research" ? "research" : "writing"
}

export default (() => {
  const WritingList: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const posts = allFiles.filter((f) => isPost(f.slug)).sort(byDateAndAlphabetical(cfg))
    if (posts.length === 0) {
      return null
    }

    return (
      <div class={classNames(displayClass, "writing-list")}>
        {groups.map(({ kind, title }) => {
          const pages = posts.filter((p) => postKind(p) === kind)
          if (pages.length === 0) {
            return null
          }
          return (
            <section data-kind={kind}>
              <h2>{title}</h2>
              <ul class="cv-list">
                {pages.map((page) => {
                  const date = getDate(cfg, page)
                  return (
                    <li>
                      <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                        {page.frontmatter?.title}
                      </a>
                      {date && (
                        <span class="when">
                          {date.toLocaleDateString(cfg.locale, { month: "short", year: "numeric" })}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    )
  }

  return WritingList
}) satisfies QuartzComponentConstructor
