import { useState } from 'react'
import FormulaireRecherche from '../components/FormulaireRecherche.jsx'
import ListeResultats from '../components/ListeResultats.jsx'
import { contacts } from '../data/contactsFictifs.js'

const criteresVides = { nom: '', prenom: '', commune: '', codePostal: '' }

const normaliser = (texte) =>
  texte.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const contient = (valeur, saisie) => normaliser(valeur).includes(normaliser(saisie))