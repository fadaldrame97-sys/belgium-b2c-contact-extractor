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

  }
    
