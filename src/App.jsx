import { useEffect, useState } from 'react'
import { experience, games, skills } from './data/games.js'
import { playableAds } from './data/playableAds.js'
import { decodePlayableSource } from './utils/playableSource.js'
import portfolioPdf from '../Contents/Portfolio_JERICSON_ESTERON_3.pdf'
import cvPdf from '../Contents/CV_2026_Jericson_Esteron.pdf'

const gameCategories = [
  { value: 'Client Project', label: 'External Project' },
  { value: 'Indie game', label: 'Internal Projects' },
  { value: 'Side Games', label: 'Prototype' },
]

function GameCard({ game }) {
  const playable = game.playableAd

  return (
    <article className="game-card">
      <div className="game-media">
        {playable?.src ? (
          <iframe
            src={playable.src}
            title={`${game.title} playable ad`}
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            loading="lazy"
          />
        ) : (
          <div className={`game-image-grid ${game.images.length > 1 ? 'has-multiple' : ''}`}>
            {game.images.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
        )}
        {playable && (
          <span className="media-label">Playable ad · developer work</span>
        )}
      </div>

      <div className="game-copy">
        <div className="eyebrow">
          {game.genre} · {game.platform}
        </div>
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <dl className="game-meta">
          <div><dt>Role</dt><dd>{game.role}</dd></div>
          <div><dt>Built with</dt><dd>{game.technologies.join(' · ')}</dd></div>
        </dl>
        <div className="card-actions">
          {game.gameUrl ? (
            <a className="button button-primary" href={game.gameUrl} target="_blank" rel="noreferrer">
              Play / view project ↗
            </a>
          ) : (
            <span className="button button-muted">Project link unavailable</span>
          )}
          {playable?.fallbackUrl && (
            <a className="text-link" href={playable.fallbackUrl}>Open playable ↗</a>
          )}
        </div>
      </div>
    </article>
  )
}

function PlayableAdCard({ ad }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('')
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const launchPlayable = async () => {
    setOpen(true)
    setSource('')
    setLoadError(false)

    try {
      setSource(await decodePlayableSource(ad.source))
    } catch {
      setLoadError(true)
    }
  }

  return (
    <article className="playable-card">
      <button
        className="playable-launcher"
        type="button"
        onClick={launchPlayable}
        aria-label={`Launch ${ad.title} playable ad`}
      >
        <img src={ad.poster} alt="" />
        <span className="playable-launcher-shade" aria-hidden="true" />
        <span className="launch-icon" aria-hidden="true">▶</span>
        <span>Click to play</span>
        <small>Interactive HTML experience</small>
      </button>

      {open && (
        <div className="playable-modal" role="dialog" aria-modal="true" aria-label={`${ad.title} playable ad`}>
          <button
            className="playable-close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close playable ad"
          >
            ×
          </button>
          {source && !loadError && (
            <iframe
              srcDoc={source}
              title={`${ad.title} playable ad`}
              sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            />
          )}
          {!source && !loadError && (
            <p className="playable-status" role="status">Loading playable…</p>
          )}
          {loadError && (
            <p className="playable-status" role="alert">
              This playable could not load in this browser.
            </p>
          )}
        </div>
      )}
    </article>
  )
}

export default function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          JERICSON<span>_ESTERON</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#playables">Playables</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">I build Unity games · gameplay systems · mobile experiences</p>
          <h1 id="hero-title">Jericson<br /><em>Esteron.</em></h1>
          <p className="hero-intro">
            I’m a game developer with 5 years of experience turning ideas into responsive,
            production-ready games, prototypes, and playable ads.
          </p>
          <a className="button button-primary" href="#about">
            Learn more about me <span aria-hidden="true">↓</span>
          </a>
          <div className="hero-stamp" aria-hidden="true">
            <span>UNITY<br />GAMEPLAY<br />DEVELOPER</span>
            <b>✦</b>
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">My work</p>
              <h2 id="work-title">How I contribute</h2>
            </div>
            <p className="section-note">
              I create gameplay, systems, prototypes, and production-ready experiences.
            </p>
          </div>

          {gameCategories.map((category) => {
            const categoryGames = games.filter((game) => game.category === category.value)

            return (
              <section className="game-category" key={category.value} aria-labelledby={`${category.value}-title`}>
                <div className="category-heading">
                  <h3 id={`${category.value}-title`}>{category.label}</h3>
                </div>
                <div className="game-grid">
                  {categoryGames.map((game) => <GameCard key={game.title} game={game} />)}
                </div>
              </section>
            )
          })}
        </section>

        <section className="playables-section" id="playables" aria-labelledby="playables-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">My interactive ads</p>
              <h2 id="playables-title">Playable ads</h2>
            </div>
            <p className="section-note">
              I build HTML experiences for mobile acquisition and rapid iteration.
            </p>
          </div>
          <div className="playables-grid">
            {playableAds.map((ad) => <PlayableAdCard key={ad.title} ad={ad} />)}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">I build practical systems.<br /><em>I improve player feel.</em></h2>
          <p>
            I specialize in Unity and mobile game development, from early prototypes to polished
            production features. I work across gameplay programming, multiplayer, UI systems,
            performance optimization, legacy codebases, and Luna playable ads.
          </p>
          <div className="profile-actions">
            <a className="button button-primary" href={cvPdf} download="Jericson-Esteron-CV.pdf">
              Download my CV ↓
            </a>
            <a className="text-link" href={portfolioPdf} target="_blank" rel="noreferrer">
              View my portfolio PDF ↗
            </a>
          </div>
          <div className="skills">
            <p className="eyebrow">My toolkit</p>
            <div className="skill-list">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="experience-section" aria-labelledby="experience-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">My experience</p>
              <h2 id="experience-title">Experience that<br /><em>ships.</em></h2>
            </div>
            <p className="section-note">
              I’ve worked across mobile games, multiplayer systems, and playable ads.
            </p>
          </div>

          <div className="experience-list">
            {experience.map((job) => (
              <article className="experience-item" key={`${job.company}-${job.dates}`}>
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                </div>
                <time>{job.dates}</time>
                <p className="experience-details">{job.details}</p>
              </article>
            ))}
          </div>

          <div className="education-row">
            <div>
              <p className="eyebrow">My education</p>
              <h3>University of the East</h3>
              <p>I studied Computer Engineering in Manila and graduated in March 2020.</p>
            </div>
            <div>
              <p className="eyebrow">Contact me</p>
              <a href="mailto:esteron.jericson@gmail.com">esteron.jericson@gmail.com</a>
              <p>I’m based in Taguig City, Philippines.</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div>
          <p className="eyebrow">I’m available for the right challenge</p>
          <h2>Let’s build a<br /><em>better game.</em></h2>
        </div>
        <a className="button button-light" href="mailto:esteron.jericson@gmail.com">
          Contact me ↗
        </a>
        <p className="footer-note">© 2026 Jericson Esteron · Unity game developer</p>
      </footer>
    </div>
  )
}
