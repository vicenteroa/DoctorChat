// NOTE: This is a mock API that simulates sending a message to the server.
// In a real-world application, you would use a real API endpoint.
async function sendMessage(name: string, email: string, subject: string, message: string) {
  const response = await fetch('https://api.example.com/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message
    })
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}

export default sendMessage
