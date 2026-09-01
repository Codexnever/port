import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Database,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react"

const projects = [
  {
    number: "01",
    title: "Rerank Debugger",
    label: "Retrieval evaluation workspace",
    description:
      "A hands-on arena for comparing Exa, Weaviate, fused, and diversified retrieval on the same query. It combines blind relevance judgments, Cohere reranking, and ranking metrics so search decisions become measurable.",
    tags: ["Exa", "Weaviate", "Cohere", "NDCG", "MMR"],
    href: "https://rerank-debugger.vercel.app",
    linkLabel: "Open live project",
    icon: SlidersHorizontal,
    featured: true,
  },
  {
    number: "02",
    title: "Exa Ranking Lab",
    label: "Search ranking observability",
    description:
      "Captures search snapshots and turns them into churn, volatility, anomaly, and semantic-drift signals—helping teams see how retrieval results evolve over time.",
    tags: ["Next.js", "TypeScript", "Appwrite", "Weaviate"],
    href: "https://exa-ranking-lab.vercel.app",
    linkLabel: "Explore the lab",
    icon: Activity,
    featured: false,
  },
  {
    number: "03",
    title: "No-Code AI Workflow",
    label: "Visual automation builder",
    description:
      "A drag-and-drop workflow tool for composing AI actions without wiring every step by hand, backed by reusable nodes and persistent workflows.",
    tags: ["Next.js", "Node.js", "Appwrite", "React Flow"],
    href: "https://github.com/Codexnever/No-Code-AI-Workflow",
    linkLabel: "View on GitHub",
    icon: Layers3,
    featured: false,
  },
]

