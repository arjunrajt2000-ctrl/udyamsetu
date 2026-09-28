import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../i18n/LanguageContext"

function Assessment() {
  const navigate = useNavigate()

  const { t } = useLanguage()

  const [form, setForm] = useState({
    income: "",
    category: "",
    purpose: "",
    state: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let income

    switch (form.income) {
      case "below-1":
        income = 100000
        break

      case "1-3":
        income = 300000
        break

      case "3-5":
        income = 500000
        break

      case "above-5":
        income = 600000
        break

      default:
        income = 0
    }

    const submittedForm = {
      ...form,
      income,
    }

    console.log("Assessment answers:", submittedForm)

    navigate("/schemes", { state: submittedForm })
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Page Label */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400 sm:tracking-[0.25em]">
          UdyamSetu Assessment
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {t.assessment.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {t.assessment.subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl sm:mt-10 sm:p-6"
        >

          {/* Income */}
          <div>
            <label className="mb-2 block font-semibold">
              {t.assessment.income}
            </label>

            <select
              name="income"
              value={form.income}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none focus:border-emerald-400 sm:text-base"
            >
              <option value="">
                {t.assessment.incomePlaceholder}
              </option>

              <option value="below-1">
                {t.assessment.below1}
              </option>

              <option value="1-3">
                {t.assessment.oneToThree}
              </option>

              <option value="3-5">
                {t.assessment.threeToFive}
              </option>

              <option value="above-5">
                {t.assessment.above5}
              </option>
            </select>
          </div>


          {/* Category */}
          <div>
            <label className="mb-2 block font-semibold">
              {t.assessment.category}
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none focus:border-emerald-400 sm:text-base"
            >
              <option value="">
                {t.assessment.categoryPlaceholder}
              </option>

              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
              <option value="Other">Other</option>
            </select>
          </div>


          {/* Purpose */}
          <div>
            <label className="mb-2 block font-semibold">
              {t.assessment.purpose}
            </label>

            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none focus:border-emerald-400 sm:text-base"
            >
              <option value="">
                {t.assessment.purposePlaceholder}
              </option>

              <option value="education">
                {t.assessment.education}
              </option>

              <option value="business">
                {t.assessment.business}
              </option>

              <option value="microfinance">
                {t.assessment.microfinance}
              </option>

              <option value="other">
                {t.assessment.other}
              </option>
            </select>
          </div>


          {/* State */}
          <div>
            <label className="mb-2 block font-semibold">
              {t.assessment.state}
            </label>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none focus:border-emerald-400 sm:text-base"
            >
              <option value="">
                {t.assessment.statePlaceholder}
              </option>

              <option value="Tamil Nadu">
                {t.assessment.tamilNadu}
              </option>

              <option value="Other">
                {t.assessment.otherState}
              </option>
            </select>
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-6 py-4 font-bold text-sm text-slate-950 transition hover:scale-[1.01] hover:bg-emerald-400 sm:text-base"
          >
            {t.assessment.submit} →
          </button>

        </form>
      </div>
    </main>
  )
}

export default Assessment