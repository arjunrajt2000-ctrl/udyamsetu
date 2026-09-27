import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between">

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="text-xl font-bold"
        >
          <span className="text-emerald-400">Udyam</span>Setu
        </motion.button>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Back to Home
        </button>

      </nav>


      {/* Hero */}
      <section className="mx-auto max-w-5xl py-20">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            About UdyamSetu
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Connecting people with
            <span className="text-emerald-400"> financial support.</span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            UdyamSetu is a prototype platform designed to make it easier
            for citizens to discover relevant government financial
            assistance schemes, understand basic eligibility requirements,
            and find the appropriate application channels.
          </p>

        </motion.div>


        {/* What UdyamSetu Does */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <div className="text-3xl">🔎</div>

            <h2 className="mt-4 text-xl font-bold">
              Discover Schemes
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Explore financial assistance schemes and find options
              that may be relevant to your requirements.
            </p>

          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <div className="text-3xl">✓</div>

            <h2 className="mt-4 text-xl font-bold">
              Understand Eligibility
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Use the assessment flow to understand which schemes
              may match your basic profile and requirements.
            </p>

          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <div className="text-3xl">📍</div>

            <h2 className="mt-4 text-xl font-bold">
              Find Application Channels
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Connect with official application routes and authorized
              channel partners where available.
            </p>

          </motion.div>

        </div>


        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            From discovery to application
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            <div>
              <div className="text-emerald-400 font-bold">01</div>
              <h3 className="mt-2 font-semibold">
                Assess
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Provide basic information about your requirements.
              </p>
            </div>

            <div>
              <div className="text-emerald-400 font-bold">02</div>
              <h3 className="mt-2 font-semibold">
                Match
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                View schemes that may match your profile.
              </p>
            </div>

            <div>
              <div className="text-emerald-400 font-bold">03</div>
              <h3 className="mt-2 font-semibold">
                Verify
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Check the latest information with the official authority.
              </p>
            </div>

            <div>
              <div className="text-emerald-400 font-bold">04</div>
              <h3 className="mt-2 font-semibold">
                Apply
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Continue through the appropriate official channel.
              </p>
            </div>

          </div>

        </motion.section>


        {/* Prototype Notice */}
        <section className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6">

          <p className="font-semibold text-yellow-300">
            ⚠ Prototype Notice
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            UdyamSetu is currently a prototype with limited features
            and a limited set of schemes. Information displayed on the
            platform should be verified with the relevant official
            government authority before making any application or
            financial decision.
          </p>

        </section>


        {/* Bottom Actions */}
        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/assessment")}
            className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Check My Eligibility →
          </button>

          <button
            onClick={() => navigate("/loan-calculator")}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            EMI Calculator
          </button>

        </div>

      </section>

    </main>
  );
}

export default About;