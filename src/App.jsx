import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, AtSign, ChevronRight, Clock, MapPin, Menu, X } from 'lucide-react'

const heroImage = '/media/sangam-community.jpg'
const communityVideo = '/media/sangam-highlights.mp4'
const homeCultureMontage = '/media/home-culture-montage.mp4'

// Add confirmed partner names, logos, and links here as they are received.
const partners = []

const partnerGmailDraft = 'https://mail.google.com/mail/?view=cm&fs=1&to=sangamatucsd@gmail.com&su=Partnering%20with%20SangamSD&body=Hi%20SangamSD%2C%0A%0AI%27m%20interested%20in%20exploring%20a%20partnership.%0A%0AOur%20organization%3A%20%0A%0AAn%20idea%20we%27d%20like%20to%20discuss%3A%20%0A%0AThank%20you!'
const generalGmailDraft = 'https://mail.google.com/mail/?view=cm&fs=1&to=sangamatucsd@gmail.com'

const events = [
  { month: 'FALL', day: '—', title: 'Raas Garba', type: 'Culture', location: 'Date and venue coming soon', color: 'saffron' },
  { month: 'TBA', day: '—', title: 'Bollywood Bash', type: 'Celebration', location: 'Details coming soon', color: 'rani' },
  { month: 'TBA', day: '—', title: 'Community Socials', type: 'Community', location: 'Across UC San Diego', color: 'teal' },
]

const pastEvents = [
  { title: 'Culture Show', type: 'Performance', video: '/media/archive-culture-montage.mp4', poster: '/media/archive-culture-montage-poster.jpg', description: 'A full-scale celebration shaped by South Asian dance, music, storytelling, and the students who bring it all to the stage.' },
  { title: 'Raas Garba', type: 'Tradition', photo: '/media/raas-garba-group.jpg', description: 'An evening of music and movement where experienced dancers and first-timers share the same circle.' },
  { title: 'Community Gatherings', type: 'Belonging', photo: '/media/community-celebration.jpg', description: 'The socials, celebrations, and everyday moments that turn new faces across campus into familiar ones.' },
]

