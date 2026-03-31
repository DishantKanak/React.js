import { motion } from 'framer-motion'

function AnimatedSection({ children, className = '', delay = 0 }) {
  const MotionSection = motion.section

  return (
    <MotionSection
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionSection>
  )
}

export default AnimatedSection
