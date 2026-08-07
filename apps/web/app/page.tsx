"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const heroImages = [
  { src: "/images/batting.png", alt: "Young batter playing a cover drive in academy nets" },
  { src: "/images/bowling.png", alt: "Young fast bowler training with a coach" },
  { src: "/images/wicketkeeping.png", alt: "Wicketkeeper practicing a catching drill" },
  { src: "/images/coaching.png", alt: "Coach discussing tactics with academy players" },
];

const programs = [
  { number: "01", title: "Foundation", ages: "Ages 7–11", text: "Build strong fundamentals through playful, structured sessions that make young players love the game.", tags: ["2 sessions / week", "Small groups"] },
  { number: "02", title: "Performance", ages: "Ages 12–16", text: "Role-specific coaching, match scenarios and measurable development for serious young cricketers.", tags: ["3 sessions / week", "Video analysis"] },
  { number: "03", title: "Elite Pathway", ages: "Ages 16+", text: "High-intensity preparation, strength work and individual plans for district and state-level ambitions.", tags: ["5 sessions / week", "1:1 mentoring"] },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function submitTrial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/v1"}/admission-leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: form.get("name"),
          playerAge: Number(form.get("age")),
          phone: form.get("phone"),
          interest: form.get("interest")
        })
      });
      if (!response.ok) throw new Error("We could not submit your request. Please check the details and try again.");
      setSubmitted(true);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="The Crease Academy home">
          <span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>
          <span><b>THE CREASE</b><small>CRICKET ACADEMY</small></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>Our method</a>
          <a href="#coaches" onClick={() => setMenuOpen(false)}>Coaches</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a href="#trial" className="button button-small desktop-cta">Book a free trial <Arrow /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span/><span/></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span/> Professional coaching · Bengaluru</p>
          <h1>Train with purpose.<br/><em>Play without fear.</em></h1>
          <p className="hero-lead">A modern cricket academy helping young players turn raw potential into confident, match-ready performance.</p>
          <div className="hero-actions">
            <a className="button" href="#trial">Book a free trial <Arrow /></a>
            <a className="text-link" href="#programs">Explore programs <span>↘</span></a>
          </div>
          <div className="trust-row">
            <div className="avatars"><span>AR</span><span>KV</span><span>SK</span><span>+</span></div>
            <p><b>4.9 / 5</b><br/>Trusted by 300+ families</p>
          </div>
        </div>

        <div className="orbit" aria-label="Academy training gallery">
          <div className="orbit-line"/>
          {heroImages.map((image, index) => (
            <figure className={`orbit-card orbit-card-${index + 1}`} key={image.src}>
              <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes="(max-width: 800px) 46vw, 270px" />
            </figure>
          ))}
          <div className="orbit-core"><span>EST.</span><b>2014</b><small>BENGALURU</small></div>
          <div className="ball-seam" aria-hidden="true"/>
        </div>

        <a href="#programs" className="scroll-cue" aria-label="Scroll to programs"><span>SCROLL</span><i>↓</i></a>
      </section>

      <section className="proof-strip" aria-label="Academy highlights">
        <div><b>10+</b><span>Years developing<br/>young cricketers</span></div>
        <div><b>18</b><span>Certified &amp;<br/>specialist coaches</span></div>
        <div><b>42</b><span>District &amp; state<br/>selections</span></div>
        <div><b>1:8</b><span>Coach to player<br/>ratio</span></div>
      </section>

      <section className="section programs-section" id="programs">
        <div className="section-heading">
          <div><p className="eyebrow"><span/> Find your pathway</p><h2>Coaching that grows<br/><em>with your game.</em></h2></div>
          <p>Every player starts somewhere different. Our pathways meet them there—and provide the structure, feedback and belief to keep moving forward.</p>
        </div>
        <div className="program-grid">
          {programs.map((program, index) => (
            <article className="program-card" key={program.title}>
              <div className="program-image"><Image src={heroImages[index].src} alt="" fill sizes="(max-width: 800px) 100vw, 33vw"/></div>
              <div className="program-body"><span className="program-number">{program.number}</span><small>{program.ages}</small><h3>{program.title}</h3><p>{program.text}</p><div className="tags">{program.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#trial" aria-label={`Enquire about ${program.title}`}>View pathway <Arrow/></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-image"><Image src="/images/coaching.png" alt="Coach reviewing tactics with young players" fill sizes="(max-width: 800px) 100vw, 50vw"/></div>
        <div className="method-copy">
          <p className="eyebrow light"><span/> The Crease method</p>
          <h2>More than drills.<br/><em>A complete player.</em></h2>
          <p>Technical skill matters—but so do game awareness, physical resilience and the confidence to make decisions under pressure.</p>
          <ol>
            <li><b>01</b><span><strong>Assess</strong><small>Baseline skills, movement and game understanding.</small></span></li>
            <li><b>02</b><span><strong>Build</strong><small>A personal plan with clear, measurable goals.</small></span></li>
            <li><b>03</b><span><strong>Perform</strong><small>Pressure scenarios that transfer learning to matches.</small></span></li>
          </ol>
        </div>
      </section>

      <section className="section coaches" id="coaches">
        <p className="eyebrow"><span/> Coaching standard</p>
        <div className="coach-layout">
          <h2>Experience that<br/><em>players can trust.</em></h2>
          <div className="quote"><blockquote>“Our job isn’t to manufacture identical players. It’s to understand the cricketer in front of us and help their best game emerge.”</blockquote><p><b>Arjun Rao</b><span>Head of Cricket · BCCI Level 2</span></p></div>
        </div>
      </section>

      <section className="stories" id="stories">
        <div className="story-image"><Image src="/images/batting.png" alt="Academy batter developing his technique" fill sizes="100vw"/></div>
        <div className="story-overlay"><p className="eyebrow light"><span/> Player story</p><h2>From first net<br/>to district XI.</h2><p>“The coaches gave me a plan I could understand. I stopped worrying about selection and started enjoying every ball again.”</p><b>— Rohan, Performance pathway</b></div>
      </section>

      <section className="trial-section" id="trial">
        <div><p className="eyebrow"><span/> Start the journey</p><h2>Your first session<br/><em>is on us.</em></h2><p>Meet a coach, experience a real session and leave with a clear assessment of the next step—no pressure, no commitment.</p></div>
        {submitted ? (
          <div className="success-card"><span>✓</span><h3>You&apos;re on the list.</h3><p>Thanks! Our admissions team will contact you within one working day to schedule the trial.</p><button onClick={() => setSubmitted(false)}>Send another request</button></div>
        ) : (
          <form onSubmit={submitTrial}>
            <label>Player&apos;s name<input name="name" placeholder="e.g. Aarav Sharma" required/></label>
            <div className="field-row"><label>Player&apos;s age<input name="age" type="number" min="6" max="25" placeholder="12" required/></label><label>Phone number<input name="phone" type="tel" placeholder="+91 98765 43210" required/></label></div>
            <label>Primary interest<select name="interest" defaultValue="" required><option value="" disabled>Select a pathway</option><option value="FOUNDATION">Foundation (7–11)</option><option value="PERFORMANCE">Performance (12–16)</option><option value="ELITE">Elite pathway (16+)</option></select></label>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <button className="button" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Request my free trial"} {!submitting && <Arrow/>}</button>
            <small>By submitting, you agree to be contacted about your trial session.</small>
          </form>
        )}
      </section>

      <footer id="contact">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><i/><i/><i/></span><span><b>THE CREASE</b><small>CRICKET ACADEMY</small></span></a>
        <div><b>TRAINING GROUND</b><p>North Bengaluru, Karnataka<br/>Mon–Sun · 6:00–10:00 &amp; 15:30–20:00</p></div>
        <div><b>CONTACT</b><p><a href="tel:+919876543210">+91 98765 43210</a><br/><a href="mailto:hello@thecrease.academy">hello@thecrease.academy</a></p></div>
        <div className="footer-links"><a href="#programs">Programs</a><a href="#method">Our method</a><a href="#trial">Admissions</a></div>
        <p className="copyright">© 2026 The Crease Cricket Academy. Demo content—replace contact details before launch.</p>
      </footer>
    </main>
  );
}
