import { useEffect, useState } from 'react'
import ContactTable from '../components/ContactTable'
import StatCard from '../components/StatCard'
import {
exporterContacts,getContacts, getStatistiques,importerContacts,} from '../api/contactService'

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
      const resultat = await getContacts(nouveauxFiltres)
      setContacts(resultat.contacts.data)
      setPagination(resultat.contacts)
    } catch (error) {
      setErreur(error.response?.data?.message || 'Impossible de charger les contacts. Vérifiez que Laravel est démarré.')
    } finally {
      setChargement(false)
    }
  }
