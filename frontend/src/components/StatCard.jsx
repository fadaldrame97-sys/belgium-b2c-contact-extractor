
export default function StatCard({ titre, valeur }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {titre}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {valeur ?? 0}
      </p>
    </article>
  )
}
