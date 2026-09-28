import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const ESEVAI_URL = "https://www.tnesevai.tn.gov.in/citizen/";
const ESEVAI_MAP_URL =
  "https://www.google.com/maps/search/e-Sevai+Centre+near+me";

const NSFDC_URL = "https://nsfdc.nic.in/";
const NSFDC_SCHEME_INFO_URL = "https://nsfdc.nic.in/scheme";
const NSFDC_PHONE = "1800110396";

const PM_SURAJ_URL = "https://pmsuraj.dosje.gov.in/login";

function getDocumentInfo(documentName, language) {
  const name = String(documentName || "").toLowerCase();

  if (name.includes("community") || name.includes("caste")) {
    return {
      online: true,
      onlineLabel:
        language === "ta"
          ? "சமூகச் சான்றிதழுக்கு விண்ணப்பிக்கவும்"
          : "Apply for Community Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("income")) {
    return {
      online: true,
      onlineLabel:
        language === "ta"
          ? "வருமானச் சான்றிதழுக்கு விண்ணப்பிக்கவும்"
          : "Apply for Income Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("obc")) {
    return {
      online: true,
      onlineLabel:
        language === "ta"
          ? "OBC சான்றிதழுக்கு விண்ணப்பிக்கவும்"
          : "Apply for OBC Certificate",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  if (name.includes("residence") || name.includes("address")) {
    return {
      online: true,
      onlineLabel:
        language === "ta"
          ? "e-Sevai திறக்கவும்"
          : "Open e-Sevai",
      onlineUrl: ESEVAI_URL,
      offline: true,
    };
  }

  return {
    online: false,
    offline: false,
  };
}

function SchemeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { language } = useLanguage();

  const scheme = location.state?.scheme;

  const [documentStatus, setDocumentStatus] = useState({});
  const [eligibilityVerified, setEligibilityVerified] = useState(false);
  const [channelConfirmed, setChannelConfirmed] = useState(false);

  const isTamil = language === "ta";

  if (!scheme) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-3xl font-bold sm:text-4xl">
            {isTamil ? "திட்டம் கிடைக்கவில்லை" : "Scheme Not Found"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            {isTamil
              ? "தேர்வு செய்யப்பட்ட திட்டத்தைக் கண்டறிய முடியவில்லை."
              : "The selected scheme could not be found."}
          </p>

          <button
            onClick={() => navigate("/schemes")}
            className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300 sm:px-6"
          >
            {isTamil
              ? "← திட்டங்களுக்குத் திரும்பவும்"
              : "← Back to Schemes"}
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

  const step4Ready = false;

  const completedSteps = [
    step1Ready,
    step2Ready,
    step3Ready,
    step4Ready,
  ].filter(Boolean).length;

  const readinessPercentage = (completedSteps / 4) * 100;

  const applicationSteps = [
    {
      number: "01",
      title: isTamil
        ? "உங்கள் ஆவணங்களைத் தயாரிக்கவும்"
        : "Prepare Your Documents",
      description: step1Ready
        ? isTamil
          ? "பரிந்துரைக்கப்பட்ட அனைத்து ஆவணங்களும் உங்களிடம் இருப்பதாக குறிக்கப்பட்டுள்ளன."
          : "You have marked all recommended documents as ready."
        : isTamil
        ? "கீழே கொடுக்கப்பட்டுள்ள ஆவணங்களைப் பார்த்து, உங்களிடம் இல்லாத ஆவணங்களை அடையாளப்படுத்தவும்."
        : "Review the documents below and identify any documents you do not have.",
      icon: "📄",
      status: step1Ready
        ? isTamil
          ? "தயார்"
          : "Ready"
        : isTamil
        ? "நடவடிக்கை தேவை"
        : "Action Required",
    },

    {
      number: "02",
      title: isTamil
        ? "தகுதியைச் சரிபார்க்கவும்"
        : "Verify Eligibility",
      description: eligibilityVerified
        ? isTamil
          ? "சமீபத்திய தகுதி விவரங்களை அதிகாரப்பூர்வ திட்ட அமைப்பிடம் சரிபார்த்துவிட்டதாக நீங்கள் உறுதிப்படுத்தியுள்ளீர்கள்."
          : "You have confirmed that you checked the latest eligibility details with the official scheme authority."
        : isTamil
        ? "விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ திட்ட அமைப்பிடம் சமீபத்திய தகுதி விதிமுறைகளை சரிபார்க்கவும்."
        : "Check the latest eligibility rules with the official scheme authority before applying.",
      icon: "✓",
      status: eligibilityVerified
        ? isTamil
          ? "சரிபார்க்கப்பட்டது"
          : "Verified"
        : isTamil
        ? "சரிபார்க்கவும்"
        : "Verify",
    },

    {
      number: "03",
      title: isTamil
        ? "விண்ணப்ப சேனலை உறுதிப்படுத்தவும்"
        : "Confirm Application Channel",
      description: channelConfirmed
        ? isTamil
          ? "நீங்கள் பயன்படுத்தவுள்ள அதிகாரப்பூர்வ விண்ணப்ப வழியை உறுதிப்படுத்தியுள்ளீர்கள்."
          : "You have confirmed the official application channel you intend to use."
        : isTamil
        ? "உங்கள் விண்ணப்பத்தை சமர்ப்பிக்கப் பயன்படுத்தும் அதிகாரப்பூர்வ வழியை உறுதிப்படுத்தவும்."
        : "Confirm the official channel you will use to submit your application.",
      icon: "📍",
      status: channelConfirmed
        ? isTamil
          ? "உறுதிப்படுத்தப்பட்டது"
          : "Confirmed"
        : isTamil
        ? "அடுத்து"
        : "Next",
    },

    {
      number: "04",
      title: isTamil
        ? "விண்ணப்பத்தைச் சமர்ப்பிக்கவும்"
        : "Submit Your Application",
      description: isTamil
        ? "அதிகாரப்பூர்வ சேனல் மூலம் உங்கள் ஆவணங்கள் மற்றும் விண்ணப்பத்தைச் சமர்ப்பிக்கவும்."
        : "Submit your application and documents through the official channel.",
      icon: "🚀",
      status: isTamil ? "இறுதி படி" : "Final Step",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-16">

      <div className="mx-auto max-w-5xl">

        {/* BACK */}

        <button
          onClick={() => navigate("/schemes")}
          className="mb-6 text-sm text-slate-400 transition hover:text-white sm:mb-8"
        >
          {isTamil
            ? "← பரிந்துரைகளுக்குத் திரும்பவும்"
            : "← Back to Recommendations"}
        </button>

        {/* HERO */}

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-5 sm:p-8"
        >

          <button
            onClick={() => navigate("/loan-calculator")}
            className="static mb-5 w-full rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-cyan-200 sm:w-auto md:absolute md:right-6 md:top-6 md:mb-0"
          >
            🧮 {isTamil ? "EMI கணிப்பான்" : "EMI Calculator"}
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 sm:text-sm sm:tracking-[0.25em]">
            {isTamil
              ? "UdyamSetu திட்ட விவரங்கள்"
              : "UdyamSetu Scheme Details"}
          </p>

          <h1 className="mt-3 break-words text-3xl font-bold leading-tight md:pr-40 md:text-5xl">
            {scheme.name}
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-300 sm:text-base">
            {scheme.provider ||
              (isTamil
                ? "அரசு நிதியுதவி திட்டம்"
                : "Government Financial Assistance Scheme")}
          </p>

          {scheme.matchScore && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-emerald-400/10 px-4 py-2 sm:px-5">

              <span className="text-xs text-slate-300 sm:text-sm">
                {isTamil ? "சுயவிவரப் பொருத்தம்" : "Profile Match"}
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
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:mt-8 sm:p-6"
        >

          <h2 className="text-xl font-bold sm:text-2xl">
            {isTamil ? "திட்டத்தைப் பற்றி" : "About the Scheme"}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            {scheme.description}
          </p>

        </motion.section>

        {/* KEY INFORMATION */}

        <section className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">

            <p className="text-sm text-slate-400">
              {isTamil ? "அதிகபட்ச நிதியுதவி" : "Maximum Funding"}
            </p>

            <p className="mt-2 break-words text-xl font-bold text-emerald-400 sm:text-2xl">
              {scheme.maxAmount
                ? `₹${Number(
                    scheme.maxAmount
                  ).toLocaleString("en-IN")}`
                : isTamil
                ? "அதிகாரப்பூர்வ விவரங்களைப் பார்க்கவும்"
                : "See official details"}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">

            <p className="text-sm text-slate-400">
              {isTamil ? "வட்டி விகிதம்" : "Interest Rate"}
            </p>

            <p className="mt-2 break-words text-xl font-bold sm:text-2xl">
              {scheme.interestRate ||
                (isTamil ? "குறிப்பிடப்படவில்லை" : "Not specified")}
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">

            <p className="text-sm text-slate-400">
              {isTamil ? "வருமான வரம்பு" : "Income Limit"}
            </p>

            <p className="mt-2 break-words text-xl font-bold sm:text-2xl">
              {scheme.maxIncome
                ? `₹${Number(
                    scheme.maxIncome
                  ).toLocaleString("en-IN")}`
                : isTamil
                ? "குறிப்பிடப்படவில்லை"
                : "Not specified"}
            </p>

          </div>

        </section>

        {/* BENEFITS */}

        {scheme.benefits?.length > 0 && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:mt-8 sm:p-6">

            <h2 className="text-xl font-bold sm:text-2xl">
              {isTamil ? "முக்கிய நன்மைகள்" : "Key Benefits"}
            </h2>

            <div className="mt-5 grid gap-3">

              {scheme.benefits.map((benefit, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-emerald-400/5 p-4"
                >

                  <span className="shrink-0 text-emerald-400">
                    ✓
                  </span>

                  <span className="text-sm leading-6 text-slate-300 sm:text-base">
                    {benefit}
                  </span>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* DOCUMENT CHECKLIST */}

        {documents.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:mt-8 sm:p-6"
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  {isTamil
                    ? "உங்களுக்குத் தேவைப்படக்கூடிய ஆவணங்கள்"
                    : "Documents You May Need"}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {isTamil
                    ? "உங்களிடம் ஏற்கனவே உள்ள ஆவணங்களைத் தேர்வு செய்யவும். ஏதேனும் ஆவணம் இல்லை என்றால், அதைப் பெறுவதற்கான கிடைக்கக்கூடிய வழிகளை UdyamSetu காண்பிக்கும்."
                    : "Mark the documents you already have. If you are missing a document, UdyamSetu will show available ways to obtain it."}
                </p>

              </div>

              <div
                className={`self-start rounded-full px-4 py-2 text-sm font-semibold sm:self-auto ${
                  step1Ready
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {
                  documents.filter(
                    (_, index) =>
                      documentStatus[index] === "ready"
                  ).length
                }{" "}
                / {documents.length}{" "}
                {isTamil ? "தயார்" : "Ready"}
              </div>

            </div>

            <div className="mt-6 space-y-4">

              {documents.map((document, index) => {

                const status =
                  documentStatus[index] || "unknown";

                const info =
                  getDocumentInfo(document, language);

                return (
                  <div
                    key={index}
                    className={`rounded-2xl border p-4 transition sm:p-5 ${
                      status === "ready"
                        ? "border-emerald-400/30 bg-emerald-400/5"
                        : status === "missing"
                        ? "border-amber-400/30 bg-amber-400/5"
                        : "border-white/10 bg-slate-900/50"
                    }`}
                  >

                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

                      <div className="flex items-start gap-3">

                        <span className="shrink-0 text-xl">
                          📄
                        </span>

                        <div className="min-w-0">

                          <p className="break-words font-semibold">
                            {document}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {status === "ready"
                              ? isTamil
                                ? "இந்த ஆவணம் உங்களிடம் உள்ளது எனக் குறித்துள்ளீர்கள்."
                                : "You have marked this document as available."
                              : status === "missing"
                              ? isTamil
                                ? "இந்த ஆவணம் உங்களிடம் இல்லை எனக் குறித்துள்ளீர்கள்."
                                : "You have marked this document as missing."
                              : isTamil
                              ? "இந்த ஆவணம் உங்களிடம் உள்ளதா?"
                              : "Do you have this document?"}
                          </p>

                        </div>

                      </div>

                      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">

                        <button
                          onClick={() =>
                            setDocumentStatus((prev) => ({
                              ...prev,
                              [index]: "ready",
                            }))
                          }
                          className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                            status === "ready"
                              ? "bg-emerald-400 text-slate-950"
                              : "bg-white/10 text-slate-300 hover:bg-emerald-400/20"
                          }`}
                        >
                          ✓{" "}
                          {isTamil
                            ? "என்னிடம் உள்ளது"
                            : "I Have It"}
                        </button>

                        <button
                          onClick={() =>
                            setDocumentStatus((prev) => ({
                              ...prev,
                              [index]: "missing",
                            }))
                          }
                          className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                            status === "missing"
                              ? "bg-amber-400 text-slate-950"
                              : "bg-white/10 text-slate-300 hover:bg-amber-400/20"
                          }`}
                        >
                          ⚠{" "}
                          {isTamil
                            ? "என்னிடம் இல்லை"
                            : "I Don't Have It"}
                        </button>

                      </div>

                    </div>

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
                          {isTamil
                            ? "இந்த ஆவணத்தை எவ்வாறு பெறுவது?"
                            : "How can you obtain this document?"}
                        </p>

                        {info.online || info.offline ? (

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                            {info.online && (
                              <a
                                href={info.onlineUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
                              >
                                🌐 {info.onlineLabel}
                              </a>
                            )}

                            {info.offline && (
                              <a
                                href={ESEVAI_MAP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
                              >
                                📍{" "}
                                {isTamil
                                  ? "e-Sevai மையத்தைக் கண்டறியவும்"
                                  : "Find an e-Sevai Centre"}
                              </a>
                            )}

                          </div>

                        ) : (

                          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

                            <p className="text-sm leading-6 text-slate-400">
                              {isTamil
                                ? "இந்த ஆவணத்திற்கான அதிகாரப்பூர்வ தமிழ்நாடு e-Sevai சேவையை நாங்கள் சரிபார்க்கவில்லை. சரிபார்க்கப்படாத விண்ணப்ப இணைப்பை UdyamSetu வழங்காது."
                                : "We have not verified an official Tamil Nadu e-Sevai service for this document. UdyamSetu does not provide unverified application links."}
                            </p>

                            <a
                              href={ESEVAI_MAP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-block w-full rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-300 sm:w-auto"
                            >
                              📍{" "}
                              {isTamil
                                ? "அருகிலுள்ள e-Sevai மையத்தைக் கேளுங்கள்"
                                : "Find a Nearby e-Sevai Centre"}
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

        {/* APPLICATION ACTION CENTER */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-900 to-emerald-400/10 p-5 sm:mt-10 sm:p-8"
        >

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-sm sm:tracking-[0.25em]">
            {isTamil
              ? "UdyamSetu செயல்பாட்டு மையம்"
              : "UdyamSetu Action Center"}
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {isTamil
              ? "அடுத்து என்ன செய்ய வேண்டும்?"
              : "What Should You Do Next?"}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {isTamil
              ? "உங்கள் விண்ணப்பத்தைத் தயாரிக்கவும், சரிபார்க்கவும், சமர்ப்பிக்கவும் கீழே உள்ள வழிகாட்டியைப் பின்பற்றவும்."
              : "Follow the guide below to prepare, verify and submit your application."}
          </p>

          {/* READINESS */}

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 sm:mt-8 sm:p-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {isTamil
                    ? "விண்ணப்பத் தயார்நிலை"
                    : "Application Readiness"}
                </p>

                <p className="mt-1 text-lg font-bold sm:text-xl">
                  {completedSteps} / 4{" "}
                  {isTamil
                    ? "படிகள் முடிந்தன"
                    : "steps completed"}
                </p>

              </div>

              <div className="self-start rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400 sm:self-auto">
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
              {isTamil
                ? "உங்கள் விண்ணப்பப் பாதை"
                : "Your Application Roadmap"}
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
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
                  >

                    <div className="flex gap-3 sm:gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-bold text-emerald-400 sm:h-12 sm:w-12 sm:text-base">
                        {step.number}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

                          <h4 className="break-words font-bold">
                            {step.icon} {step.title}
                          </h4>

                          <span
                            className={`self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-auto ${
                              step.status ===
                                (isTamil ? "தயார்" : "Ready") ||
                              step.status ===
                                (isTamil
                                  ? "சரிபார்க்கப்பட்டது"
                                  : "Verified") ||
                              step.status ===
                                (isTamil
                                  ? "உறுதிப்படுத்தப்பட்டது"
                                  : "Confirmed")
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

                        {/* STEP 1 */}

                        {index === 0 && (
                          <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">

                            <p className="text-sm font-semibold text-cyan-300">
                              📄{" "}
                              {isTamil
                                ? "ஆவணம் பெற வேண்டுமா?"
                                : "Need a Document?"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {isTamil
                                ? "கிடைக்கக்கூடிய சான்றிதழ் சேவைகளைப் பயன்படுத்த தமிழ்நாடு e-Sevai-ன் அதிகாரப்பூர்வ இணையதளத்தைப் பயன்படுத்தவும்."
                                : "Use the official Tamil Nadu e-Sevai website for available certificate services."}
                            </p>

                            <a
                              href={ESEVAI_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
                            >
                              🌐{" "}
                              {isTamil
                                ? "தமிழ்நாடு e-Sevai திறக்கவும்"
                                : "Open Tamil Nadu e-Sevai"}
                            </a>

                          </div>
                        )}

                        {/* STEP 2 */}

                        {index === 1 && (
                          <div className="mt-4 space-y-3">

                            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">

                              <p className="text-sm font-semibold text-emerald-300">
                                ✓{" "}
                                {isTamil
                                  ? "சரியான தகுதி விதிமுறைகளைச் சரிபார்க்கவும்"
                                  : "Check the Latest Eligibility Rules"}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {isTamil
                                  ? "இந்தப் படியை உறுதிப்படுத்துவதற்கு முன், சமீபத்திய அதிகாரப்பூர்வ NSFDC தகுதி மற்றும் திட்ட விவரங்களைச் சரிபார்க்கவும்."
                                  : "Before confirming this step, check the latest official NSFDC eligibility and scheme details."}
                              </p>

                              <a
                                href={NSFDC_SCHEME_INFO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block w-full rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
                              >
                                🔎{" "}
                                {isTamil
                                  ? "NSFDC தகுதியைச் சரிபார்க்கவும்"
                                  : "Check NSFDC Eligibility"}
                              </a>

                            </div>

                            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">

                              <p className="text-sm font-semibold text-amber-300">
                                📞{" "}
                                {isTamil
                                  ? "தகுதியைச் சரிபார்க்க உதவி வேண்டுமா?"
                                  : "Need Help Checking Eligibility?"}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {isTamil
                                  ? "தகுதி, ஆவணங்கள் அல்லது திட்டம் தொடர்பான விளக்கங்களுக்கு அதிகாரப்பூர்வ NSFDC உதவி எண்ணைத் தொடர்புகொள்ளவும்."
                                  : "Contact the official NSFDC helpline for questions about eligibility, documents or schemes."}
                              </p>

                              <a
                                href={`tel:${NSFDC_PHONE}`}
                                className="mt-3 inline-block w-full rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
                              >
                                📞{" "}
                                {isTamil
                                  ? `NSFDC அழைக்கவும்: ${NSFDC_PHONE}`
                                  : `Call NSFDC: ${NSFDC_PHONE}`}
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
                                className="mt-1 h-4 w-4 shrink-0"
                              />

                              <span className="text-sm leading-6 text-slate-300">
                                {isTamil
                                  ? "சமீபத்திய தகுதி விதிமுறைகளை அதிகாரப்பூர்வ திட்ட அமைப்பிடம் சரிபார்த்துவிட்டேன்."
                                  : "I have checked the latest eligibility rules with the official scheme authority."}
                              </span>

                            </label>

                          </div>
                        )}

                        {/* STEP 3 */}

                        {index === 2 && (
                          <div className="mt-4">

                            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">

                              <p className="text-sm font-semibold text-cyan-300">
                                🌐{" "}
                                {isTamil
                                  ? "அதிகாரப்பூர்வ விண்ணப்ப சேனலைத் தேர்வு செய்யவும்"
                                  : "Choose an Official Application Channel"}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {isTamil
                                  ? "NSFDC கடன் விண்ணப்பங்கள் அங்கீகரிக்கப்பட்ட சேனல்கள் மூலம் செயல்படுத்தப்படுகின்றன. ஆன்லைன் விண்ணப்பத்திற்கு அதிகாரப்பூர்வ PM-SURAJ போர்டலைப் பயன்படுத்தவும்."
                                  : "NSFDC loan applications are processed through authorized channels. Use the official PM-SURAJ portal for online applications."}
                              </p>

                              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                                <a
                                  href={PM_SURAJ_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    setChannelConfirmed(true)
                                  }
                                  className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
                                >
                                  🌐{" "}
                                  {isTamil
                                    ? "PM-SURAJ போர்டலைத் திறக்கவும்"
                                    : "Open PM-SURAJ Portal"}
                                </a>

                                <button
                                  onClick={() =>
                                    navigate("/channel-partners")
                                  }
                                  className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
                                >
                                  📍{" "}
                                  {isTamil
                                    ? "அங்கீகரிக்கப்பட்ட சேனல் பார்ட்னர்களைக் காண்க"
                                    : "View Authorized Channel Partners"}
                                </button>

                              </div>

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
                                className="mt-1 h-4 w-4 shrink-0"
                              />

                              <span className="text-sm leading-6 text-slate-300">
                                {isTamil
                                  ? "நான் பயன்படுத்தவுள்ள அதிகாரப்பூர்வ விண்ணப்ப வழியை உறுதிப்படுத்தியுள்ளேன்."
                                  : "I have confirmed the official application channel I intend to use."}
                              </span>

                            </label>

                          </div>
                        )}

                        {/* STEP 4 */}

                        {index === 3 && (
                          <div className="mt-4 rounded-xl border border-purple-400/20 bg-purple-400/5 p-4">

                            <p className="text-sm font-semibold text-purple-300">
                              🚀{" "}
                              {isTamil
                                ? "சமர்ப்பிக்கத் தயாரா?"
                                : "Ready to Submit?"}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {isTamil
                                ? "அதிகாரப்பூர்வ PM-SURAJ போர்டல் அல்லது திட்ட அதிகாரியால் குறிப்பிடப்பட்ட அங்கீகரிக்கப்பட்ட சேனல் மூலம் உங்கள் விண்ணப்பத்தைச் சமர்ப்பிக்கவும்."
                                : "Submit your application through the official PM-SURAJ portal or an authorized channel specified by the scheme authority."}
                            </p>

                            <a
                              href={PM_SURAJ_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                setChannelConfirmed(true)
                              }
                              className="mt-3 inline-block w-full rounded-xl bg-purple-400 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-purple-300 sm:w-auto"
                            >
                              🚀{" "}
                              {isTamil
                                ? "PM-SURAJ செல்லவும்"
                                : "Go to PM-SURAJ"}
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

          {/* OFFICIAL APPLICATION ROUTES */}

          <div className="mt-8">

            <h3 className="text-xl font-bold">
              {isTamil
                ? "அதிகாரப்பூர்வ விண்ணப்ப வழிகள்"
                : "Official Application Routes"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {isTamil
                ? "உங்கள் விண்ணப்பத்தைச் சமர்ப்பிக்கவும் அல்லது திட்ட தகவல்களைச் சரிபார்க்கவும் அதிகாரப்பூர்வ அரசு சேனல்களை மட்டுமே பயன்படுத்தவும்."
                : "Use only official government channels to submit your application or verify scheme information."}
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <a
                href={PM_SURAJ_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChannelConfirmed(true)}
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 transition hover:bg-cyan-400/10"
              >

                <p className="text-sm text-slate-400">
                  🌐{" "}
                  {isTamil
                    ? "ஆன்லைன் விண்ணப்பம்"
                    : "Online Application"}
                </p>

                <p className="mt-2 font-bold text-cyan-300">
                  PM-SURAJ Portal
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {isTamil
                    ? "அதிகாரப்பூர்வ போர்டலைத் திறக்கவும் →"
                    : "Open official portal →"}
                </p>

              </a>

              <a
                href={NSFDC_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setChannelConfirmed(true)}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 transition hover:bg-emerald-400/10"
              >

                <p className="text-sm text-slate-400">
                  🏢{" "}
                  {isTamil
                    ? "திட்ட அதிகார அமைப்பு"
                    : "Scheme Authority"}
                </p>

                <p className="mt-2 font-bold text-emerald-300">
                  NSFDC Official Website
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {isTamil
                    ? "திட்ட விவரங்களைச் சரிபார்க்கவும் →"
                    : "Verify scheme details →"}
                </p>

              </a>

            </div>

            {/* HELPLINE */}

            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    📞{" "}
                    {isTamil
                      ? "திட்டத்தைச் சரிபார்க்க உதவி வேண்டுமா?"
                      : "Need Help Verifying the Scheme?"}
                  </p>

                  <p className="mt-2 font-bold text-amber-300">
                    {isTamil
                      ? "NSFDC-ஐ தொடர்புகொள்ளவும்"
                      : "Contact NSFDC"}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {isTamil
                      ? "தகுதி, ஆவணங்கள், கடன் விவரங்கள் மற்றும் விண்ணப்ப நடைமுறைகளைச் சரிபார்க்க அதிகாரப்பூர்வ அமைப்பைத் தொடர்புகொள்ளவும்."
                      : "Contact the official authority to verify eligibility, documents, loan details and application procedures."}
                  </p>

                </div>

                <a
                  href={`tel:${NSFDC_PHONE}`}
                  className="w-full rounded-xl bg-amber-400 px-5 py-3 text-center font-bold text-slate-950 transition hover:bg-amber-300 sm:w-auto"
                >
                  📞 {NSFDC_PHONE}
                </a>

              </div>

            </div>

          </div>

        </motion.section>

        {/* IMPORTANT NOTICE */}

        <section className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5 sm:mt-8 sm:p-6">

          <p className="text-sm font-semibold text-yellow-300">
            ⚠ {isTamil ? "முக்கியமானது" : "Important"}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {isTamil
              ? "UdyamSetu என்பது திட்டங்களைக் கண்டறிவதை எளிதாக்க உருவாக்கப்பட்ட ஒரு prototype ஆகும். தகுதி, கடன் தொகை, வட்டி விகிதம், ஆவணங்கள் மற்றும் விண்ணப்ப நடைமுறைகள் விண்ணப்பிக்கும் முன் சமீபத்திய அதிகாரப்பூர்வ தகவல்களுடன் சரிபார்க்கப்பட வேண்டும்."
              : "UdyamSetu is a prototype designed to make scheme discovery easier. Eligibility, loan amount, interest rate, documents and application procedures should be verified against the latest official information before applying."}
          </p>

          {scheme.source?.name && (
            <p className="mt-4 text-sm text-slate-400">

              {isTamil ? "தகவல் மூலம்:" : "Information source:"}{" "}

              <span className="font-semibold text-white">
                {scheme.source.name}
              </span>

            </p>
          )}

        </section>

        {/* BACK */}

        <button
          onClick={() => navigate("/schemes")}
          className="mt-6 w-full rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 sm:mt-8 sm:w-auto"
        >
          {isTamil
            ? "← பரிந்துரைகளுக்குத் திரும்பவும்"
            : "← Back to Recommendations"}
        </button>

      </div>

    </main>
  );
}

export default SchemeDetails;