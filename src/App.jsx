import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Header, Footer } from './components/Shell'
import Home from './pages/Home'
import { Menu, About, Event, Gallery, Location, Contact } from './pages/Pages'
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
function PageMotion({children}){return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.45,ease:'easeOut'}}>{children}</motion.div>}
export default function App(){return <><ScrollToTop/><Header/><AnimatePresence mode="wait"><Routes><Route path="/" element={<PageMotion><Home/></PageMotion>}/><Route path="/menu" element={<PageMotion><Menu/></PageMotion>}/><Route path="/tentang" element={<PageMotion><About/></PageMotion>}/><Route path="/event" element={<PageMotion><Event/></PageMotion>}/><Route path="/galeri" element={<PageMotion><Gallery/></PageMotion>}/><Route path="/lokasi" element={<PageMotion><Location/></PageMotion>}/><Route path="/kontak" element={<PageMotion><Contact/></PageMotion>}/></Routes></AnimatePresence><Footer/></>}
