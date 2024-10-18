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
            <a href="/Notes/">Notes</a>
          </span>
          <span>
            <a href="/Deen/">Deen</a>
          </span>
          <span>
            <a href="/Aqidah/">Aqidah</a>
          </span>
          <span>
            <a href="/Tasawwuf/">Tasawwuf</a>
          </span>
          <span>
            <a href="/Shariah/">Shariah</a>
          </span>
          <span>
            <a href="/Hadith/">Hadith</a>
          </span>
          <span>
            <a href="/Al-Mustafa/">Al-Mustafa ﷺ</a>
          </span>
          <span>
            <a href="/Lugha/">Lugha</a>
          </span>
        </div>
        <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin-top: 1.3rem"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor
