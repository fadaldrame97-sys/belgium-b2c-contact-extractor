
import api from './axios'

export async function login(email, password) {
  const response = await api.post('/login', {
    email,
    password,
  })

  const { token, utilisateur } = response.data

  localStorage.setItem('token', token)
  localStorage.setItem('utilisateur', JSON.stringify(utilisateur))

  return utilisateur
}

export async function logout() {
  try {
    await api.post('/logout')
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
  }
}

export function getUtilisateur() {
  const utilisateur = localStorage.getItem('utilisateur')

  return utilisateur ? JSON.parse(utilisateur) : null
}
