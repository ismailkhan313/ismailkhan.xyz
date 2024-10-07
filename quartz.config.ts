import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ismail Khan🌴",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ismailkhan.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "published",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Source Sans Pro",
        body: "Crimson Text",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fdf5e6" /* Sand Dune Light */,
          lightgray: "#dcc8a7" /* Desert Stone */,
          gray: "#b39c78" /* Warm Sand */,
          darkgray: "#665d4a" /* Oasis Shade */,
          dark: "#3c3b37" /* Date Palm Trunk */,
          secondary: "#276678" /* Oasis Water */,
          tertiary: "#79b791" /* Palm Fronds */,
          highlight: "rgba(139, 164, 144, 0.15)" /* Palm Shade */,
          textHighlight: "#ffd96688" /* Sunlight Glow */,
        },
        darkMode: {
          light: "#1c1a1a" /* Midnight Sand */,
          lightgray: "#4a413b" /* Moonlit Desert */,
          gray: "#7a6f64" /* Desert Twilight */,
          darkgray: "#cfc5b7" /* Oasis Mist */,
          dark: "#eae6d9" /* Moonlit Sand */,
          secondary: "#529aab" /* Deep Oasis Water */,
          tertiary: "#79b791" /* Palm Fronds */,
          highlight: "rgba(139, 164, 144, 0.15)" /* Palm Shade */,
          textHighlight: "#ffeb9388" /* Moonlight Glow */,
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
