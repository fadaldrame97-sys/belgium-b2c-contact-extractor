function ContactTable({ contacts, chargement }) {
  if (chargement) {
    return <p className="message">Chargement des contacts...</p>
  }

  if (contacts.length === 0) {
    return <p className="message">Aucun contact ne correspond à votre recherche.</p>
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Code postal</th>
            <th>Commune</th>
            <th>Province</th>
            <th>Statut</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            const source = contact.contact_sources?.[0]?.source?.nom || 'Non renseignée'

            return (
              <tr key={contact.id}>
                <td>{contact.nom}</td>
                <td>{contact.prenom || '—'}</td>
                <td>{contact.telephone || '—'}</td>
                <td>{contact.adresse || '—'}</td>
                <td>{contact.code_postal || '—'}</td>
                <td>{contact.commune || '—'}</td>
                <td>{contact.province || '—'}</td>
                <td>
                  <span className={`status ${contact.statut}`}>
                    {contact.statut}
                  </span>
                </td>
                <td>{source}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ContactTable
