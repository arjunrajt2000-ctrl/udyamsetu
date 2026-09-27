import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoanCalculator() {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);

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
      return;
    }

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
  };

  const formatCurrency = (value) => {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">

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
          ← Back
        </button>


        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            UdyamSetu Financial Tools
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Loan EMI Calculator
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-7 text-slate-300">
            Estimate your monthly EMI, total interest and
            total repayment before applying for a loan.
          </p>
        </motion.div>


        {/* CALCULATOR */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8"
        >

          <h2 className="text-2xl font-bold">
            Enter Loan Details
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Enter the approximate loan details to calculate
            your estimated EMI.
          </p>


          <div className="mt-7 grid gap-6 md:grid-cols-3">

            {/* LOAN AMOUNT */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Loan Amount (₹)
              </label>

              <input
                type="number"
                min="0"
                value={loanAmount}
                onChange={(e) =>
                  setLoanAmount(e.target.value)
                }
                placeholder="e.g. 500000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
              />
            </div>


            {/* INTEREST */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Interest Rate (% p.a.)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(e.target.value)
                }
                placeholder="e.g. 7.5"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>


            {/* TENURE */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Loan Tenure (Years)
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={tenure}
                onChange={(e) =>
                  setTenure(e.target.value)
                }
                placeholder="e.g. 5"
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
              🧮 Calculate EMI
            </button>

            <button
              onClick={resetCalculator}
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Reset
            </button>

          </div>


          {/* INVALID INPUT */}

          {!result &&
            (loanAmount || interestRate || tenure) && (
              <p className="mt-5 text-sm text-amber-400">
                Please enter valid loan amount, interest rate
                and tenure.
              </p>
            )}

        </motion.section>


        {/* RESULTS */}

        {result && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 md:p-8">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                    Estimated Monthly EMI
                  </p>

                  <p className="mt-2 text-4xl font-bold md:text-5xl">
                    {formatCurrency(result.emi)}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-400">
                  {result.months} months
                </div>

              </div>


              {/* SUMMARY */}

              <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    Principal Amount
                  </p>

                  <p className="mt-2 text-xl font-bold">
                    {formatCurrency(
                      Number(loanAmount)
                    )}
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    Total Interest
                  </p>

                  <p className="mt-2 text-xl font-bold text-amber-400">
                    {formatCurrency(
                      result.totalInterest
                    )}
                  </p>

                </div>


                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                  <p className="text-sm text-slate-400">
                    Total Repayment
                  </p>

                  <p className="mt-2 text-xl font-bold text-cyan-400">
                    {formatCurrency(
                      result.totalPayment
                    )}
                  </p>

                </div>

              </div>


              {/* BREAKDOWN */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

                <h3 className="font-bold">
                  Loan Summary
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Loan amount
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        Number(loanAmount)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Interest rate
                    </span>

                    <span className="font-semibold">
                      {interestRate}% p.a.
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">
                      Tenure
                    </span>

                    <span className="font-semibold">
                      {tenure} years
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
                    <span className="text-slate-400">
                      Monthly EMI
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
                ⚠ Important
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                This calculator provides an estimate only.
                Actual EMI, interest and repayment amounts may
                vary depending on the lender, processing fees,
                repayment schedule and other applicable terms.
                Always verify the final loan terms with the
                official financial institution.
              </p>

            </div>

          </motion.section>
        )}

      </div>

    </main>
  );
}

export default LoanCalculator;