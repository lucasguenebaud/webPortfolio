import React, { useEffect, useRef, useState } from "react";
import { resume, links, capabilities, experienceNotes } from "./portfolio-data";
import hero from "./assets/images/manOnTable.svg";
import developer from "./assets/images/developerActivity.svg";
import contact from "./assets/images/contactMailDark.svg";
import tf2 from "./assets/images/tf2.png";
import "./App.css";

const navigation = [
  ["expertise", "Expertise"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["about", "About"],
  ["contact", "Contact"],
];
function Icon({ name, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
    github: (
      <path d="M9 20c-4 1-4-2-6-2m12 4v-4c0-1 .1-2-.5-2.5 3-.3 6-1.5 6-6A5 5 0 0 0 19 6c.2-1 0-2-.5-3-2 0-3 1-3.5 1.5a12 12 0 0 0-6 0C8.5 4 7 3 5.5 3 5 4 5 5 5 6a5 5 0 0 0-1.5 3.5c0 4.5 3 5.7 6 6-.6.5-.5 1.5-.5 2.5v4" />
    ),
    linkedin: (
      <>
        <path d="M5 9v12M5 4v.1M10 21V9h5v2c3-4 6-1 6 2v8M2 9h5" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
function Reveal({ children, className = "", ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    element.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
}
function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function SectionHeading({ number, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        {number} / {title}
      </p>
      <h2>{children}</h2>
    </div>
  );
}
function SocialLinks() {
  return (
    <div className="social-links">
      <a href={links.github} aria-label="GitHub">
        <Icon name="github" />
      </a>
      <a href={links.linkedin} aria-label="LinkedIn">
        <Icon name="linkedin" />
      </a>
      <a href={links.email} aria-label="Email Lucas">
        <Icon name="mail" />
      </a>
    </div>
  );
}
function GraphArtwork() {
  return (
    <svg
      className="graph-art"
      viewBox="0 0 500 330"
      role="img"
      aria-label="Illustration of connected nodes in a genealogical graph"
    >
      <g stroke="currentColor" strokeWidth="1.5" opacity=".3" fill="none">
        <path d="M55 75 150 115 250 165 350 115 445 75M55 255 150 215 250 165 350 215 445 255M150 115 150 215M350 115 350 215M150 35 150 115 55 165 150 215 150 295M350 35 350 115 445 165 350 215 350 295M250 165V55M250 165v110" />
      </g>
      {[
        [55, 75],
        [55, 165],
        [55, 255],
        [150, 35],
        [150, 115],
        [150, 215],
        [150, 295],
        [250, 55],
        [250, 275],
        [350, 35],
        [350, 115],
        [350, 215],
        [350, 295],
        [445, 75],
        [445, 165],
        [445, 255],
      ].map(([x, y], i) => (
        <circle
          className="graph-node"
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 10 : 6}
          fill="currentColor"
          style={{ animationDelay: `${i * 0.19}s` }}
        />
      ))}
      <circle
        cx="250"
        cy="165"
        r="37"
        fill="var(--paper)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m234 180 5-25-4-9 14 4 8-6 11 12-8 4-5 20Z"
        fill="currentColor"
      />
    </svg>
  );
}
export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {
      /* Storage may be disabled. */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -50% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    if (menuOpen) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            className="signature"
            href="#home"
            aria-label="Lucas Guenebaud, home"
          >
            <span>&lt;</span> Lucas Guenebaud <span>/&gt;</span>
          </a>
          <nav
            id="navigation"
            aria-label="Main navigation"
            className={menuOpen ? "nav open" : "nav"}
          >
            {navigation.map(([id, name]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <button
              id="menu-toggle"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero container" id="home">
          <Reveal className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> {resume.basics.location.city},
                France · Data / Cloud / ML
              </p>
              <h1>
                Hey, I’m Lucas{" "}
                <span className="wave" role="img" aria-label="waving hand">
                  👋
                </span>
              </h1>
              <p className="hero-title">
                I turn complex data into
                <br />
                <span>systems you can trust.</span>
              </p>
              <p className="hero-description">
                {resume.basics.label}. I design cloud-native data platforms and
                bring machine learning into production — with a little curiosity
                and a lot of engineering.
              </p>
              <SocialLinks />
              <div className="hero-buttons">
                <a className="button" href="#experience">
                  Explore my work <Icon name="arrow" />
                </a>
                <a
                  className="button secondary"
                  href="./cv/cv.pdf"
                  download="Lucas-Guenebaud-CV.pdf"
                >
                  Download CV <Icon name="download" />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <img
                src={hero}
                alt=""
                width="996"
                height="828"
                fetchPriority="high"
              />
              <div className="illustration-caption">
                <span className="tiny-line" /> Curious by nature. Engineer by
                practice.
              </div>
            </div>
          </Reveal>
          <div className="career-strip">
            <p>Building on experience at</p>
            <div className="company-wordmarks">
              <span className="decathlon">DECATHLON</span>
              <span className="matmut">
                matmut<span className="brand-dot">.</span>
              </span>
              <span className="renault">RENAULT</span>
            </div>
            <a href="#expertise" className="scroll-cue">
              A little more about my work <span>↓</span>
            </a>
          </div>
        </section>
        <section id="expertise" className="section container">
          <Reveal>
            <SectionHeading number="01" title="Expertise">
              Good data. Solid foundations.
            </SectionHeading>
            <div className="expertise-intro">
              <p>
                My work sits at the intersection of data engineering, cloud
                platforms and applied AI. From the first pipeline to the
                production platform, I care about what happens after it ships.
              </p>
              <span className="section-note">
                Built to run.
                <br />
                Built to evolve.
              </span>
            </div>
            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="capability" key={item.number}>
                  <span className="card-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Tags items={item.skills} />
                </article>
              ))}
            </div>
            <details className="full-stack">
              <summary>
                Explore my full technical toolkit <span>+</span>
              </summary>
              <div className="stack-grid">
                {resume.skills.map((skill) => (
                  <div key={skill.name}>
                    <h3>{skill.name}</h3>
                    <p>{skill.keywords.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </details>
          </Reveal>
        </section>
        <section id="experience" className="section experience-section">
          <div className="container">
            <Reveal>
              <SectionHeading number="02" title="Experience">
                From robotaxis to lakehouses.
              </SectionHeading>
              <p className="section-intro">
                An engineering journey through autonomous systems, production AI
                and large-scale data platforms.
              </p>
            </Reveal>
            <div className="timeline">
              {resume.work.map((job, i) => (
                <Reveal key={`${job.name}-${job.startDate}`}>
                  <article
                    className={`experience-row ${i === 0 ? "current-role" : ""}`}
                  >
                    <div className="experience-meta">
                      <p className="date">
                        {job.startDate} — {job.endDate || "Present"}
                      </p>
                      <h3 className={`employer ${job.name.toLowerCase()}`}>
                        {job.name}
                      </h3>
                      <p>{job.location}</p>
                      {!job.endDate && (
                        <span className="current-label">Current chapter</span>
                      )}
                    </div>
                    <div className="experience-body">
                      <p className="role-focus">
                        {experienceNotes[`${job.name}-${job.startDate}`]?.focus}
                      </p>
                      <h4>{job.position}</h4>
                      <ul className="highlights">
                        {job.highlights.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                      {experienceNotes[`${job.name}-${job.startDate}`] && (
                        <Tags
                          items={
                            experienceNotes[`${job.name}-${job.startDate}`].tags
                          }
                        />
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="section container">
          <Reveal>
            <SectionHeading number="03" title="Selected project">
              Curiosity, put into practice.
            </SectionHeading>
            <article className="project-feature">
              <div className="project-art">
                <GraphArtwork />
                <span>GENEALOGY → GRAPH LEARNING → PERFORMANCE</span>
              </div>
              <div className="project-copy">
                <p className="eyebrow">
                  Personal project / {resume.projects[0].startDate}
                </p>
                <h3>
                  {resume.projects[0].name}
                  <span className="accent">.</span>
                </h3>
                <p className="project-lead">A different kind of horsepower.</p>
                <p>{resume.projects[0].highlights[0]}</p>
                <Tags
                  items={[
                    "Graph attention networks",
                    ...resume.projects[0].keywords,
                  ]}
                />
                <a
                  className="text-link"
                  href={`mailto:${resume.basics.email}?subject=Let%E2%80%99s%20talk%20about%20Chevalue`}
                >
                  Let’s talk about the project <Icon name="arrow" />
                </a>
              </div>
            </article>
          </Reveal>
        </section>
        <section id="about" className="section container">
          <Reveal>
            <SectionHeading number="04" title="Beyond the stack">
              Engineer. Teammate. Always curious.
            </SectionHeading>
            <div className="about-grid">
              <div>
                <img
                  className="about-art"
                  src={developer}
                  alt=""
                  loading="lazy"
                  width="600"
                  height="420"
                />
                <h3>Technical depth, shared.</h3>
                <p>
                  I enjoy connecting architecture to day-to-day engineering:
                  setting technical standards, mentoring engineers and working
                  across disciplines to make things happen.
                </p>
                <div className="language-list">
                  {resume.languages.map((item) => (
                    <p key={item.language}>
                      <strong>{item.language}</strong>
                      <span>{item.fluency}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="education">
                <p className="eyebrow">Education</p>
                {resume.education.map((school) => (
                  <article key={school.institution}>
                    <p className="date">
                      {school.startDate} — {school.endDate}
                    </p>
                    <h3>{school.area}</h3>
                    <p>
                      {school.institution === "Sorbone University - Polytech"
                        ? "Sorbonne University — Polytech"
                        : school.institution}
                    </p>
                    <p className="degree">{school.studyType}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="human-grid">
              <article className="team-card">
                <img
                  src={tf2}
                  alt="Team Fortress 2"
                  width="72"
                  height="72"
                  loading="lazy"
                />
                <div>
                  <p className="eyebrow">
                    Teamwork, before the stand-ups / 2011–2014
                  </p>
                  <h3>European champion. Team leader.</h3>
                  <p>{resume.projects[1].highlights[0]}</p>
                </div>
              </article>
              <article className="outside-card">
                <p className="eyebrow">Away from the keyboard</p>
                <h3>Still exploring.</h3>
                <p>
                  Skiing, sailing and horse riding. Jazz dance, Lindy Hop and
                  theatre. Science fiction, role-playing games and the
                  occasional home renovation.
                </p>
              </article>
            </div>
          </Reveal>
        </section>
        <section id="contact" className="section contact-section">
          <Reveal className="container contact-grid">
            <div>
              <p className="eyebrow">05 / Get in touch</p>
              <h2>
                Let’s build something
                <br />
                <span className="accent">that works.</span>
              </h2>
              <p>
                Data platforms, cloud architecture, production AI — or an
                interesting engineering challenge. Let’s start a conversation.
              </p>
              <a className="contact-email" href={links.email}>
                {resume.basics.email}
                <Icon name="arrow" />
              </a>
              <div className="contact-actions">
                <SocialLinks />
                <a className="text-link" href="./cv/cv.html">
                  Read my full CV <Icon name="arrow" />
                </a>
              </div>
            </div>
            <img src={contact} alt="" width="580" height="400" loading="lazy" />
          </Reveal>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="signature" href="#home">
          Lucas Guenebaud
        </a>
        <p>Made with curiosity & a little purple.</p>
        <a href="#home" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
