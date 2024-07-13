import { auth } from '@/services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

async function LoginAPI(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default LoginAPI
