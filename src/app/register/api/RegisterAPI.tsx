async function RegisterAPI(
  user: string,
  email: string,
  password: string,
  name: string,
  rut: string
) {
  return fetch(`${process.env.NEXT_PUBLIC_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user,
      email,
      password,
      name,
      rut
    })
  }).then((res) => {
    // Verifica si la respuesta tiene contenido antes de intentar analizarla como JSON
    if (res.headers.get('content-type')?.includes('application/json')) {
      return res.json()
    } else {
      throw new Error('La respuesta del servidor no es JSON')
    }
  })
}
export default RegisterAPI
