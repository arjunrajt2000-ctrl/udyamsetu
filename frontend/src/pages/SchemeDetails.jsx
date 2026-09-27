import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ESEVAI_URL = "https://www.tnesevai.tn.gov.in/citizen/";
const ESEVAI_MAP_URL =
  "https://www.google.com/maps/search/e-Sevai+Centre+near+me";

// Official NSFDC website
const NSFDC_URL = "https://nsfdc.nic.in/";

// Official NSFDC eligibility / scheme information
const NSFDC_SCHEME_INFO_URL = "https://nsfdc.nic.in/scheme";

// Official NSFDC toll-free helpline
const NSFDC_PHONE = "1800110396";

// Official PM-SURAJ portal
const PM_SURAJ_URL = "https://pmsuraj.dosje.gov.in/login";

const getDocumentInfo = (documentName) => {
  const name = String(documentName || "").toLowerCase();

  if (name.includes("community") || name.includes("caste")) {
    return {
      online: true,
      onlineLabel: "Apply Community Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("income")) {
    return {
      online: true,
      onlineLabel: "Apply Income Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("obc")) {
    return {
      online: true,
      onlineLabel: "Apply OBC Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("residence") || name.includes("address")) {
    return {
      online: true,
      onlineLabel: "Open e-Sevai",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  return {
    online: false,
    offline: false,
  };
};

function SchemeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const scheme = location.state?.scheme;

  const [documentStatus, setDocumentStatus] = useState({});
  const [eligibilityVerified, setEligibilityVerified] = useState(false);
  const [channelConfirmed, setChannelConfirmed] = useState(false);

  if (!scheme) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-3xl font-bold">
            Scheme not found
          </h1>

          <p className="mt-3 text-slate-400">
            We couldn't find the selected scheme.
          </p>

          <button
            onClick={() => navigate("/schemes")}
            className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-300"
          >
            ← Back to Schemes
          </button>

        </div>
      </main>
    );
  }

  const documents = scheme.documents || [];

  const documentsReady =
    documents.length === 0 ||
    documents.every(
      (_, index) => documentStatus[index] === "ready"
    );

  const step1Ready = documentsReady;
  const step2Ready = eligibilityVerified;
  const step3Ready = channelConfirmed;

  // Submission cannot be automatically verified by UdyamSetu.
  const step4Ready = false;

  const completedSteps = [
    step1Ready,
    step2Ready,
    step3Ready,
    step4Ready,
  ].filter(Boolean).length;

  const readinessPercentage =
    (completedSteps / 4) * 100;

  const applicationSteps = [
    {
      number: "01",
      title: "Prepare your documents",
      description: step1Ready
        ? "All recommended documents have been marked as available."
        : "Review the documents below and mark any document you are missing.",
      icon: "📄",
      status: step1Ready ? "Ready" : "Action needed",
    },
    {
      number: "02",
      title: "Verify eligibility",
      description: eligibilityVerified
        ? "You confirmed that you checked the latest eligibility information."
        : "Check the latest eligibility requirements with the official scheme authority before applying.",
      icon: "✓",
      status: eligibilityVerified ? "Verified" : "Verify",
    },
    {
      number: "03",
      title: "Confirm application channel",
      description: channelConfirmed
        ? "You confirmed the official application route you intend to use."
        : "Confirm which official application route you will use to submit your application.",
      icon: "📍",
      status: channelConfirmed ? "Confirmed" : "Next",
    },
    {
      number: "04",
      title: "Submit your application",
      description:
        "Submit your documents and application through the official channel.",
      icon: "🚀",
      status: "Final Step",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">

      <div className="mx-auto max-w-5xl">

        {/* BACK */}
        <button
          onClick={() => navigate("/schemes")}
          className="mb-8 text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to recommendations
        </button>


        {/* HERO */}
<motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  className="relative rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8"
>

  {/* EMI Calculator Shortcut */}
  <button
    onClick={() => navigate("/loan-calculator")}
    className="static mb-6 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-cyan-200 md:absolute md:right-6 md:top-6 md:mb-0"
  >
    🧮 EMI Calculator
  </button>

  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
    UdyamSetu Scheme Details
  </p>

  <h1 className="mt-3 pr-0 text-4xl font-bold md:pr-40 md:text-5xl">
    {scheme.name}
  </h1>

  <p className="mt-4 text-slate-300">
    {scheme.provider ||
      "Government Financial Assistance Scheme"}
  </p>

  {scheme.matchScore && (
    <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-emerald-400/10 px-5 py-2">

      <span className="text-sm text-slate-300">
        Profile Match
      </span>

      <span className="font-bold text-emerald-400">
        {scheme.matchScore}%
      </span>

    </div>
  )}

</motion.div>


        {/* ABOUT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6"
        >

          <h2 className="text-2xl font-bold">
            About the Scheme
          </h2>

          <p className="mt-4 leading-7 text-slate-300">
            {scheme.description}
          </p>

        </motion.section>


        {/* KEY INFORMATION */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-slate-400">
              Maximum Assistance
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {scheme.maxAmount
                ? `₹${Number(
                    scheme.maxAmount
                  ).toLocaleString("en-IN")}`
                : "See official details"}
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-slate-400">
              Interest Rate
            </p>

            <p className="mt-2 text-2xl font-bold">
              {scheme.interestRate || "Not specified"}
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

            <p className="text-sm text-slate-400">
              Income Limit
            </p>

            <p className="mt-2 text-2xl font-bold">
              {scheme.maxIncome
                ? `₹${Number(
                    scheme.maxIncome
                  ).toLocaleString("en-IN")}`
                : "Not specified"}
            </p>

          </div>

        </section>


        {/* BENEFITS */}
        {scheme.benefits?.length > 0 && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

            <h2 className="text-2xl font-bold">
              Key Benefits
            </h2>

            <div className="mt-5 grid gap-3">

              {scheme.benefits.map(
                (benefit, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-emerald-400/5 p-4"
                  >

                    <span className="text-emerald-400">
                      ✓
                    </span>

                    <span className="text-slate-300">
                      {benefit}
                    </span>

                  </div>

                )
              )}

            </div>

          </section>
        )}


        {/* =========================================
            DOCUMENT CHECKLIST
        ========================================== */}

        {documents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h2 className="text-2xl font-bold">
                  Documents You May Need
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Check the documents you already have. If you are
                  missing one, UdyamSetu will show available ways to
                  obtain it.
                </p>

              </div>

              <div
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  step1Ready
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {documents.filter(
                  (_, index) =>
                    documentStatus[index] === "ready"
                ).length}{" "}
                / {documents.length} ready
              </div>

            </div>


            <div className="mt-6 space-y-4">

              {documents.map((document, index) => {

                const status =
                  documentStatus[index] || "unknown";

                const info =
                  getDocumentInfo(document);

                return (
                  <div
                    key={index}
                    className={`rounded-2xl border p-5 transition ${
                      status === "ready"
                        ? "border-emerald-400/30 bg-emerald-400/5"
                        : status === "missing"
                        ? "border-amber-400/30 bg-amber-400/5"
                        : "border-white/10 bg-slate-900/50"
                    }`}
                  >

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <span className="text-xl">
                          📄
                        </span>

                        <div>

                          <p className="font-semibold">
                            {document}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {status === "ready"
                              ? "You marked this document as available."
                              : status === "missing"
                              ? "You marked this document as missing."
                              : "Have you got this document?"}
                          </p>

                        </div>

                      </div>


                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            setDocumentStatus((prev) => ({
                              ...prev,
                              [index]: "ready",
                            }))
                          }
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            status === "ready"
                              ? "bg-emerald-400 text-slate-950"
                              : "bg-white/10 text-slate-300 hover:bg-emerald-400/20"
                          }`}
                        >
                          ✓ I have it
                        </button>


                        <button
                          onClick={() =>
                            setDocumentStatus((prev) => ({
                              ...prev,
                              [index]: "missing",
                            }))
                          }
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                            status === "missing"
                              ? "bg-amber-400 text-slate-950"
                              : "bg-white/10 text-slate-300 hover:bg-amber-400/20"
                          }`}
                        >
                          ⚠ I'm missing it
                        </button>

                      </div>

                    </div>


                    {/* MISSING DOCUMENT ACTIONS */}
                    {status === "missing" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        className="mt-5 border-t border-white/10 pt-5"
                      >

                        <p className="text-sm font-semibold text-amber-300">
                          How can I get this document?
                        </p>


                        {info.online || info.offline ? (

                          <div className="mt-4 flex flex-wrap gap-3">

                            {info.online && (
                              <a
                                href={info.onlineUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                              >
                                🌐 {info.onlineLabel}
                              </a>
                            )}


                            {info.offline && (
                              <a
                                href={ESEVAI_MAP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                              >
                                📍 Find e-Sevai Centre
                              </a>
                            )}

                          </div>

                        ) : (

                          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

                            <p className="text-sm leading-6 text-slate-400">
                              We have not verified an official
                              Tamil Nadu e-Sevai service for this
                              document. UdyamSetu will not provide
                              an unverified application link.
                            </p>

                            <a
                              href={ESEVAI_MAP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-block rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
                            >
                              📍 Ask at a nearby e-Sevai Centre
                            </a>

                          </div>

                        )}

                      </motion.div>
                    )}

                  </div>
                );
              })}

            </div>

          </motion.section>
        )}


        {/* =========================================
            APPLICATION ACTION CENTER
        ========================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-emerald-400/10 p-6 md:p-8"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            UdyamSetu Action Center
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            What should you do next?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Follow the roadmap below to prepare, verify and
            submit your application.
          </p>


          {/* READINESS */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <p className="text-sm text-slate-400">
                  Application readiness
                </p>

                <p className="mt-1 text-xl font-bold">
                  {completedSteps} / 4 steps completed
                </p>

              </div>

              <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                {Math.round(readinessPercentage)}%
              </div>

            </div>


            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${readinessPercentage}%`,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="h-full rounded-full bg-emerald-400"
              />

            </div>

          </div>


          {/* ROADMAP */}
          <div className="mt-8">

            <h3 className="text-xl font-bold">
              Your application roadmap
            </h3>

            <div className="mt-6 space-y-4">

              {applicationSteps.map(
                (step, index) => (

                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.12,
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 font-bold text-emerald-400">
                        {step.number}
                      </div>


                      <div className="flex-1">

                        <div className="flex flex-wrap items-center justify-between gap-2">

                          <h4 className="font-bold">
                            {step.icon} {step.title}
                          </h4>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              step.status === "Ready" ||
                              step.status === "Verified" ||
                              step.status === "Confirmed"
                                ? "bg-emerald-400/10 text-emerald-400"
                                : "bg-amber-400/10 text-amber-400"
                            }`}
                          >
                            {step.status}
                          </span>

                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {step.description}
                        </p>


                        {/* =====================================
                            STEP 1 REDIRECT
                        ====================================== */}

                        {index === 0 && (
                          <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">

                            <p className="text-sm font-semibold text-cyan-300">
                              📄 Need to obtain a document?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              Use the official Tamil Nadu e-Sevai
                              portal to access available certificate
                              services.
                            </p>

                            <a
                              href={ESEVAI_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-block rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                            >
                              🌐 Open Tamil Nadu e-Sevai
                            </a>

                          </div>
                        )}


                        {/* =====================================
                            STEP 2 VERIFICATION
                            NSFDC ELIGIBILITY + HELPLINE
                        ====================================== */}

                        {index === 1 && (
                          <div className="mt-4 space-y-3">

                            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">

                              <p className="text-sm font-semibold text-emerald-300">
                                ✓ Verify the exact eligibility requirements
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                Check the latest official NSFDC eligibility
                                and scheme information before confirming
                                this step.
                              </p>

                              <a
                                href={NSFDC_SCHEME_INFO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                              >
                                🔎 Check NSFDC Eligibility
                              </a>

                            </div>


                            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">

                              <p className="text-sm font-semibold text-amber-300">
                                📞 Need help verifying eligibility?
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                Contact the official NSFDC helpline
                                if you need clarification about
                                eligibility, documents or the scheme.
                              </p>

                              <a
                                href={`tel:${NSFDC_PHONE}`}
                                className="mt-3 inline-block rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                              >
                                📞 Call NSFDC: {NSFDC_PHONE}
                              </a>

                            </div>


                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">

                              <input
                                type="checkbox"
                                checked={eligibilityVerified}
                                onChange={(e) =>
                                  setEligibilityVerified(
                                    e.target.checked
                                  )
                                }
                                className="mt-1 h-4 w-4"
                              />

                              <span className="text-sm text-slate-300">
                                I have checked the latest eligibility
                                requirements with the official scheme
                                authority.
                              </span>

                            </label>

                          </div>
                        )}


                        {/* =====================================
                            STEP 3 APPLICATION CHANNEL
                        ====================================== */}

                        {index === 2 && (
                          <div className="mt-4">

                            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">

                              <p className="text-sm font-semibold text-cyan-300">
                                🌐 Choose the official application channel
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                NSFDC loan applications are routed through
                                authorized channels. Use the official
                                PM-SURAJ portal for online application.
                              </p>

                              <a
                                href={PM_SURAJ_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setChannelConfirmed(true)}
                                className="mt-3 inline-block rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                              >
                                🌐 Open PM-SURAJ Portal
                              </a>

                              {/* CHANNEL PARTNER FINDER */}
                              <button
                                onClick={() => navigate("/channel-partners")}
                                className="mt-3 ml-2 inline-block rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                              >
                                📍 Find Authorized Channel Partners
                              </button>

                            </div>


                            <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">

                              <input
                                type="checkbox"
                                checked={channelConfirmed}
                                onChange={(e) =>
                                  setChannelConfirmed(
                                    e.target.checked
                                  )
                                }
                                className="mt-1 h-4 w-4"
                              />

                              <span className="text-sm text-slate-300">
                                I have confirmed the official
                                application route I will use.
                              </span>

                            </label>

                          </div>
                        )}


                        {/* =====================================
                            STEP 4 SUBMISSION REDIRECT
                        ====================================== */}

                        {index === 3 && (
                          <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-400/5 p-4">

                            <p className="text-sm font-semibold text-purple-300">
                              🚀 Ready to submit?
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              Submit your application through the
                              official PM-SURAJ portal or the
                              authorized channel specified by the
                              scheme authority.
                            </p>

                            <a
                              href={PM_SURAJ_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setChannelConfirmed(true)}
                              className="mt-3 inline-block rounded-xl bg-purple-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-purple-300"
                            >
                              🚀 Go to PM-SURAJ
                            </a>

                          </div>
                        )}

                      </div>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          </div>


          {/* =========================================
              OFFICIAL APPLICATION ROUTES
          ========================================== */}

          <div className="mt-8">

            <h3 className="text-xl font-bold">
              Official application routes
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Use only official government channels when submitting
              your application or verifying scheme information.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              {/* PM-SURAJ */}
              <a
                href={PM_SURAJ_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChannelConfirmed(true)}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 transition hover:bg-cyan-400/10"
              >

                <p className="text-sm text-slate-400">
                  🌐 Online Application
                </p>

                <p className="mt-2 font-bold text-cyan-300">
                  PM-SURAJ Portal
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Open official portal →
                </p>

              </a>


              {/* NSFDC */}
              <a
                href={NSFDC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChannelConfirmed(true)}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 transition hover:bg-emerald-400/10"
              >

                <p className="text-sm text-slate-400">
                  🏢 Scheme Authority
                </p>

                <p className="mt-2 font-bold text-emerald-300">
                  NSFDC Official Website
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Verify scheme information →
                </p>

              </a>

            </div>


            {/* NSFDC HELPLINE */}
            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                  <p className="text-sm text-slate-400">
                    📞 Need help verifying the scheme?
                  </p>

                  <p className="mt-2 font-bold text-amber-300">
                    Contact NSFDC
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Speak with the official authority to verify
                    eligibility, documents, loan details and
                    application procedures.
                  </p>

                </div>


                <a
                  href={`tel:${NSFDC_PHONE}`}
                  className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  📞 {NSFDC_PHONE}
                </a>

              </div>

            </div>

          </div>

        </motion.section>


        {/* IMPORTANT NOTICE */}
        <section className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6">

          <p className="text-sm font-semibold text-yellow-300">
            ⚠ Important
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            UdyamSetu is a prototype designed to simplify
            scheme discovery. Eligibility, loan amounts, interest
            rates, documents and application procedures should be
            verified using the latest information from the official
            scheme authority before applying.
          </p>

          {scheme.source?.name && (
            <p className="mt-4 text-sm text-slate-400">

              Data source:{" "}

              <span className="font-semibold text-white">
                {scheme.source.name}
              </span>

            </p>
          )}

        </section>


        {/* BACK */}
        <button
          onClick={() => navigate("/schemes")}
          className="mt-8 rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          ← Back to Recommendations
        </button>

      </div>

    </main>
  );
}

export default SchemeDetails;