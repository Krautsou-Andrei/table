import { useRef, useState, useEffect } from 'react'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

export const useLiderBoardTabs = () => {
  const { data: authMe } = useAuthMe()
  const userRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [isVisible, setIsVisible] = useState(false)

  const handleButtonClick = () => {
    const selectedUserIndex = authMe?.id || 0
    if (userRefs.current && userRefs.current[selectedUserIndex]) {
      userRefs.current[selectedUserIndex]?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const target = userRefs.current[authMe?.id || 0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false)
          } else {
            setIsVisible(true)
          }
        })
      },
      {
        rootMargin: '0px 0px -80px 0px',
        threshold: 0,
      }
    )

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [authMe?.id, target])

  return { state: { authMe, isVisible, userRefs }, functions: { handleButtonClick } }
}