const board = [
  { name: 'Ayushi Shah', role: 'Co-President', photo: '/board/2025-26/ayushi-shah.jpg' },
  { name: 'Aryan Panchal', role: 'Co-President', photo: '/board/2025-26/aryan-panchal.jpg' },
  { name: 'Lakshya Rajaram', role: 'Vice President', photo: '/board/2025-26/lakshya-rajaram.jpg' },
  { name: 'Yohann D Souza', role: 'VP Finance' },
  { name: 'Sudiksha Ravipati', role: 'Secretary', photo: '/board/2025-26/sudiksha-ravipati.jpg' },
  { name: 'Varun Sinha', role: 'Technology', photo: '/board/2025-26/varun-sinha.jpg' },
  { name: 'Karina Shah', role: 'Technology', photo: '/board/2025-26/karina-shah.jpg' },
  { name: 'Krish Kankure', role: 'Technology', photo: '/board/2025-26/krish-kankure.jpg' },
  { name: 'Amey Gupta', role: 'Culture Show' },
  { name: 'Reya Sankar', role: 'Culture Show', photo: '/board/2025-26/reya-sankar.jpg' },
  { name: 'Anagha Kamath', role: 'Culture Show', photo: '/board/2025-26/anagha-kamath.jpg' },
  { name: 'Nihira Kalapatapu', role: 'Publicity', photo: '/board/2025-26/nihira-kalapatapu.jpg' },
  { name: 'Ashmita Beyyala', role: 'Publicity', photo: '/board/2025-26/ashmita-beyyala.jpg' },
  { name: 'Zaara Sutarwala', role: 'Publicity', photo: '/board/2025-26/zaara-sutarwala.jpg' },
  { name: 'Vennela Chimakurty', role: 'Social', photo: '/board/2025-26/vennela-chimakurty.jpg' },
  { name: 'Viraj Chaudhary', role: 'Social', photo: '/board/2025-26/viraj-chaudhary.jpg' },
  { name: 'Arshia Sohal', role: 'Social', photo: '/board/2025-26/arshia-sohal.jpg' },
  { name: 'Sonakshi Mohanty', role: 'Social', photo: '/board/2025-26/sonakshi-mohanty.jpg' },
  { name: 'Aaditya Pillai', role: 'Membership & Outreach', photo: '/board/2025-26/aaditya-pillai.jpg' },
  { name: 'Aditya Kollipara', role: 'Membership & Outreach' },
  { name: 'Riddhi Kumar', role: 'Membership & Outreach', photo: '/board/2025-26/riddhi-kumar.jpg' },
  { name: 'Rahul Sengupta', role: 'Membership & Outreach', photo: '/board/2025-26/rahul-sengupta.jpg' },
  { name: 'Eshan Alomari', role: 'Finance', photo: '/board/2025-26/eshan-alomari.jpg' },
  { name: 'Jay Nayyar', role: 'First-Year Representative', photo: '/board/2025-26/jay-nayyar.jpg' },
  { name: 'Bhumi Chauhan', role: 'First-Year Representative', photo: '/board/2025-26/bhumi-chauhan.jpg' },
  { name: 'Afsah Khan', role: 'First-Year Representative', photo: '/board/2025-26/afsah-khan.jpg' },
  { name: 'Tanush Thatavarthi', role: 'First-Year Representative', photo: '/board/2025-26/tanush-thatavarthi.jpg' },
  { name: 'Sreekar Vemula', role: 'Transfer Representative', photo: '/board/2025-26/sreekar-vemula.jpg' },
  { name: 'Ria Parikh', role: 'Transfer Representative', photo: '/board/2025-26/ria-parikh.jpg' },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['About', '/about'], ['Events', '/events'], ['Culture Show', '/culture-show'], ['Partners', '/partners'], ['Board', '/board']]
  return <header className="site-header">
    <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label="SangamSD home">
      <img className="brand-logo" src="/brand/sangamsd-logo.png" alt="SangamSD" />
    </Link>
    <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav className={open ? 'nav-open' : ''}>
      {links.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
      <Link className="button button-small" to="/join" onClick={() => setOpen(false)}>Join Sangam <ArrowRight size={16} /></Link>
    </nav>
  </header>
}

function Footer() {
  return <footer className="site-footer-compact">
    <div className="footer-bottom">
      <Link className="brand brand-light" to="/"><img className="brand-logo" src="/brand/sangamsd-logo.png" alt="SangamSD" /></Link>
      <div className="footer-links"><Link to="/about">About</Link><Link to="/events">Events</Link><Link to="/partners">Partners</Link><Link to="/board">Board</Link><a href={generalGmailDraft} target="_blank" rel="noreferrer">Contact</a></div>
      <div className="social"><a href="https://www.instagram.com/sangamsd" aria-label="Instagram"><AtSign size={19} /></a><span>© 2026 SangamSD</span></div>
    </div>
  </footer>
}

function Page({ children }) { return <><Header /><main>{children}</main><Footer /></> }

