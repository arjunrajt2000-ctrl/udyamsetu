import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Assessment() {
  const navigate = useNavigate()

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
  e.preventDefault();

  let income;

  switch (form.income) {
    case "below-1":
      income = 100000;
      break;

    case "1-3":
      income = 300000;
      break;

    case "3-5":
      income = 500000;
      break;

    case "above-5":
      income = 600000;
      break;

    default:
      income = 0;
  }

  const submittedForm = {
    ...form,
    income,
  };

  console.log("Assessment answers:", submittedForm);

  navigate("/schemes", { state: submittedForm });
};

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          UdyamSetu Assessment
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Tell us about your funding needs
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Answer a few questions and we'll identify financial assistance
          schemes that may be relevant to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl"
        >

          {/* Income */}
          <div>
            <label className="mb-2 block font-semibold">
              Annual Family Income
            </label>

            <select
              name="income"
              value={form.income}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
            >
              <option value="">Select your income range</option>
              <option value="below-1">Below ₹1 Lakh</option>
              <option value="1-3">₹1–3 Lakhs</option>
              <option value="3-5">₹3–5 Lakhs</option>
              <option value="above-5">Above ₹5 Lakhs</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-semibold">
              Applicant Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
            >
              <option value="">Select your category</option>
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
              What do you need financial support for?
            </label>

            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
            >
              <option value="">Select your purpose</option>
              <option value="education">Education</option>
              <option value="business">Starting / Expanding a Business</option>
              <option value="microfinance">Micro Finance</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="mb-2 block font-semibold">
              State
            </label>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
            >
              <option value="">Select your state</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Other">Other State</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-400 hover:scale-[1.01]"
          >
            Find Suitable Schemes →
          </button>

        </form>
      </div>
    </main>
  )
}

export default Assessment