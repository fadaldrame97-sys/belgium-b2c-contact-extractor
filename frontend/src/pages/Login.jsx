
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/AuthService'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erreur, setErreur] = useState('')
  const [chargement, setChargement] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setErreur('')
    setChargement(true)

    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        error.response?.data?.errors?.email?.[0] ||
        'Identifiants incorrects. Vérifiez votre connexion.'
      )
    } finally {
      setChargement(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-2xl font-bold text-white">
            B
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Belgium B2C
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Bienvenue
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Connectez-vous pour accéder à votre espace.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Adresse email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@exemple.com"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Mot de passe
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {erreur && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {erreur}
            </div>
          )}

          <button
            type="submit"
            disabled={chargement}
            className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
          >
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          Belgium B2C Contact Extractor
        </p>

      </div>

    </main>
  )
}
