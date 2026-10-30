import { useState } from 'react'
import FormulaireRecherche from '../components/FormulaireRecherche.jsx'
import ListeResultats from '../components/ListeResultats.jsx'
import { contacts } from '../data/contactsFictifs.js'

const criteresVides = { nom: '', prenom: '', commune: '', codePostal: '' }

const normaliser = (texte) =>
  texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const contient = (valeur, saisie) => normaliser(valeur).includes(normaliser(saisie))

export default function Recherche() {
  const [criteres, setCriteres] = useState(criteresVides)
  const [page, setPage] = useState(1)

  const resultats = contacts.filter(
    (c) =>
      contient(c.nom, criteres.nom) &&
      contient(c.prenom, criteres.prenom) &&
      contient(c.commune, criteres.commune) &&
      c.codePostal.startsWith(criteres.codePostal)
    )

      const totalPages = Math.max(1, Math.ceil(resultats.length / PAR_PAGE))
      const affiches = resultats.slice((page - 1) * PAR_PAGE, page * PAR_PAGE)
      const dateConsultation = new Date().toLocaleDateString('fr-BE')

  const changerCriteres = (nouveaux) => {
    setCriteres(nouveaux)
    setPage(1) 
  }


    return (
    <section>
      <h2 className="text-lg font-semibold">Rechercher une fiche</h2>
      <p className="mt-2 border-l-4 border-yellow-500 bg-yellow-50 px-4 py-2 text-sm">
        Les résultats proviennent d'une source autorisée. Leur usage est limité
        à la finalité déclarée. Aucune donnée masquée ou retirée n'est affichée.
      </p>

      <FormulaireRecherche
        criteres={criteres}
        onChange={changerCriteres}
        onReset={() => changerCriteres(criteresVides)}
      />

      <p className="mb-2 text-sm text-gray-600">{resultats.length} résultat(s)</p>
      <ListeResultats contacts={affiches} dateConsultation={dateConsultation} />

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Précédent
        </button>
        <span>Page {page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </section>
  )

  }
    
