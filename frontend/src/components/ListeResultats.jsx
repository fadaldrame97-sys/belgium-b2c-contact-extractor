export default function ListeResultats({ contacts, dateConsultation }) {
  if (contacts.length === 0) {
    return <p className="bg-white p-4">Aucun résultat pour ces critères.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-3 py-2">Nom</th>
            <th className="px-3 py-2">Prénom</th>
            <th className="px-3 py-2">Téléphone</th>
            <th className="px-3 py-2">Commune</th>
            <th className="px-3 py-2">Code postal</th>
            <th className="px-3 py-2">Source</th>
            <th className="px-3 py-2">Consulté le</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-3 py-2">{c.nom}</td>
              <td className="px-3 py-2">{c.prenom}</td>
              <td className="px-3 py-2">{c.telephone}</td>
              <td className="px-3 py-2">{c.commune}</td>
              <td className="px-3 py-2">{c.codePostal}</td>
              <td className="px-3 py-2">{c.source}</td>
              <td className="px-3 py-2">{dateConsultation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}