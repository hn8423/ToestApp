import {atom} from 'recoil'

type LangState = string

export const langState = atom<LangState>({
  key: 'langState',
  default: 'en',
})
