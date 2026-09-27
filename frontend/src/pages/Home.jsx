import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mobileNavigate = (path) => {
    setMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 180, -80, 0],
            y: [0, -100, 120, 0],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[10%] h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -160, 80, 0],
            y: [0, 120, -80, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[30%] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
        />

      </div>


      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      </div>


      {/* Navigation */}
      <nav className="relative z-20 mx-auto max-w-7xl px-6 py-6">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/")}
            className="text-xl font-bold"
          >
            <span className="text-emerald-400">Udyam</span>Setu
          </motion.button>


          {/* Desktop Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden items-center gap-6 text-sm text-slate-300 md:flex"
          >

            <button
              onClick={() => navigate("/")}
              className="transition hover:text-white"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/schemes")}
              className="transition hover:text-white"
            >
              Schemes
            </button>

            <button
              onClick={() => navigate("/channel-partners")}
              className="transition hover:text-white"
            >
              Partners
            </button>

            {/* ABOUT */}
            <button
              onClick={() => navigate("/about")}
              className="transition hover:text-white"
            >
              About
            </button>

            {/* EMI Calculator */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/loan-calculator")}
              className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-semibold text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-400/20 hover:text-emerald-200"
            >
              EMI Calculator
            </motion.button>

          </motion.div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-2xl text-emerald-300 transition hover:bg-emerald-400/20 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-4 overflow-hidden rounded-2xl border border-emerald-400/20 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md md:hidden"
            >

              <button
                onClick={() => mobileNavigate("/")}
                className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => mobileNavigate("/schemes")}
                className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Schemes
              </button>

              <button
                onClick={() => mobileNavigate("/channel-partners")}
                className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Partners
              </button>

              <button
                onClick={() => mobileNavigate("/about")}
                className="w-full rounded-xl px-4 py-3 text-left font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                About
              </button>

              <button
                onClick={() => mobileNavigate("/loan-calculator")}
                className="mt-1 w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left font-semibold text-emerald-300 transition hover:border-emerald-400/60 hover:bg-emerald-400/20"
              >
                🧮 EMI Calculator
              </button>

            </motion.div>
          )}
        </AnimatePresence>

      </nav>


      {/* PROTOTYPE NOTICE BAR */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >

        <div className="flex items-start gap-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3.5 text-sm">

          <span className="mt-0.5 text-yellow-300">
            ⚠
          </span>

          <p className="leading-6 text-slate-300">

            <span className="font-semibold text-yellow-300">
              Prototype Notice:
            </span>{" "}

            UdyamSetu is currently a prototype with limited features
            and a limited set of government schemes. Information,
            eligibility, loan amounts, interest rates and application
            procedures should be verified with the official scheme
            authority before applying.

          </p>

        </div>

      </motion.div>


      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20">

        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              Smart Financial Assistance Platform
            </span>

          </motion.div>


          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-7 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >

            Find the{" "}

            <span className="text-emerald-400">
              right financial support
            </span>{" "}

            for your journey.

          </motion.h1>


          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-slate-300"
          >
            UdyamSetu helps you discover relevant government financial
            assistance, understand your eligibility, compare schemes, and
            connect with authorized Channel Partners.
          </motion.p>


          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >

            {/* Check Eligibility */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/assessment")}
              className="rounded-xl bg-emerald-500 px-7 py-3.5 font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              Check My Eligibility →
            </motion.button>


            {/* Explore Schemes */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/schemes")}
              className="rounded-xl border border-slate-700 bg-slate-900/50 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:border-slate-500 hover:bg-slate-900"
            >
              Explore Schemes
            </motion.button>

          </motion.div>


          {/* Trust / Feature Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400"
          >

            <span>✓ Eligibility guidance</span>

            <span>✓ Smart scheme matching</span>

            <span>✓ Authorized partners</span>

          </motion.div>

        </div>

      </section>

    </main>
  )
}

export default Home