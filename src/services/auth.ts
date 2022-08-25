import axios from 'axios'

type SignInRequestData = {
  email: string;
  password: string;
}

type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export async function signInRequest({ email, password }: SignInRequestData) {
  
}

export async function recoverUserInformation() {
}