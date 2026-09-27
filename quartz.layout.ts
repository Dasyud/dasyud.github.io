import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// giscus comments, backed by GitHub Discussions on the site repo.
// Get the IDs from https://giscus.app (or `gh api graphql`); comments stay hidden until both are set.
const giscus = {
  repo: "Dasyud/dasyud.github.io",
  repoId: "R_kgDOQyRmdw",
  category: "Announcements",
  categoryId: "DIC_kwDOQyRmd84DGfYg",
} as const

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.Darkmode()],
  afterBody: [
    Component.ConditionalRender({
      component: Component.Comments({
        provider: "giscus",
        options: {
          ...giscus,
          mapping: "pathname",
          strict: false,
          reactionsEnabled: true,
          inputPosition: "bottom",
        },
      }),
      condition: (page) =>
        giscus.repoId !== "" &&
        giscus.categoryId !== "" &&
        page.fileData.slug!.startsWith("posts/") &&
        page.fileData.slug !== "posts/index",
    }),
  ],
  footer: Component.Footer({ links: {} }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.ConditionalRender({
      component: Component.PageTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  right: [Component.DesktopOnly(Component.TableOfContents())],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [Component.PageTitle()],
  right: [],
}
