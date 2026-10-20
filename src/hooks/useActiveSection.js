import { useEffect, useState } from 'react'

const OBSERVER_OPTIONS = {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0,
}

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element) => element !== null)

    if (elements.length === 0) return undefined

    const visible = new Set()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      })

      const firstVisible = sectionIds.find((id) => visible.has(id)) ?? null
      setActiveId(firstVisible)
    }, OBSERVER_OPTIONS)

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
