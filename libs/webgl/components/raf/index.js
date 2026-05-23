import { useThree } from '@react-three/fiber'
import { useTempus } from 'tempus/react'

export function RAF({ render = true }) {
  const { advance } = useThree()

  useTempus((time) => {
    if (render) {
      advance(time / 1000)
    }
  }, 1)
}
