import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import FormulaireRecherche from '../components/FormulaireRecherche.jsx'
import ListeResultats from '../components/ListeResultats.jsx'

const criteresVides = { nom: '', prenom: '', commune: '', codePostal: '' }
const PAR_PAGE = 5


function messageErreur(erreur) {
  if (!erreur.response) {
    return "Impossible de joindre le serveur. Vérifie que 'php artisan serve' est lancé."
  }
  if (erreur.response.status === 422) {
    return 'Critères invalides (le code postal contient 4 chiffres au maximum).'
  }
  return `Erreur du serveur (code ${erreur.response.status}).`
}

export default function Recherche() {
  const [criteres, setCriteres] = useState(criteresVides)
  const [page, setPage] = useState(1)
  const [contacts, setContacts] = useState([])
  const [meta, setMeta] = useState({ total: 0, last_page: 1 })
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  const dateConsultation = new Date().toLocaleDateString('fr-BE')


  useEffect(() => {
    const controle = new AbortController()

    const charger = async () => {
      setChargement(true)
      setErreur('')
      try {
        const reponse = await api.get('/contacts', {
          params: {
            nom: criteres.nom || undefined,
            prenom: criteres.prenom || undefined,
            commune: criteres.commune || undefined,
            code_postal: criteres.codePostal || undefined,
            page,
            par_page: PAR_PAGE,
          },
          signal: controle.signal,
        })
        setContacts(reponse.data.data)
        setMeta(reponse.data.meta)
      } catch (e) {
        if (!controle.signal.aborted) setErreur(messageErreur(e))
      } finally {
        if (!controle.signal.aborted) setChargement(false)
      }
    }

   
    const minuteur = setTimeout(charger, 300)

    return () => {
      clearTimeout(minuteur)
      controle.abort()
    }
  }, [criteres, page])

  const changerCriteres = (nouveaux) => {
    setCriteres(nouveaux)
    setPage(1)
  }

  const classeBouton =
    'rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400'

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

      {erreur && (
        <p className="mb-2 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">
          {erreur}
        </p>
      )}

      <p className="mb-2 text-sm text-gray-600">
        {chargement ? 'Chargement...' : `${meta.total} résultat(s)`}
      </p>

      <ListeResultats contacts={contacts} dateConsultation={dateConsultation} />

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={chargement || page === 1}
          onClick={() => setPage(page - 1)}
          className={classeBouton}
        >
          Précédent
        </button>
        <span>Page {page} / {meta.last_page}</span>
        <button
          disabled={chargement || page >= meta.last_page}
          onClick={() => setPage(page + 1)}
          className={classeBouton}
        >
          Suivant
        </button>
      </div>
    </section>
  )
}