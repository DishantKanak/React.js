import { useRef } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { team } from '../data/siteContent'

const timelineSteps = [
  {
    year: '2016',
    title: 'Grand Horizon Vision',
    detail: 'Concept finalized to build a premium hospitality destination with personalized service.',
  },
  {
    year: '2018',
    title: 'Doors Opened',
    detail: 'The hotel launched with signature suites, all-day dining, and concierge-led experiences.',
  },
  {
    year: '2021',
    title: 'Wellness Expansion',
    detail: 'Introduced spa therapies, rooftop yoga, and curated wellness programs for guests.',
  },
  {
    year: '2025',
    title: 'Global Recognition',
    detail: 'Featured among top luxury city hotels for guest satisfaction and hospitality standards.',
  },
]

function AboutPage() {
  const MotionArticle = motion.article
  const navigate = useNavigate()
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 25,
    mass: 0.4,
  })

  return (
    <>
      <AnimatedSection className="container section">
        <h1 className="page-title">About Grand Horizon</h1>
        <p className="page-subtitle">
          Grand Horizon Hotel blends modern luxury with heartfelt hospitality. Every space is
          designed for calm, elegance, and memorable experiences.
        </p>

        <div className="about-grid">
          <article className="info-card">
            <h3>Our Story</h3>
            <p>
              Established with a vision to redefine premium stays, Grand Horizon has welcomed
              guests from around the world with world-class comfort and personalized service.
            </p>
          </article>
          <article className="info-card">
            <h3>Our Vision</h3>
            <p>
              To become the most trusted luxury destination where every guest feels valued,
              inspired, and cared for from arrival to departure.
            </p>
          </article>
          <article className="info-card">
            <h3>Our Values</h3>
            <p>
              We believe in excellence, authenticity, and attention to detail in every interaction
              across reception, dining, wellness, and room services.
            </p>
          </article>
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.1}>
        <h2>About Me - Founder Note</h2>
        <div className="info-card founder-note">
          <p>
            "Grand Horizon was born from one belief: luxury should feel personal. We built this
            hotel to combine sophisticated design with genuine human warmth, so every guest leaves
            with a memory, not just a booking confirmation."
          </p>
          <p className="muted-line">- Aria Thompson, Founder</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.2}>
        <h2>Our Journey Timeline</h2>
        <div ref={timelineRef} className="timeline">
          <motion.span className="timeline-progress" style={{ scaleY: progress }} />
          {timelineSteps.map((step, index) => (
            <MotionArticle
              key={step.year}
              className="timeline-item info-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="timeline-year">{step.year}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </MotionArticle>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="container section" delay={0.25}>
        <h2 className="subheading">Leadership Team</h2>
        <div className="amenities-grid">
          {team.map((member) => (
            <article key={member.name} className="info-card">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
        <div className="center-cta">
          <button className="btn primary" onClick={() => navigate('/contact')}>
            Connect With Our Team
          </button>
        </div>
      </AnimatedSection>
    </>
  )
}

export default AboutPage
