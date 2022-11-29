import {atom} from 'recoil'

export type User = [
  {
    id: string
    name: string
    email: string
    isSigned: string
    lang: string
    type: string
    emailVerified: string
    countryCode: string
    password: string
  },
]

export type AuthStateParams = User | null

export const AuthState = atom<AuthStateParams>({
  key: 'authState',
  default: null,
})