function Home() {
  return <Page>
    <section className="hero">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span /> South Asian culture at UC San Diego</p>
        <h1>Culture that<br /><em>moves</em> with us.</h1>
        <p className="hero-intro">South Asian culture, community, and celebration—made by students, open to everyone.</p>
        <div className="button-row"><Link className="button" to="/events">Upcoming events <ArrowRight size={18} /></Link><Link className="text-link" to="/about">Explore Sangam <ChevronRight size={18} /></Link></div>
      </div>
      <div className="hero-visual reveal delay">
        <div className="color-orbit orbit-one" /><div className="color-orbit orbit-two" />
        <div className="hero-frame"><img src={heroImage} alt="SangamSD Culture Show performance" /><span className="image-label">Culture Show · UC San Diego</span></div>
        <div className="hero-stamp"><span>संगम</span><small>Coming together</small></div>
      </div>
    </section>

    <section className="ticker" aria-label="Sangam values"><span>Culture</span><i>✦</i><span>Community</span><i>✦</i><span>Celebration</span><i>✦</i><span>Belonging</span></section>

    <section className="next-event section-pad">
      <div className="section-heading"><div><p className="eyebrow">Upcoming events at Sangam</p><h2>Your next favorite<br />memory starts here.</h2></div><Link className="text-link" to="/events">View all events <ArrowRight size={17} /></Link></div>
      <article className="featured-event">
        <div className="event-date"><span className="date-label">Date</span><strong>Fall</strong><span>Date TBA</span></div>
        <div className="event-info"><span className="event-tag">Signature tradition</span><h3>Raas Garba</h3><p>Music, movement, and a packed ballroom. Whether you know every step or none at all, there’s room in the circle.</p><div className="event-meta"><span><Clock size={17} /> Time TBA</span><span><MapPin size={17} /> Venue TBA</span></div></div>
        <Link className="round-link" to="/events" aria-label="Raas Garba details"><ArrowRight /></Link>
      </article>
    </section>

    <section className="partners-home section-pad">
      <div className="partners-copy"><p className="eyebrow light">Our partners</p><h2>Support our<br />celebrations.</h2><p>Sangam’s events and traditions grow through the generosity of businesses, alumni, families, and community supporters.</p><Link className="button button-ivory" to="/partners">Meet our partners <ArrowRight size={18} /></Link></div>
      <div className="partner-wall">
        {partners.length ? partners.slice(0, 6).map((partner) => <a href={partner.url} key={partner.name}><img src={partner.logo} alt={partner.name} /></a>) : <div className="partner-empty"><span>2026—27 partner roster</span><strong>Coming soon</strong><p>Confirmed names and logos will be recognized here.</p></div>}
      </div>
    </section>

    <section className="experience section-pad">
      <div className="section-heading"><div><p className="eyebrow">The Sangam experience</p><h2>There’s a place<br />for you in it.</h2></div><p>From your first social to the Culture Show stage, Sangam is something you experience—not just something you join.</p></div>
      <div className="photo-story">
        <div className="photo-main"><img src="/media/sangam-experience-group.jpg" alt="SangamSD members smiling together after a community performance" /></div>
        <div className="photo-copy"><span className="big-number">ALL</span><p>backgrounds, experiences, and levels of familiarity are welcome in the circle.</p><Link className="text-link" to="/join">Join the community <ArrowRight size={17} /></Link></div>
        <div className="pattern-card"><div className="rangoli" /><span>Everyone is welcome.</span></div>
      </div>
    </section>

    <section className="culture-feature section-pad">
      <div className="culture-art"><video autoPlay muted loop playsInline poster="/media/home-culture-montage-poster.jpg" aria-label="A montage of SangamSD Culture Show performances"><source src={homeCultureMontage} type="video/mp4" /></video><span>AN ANNUAL TRADITION</span></div>
      <div className="culture-copy"><p className="eyebrow light">Our signature production</p><h2>Culture Show</h2><p>One stage. Dozens of performers. A joyful tour through the sounds, movement, and stories of South Asia.</p><Link className="button button-ivory" to="/culture-show">Discover Culture Show <ArrowRight size={18} /></Link></div>
    </section>

    <section className="legacy section-pad">
      <p className="eyebrow">Since 1986</p><blockquote>“What began as friends sharing culture on the grass at UCSD became a community bigger than we ever imagined.”</blockquote><p className="quote-credit">— Aasha Sachdev, founding member</p>
      <Link className="text-link" to="/about">Read our story <ArrowRight size={17} /></Link>
    </section>
  </Page>
}

function Intro({ eyebrow, title, body, accent = 'saffron' }) {
  return <section className={`page-intro accent-${accent}`}><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><p>{body}</p></section>
}

