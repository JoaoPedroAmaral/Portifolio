import { MAIN_CONTENT_ID } from './constants/site'
import GitHubProvider from './context/GitHubProvider'
import SkipLink from './components/layout/SkipLink'
import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import QuickContact from './components/layout/QuickContact'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import GitHubRepos from './components/sections/GitHubRepos'

export default function App() {
  return (
    <GitHubProvider>
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      <main id={MAIN_CONTENT_ID} className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GitHubRepos />
      </main>
      <Footer />
      <QuickContact />
    </GitHubProvider>
  )
}
