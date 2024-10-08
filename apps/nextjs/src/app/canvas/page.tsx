'use client'

import { atom, useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type Point = [number, number]
const dotsAtom = atomWithStorage<Point[]>('draw', []),
  drawingAtom = atom<boolean>(false),
  handleMouseDownAtom = atom(null, (get, set) => set(drawingAtom, true)),
  handleMouseUpAtom = atom(null, (get, set) => set(drawingAtom, false)),
  handleMouseMoveAtom = atom(
    get => get(dotsAtom),
    (get, set, update: Point) => {
      if (get(drawingAtom)) {
        set(dotsAtom, prev => [...prev, update])
      }
    }
  ),
  SvgDots = () => {
    const [dots] = useAtom(handleMouseMoveAtom)
    return (
      <g>
        {dots.map(([x, y], index) => (
          <circle cx={x} cy={y} fill='#fff' key={index} r='3' />
        ))}
      </g>
    )
  }
export default function Canvas() {
  const handleMouseUp = useSetAtom(handleMouseUpAtom),
    handleMouseDown = useSetAtom(handleMouseDownAtom),
    handleMouseMove = useSetAtom(handleMouseMoveAtom)
  return (
    <svg
      height='100vh'
      onMouseDown={handleMouseDown}
      onMouseMove={e => handleMouseMove([e.clientX, e.clientY])}
      onMouseUp={handleMouseUp}
      viewBox='0 0 100vw 100vh'
      width='100vw'>
      <rect height='100vh' width='100vw' />

      <SvgDots />
    </svg>
  )
}
