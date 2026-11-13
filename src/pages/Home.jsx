import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { WhatsAppLink } from '../components/Shell'

const img = 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2200&q=90'

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: .12, delayChildren: .08 } }
}

function StoryReveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: .18 }}
      variants={reveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const reduceMotion = useReducedMotion()
  const heroTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 1.15, ease: [0.22, 1, 0.36, 1] }

  return (
    <>
      <section className="hero">
        <motion.img
          src={img}
          alt="Suasana coffee shop yang hangat"
          initial={reduceMotion ? false : { scale: 1.09 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.8, ease: 'easeOut' }}
        />
        <div className="hero-shade" />
        <motion.div
          className="hero-content"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
        >
          <motion.p
            className="eyebrow light"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : .18 }}
          >
            COFFEE · EATERY · GOOD COMPANY
          </motion.p>
          <h1>Singgah<br/><em>Sejenak.</em></h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : .34 }}
          >
            Ruang untuk jeda, rasa, dan cerita.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : .48 }}
          >
            <Link className="button button-light hero-cta" to="/menu">
              Jelajahi Menu <ArrowUpRight size={16}/>
            </Link>
          </motion.div>
        </motion.div>
        <div className="hero-bottom">
          <span>PEJATEN, JAKARTA SELATAN</span>
          <motion.span
            className="hero-scroll-cue"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            SCROLL TO EXPLORE <ArrowDown size={14}/>
          </motion.span>
        </div>
        <motion.div
          className="hero-entry-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : .35, ease: 'easeOut' }}
        />
      </section>

      <motion.section
        className="intro-section section-pad story-section"
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: .25 }}
        variants={stagger}
      >
        <motion.div className="section-kicker" variants={reveal}>01 / THE MERENE MOMENT</motion.div>
        <motion.div variants={reveal}>
          <h2>Di antara sibuknya hari,<br/><em>ada ruang untuk berhenti.</em></h2>
          <p className="body-copy">Temukan tempat untuk menikmati kopi, berbagi cerita, dan memberi waktu bagi diri sendiri. Selamat datang di Merene.</p>
          <Link className="text-link" to="/tentang">Kenali Merene <ArrowUpRight size={16}/></Link>
        </motion.div>
      </motion.section>

      <section className="featured section-pad story-section">
        <StoryReveal className="section-heading">
          <div>
            <p className="eyebrow">DARI DAPUR & BAR KAMI</p>
            <h2>Teman singgah<br/><em>favoritmu.</em></h2>
          </div>
          <Link className="text-link" to="/menu">Lihat semua menu <ArrowUpRight size={16}/></Link>
        </StoryReveal>
        <motion.div
          className="feature-grid"
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: .15 }}
          variants={stagger}
        >
          {[
            { n: 'Merene House Ramen', p: '72K', i: 'photo-1569718212165-3a8278d5f624' },
            { n: 'Truffle Mushroom Pizza', p: '115K', i: 'photo-1579751626657-72bc17010498' },
            { n: 'Kopi Susu Merene', p: '47K', i: 'photo-1461023058943-07fcbe16d735' }
          ].map((item) => (
            <motion.article className="feature-card" key={item.n} variants={reveal}>
              <div className="feature-card-image">
                <img src={`https://images.unsplash.com/${item.i}?auto=format&fit=crop&w=1000&q=85`} alt={item.n} loading="lazy"/>
              </div>
              <div><h3>{item.n}</h3><span>{item.p}</span></div>
            </motion.article>
          ))}
        </motion.div>
        <p className="fine-print">Harga contoh dari katalog 2026. Konfirmasi kembali sebelum publikasi.</p>
      </section>

      <section className="event-band story-section">
        <motion.img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=85"
          alt="Meja acara yang tertata"
          initial={reduceMotion ? false : { scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: 'easeOut' }}
        />
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: .3 }}
          transition={{ duration: reduceMotion ? 0 : .7, ease: 'easeOut' }}
        >
          <p className="eyebrow light">MOMEN YANG LAYAK DIRAYAKAN</p>
          <h2>Gather a little.<br/><em>Celebrate a lot.</em></h2>
          <p>Untuk pertemuan, perayaan, dan momen yang ingin dikenang.</p>
          <Link className="button button-light" to="/event">Jelajahi layanan event <ArrowUpRight size={16}/></Link>
        </motion.div>
      </section>

      <StoryReveal className="closing section-pad">
        <p className="eyebrow">YOUR MOMENT STARTS HERE</p>
        <h2>Butuh jeda?<br/><em>Singgah ke Merene.</em></h2>
        <WhatsAppLink>Hubungi Merene</WhatsAppLink>
      </StoryReveal>
    </>
  )
}
