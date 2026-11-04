import { useState } from 'react'
import ContactTable from '../components/ContactTable'
import StatCard from '../components/StatCard'
import {
exporterContacts,getContacts, getStatistiques,importerContacts,} from './api/contactService'

function Dashboard() {
  const [contacts, setContacts] = useState([])
  const [statistiques, setStatistiques] = useState({})
  const [pagination, setPagination] = useState({})
  const [filtres, setFiltres] = useState({
    nom: '',
    prenom: '',
    commune: '',
    code_postal: '',
    statut: '',
    page: 1,
    per_page: 10,
  })
  const [chargement, setChargement] = useState(true)
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState('')
  const [actionEnCours, setActionEnCours] = useState(false)

    function chargerContacts(nouveauxFiltres = filtres) {
    setChargement(true)
    setErreur('')

    try {
      const resultat =  getContacts(nouveauxFiltres)
      setContacts(resultat.contacts.data)
      setPagination(resultat.contacts)
    } catch (error) {
      setErreur(error.response?.data?.message || 'Impossible de charger les contacts. Vérifiez que Laravel est démarré.')
    } finally {
      setChargement(false)
    }
  }

    function chargerStatistiques() {
    try {
      const resultat =  getStatistiques()
      setStatistiques(resultat)
    } catch {
      setErreur('Impossible de charger les statistiques.')
    }
  }

  

  function modifierFiltre(event) {
    const { name, value } = event.target
    setFiltres((anciensFiltres) => ({
      ...anciensFiltres,
      [name]: value,
      page: 1,
    }))
  }

  function rechercher(event) {
    event.preventDefault()
    chargerContacts(filtres)
  }

  function reinitialiser() {
    const nouveauxFiltres = {
      nom: '',
      prenom: '',
      commune: '',
      code_postal: '',
      statut: '',
      page: 1,
      per_page: 10,
    }

    setFiltres(nouveauxFiltres)
   chargerContacts(nouveauxFiltres)
  }

    async function lancerImportation() {
    setActionEnCours(true)
    setMessage('')
    setErreur('')

    try {
      const resultat = await importerContacts()
      setMessage(`${resultat.message} ${resultat.nombre_importe} profils fictifs traités.`)
      await chargerContacts()
      await chargerStatistiques()
    } catch (error) {
      setErreur(error.response?.data?.message || 'L’importation a échoué.')
    } finally {
      setActionEnCours(false)
    }
  }

    function lancerExport() {
    setActionEnCours(true)
    setMessage('')
    setErreur('')

    try {
      const resultat =  exporterContacts({
        nom: filtres.nom,
        prenom: filtres.prenom,
        commune: filtres.commune,
      })

      if (resultat.url) {
        window.location.href = resultat.url
        setMessage(`Export créé : ${resultat.nombre_contacts} contacts.`)
      }
    } catch (error) {
      setErreur(error.response?.data?.message || 'La création de l’export a échoué.')
    } finally {
      setActionEnCours(false)
    }
  }

  function changerPage(nouvellePage) {
    const nouveauxFiltres = { ...filtres, page: nouvellePage }
    setFiltres(nouveauxFiltres)
    chargerContacts(nouveauxFiltres)
  }

  return (
    <main className="page">
      <header className="topbar">
        <div>
          <p className="eyebrow">BELGIUM B2C</p>
          <h1>Contact Extractor</h1>
          <p className="subtitle">Tableau de bord de gestion des contacts de démonstration</p>
        </div>
        <div className="topbar-actions">
          <button className="button button-secondary" onClick={lancerExport} disabled={actionEnCours}>
            Exporter CSV
          </button>
          <button className="button button-primary" onClick={lancerImportation} disabled={actionEnCours}>
            {actionEnCours ? 'Veuillez patienter...' : 'Importer 20 profils'}
          </button>
        </div>
      </header>

      <section className="notice">
       
      </section>

      {message && <div className="alert success">{message}</div>}
      {erreur && <div className="alert error">{erreur}</div>}

      <section className="stats-grid">
        <StatCard titre="Contacts enregistrés" valeur={statistiques.total} />
        <StatCard titre="Contacts actifs" valeur={statistiques.actifs} />
        <StatCard titre="Contacts inactifs" valeur={statistiques.inactifs} />
        <StatCard titre="Communes représentées" valeur={statistiques.communes} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Répertoire des contacts</h2>
            <p>Rechercher, filtrer et consulter les profils enregistrés.</p>
          </div>
          <span className="result-count">{pagination.total ?? 0} résultat(s)</span>
        </div>

        <form className="filters" onSubmit={rechercher}>
          <label>
            Nom
            <input name="nom" value={filtres.nom} onChange={modifierFiltre} placeholder="Ex. Dupont" />
          </label>
          <label>
            Prénom
            <input name="prenom" value={filtres.prenom} onChange={modifierFiltre} placeholder="Ex. Marie" />
          </label>
          <label>
            Commune
            <input name="commune" value={filtres.commune} onChange={modifierFiltre} placeholder="Ex. Bruxelles" />
          </label>
          <label>
            Code postal
            <input name="code_postal" value={filtres.code_postal} onChange={modifierFiltre} placeholder="Ex. 1000" />
          </label>
          <label>
            Statut
            <select name="statut" value={filtres.statut} onChange={modifierFiltre}>
              <option value="">Tous</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </label>
          <div className="filter-actions">
            <button className="button button-primary" type="submit">Rechercher</button>
            <button className="button button-secondary" type="button" onClick={reinitialiser}>Réinitialiser</button>
          </div>
        </form>

        <ContactTable contacts={contacts} chargement={chargement} />

        <div className="pagination">
          <button
            className="button button-secondary"
            disabled={!pagination.prev_page_url || chargement}
            onClick={() => changerPage(pagination.current_page - 1)}
          >
            Précédent
          </button>
          <span>
            Page {pagination.current_page ?? 1} sur {pagination.last_page ?? 1}
          </span>
          <button
            className="button button-secondary"
            disabled={!pagination.next_page_url || chargement}
            onClick={() => changerPage(pagination.current_page + 1)}
          >
            Suivant
          </button>
        </div>
      </section>

      <footer className="footer">
        Belgium B2C Contact Extractor · Application de démonstration
      </footer>
    </main>
  )
}

export default Dashboard
