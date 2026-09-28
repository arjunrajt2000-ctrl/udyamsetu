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
    estimatedCost: "",
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
      estimatedCost: Number(form.estimatedCost),
    }

    console.log("Assessment answers:", submittedForm)

    navigate("/schemes", { state: submittedForm })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-3 py-8 text-white sm:px-6 sm:py-12 md:py-16">

      <div className="mx-auto w-full max-w-3xl">

        {/* PAGE LABEL */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400 sm:text-sm sm:tracking-[0.2em] md:tracking-[0.25em]">
          UdyamSetu Assessment
        </p>

        {/* TITLE */}
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          {t.assessment.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7 md:text-lg md:leading-8">
          {t.assessment.subtitle}
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 w-full space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl sm:mt-9 sm:space-y-6 sm:p-6 md:p-7"
        >

          {/* INCOME */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold leading-6 sm:text-base">
              {t.assessment.income}
            </label>

            <select
              name="income"
              value={form.income}
              onChange={handleChange}
              required
              className="box-border w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition focus:border-emerald-400 sm:p-4 sm:text-base"
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


          {/* CATEGORY */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold leading-6 sm:text-base">
              {t.assessment.category}
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="box-border w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition focus:border-emerald-400 sm:p-4 sm:text-base"
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


          {/* PURPOSE */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold leading-6 sm:text-base">
              {t.assessment.purpose}
            </label>

            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="box-border w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition focus:border-emerald-400 sm:p-4 sm:text-base"
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


          {/* STATE */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold leading-6 sm:text-base">
              {t.assessment.state}
            </label>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="box-border w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition focus:border-emerald-400 sm:p-4 sm:text-base"
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


          {/* ESTIMATED COST */}
          <div className="w-full">
            <label className="mb-2 block text-sm font-semibold leading-6 sm:text-base">
              {t.assessment.estimatedCost}
            </label>

            <input
              type="number"
              name="estimatedCost"
              value={form.estimatedCost}
              onChange={handleChange}
              min="0"
              step="1"
              required
              inputMode="numeric"
              placeholder="₹ 5,00,000"
              className="box-border w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 sm:p-4 sm:text-base"
            />
          </div>


          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.99] sm:px-6 sm:py-4 sm:text-base"
          >
            {t.assessment.submit} →
          </button>

        </form>
      </div>
    </main>
  )
}

export default Assessment