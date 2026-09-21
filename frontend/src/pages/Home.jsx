function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            UdyamSetu
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Find the right financial support for your journey.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            UdyamSetu helps you discover relevant government financial
            assistance, understand your eligibility, compare schemes, and
            find authorized Channel Partners.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
              Check My Eligibility
            </button>

            <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-900">
              Explore Schemes
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
