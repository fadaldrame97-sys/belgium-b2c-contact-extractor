import { Routes, Route } from 'react-router-dom'
import Recherche from './pages/Recherche.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-900 px-6 py-4 text-white">
        <h1 className="text-xl font-semibold">Annuaire B2C Belgique</h1>
      </header>
      <main className="mx-auto my-6 max-w-5xl px-4">
        <Routes>
          <Route path="/" element={<Recherche />} />
        </Routes>
      </main>
    </div>
  )
}