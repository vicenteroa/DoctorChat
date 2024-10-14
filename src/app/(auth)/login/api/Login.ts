import { auth } from '@/services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

async function Login(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default Login
