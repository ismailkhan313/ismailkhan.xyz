import { QuartzComponentConstructor } from "./types"
import style from "./styles/LinksHeader.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksHeader() {
    return (
      <div>
        <div id="links-header">
          <span>
            <a href="/Islam/">Islam</a>
          </span>
          <span>
            <a href="/Theology/">Theology</a>
          </span>
          <span>
            <a href="/Sufism">Sufism</a>
          </span>
          <span>
            <a href="/Sacred-Law">Sacred Law</a>
          </span>
          <span>
            <a href="/Hadith">Hadith</a>
          </span>
        </div>
        <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 1.3rem"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor
