import baseURL from '../api/baseURL'

export async function register(params: RegisterParams){
  const response = await fetch(`${baseURL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

export async function login(params: LoginParams){
  const response = await fetch(`${baseURL}/api/mobile/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
  return response.json()
}

type LoginParams = {
  email: string;
  password : string;
}


type RegisterParams = {
  name: string;
  email: string;
  password:string;
  countryCode:string
}