function About() {
  return <Page>
    <section className="about-mission-hero">
      <div className="about-mission-copy"><span className="mission-label">Our mission</span><blockquote>To promote South Asian cultural awareness and education at UC San Diego and beyond, while <em>building an inclusive community</em> through culture, service, and shared experiences.</blockquote></div>
      <div className="about-mission-image"><img src="/media/about-mission-group.jpg" alt="SangamSD members gathered together on campus" /><span>SangamSD · UC San Diego</span></div>
    </section>

    <section className="about-purpose section-pad">
      <div className="about-purpose-heading"><p className="eyebrow">What we make room for</p><h2>More ways to<br />belong.</h2></div>
      <div className="about-lines">
        <article><span>01</span><h3>Experience culture</h3><p>Music, dance, food, traditions, and stories—shared in ways that feel alive today.</p></article>
        <article><span>02</span><h3>Find community</h3><p>Socials, service, study breaks, and everyday moments that turn new faces into friends.</p></article>
        <article><span>03</span><h3>Create together</h3><p>Student-led events and performances where everyone can contribute, on stage or behind the scenes.</p></article>
      </div>
    </section>

    <section className="about-welcome section-pad">
      <div><p className="eyebrow light">Everyone is welcome</p><h2>You don’t need to know every tradition to find your place here.</h2></div>
      <div className="about-welcome-copy"><p>Whether South Asian culture is part of your identity or something you’re discovering, curiosity is enough. Come to an event, bring a friend, and join in at your own pace.</p><div className="button-row"><Link className="button button-ivory" to="/join">Join Sangam <ArrowRight size={18} /></Link><Link className="text-link light-link" to="/events">Explore events <ArrowRight size={17} /></Link></div></div>
      <div className="about-legacy"><strong>Since 1986</strong><span>Student-led at UC San Diego, carried forward by each new generation.</span></div>
    </section>
  </Page>
}

function Events() {
  return <Page><section className="events-hero section-pad"><div><p className="eyebrow"><span /> Events at Sangam</p><h1>Show up.<br /><em>Join in.</em></h1></div><p>Signature traditions, performances, and low-key gatherings—each one is another way into the community.</p></section>
    <section className="events-list section-pad"><div className="section-heading"><div><p className="eyebrow">Coming up</p><h2>On the horizon</h2></div><p>The 2026–2027 calendar will be added as dates, times, and venues are confirmed.</p></div>{events.map((e) => <article className="event-row" key={e.title}><span className={`event-color ${e.color}`} /><div className="mini-date"><span className="mini-date-label">Date</span><strong>{e.month === 'FALL' ? 'Fall' : 'TBA'}</strong></div><div><span className="event-tag">{e.type}</span><h3>{e.title}</h3></div><p><MapPin size={16} /> {e.location}</p><a className="round-link" href="https://www.instagram.com/sangamsd" aria-label={`Follow for ${e.title} details`}><ArrowRight /></a></article>)}</section>
    <section className="past-events section-pad"><div className="section-heading"><div><p className="eyebrow">From the archive</p><h2>Past gatherings</h2></div><p>A glimpse at the traditions, performances, and moments of community that Sangam has brought to campus.</p></div><div className="past-events-grid">{pastEvents.map((event, index) => <article className={index === 0 ? 'past-event-featured' : ''} key={event.title}><div className="past-event-image">{event.video ? <video autoPlay muted loop playsInline poster={event.poster} aria-label={`${event.title} performance montage`}><source src={event.video} type="video/mp4" /></video> : <img src={event.photo} alt={`${event.title} at SangamSD`} />}<span>{String(index + 1).padStart(2, '0')}</span></div><div className="past-event-copy"><span className="event-tag">{event.type}</span><h3>{event.title}</h3><p>{event.description}</p></div></article>)}</div></section>
    <section className="event-note section-pad"><a className="instagram-visual" href="https://www.instagram.com/sangamsd" aria-label="Visit SangamSD on Instagram"><img src="/brand/sangamsd-instagram-avatar.jpg" alt="SangamSD Instagram profile logo" /><span>@sangamsd</span></a><div><p className="eyebrow light">Never miss the next one</p><h2>Announcements happen first on Instagram.</h2><a className="button button-ivory" href="https://www.instagram.com/sangamsd">Follow @sangamsd <ArrowRight size={18} /></a></div></section>
  </Page>
}

