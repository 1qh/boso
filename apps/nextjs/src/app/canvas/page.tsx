'use client'

import { atom, useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type Point = [number, number]

const dotsAtom = atomWithStorage<Point[]>('draw', []),
  drawingAtom = atom<boolean>(false),
  mouseDownAtom = atom(null, (_, set) => set(drawingAtom, true)),
  mouseMoveAtom = atom(
    get => get(dotsAtom),
    (get, set, update: Point) => {
      if (get(drawingAtom)) {
        set(dotsAtom, prev => [...prev, update])
      }
    }
  ),
  mouseUpAtom = atom(null, (_, set) => set(drawingAtom, false))

export default function Canvas() {
  const handleMouseDown = useSetAtom(mouseDownAtom),
    [dots, handleMouseMove] = useAtom(mouseMoveAtom),
    handleMouseUp = useSetAtom(mouseUpAtom)
  return (
    <svg
      height='100vh'
      onMouseDown={handleMouseDown}
      onMouseMove={e => handleMouseMove([e.clientX, e.clientY])}
      onMouseUp={handleMouseUp}
      viewBox='0 0 100vw 100vh'
      width='100vw'>
      <rect height='100vh' width='100vw' />
      <g>
        {dots.map(([x, y], index) => (
          <circle cx={x} cy={y} fill='#fff' key={index} r='3' />
        ))}
      </g>
    </svg>
  )
}
