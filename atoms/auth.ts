import {atom} from 'recoil'

export type User = { 
   id:string; 
   name:string;
   email:string;
   isSigned:string;
   lang:string;
   type:string;
   emailVerified:string;
   countryCode:string; 
  }

  type AuthState = {
    user: User | null;
  }

  export const AuthState = atom<AuthState>({
    key: 'authState',
    default: {
      user:null
    }
  })