function CultureShow() {
  return <Page><section className="show-hero-cinematic"><video autoPlay muted loop playsInline poster={heroImage} aria-label="Highlights from SangamSD performances"><source src={communityVideo} type="video/mp4" /></video><div className="show-hero-overlay"><p className="eyebrow light">SangamSD presents</p><h1>Culture <em>Show</em></h1><p>Our annual celebration of South Asian performance, storytelling, and community.</p><span>AN ANNUAL TRADITION</span></div></section>

    <section className="show-intro-v2 section-pad"><div><p className="eyebrow">What it is</p><h2>One stage.<br />A whole community.</h2></div><div><p>Each year, students from across campus come together to build a full-scale production shaped by the many sounds, movements, and stories of South Asia and its diaspora.</p><p>You don’t need years of experience—or any particular background—to take part. Perform, help create the show, or come celebrate from the audience.</p></div></section>

    <section className="show-program section-pad"><div className="section-heading"><div><p className="eyebrow">What you’ll experience</p><h2>Every act brings<br />something different.</h2></div><p>The final lineup changes each year, making every Culture Show its own moment.</p></div><div className="show-program-lines"><article><span>01</span><h3>Dance</h3><p>Bollywood, Bharatanatyam, South Indian, Raas, Bhangra, and more.</p></article><article><span>02</span><h3>Music</h3><p>Vocal, instrumental, Hindustani, Carnatic, and a cappella performances.</p></article><article><span>03</span><h3>Stories</h3><p>Student-led skits, comedy, and creative moments that connect the show.</p></article></div></section>

    <section className="show-season section-pad"><div className="season-marker"><span>Current season</span><strong>2026—27</strong></div><div className="season-copy"><p className="eyebrow light">The next show</p><h2>Details are on the way.</h2><p>Dates, participation sign-ups, and audience information will be shared as they are confirmed.</p><div className="button-row"><a className="button button-ivory" href="https://www.instagram.com/sangamsd">Follow for updates <AtSign size={18} /></a><Link className="text-link light-link" to="/join">Get involved <ArrowRight size={17} /></Link></div></div></section>
  </Page>
}

function Board() {
  return <Page><section className="board-hero">
    <div className="board-hero-copy">
      <p className="eyebrow light"><span /> Executive Board</p>
      <h1>Built by students.<br /><em>Made together.</em></h1>
      <p>Meet the people planning the events, performances, partnerships, and small details that bring Sangam to life.</p>
    </div>
    <div className="board-hero-aside" aria-hidden="true">
      <span>Student-led</span>
      <strong>{board.length}</strong>
      <small>people behind<br />the community</small>
    </div>
  </section>
    <section className="board-section section-pad"><div className="section-heading"><div><p className="eyebrow">Current executive board</p><h2>2025—2026</h2></div><p>Meet the students leading Sangam’s events, programs, and community this year.</p></div><div className="board-grid">{board.map(({ name, role, photo }, index) => <article key={name}><div className={`board-portrait portrait-${index % 4 + 1}`}>{photo ? <img src={photo} alt={name} /> : <span className="board-initials" aria-hidden="true">{name.split(' ').map((part) => part[0]).join('')}</span>}</div><span>{role}</span><h3>{name}</h3></article>)}</div></section>
  </Page>
}

