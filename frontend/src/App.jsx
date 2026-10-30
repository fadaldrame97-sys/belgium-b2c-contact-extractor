import { Routes, Route, NavLink } from 'react-router-dom'
import Recherche from './pages/Recherche.jsx'
import Connexion from './pages/Connexion.jsx'
import DemandesDroits from './pages/DemandesDroits.jsx'
import NonTrouvee from './pages/NonTrouvee.jsx'

const classeLien = ({ isActive }) =>
  `rounded px-3 py-1 ${isActive ? 'bg-white text-blue-900' : 'text-white hover:bg-blue-800'}`

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between bg-blue-900 px-6 py-4">
        <h1 className="text-xl font-semibold text-white">Annuaire B2C Belgique</h1>
        <nav className="flex gap-2">
          <NavLink to="/" end className={classeLien}>Recherche</NavLink>
          <NavLink to="/droits" className={classeLien}>Demandes de droits</NavLink>
          <NavLink to="/connexion" className={classeLien}>Connexion</NavLink>
        </nav>
      </header>

      <main className="mx-auto my-6 max-w-5xl px-4">
        <Routes>
          <Route path="/" element={<Recherche />} />
          <Route path="/droits" element={<DemandesDroits />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="*" element={<NonTrouvee />} />
        </Routes>
      </main>
    </div>
  )
}