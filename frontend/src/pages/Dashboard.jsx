
import { useEffect, useState } from 'react'

import ContactTable from '../components/ContactTable'
import StatCard from '../components/StatCard'

import {
  exporterContacts,
  getContacts,
  getStatistiques,
  importerContacts,
} from '../api/ContactService'

const filtresInitiaux = {
  nom: '',
  prenom: '',
  commune: '',
  code_postal: '',
  statut: '',
  page: 1,
  per_page: 10,
}

function Dashboard() {
  const [contacts, setContacts] = useState([])
  const [statistiques, setStatistiques] = useState({})
  const [pagination, setPagination] = useState({})

  const [filtres, setFiltres] = useState(filtresInitiaux)

  const [chargement, setChargement] = useState(true)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [actionEnCours, setActionEnCours] = useState(false)

 
  async function chargerContacts(nouveauxFiltres = filtres) {
    setChargement(true)
    setErreur('')

    try {
      const resultat = await getContacts(nouveauxFiltres)

      const pageContacts = resultat.contacts ?? resultat

      setContacts(pageContacts.data ?? [])
      setPagination(pageContacts)
    } catch (error) {
      console.error('Erreur contacts :', error)

      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les contacts. Vérifiez Laravel.'
      )
    } finally {
      setChargement(false)
    }
  }


  async function chargerStatistiques() {
    try {
      const resultat = await getStatistiques()

      setStatistiques(resultat ?? {})
    } catch (error) {
      console.error('Erreur statistiques :', error)

      setErreur(
        error.response?.data?.message ||
        'Impossible de charger les statistiques.'
      )
    }
  }


  useEffect(() => {
    chargerContacts(filtresInitiaux)
    chargerStatistiques()
  }, [])

 
  function modifierFiltre(event) {
    const { name, value } = event.target

    setFiltres((anciens) => ({
      ...anciens,
      [name]: value,
      page: 1,
    }))
  }


  function rechercher(event) {
    event.preventDefault()
    chargerContacts(filtres)
  }

  // Réinitialiser
  function reinitialiser() {
    setFiltres(filtresInitiaux)
    chargerContacts(filtresInitiaux)
  }


  async function lancerImportation() {
    setActionEnCours(true)
    setMessage('')
    setErreur('')

    try {
      const resultat = await importerContacts()

      setMessage(
        `${resultat.message} ${resultat.nombre_importe ?? 0} profils traités.`
      )

      await Promise.all([
        chargerContacts(filtres),
        chargerStatistiques(),
      ])
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'L’importation a échoué.'
      )
    } finally {
      setActionEnCours(false)
    }
  }


  async function lancerExport() {
    setActionEnCours(true)
    setMessage('')
    setErreur('')

    try {
      const resultat = await exporterContacts({
        nom: filtres.nom,
        prenom: filtres.prenom,
        commune: filtres.commune,
        code_postal: filtres.code_postal,
        statut: filtres.statut,
      })

      if (resultat.url) {
        window.location.href = resultat.url
      } else {
        setMessage('Export créé avec succès.')
      }
    } catch (error) {
      setErreur(
        error.response?.data?.message ||
        'La création de l’export a échoué.'
      )
    } finally {
      setActionEnCours(false)
    }
  }


  function changerPage(nouvellePage) {
    const nouveauxFiltres = {
      ...filtres,
      page: nouvellePage,
    }

    setFiltres(nouveauxFiltres)
    chargerContacts(nouveauxFiltres)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <header className="mb-8 flex flex-col justify-between gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Belgium B2C
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Contact Extractor
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Tableau de bord de gestion des contacts de démonstration
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={lancerExport}
              disabled={actionEnCours}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              Exporter CSV
            </button>

            <button
              onClick={lancerImportation}
              disabled={actionEnCours}
              className="rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-50"
            >
              {actionEnCours
                ? 'Veuillez patienter...'
                : 'Importer 20 profils'}
            </button>

          </div>
        </header>

     
        {message && (
          <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            {message}
          </div>
        )}

        {erreur && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {erreur}
          </div>
        )}


        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            titre="Contacts enregistrés"
            valeur={statistiques.total}
          />

          <StatCard
            titre="Contacts actifs"
            valeur={statistiques.actifs}
          />

          <StatCard
            titre="Contacts inactifs"
            valeur={statistiques.inactifs}
          />

          <StatCard
            titre="Communes représentées"
            valeur={statistiques.communes}
          />

        </section>

  
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-6 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Répertoire des contacts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Rechercher, filtrer et consulter les profils enregistrés.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {pagination.total ?? 0} résultat(s)
            </span>

          </div>

  
          <form
            onSubmit={rechercher}
            className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50/70 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          >

            {[
              {
                label: 'Nom',
                name: 'nom',
                placeholder: 'Ex. Dupont',
              },
              {
                label: 'Prénom',
                name: 'prenom',
                placeholder: 'Ex. Marie',
              },
              {
                label: 'Commune',
                name: 'commune',
                placeholder: 'Ex. Bruxelles',
              },
              {
                label: 'Code postal',
                name: 'code_postal',
                placeholder: 'Ex. 1000',
              },
            ].map((champ) => (

              <label
                key={champ.name}
                className="block text-sm font-medium text-slate-700"
              >
                {champ.label}

                <input
                  name={champ.name}
                  value={filtres[champ.name]}
                  onChange={modifierFiltre}
                  placeholder={champ.placeholder}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

            ))}

            <label className="block text-sm font-medium text-slate-700">
              Statut

              <select
                name="statut"
                value={filtres.statut}
                onChange={modifierFiltre}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Tous</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </label>

            <div className="flex items-end gap-2">

              <button
                type="submit"
                className="flex-1 rounded-lg bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Rechercher
              </button>

              <button
                type="button"
                onClick={reinitialiser}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Réinitialiser
              </button>

            </div>

          </form>

   
          <ContactTable
            contacts={contacts}
            chargement={chargement}
          />

        
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row">

            <button
              disabled={!pagination.prev_page_url || chargement}
              onClick={() =>
                changerPage((pagination.current_page ?? 1) - 1)
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Précédent
            </button>

            <span className="text-sm text-slate-500">
              Page {pagination.current_page ?? 1} sur {pagination.last_page ?? 1}
            </span>

            <button
              disabled={!pagination.next_page_url || chargement}
              onClick={() =>
                changerPage((pagination.current_page ?? 1) + 1)
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Suivant
            </button>

          </div>

        </section>

        <footer className="py-8 text-center text-xs text-slate-400">
          Belgium B2C Contact Extractor · Application de démonstration
        </footer>

      </div>

    </main>
  )
}

export default Dashboard
