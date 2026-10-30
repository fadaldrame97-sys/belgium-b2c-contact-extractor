const classeChamp =
  'rounded border border-gray-300 bg-white px-3 py-2 focus:border-blue-700 focus:outline-none'

export default function FormulaireRecherche({ criteres, onChange, onReset }) {
  const modifier = (e) => onChange({ ...criteres, [e.target.name]: e.target.value })

  return (
    <form className="my-4 flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
      <input className={classeChamp} name="nom" placeholder="Nom" value={criteres.nom} onChange={modifier} />
      <input className={classeChamp} name="prenom" placeholder="Prénom" value={criteres.prenom} onChange={modifier} />
      <input className={classeChamp} name="commune" placeholder="Commune" value={criteres.commune} onChange={modifier} />
      <input className={classeChamp} name="codePostal" placeholder="Code postal" value={criteres.codePostal} onChange={modifier} />
      <button
        type="button"
        onClick={onReset}
        className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
      >
        Réinitialiser
      </button>
    </form>
  )
}