function Partners() {
  return <Page>
    <section className="partner-hero">
      <div className="partner-hero-copy reveal">
        <p className="eyebrow"><span /> Partner with Sangam</p>
        <h1>Let’s make<br /><em>something</em><br />together.</h1>
        <p>Choose an established sponsorship tier or create a collaboration around what your organization does best. Either way, we’ll build the right fit together.</p>
        <div className="button-row"><a className="button" href={partnerGmailDraft} target="_blank" rel="noreferrer">Start a conversation <ArrowRight size={18} /></a><a className="text-link" href="#opportunities">See what’s possible <ChevronRight size={18} /></a></div>
      </div>
      <div className="partner-option-visual reveal delay" id="opportunities" aria-label="Two ways to partner with Sangam">
        <p>Two ways to partner</p>
        <article>
          <span>01 · Flexible</span>
          <h2>Customized<br />collaboration</h2>
          <p>Build a fundraiser, workshop, pop-up, or other experience around your business.</p>
          <small>Made together</small>
        </article>
        <article>
          <span>02 · Established</span>
          <h2>Tiered<br />sponsorship</h2>
          <p>Choose an existing package with clear visibility and recognition benefits.</p>
          <small>Ready to review</small>
        </article>
        <div className="partner-option-note">Not sure which fits? <strong>Start with a conversation.</strong></div>
      </div>
    </section>

    <section className="partners-page section-pad">
      <div className="partner-archive-heading"><div><p className="eyebrow">With our gratitude</p><h2>Past sponsors</h2></div><p>We’re grateful to the businesses and community members who have helped Sangam bring people together.</p></div>
      {partners.length ? <div className="partners-ribbon">{partners.map((partner) => <a href={partner.url} key={partner.name}><img src={partner.logo} alt={partner.name} /><span>{partner.name}</span></a>)}</div> : <div className="partners-empty-page"><span>Partner archive</span><strong>Past sponsor recognition is coming soon.</strong><p>Names and logos will be added as our partnership history is gathered.</p></div>}
    </section>

  </Page>
}

function Join() {
  return <Page><section className="join-hero-v2">
      <div className="join-hero-copy"><p className="eyebrow"><span /> Join Sangam</p><h1>There’s more than<br />one way <em>in.</em></h1><p>Start with an event, step onto the Culture Show stage, or simply come say hello. Sangam is something you can enter at your own pace.</p><div className="button-row"><Link className="button" to="/events">Find an event <ArrowRight size={18} /></Link><a className="text-link" href={generalGmailDraft} target="_blank" rel="noreferrer">Ask us anything <ChevronRight size={17} /></a></div></div>
      <div className="join-hero-image"><img src="/media/join-sangam-board.jpg" alt="SangamSD's board gathered together" /><span>Come as you are · UC San Diego</span></div>
    </section>
    <section className="join-paths section-pad"><div className="section-heading"><div><p className="eyebrow">Start where you are</p><h2>Find your way<br />into the circle.</h2></div><p>You don’t need to wait for a membership form to begin experiencing Sangam.</p></div><div className="join-path-grid">
      <article><span>01</span><div><p className="event-tag">Show up</p><h3>Attend a gathering</h3><p>Come to a signature tradition, performance, or social and meet the community in person.</p></div><Link className="round-link" to="/events" aria-label="Explore upcoming events"><ArrowRight /></Link></article>
      <article><span>02</span><div><p className="event-tag">Create with us</p><h3>Take part in Culture Show</h3><p>Perform, help build the production, or celebrate the work from the audience.</p></div><Link className="round-link" to="/culture-show" aria-label="Explore Culture Show"><ArrowRight /></Link></article>
      <article><span>03</span><div><p className="event-tag">Stay connected</p><h3>Follow along</h3><p>Event announcements and membership updates are shared first through SangamSD’s Instagram.</p></div><a className="round-link" href="https://www.instagram.com/sangamsd" aria-label="Follow SangamSD on Instagram"><ArrowRight /></a></article>
    </div></section>
    <section className="signup join-signup section-pad"><div><p className="eyebrow light">Membership</p><h2>Membership opens at the start of the academic year.</h2><p>Until then, follow SangamSD for event announcements and membership updates.</p></div><div className="button-row"><a className="button button-ivory" href="https://www.instagram.com/sangamsd">Follow on Instagram <AtSign size={18} /></a><a className="text-link light-link" href={generalGmailDraft} target="_blank" rel="noreferrer">Ask a question <ArrowRight size={17} /></a></div></section>
  </Page>
}

function NotFound() { return <Page><section className="not-found"><p className="eyebrow">404</p><h1>This path missed the circle.</h1><Link className="button" to="/">Return home <ArrowRight size={18} /></Link></section></Page> }

export default function App() {
  return <><ScrollToTop /><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/events" element={<Events />} /><Route path="/culture-show" element={<CultureShow />} /><Route path="/partners" element={<Partners />} /><Route path="/board" element={<Board />} /><Route path="/join" element={<Join />} /><Route path="*" element={<NotFound />} /></Routes></>
}
