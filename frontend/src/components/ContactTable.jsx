
function ContactTable({ contacts = [], chargement }) {

  if (chargement) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
        <p className="mt-4 text-sm font-medium text-slate-500">
          Chargement des contacts...
        </p>
      </div>
    )
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="text-slate-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          Aucun contact trouvé
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Aucun contact ne correspond à votre recherche.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1150px] border-collapse text-left">

        {/* En-tête */}
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">

            {[
              'Nom',
              'Prénom',
              'Téléphone',
              'Adresse',
              'Code postal',
              'Commune',
              'Province',
              'Statut',
              'Source',
            ].map((titre) => (
              <th
                key={titre}
                className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                {titre}
              </th>
            ))}

          </tr>
        </thead>

        {/* Corps du tableau */}
        <tbody className="divide-y divide-slate-100">

          {contacts.map((contact) => {

            const source =
              contact.contact_sources?.[0]?.source?.nom ||
              'Non renseignée'

            const statut = (contact.statut || '').toLowerCase()

            const actif = statut === 'actif' || statut === 'active'

            return (
              <tr
                key={contact.id}
                className="transition-colors hover:bg-blue-50/50"
              >

                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                  {contact.nom || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {contact.prenom || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {contact.telephone || '—'}
                </td>

                <td className="max-w-[220px] px-5 py-4 text-sm text-slate-600">
                  <span className="block break-words">
                    {contact.adresse || '—'}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                  {contact.code_postal || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {contact.commune || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {contact.province || '—'}
                </td>

                <td className="whitespace-nowrap px-5 py-4">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      actif
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        actif ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />

                    {contact.statut || 'Inconnu'}
                  </span>

                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {source}
                </td>

              </tr>
            )
          })}

        </tbody>

      </table>
    </div>
  )
}

export default ContactTable
