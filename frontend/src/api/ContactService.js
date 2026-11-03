import api from '/axios'

export async function getContacts(filtres = {}) {
  const response = await api.get('/contacts', { params: filtres })
  return response.data
}

export async function getStatistiques() {
  const response = await api.get('/contacts/statistiques')
  return response.data.statistiques
}

export async function importerContacts() {
  const response = await api.post('/contacts/importer')
  return response.data
}

export async function exporterContacts(filtres = {}) {
  const response = await api.post('/exports', filtres)
  return response.data
}