const skillGroups = [
  {
    title: "Retrieval",
    icon: Search,
    items: ["BM25", "Dense search", "Hybrid search", "HNSW", "Reranking", "NDCG / MRR"],
  },
  {
    title: "Building",
    icon: Braces,
    items: ["Next.js", "TypeScript", "React", "Node.js", "REST APIs", "Testing"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["Weaviate", "Appwrite", "Redis", "MySQL", "MongoDB", "Embeddings"],
  },
]

export default function Home() {
  return (
    <main id="top" className="site-shell">
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>

      <header className="nav-wrap">
        <nav className="nav-surface" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Chaitanya Kulthe, home">
            <span className="brand-mark">CK</span>
            <span className="brand-copy">
              <strong>Chaitanya Kulthe</strong>
              <small>Search systems builder</small>
            </span>
          </a>

          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <a className="mini-button" href="mailto:chaitanyakulthe777@gmail.com">
            Let&apos;s talk
            <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero section-frame" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="availability-pill">
            <span className="status-light" aria-hidden="true" />
            Building in public from Pune, India
          </div>

          <p className="eyebrow">Full-stack developer · retrieval obsessed</p>
          <h1 id="hero-title">
            I build tools that make search quality <em>visible.</em>
          </h1>
          <p className="hero-intro">
            I&apos;m Chaitanya—a self-taught developer exploring the layer between retrieval and relevance. My work turns
            ranking changes, semantic drift, and reranking choices into things engineers can inspect and improve.
          </p>

          <div className="hero-actions">
            <a className="raised-button primary-button" href="#work">
              See selected work
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a
              className="raised-button icon-button"
              href="https://github.com/Codexnever"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Chaitanya's GitHub profile"
            >
              <Github aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="workbench" aria-label="Illustration of a search quality workbench">
          <div className="workbench-top">
            <div className="screw" aria-hidden="true" />
            <div>
              <span>SEARCH QUALITY</span>
              <strong>Workbench / 01</strong>
            </div>
            <div className="signal-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="screw" aria-hidden="true" />
          </div>

          <div className="screen-panel">
            <span className="screen-label">ACTIVE QUERY</span>
            <p>why did this result move?<span className="screen-caret" aria-hidden="true" /></p>
          </div>

          <div className="pipeline-panel">
            <div className="pipeline-heading">
              <span>Candidate flow</span>
              <span>Top 10</span>
            </div>

            <div className="pipeline-row">
              <span className="source-dot source-dot-orange" aria-hidden="true" />
              <strong>Exa</strong>
              <small>live web</small>
              <div className="meter"><i style={{ width: "82%" }} /></div>
            </div>
            <div className="pipeline-row">
              <span className="source-dot source-dot-blue" aria-hidden="true" />
              <strong>Weaviate</strong>
              <small>memory</small>
              <div className="meter"><i style={{ width: "68%" }} /></div>
            </div>
            <div className="pipeline-row">
              <span className="source-dot source-dot-green" aria-hidden="true" />
              <strong>Cohere</strong>
              <small>rerank</small>
              <div className="meter"><i style={{ width: "91%" }} /></div>
            </div>
          </div>

          <div className="metric-dials">
            <div className="metric-dial">
              <span>NDCG@10</span>
              <strong>.87</strong>
              <i className="dial-line dial-line-one" aria-hidden="true" />
            </div>
            <div className="metric-dial">
              <span>CHURN</span>
              <strong>42%</strong>
              <i className="dial-line dial-line-two" aria-hidden="true" />
            </div>
            <div className="metric-dial">
              <span>DRIFT</span>
              <strong>LOW</strong>
              <i className="dial-line dial-line-three" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-frame section-block" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">Built to answer real retrieval questions.</h2>
          </div>
          <p>
            Less “AI wrapper,” more instrumentation: projects that expose how retrieval systems behave and where they
            fail.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const Icon = project.icon

            return (
              <article className={`project-card ${project.featured ? "project-featured" : ""}`} key={project.title}>
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <div className="project-icon">
                    <Icon aria-hidden="true" />
                  </div>
                </div>
                <p className="project-label">{project.label}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tag-row" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                  {project.linkLabel}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section id="about" className="section-frame section-block" aria-labelledby="about-title">
        <div className="about-panel">
          <div className="about-copy">
            <p className="eyebrow">02 / About</p>
            <h2 id="about-title">Learning search by building the missing instruments.</h2>
            <p>
              I started as a full-stack developer and kept moving closer to the hard part: deciding which information
              deserves to be returned first. Today I build around hybrid retrieval, vector search, reranking, and
              evaluation—then explain what I learn in public.
            </p>
            <blockquote>
              “Similarity gets candidates. Evaluation tells us whether they were actually useful.”
            </blockquote>
            <div className="location-line">
              <MapPin aria-hidden="true" /> Pune, India
              <span aria-hidden="true">·</span>
              Open to search and applied AI teams
            </div>
          </div>

          <div className="skill-rack">
            {skillGroups.map((group) => {
              const Icon = group.icon

              return (
                <div className="skill-module" key={group.title}>
                  <div className="skill-title">
                    <span><Icon aria-hidden="true" /></span>
                    <strong>{group.title}</strong>
                  </div>
                  <div className="skill-list">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="section-frame contact-section" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div className="contact-copy">
            <div className="contact-icon" aria-hidden="true">
              <Sparkles />
            </div>
            <div>
              <p className="eyebrow">03 / Contact</p>
              <h2 id="contact-title">Working on search that deserves a debugger?</h2>
              <p>I&apos;d love to hear what you&apos;re building, what is breaking, and which metric refuses to explain why.</p>
            </div>
          </div>

          <a className="raised-button primary-button contact-button" href="mailto:chaitanyakulthe777@gmail.com">
            <Mail aria-hidden="true" />
            Send me an email
          </a>
        </div>
      </section>

      <footer className="footer section-frame">
        <div>
          <strong>Chaitanya Kulthe</strong>
          <span>Full-stack developer building better ways to inspect search.</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Codexnever" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/chaitanya-kulthe/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin aria-hidden="true" />
          </a>
          <a href="https://x.com/ChaitanyaK57" target="_blank" rel="noreferrer" aria-label="X profile">
            <span className="x-mark">𝕏</span>
          </a>
        </div>
      </footer>
    </main>
  )
}
