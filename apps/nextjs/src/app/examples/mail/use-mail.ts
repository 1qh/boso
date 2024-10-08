import { atom, useAtom } from 'jotai'

import type { Mail } from './data'
import { mails } from './data'

interface Config {
  selected: Mail['id'] | undefined
}

const configAtom = atom<Config>({
    selected: mails[0]?.id
  }),
  useMail = () => useAtom(configAtom)

export { useMail }
