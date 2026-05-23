import { useIntersectionObserver } from 'hamo'
import cn from 'clsx'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import s from './lottie.module.scss'

// hamo 1.x dropped useDocumentReadyState — local replacement tracking
// document.readyState ('loading' | 'interactive' | 'complete').
function useDocumentReadyState() {
  const [readyState, setReadyState] = useState(
    typeof document !== 'undefined' ? document.readyState : 'loading',
  )

  useEffect(() => {
    const onChange = () => setReadyState(document.readyState)
    document.addEventListener('readystatechange', onChange)
    onChange()
    return () => document.removeEventListener('readystatechange', onChange)
  }, [])

  return readyState
}

export const Lottie = forwardRef(function Lottie(
  { file, loop = false, className, type = 'canvas', viewThreshold = 0 },
  ref,
) {
  const elementRef = useRef(null)
  const animatorRef = useRef(null)

  const [animator, setAnimator] = useState()
  const [lottiePkg, setLottiePkg] = useState()

  // hamo 1.x returns [setRef, entry] where entry is undefined until the
  // observer fires (was a default object before) — read isIntersecting safely.
  const [setRef, intersection] = useIntersectionObserver({
    threshold: viewThreshold,
  })
  const isIntersecting = intersection?.isIntersecting
  const readyState = useDocumentReadyState()

  const fetchJson = async (externalAnimation) => {
    let response = null
    if (externalAnimation.includes('/lotties')) {
      response = await fetch(externalAnimation)
    } else {
      response = await fetch('/api/get-lotties', {
        method: 'POST',
        body: JSON.stringify({ externalAnimation }),
      })
    }
    const json = await response.json()

    return json
  }

  useEffect(() => {
    if (readyState === 'complete') {
      //needed to render on 'svg'
      import('lottie-web/build/player/lottie.min').then((Lottie) =>
        setLottiePkg(Lottie.default),
      )
    }
  }, [readyState])

  useEffect(() => {
    if (!lottiePkg) return

    let animator

    if (typeof file === 'string') {
      // external link or json file in public folder

      fetchJson(file).then((json) => {
        animator = lottiePkg?.loadAnimation({
          container: elementRef.current,
          animationData: json,
          renderer: file.includes('http') ? 'svg' : type,
          autoplay: false,
          loop,
        })

        setAnimator(animator)
      })
    } else {
      // json data inside code
      animatorRef.current = lottiePkg?.loadAnimation({
        container: elementRef.current,
        animationData: file,
        renderer: type,
        autoplay: false,
        loop,
      })

      setAnimator(animator)
    }

    return () => animator?.destroy()
  }, [lottiePkg, type, file])

  useEffect(() => {
    if (!loop) return
    if (animator && isIntersecting) {
      animator?.play()
    } else {
      animator?.pause()
    }
  }, [animator, isIntersecting])

  useImperativeHandle(ref, () => animator, [animator])

  return (
    <div
      aria-hidden="true"
      className={cn(className, s.lottie)}
      ref={(node) => {
        elementRef.current = node
        setRef(node)
      }}
    />
  )
})
