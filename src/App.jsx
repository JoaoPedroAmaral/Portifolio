import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import GitHubProjects from './components/GitHubProjects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <FeaturedProjects />
        <GitHubProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
