import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

function LoanCalculator() {
  const navigate = useNavigate();

  const { t, language } = useLanguage();

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [moratorium, setMoratorium] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenure);
    const moratoriumMonths = Number(moratorium) || 0;

    if (
      !principal ||
      principal <= 0 ||
      !annualRate ||
      annualRate <= 0 ||
      !years ||
      years <= 0 ||
      moratoriumMonths < 0
    ) {
      setResult(null);
      setError(true);
      return;
    }

    setError(false);

    const monthlyRate = annualRate / 12 / 100;

    const moratoriumInterest =
      principal * monthlyRate * moratoriumMonths;

    const adjustedPrincipal =
      principal + moratoriumInterest;

    const months = years * 12;

    const emi =
      (adjustedPrincipal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment =
      emi * months + moratoriumInterest;

    const totalInterest =
      totalPayment - principal;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      moratoriumInterest,
      months,
      moratoriumMonths,
      adjustedPrincipal,
    });
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setMoratorium("");
    setResult(null);
    setError(false);
  };

  const formatCurrency = (value) => {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-16">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:left-[10%] sm:h-72 sm:w-72" />

        <div className="absolute right-[5%] top-[40%] h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl sm:right-[10%] sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 rounded-lg py-2 text-sm text-slate-400 transition hover:text-white sm:mb-8"
        >
          ← {t.common?.back || "Back"}
        </button>

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-sm sm:tracking-[0.25em]">
            UdyamSetu{" "}
            {language === "ta"
              ? "நிதி கருவிகள்"
              : "Financial Tools"}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t.emi.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-lg sm:leading-8">
            {language === "ta"
              ? "கடனுக்கு விண்ணப்பிப்பதற்கு முன் உங்கள் மாதாந்திர EMI, மொத்த வட்டி மற்றும் மொத்த திருப்பிச் செலுத்தும் தொகையை மதிப்பிடுங்கள்."
              : "Estimate your monthly EMI, total interest and total repayment amount before applying for a loan."}
          </p>
        </motion.div>

        {/* CALCULATOR */}
        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:mt-10 sm:p-6 md:p-8"
        >

          <h2 className="text-xl font-bold sm:text-2xl">
            {language === "ta"
              ? "கடன் விவரங்களை உள்ளிடவும்"
              : "Enter Loan Details"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {language === "ta"
              ? "மதிப்பிடப்பட்ட EMI-ஐ கணக்கிடுவதற்கு தேவையான கடன் விவரங்களை உள்ளிடவும்."
              : "Enter the loan details required to calculate your estimated EMI."}
          </p>

          <div className="mt-6 grid gap-5 sm:mt-7 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">

            {/* LOAN AMOUNT */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                {t.emi.loanAmount} (₹)
              </label>

              <input
                type="number"
                min="0"
                value={loanAmount}
                onChange={(e) => {
                  setLoanAmount(e.target.value);
                  setError(false);
                }}
                placeholder={
                  language === "ta"
                    ? "எ.கா. 500000"
                    : "e.g. 500000"
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 sm:p-4"
              />
            </div>

            {/* INTEREST */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                {t.emi.interestRate} (%)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  setError(false);
                }}
                placeholder={
                  language === "ta"
                    ? "எ.கா. 7.5"
                    : "e.g. 7.5"
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 sm:p-4"
              />
            </div>

            {/* TENURE */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                {t.emi.tenure} ({t.emi.years})
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={tenure}
                onChange={(e) => {
                  setTenure(e.target.value);
                  setError(false);
                }}
                placeholder={
                  language === "ta"
                    ? "எ.கா. 5"
                    : "e.g. 5"
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400 sm:p-4"
              />
            </div>

            {/* MORATORIUM */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                {t.emi.moratorium} ({t.emi.months})
              </label>

              <input
                type="number"
                min="0"
                step="1"
                value={moratorium}
                onChange={(e) => {
                  setMoratorium(e.target.value);
                  setError(false);
                }}
                placeholder={
                  language === "ta"
                    ? "எ.கா. 6"
                    : "e.g. 6"
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-400 sm:p-4"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {language === "ta"
                  ? "Moratorium இல்லையெனில் 0 உள்ளிடவும்."
                  : "Enter 0 if there is no moratorium."}
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:flex">

            <button
              onClick={calculateEMI}
              className="w-full rounded-xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
            >
              🧮 {t.emi.calculate}
            </button>

            <button
              onClick={resetCalculator}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:w-auto"
            >
              {language === "ta"
                ? "மீட்டமை"
                : "Reset"}
            </button>

          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-5 text-sm leading-6 text-amber-400">
              {language === "ta"
                ? "தயவுசெய்து சரியான கடன் தொகை, வட்டி விகிதம், கடன் காலம் மற்றும் Moratorium காலத்தை உள்ளிடவும்."
                : "Please enter a valid loan amount, interest rate, loan tenure and moratorium period."}
            </p>
          )}

        </motion.section>

        {/* RESULTS */}
        {result && (
          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8"
          >

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-4 sm:p-6 md:p-8">

              {/* EMI */}
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 sm:text-sm">
                    {t.emi.monthlyEmi}
                  </p>

                  <p className="mt-2 break-words text-3xl font-bold sm:text-5xl">
                    {formatCurrency(result.emi)}
                  </p>
                </div>

                <div className="w-fit rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-400">
                  {result.months} {t.emi.months}
                </div>

              </div>

              {/* SUMMARY */}
              <div className="mt-7 grid gap-4 sm:mt-8 sm:grid-cols-2 md:grid-cols-4">

                {/* PRINCIPAL */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-sm text-slate-400">
                    {t.emi.loanAmount}
                  </p>

                  <p className="mt-2 break-words text-xl font-bold">
                    {formatCurrency(Number(loanAmount))}
                  </p>
                </div>

                {/* MORATORIUM INTEREST */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-sm leading-5 text-slate-400">
                    {t.emi.estimatedInterest}
                  </p>

                  <p className="mt-2 break-words text-xl font-bold text-orange-400">
                    {formatCurrency(result.moratoriumInterest)}
                  </p>
                </div>

                {/* TOTAL INTEREST */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-sm text-slate-400">
                    {t.emi.totalInterest}
                  </p>

                  <p className="mt-2 break-words text-xl font-bold text-amber-400">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                {/* TOTAL PAYMENT */}
                <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <p className="text-sm text-slate-400">
                    {t.emi.totalPayment}
                  </p>

                  <p className="mt-2 break-words text-xl font-bold text-cyan-400">
                    {formatCurrency(result.totalPayment)}
                  </p>
                </div>

              </div>

              {/* BREAKDOWN */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mt-6 sm:p-5">

                <h3 className="font-bold">
                  {t.emi.loanSummary}
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.loanAmount}
                    </span>

                    <span className="text-right font-semibold">
                      {formatCurrency(Number(loanAmount))}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.interestRate}
                    </span>

                    <span className="text-right font-semibold">
                      {interestRate}%
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.tenure}
                    </span>

                    <span className="text-right font-semibold">
                      {tenure} {t.emi.years}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.moratorium}
                    </span>

                    <span className="text-right font-semibold">
                      {result.moratoriumMonths} {t.emi.months}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.estimatedInterest}
                    </span>

                    <span className="text-right font-semibold text-orange-400">
                      {formatCurrency(result.moratoriumInterest)}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-t border-white/10 pt-3">

                    <span className="text-slate-400">
                      {t.emi.monthlyEmi}
                    </span>

                    <span className="text-right font-bold text-emerald-400">
                      {formatCurrency(result.emi)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* DISCLAIMER */}
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 sm:p-5">

              <p className="text-sm font-semibold text-yellow-300">
                ⚠ {t.emi.important}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {t.emi.disclaimer}
              </p>

            </div>

          </motion.section>
        )}

      </div>

    </main>
  );
}

export default LoanCalculator;