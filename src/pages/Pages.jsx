import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Clock3, X, ChevronLeft, ChevronRight, CalendarDays, Users, MessageCircle } from 'lucide-react'
import { menuGroups, whatsappNumber } from '../data'
import { PageIntro, WhatsAppLink } from '../components/Shell'

function MenuItemModal({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const dialog = document.getElementById('menu-detail-dialog')
        const focusable = dialog?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <motion.div className="interaction-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <motion.section
        id="menu-detail-dialog"
        className="menu-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-detail-title"
        initial={{ opacity: 0, y: 24, scale: .98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: .98 }}
        transition={{ duration: .24, ease: 'easeOut' }}
      >
        <button ref={closeRef} className="interaction-close" type="button" onClick={onClose} aria-label="Tutup detail menu"><X size={20}/></button>
        <div className="menu-detail-image"><img src={item.image} alt={item.name}/></div>
        <div className="menu-detail-copy">
          {item.tag && <span className="menu-tag-inline">{item.tag}</span>}
          <p className="eyebrow">MENU MERENE</p>
          <h2 id="menu-detail-title">{item.name}</h2>
          <p>{item.desc}</p>
          <strong className="menu-detail-price">{item.price}</strong>
          <small>Harga dan ketersediaan dapat berubah. Silakan konfirmasi kepada tim Merene.</small>
        </div>
      </motion.section>
    </motion.div>
  )
}

