import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../i18n/translations";

function LoanCalculator() {
  const navigate = useNavigate();

  // Get the currently selected language
  const language = localStorage.getItem("language") || "ta";

  const t = translations[language] || translations.ta;

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenure);

    if (
      !principal ||
      principal <= 0 ||
      !annualRate ||
      annualRate <= 0 ||
      !years ||
      years <= 0
    ) {
      setResult(null);
      setError(true);
      return;
    }

    setError(false);

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setResult({
      emi,
      totalInterest,
      totalPayment,
      months,
    });
  };

  const resetCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setResult(null);
    setError(false);
  };

  const formatCurrency = (value) => {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute right-[10%] top-[40%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-slate-400 transition hover:text-white"
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
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            UdyamSetu {language === "ta" ? "நிதி கருவிகள்" : "Financial Tools"}
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            {t.emi.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">
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
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
        >

          <h2 className="text-2xl font-bold">
            {language === "ta"
              ? "கடன் விவரங்களை உள்ளிடவும்"
              : "Enter Loan Details"}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {language === "ta"
              ? "மதிப்பிடப்பட்ட EMI-ஐ கணக்கிடுவதற்கு தேவையான கடன் விவரங்களை உள்ளிடவும்."
              : "Enter the loan details required to calculate your estimated EMI."}
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-3">

            {/* LOAN AMOUNT */}
            <div>
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
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
              />
            </div>

            {/* INTEREST */}
            <div>
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
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            {/* TENURE */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t.emi.tenure} ({t.emi.moratorium === "Moratorium Period" ? "Years" : "ஆண்டுகள்"})
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
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-400"
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-7 flex flex-wrap gap-3">

            <button
              onClick={calculateEMI}
              className="rounded-xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              🧮 {t.emi.calculate}
            </button>

            <button
              onClick={resetCalculator}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {language === "ta" ? "மீட்டமை" : "Reset"}
            </button>

          </div>

          {/* INVALID INPUT */}
          {error && (
            <p className="mt-5 text-sm text-amber-400">
              {language === "ta"
                ? "தயவுசெய்து சரியான கடன் தொகை, வட்டி விகிதம் மற்றும் கடன் காலத்தை உள்ளிடவும்."
                : "Please enter a valid loan amount, interest rate and loan tenure."}
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

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 md:p-8">

              {/* EMI */}
              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    {t.emi.monthlyEmi}
                  </p>

                  <p className="mt-2 text-4xl font-bold md:text-5xl">
                    {formatCurrency(result.emi)}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-400">
                  {result.months} {t.emi.months}
                </div>

              </div>

              {/* SUMMARY */}
              <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    {t.emi.loanAmount}
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {formatCurrency(Number(loanAmount))}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    {t.emi.totalInterest}
                  </p>

                  <p className="mt-2 text-xl font-bold text-amber-400">
                    {formatCurrency(result.totalInterest)}
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    {t.emi.totalPayment}
                  </p>

                  <p className="mt-2 text-xl font-bold text-cyan-400">
                    {formatCurrency(result.totalPayment)}
                  </p>

                </div>

              </div>

              {/* BREAKDOWN */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

                <h3 className="font-bold">
                  {language === "ta"
                    ? "கடன் சுருக்கம்"
                    : "Loan Summary"}
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.loanAmount}
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(Number(loanAmount))}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.interestRate}
                    </span>

                    <span className="font-semibold">
                      {interestRate}%
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      {t.emi.tenure}
                    </span>

                    <span className="font-semibold">
                      {tenure}{" "}
                      {language === "ta"
                        ? "ஆண்டுகள்"
                        : "Years"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-white/10 pt-3">

                    <span className="text-slate-400">
                      {t.emi.monthlyEmi}
                    </span>

                    <span className="font-bold text-emerald-400">
                      {formatCurrency(result.emi)}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* DISCLAIMER */}
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">

              <p className="text-sm font-semibold text-yellow-300">
                ⚠{" "}
                {language === "ta"
                  ? "முக்கிய குறிப்பு"
                  : "Important Note"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {language === "ta"
                  ? "இந்த கணக்கீடு ஒரு மதிப்பீடு மட்டுமே. உண்மையான EMI, வட்டி மற்றும் திருப்பிச் செலுத்தும் தொகை ஆகியவை கடன் வழங்குநர், செயலாக்கக் கட்டணம், திருப்பிச் செலுத்தும் முறை மற்றும் பிற விதிமுறைகளைப் பொறுத்து மாறுபடலாம். இறுதி கடன் விதிமுறைகளை சம்பந்தப்பட்ட அதிகாரப்பூர்வ நிதி நிறுவனத்திடம் சரிபார்க்கவும்."
                  : "This calculation is only an estimate. The actual EMI, interest and repayment amount may vary depending on the lender, processing fees, repayment method and other terms. Verify the final loan terms with the relevant official financial institution."}
              </p>

            </div>

          </motion.section>
        )}

      </div>

    </main>
  );
}

export default LoanCalculator;