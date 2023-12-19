import { RefObject, useEffect, useState } from 'react'

interface UseIntersectionObserverProps {
  ref: RefObject<Element>
  onIntersect?: () => void
}

export const useIntersectionObserver = ({
  ref: targetRef,
  onIntersect,
}: UseIntersectionObserverProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    if (isIntersecting && onIntersect) {
      onIntersect()
    }
  }, [isIntersecting])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    })

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [targetRef.current])

  return isIntersecting
}