export function Menu() {
  const [active, setActive] = useState('Semua')
  const [selectedItem, setSelectedItem] = useState(null)
  const groups = active === 'Semua' ? menuGroups : menuGroups.filter(g => g.name === active)

  return (
    <main className="page-wrap">
      <PageIntro eyebrow="MADE TO BE ENJOYED" title={<>Menu<br/><em>Merene.</em></>} copy="Pilihan rasa untuk menemani setiap jeda."/>
      <div className="filter-row" role="group" aria-label="Filter kategori menu">
        {['Semua', ...menuGroups.map(g => g.name)].map(x => (
          <button type="button" className={active === x ? 'active' : ''} aria-pressed={active === x} onClick={() => setActive(x)} key={x}>{x}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
          {groups.map(g => (
            <section className="menu-group" key={g.name}>
              <h2>{g.name}</h2>
              <div className="menu-grid">
                {g.items.map(item => (
                  <button className="menu-card menu-card-button" type="button" key={item.name} onClick={() => setSelectedItem(item)} aria-label={`Lihat detail ${item.name}`}>
                    <span className="menu-card-image"><img src={item.image} alt="" loading="lazy"/><span className="menu-card-hint">Lihat detail <ArrowUpRight size={14}/></span></span>
                    <span className="menu-card-info"><span><span className="menu-card-title">{item.name}</span><span className="menu-card-description">{item.desc}</span></span><strong>{item.price}</strong></span>
                    {item.tag && <span className="menu-tag">{item.tag}</span>}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
      <p className="fine-print">* Harga dan ketersediaan menu perlu diverifikasi. Harga ditampilkan dalam ribuan Rupiah.</p>
      <AnimatePresence>{selectedItem && <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)}/>}</AnimatePresence>
    </main>
  )
}

export function About(){return <main className="page-wrap"><PageIntro eyebrow="OUR STORY" title={<>Lebih dari sekadar<br/><em>tempat singgah.</em></>} copy="Merene adalah ruang untuk menikmati hal-hal sederhana: secangkir kopi, makanan yang nyaman, dan percakapan yang terasa dekat."/><div className="about-image"><img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=85" alt="Interior coffee shop"/></div><section className="quote-section"><p className="eyebrow">#SINGGAHSEJENAK</p><h2>“Kadang, yang kita butuhkan<br/>hanya <em>waktu untuk berhenti.”</em></h2><p className="body-copy">Cerita resmi dan sejarah brand akan dilengkapi berdasarkan materi dari tim Merene.</p></section></main>}

export function Event() {
  const [submitted, setSubmitted] = useState(false)
  const today = new Date()
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10)

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name')
    const type = form.get('eventType')
    const date = form.get('date')
    const guests = form.get('guests')
    const contact = form.get('contact')
    const notes = form.get('notes')
    const message = [
      'Halo Merene, saya ingin bertanya mengenai kebutuhan acara.',
      '',
      `Nama: ${name}`,
      `Jenis acara: ${type}`,
      `Tanggal: ${date}`,
      `Jumlah peserta: ${guests} orang`,
      `Kontak: ${contact}`,
      `Catatan: ${notes || '-'}`
    ].join('\n')
    setSubmitted(true)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="page-wrap">
      <PageIntro eyebrow="MAKE IT A MOMENT" title={<>Rayakan momen<br/><em>bersama Merene.</em></>} copy="Ruang dan sajian untuk berbagai pertemuan, dari yang intim hingga acara bersama tim."/>
      <div className="about-image"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1800&q=85" alt="Suasana acara"/></div>
      <div className="event-types">{['Birthday','Engagement','Meeting','Gathering','Corporate Event'].map(x=><span key={x}>{x}</span>)}</div>
      <section className="lunchbox">
        <div><p className="eyebrow">LUNCH BOX SERVICE</p><h2>Good food,<br/><em>wherever you gather.</em></h2></div>
        <div><p>Informasi katalog: layanan lunch box tersedia untuk take away dengan minimum pemesanan 10 pax.</p><WhatsAppLink>Tanyakan paket lunch box</WhatsAppLink></div>
      </section>
      <section className="event-inquiry" aria-labelledby="event-inquiry-title">
        <div className="event-inquiry-heading">
          <p className="eyebrow">LET'S PLAN SOMETHING</p>
          <h2 id="event-inquiry-title">Ceritakan <em>rencanamu.</em></h2>
          <p>Isi detail awal acara. Tim Merene akan menerima ringkasan melalui WhatsApp untuk membantu proses konsultasi.</p>
        </div>
        <form className="event-form" onSubmit={handleSubmit}>
          <label>Nama lengkap<input name="name" type="text" placeholder="Nama kamu" autoComplete="name" required/></label>
          <label>Jenis acara<select name="eventType" defaultValue="" required><option value="" disabled>Pilih jenis acara</option><option>Birthday</option><option>Engagement</option><option>Meeting</option><option>Gathering</option><option>Corporate Event</option><option>Lunch Box</option><option>Lainnya</option></select></label>
          <label>Tanggal acara<input name="date" type="date" min={minDate} required/></label>
          <label>Jumlah peserta<input name="guests" type="number" min="1" max="10000" placeholder="Contoh: 30" required/></label>
          <label>Nomor WhatsApp<input name="contact" type="tel" placeholder="08xxxxxxxxxx" autoComplete="tel" required/></label>
          <label className="form-full">Catatan tambahan<textarea name="notes" rows="4" placeholder="Ceritakan kebutuhan, konsep, atau pertanyaan kamu..."/></label>
          <div className="event-form-footer"><p>Dengan melanjutkan, WhatsApp akan terbuka dengan pesan yang sudah disiapkan.</p><button className="button button-dark" type="submit"><MessageCircle size={16}/> Kirim via WhatsApp <ArrowUpRight size={16}/></button></div>
          {submitted && <p className="form-feedback" role="status">Ringkasan sudah disiapkan. Selesaikan pengiriman melalui WhatsApp.</p>}
        </form>
      </section>
    </main>
  )
}

export function Gallery() {
  const photos = ['photo-1445116572660-236099ec97a0','photo-1509042239860-f550ce710b93','photo-1495474472287-4d71bcdd2085','photo-1559305616-3f99cd43e353','photo-1511920170033-f8396924c348','photo-1461023058943-07fcbe16d735']
  const [activeIndex, setActiveIndex] = useState(null)
  const touchStart = useRef(null)
  const photoUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=90`

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex(index => (index + 1) % photos.length)
      if (event.key === 'ArrowLeft') setActiveIndex(index => (index - 1 + photos.length) % photos.length)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, photos.length])

  const changePhoto = (direction) => setActiveIndex(index => (index + direction + photos.length) % photos.length)

  return (
    <main className="page-wrap">
      <PageIntro eyebrow="A GLIMPSE OF MERENE" title={<>Ruang, rasa,<br/><em>dan cerita.</em></>} copy="Galeri visual sementara. Foto resmi Merene akan menggantikan aset placeholder sebelum peluncuran."/>
      <div className="gallery-grid">
        {photos.map((x,i)=>(
          <button className="gallery-photo" type="button" key={x} onClick={() => setActiveIndex(i)} aria-label={`Buka foto ${i+1} dari ${photos.length}`}>
            <img src={photoUrl(x)} alt={`Suasana Merene ${i+1}`} loading="lazy"/>
            <span className="gallery-photo-hint">Perbesar <ArrowUpRight size={15}/></span>
          </button>
        ))}
      </div>
      <a className="text-link" href="https://instagram.com/merene.jkt" target="_blank" rel="noreferrer">Ikuti @merene.jkt <ArrowUpRight size={16}/></a>
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Galeri foto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null) }}>
            <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Tutup galeri"><X/></button>
            <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => changePhoto(-1)} aria-label="Foto sebelumnya"><ChevronLeft/></button>
            <motion.figure className="lightbox-figure" key={activeIndex} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) changePhoto(delta < 0 ? 1 : -1); touchStart.current = null }}>
              <img src={photoUrl(photos[activeIndex])} alt={`Suasana Merene ${activeIndex+1}`}/>
              <figcaption>MERENE / {String(activeIndex+1).padStart(2,'0')} — {String(photos.length).padStart(2,'0')}</figcaption>
            </motion.figure>
            <button className="lightbox-arrow lightbox-next" type="button" onClick={() => changePhoto(1)} aria-label="Foto berikutnya"><ChevronRight/></button>
            <span className="lightbox-count">{activeIndex+1} / {photos.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export function Location(){return <main className="page-wrap"><PageIntro eyebrow="COME BY & STAY A WHILE" title={<>Temukan<br/><em>Merene.</em></>} copy="Informasi lokasi berikut menunggu konfirmasi alamat dan pin resmi dari tim Merene."/><div className="location-card"><div><MapPin/><p className="eyebrow">ALAMAT</p><h2>Pejaten, Jakarta Selatan</h2><p>Alamat lengkap dan titik Google Maps perlu dikonfirmasi.</p></div><div><Clock3/><p className="eyebrow">JAM OPERASIONAL</p><h2>Segera diperbarui</h2><p>Jam buka resmi belum tersedia.</p></div></div><div className="map-placeholder">PETA LOKASI MERENE<br/><small>Google Maps akan dipasang setelah pin resmi dikonfirmasi.</small></div></main>}

export function Contact(){return <main className="page-wrap"><PageIntro eyebrow="LET'S CONNECT" title={<>Sampai jumpa<br/><em>di Merene.</em></>} copy="Untuk pertanyaan umum, acara, dan layanan lunch box, hubungi tim Merene."/><div className="contact-panel"><div><p className="eyebrow">WHATSAPP</p><h2>Mulai percakapan.</h2><WhatsAppLink>Hubungi melalui WhatsApp</WhatsAppLink></div><div><p className="eyebrow">INSTAGRAM</p><h2>@merene.jkt</h2><a className="text-link" href="https://instagram.com/merene.jkt" target="_blank" rel="noreferrer">Kunjungi Instagram <ArrowUpRight size={16}/></a></div></div></main>}
