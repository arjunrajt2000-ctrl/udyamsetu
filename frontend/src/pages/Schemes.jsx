import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { schemes } from "../data/schemes";
import { useLanguage } from "../i18n/LanguageContext";

// ==================================================
// NORMALIZE PURPOSE
// ==================================================

const normalizePurpose = (purpose) => {
  const value = String(purpose || "")
    .trim()
    .toLowerCase();

  if (
    value.includes("education") ||
    value.includes("study") ||
    value.includes("college") ||
    value.includes("student") ||
    value.includes("educational")
  ) {
    return "education";
  }

  if (
    value.includes("micro") ||
    value.includes("finance") ||
    value.includes("business") ||
    value.includes("entrepreneur") ||
    value.includes("self") ||
    value.includes("income") ||
    value.includes("term") ||
    value.includes("loan")
  ) {
    return "business";
  }

  return "other";
};

// ==================================================
// NORMALIZE SCHEME TYPE
// ==================================================

const normalizeSchemeType = (type) => {
  const value = String(type || "")
    .trim()
    .toLowerCase();

  if (
    value.includes("education") ||
    value.includes("student") ||
    value.includes("study")
  ) {
    return "education";
  }

  if (
    value.includes("business") ||
    value.includes("finance") ||
    value.includes("micro") ||
    value.includes("enterprise") ||
    value.includes("term") ||
    value.includes("loan")
  ) {
    return "business";
  }

  return "other";
};

// ==================================================
// CONVERT INCOME SAFELY
// ==================================================

const getIncomeValue = (income) => {
  if (
    income === null ||
    income === undefined ||
    income === ""
  ) {
    return 0;
  }

  const value = String(income)
    .toLowerCase()
    .trim();

  if (
    value.includes("above") ||
    value.includes(">5") ||
    value.includes("5+") ||
    value.includes("above-5")
  ) {
    return 500001;
  }

  const numeric = Number(
    String(income).replace(/[^0-9.]/g, "")
  );

  if (Number.isNaN(numeric)) {
    return 0;
  }

  if (numeric > 0 && numeric < 100) {
    return numeric * 100000;
  }

  return numeric;
};

// ==================================================
// FORMAT INCOME
// ==================================================

const formatIncome = (income, t) => {
  if (
    income === null ||
    income === undefined ||
    income === ""
  ) {
    return t.schemesResults.notSpecified;
  }

  const value = String(income)
    .toLowerCase()
    .trim();

  if (
    value.includes("above") ||
    value.includes(">5") ||
    value.includes("5+") ||
    value.includes("above-5")
  ) {
    return "Above ₹5 lakh";
  }

  const numeric = getIncomeValue(income);

  if (numeric > 500000) {
    return "Above ₹5 lakh";
  }

  if (!numeric) {
    return t.schemesResults.notSpecified;
  }

  return `₹${numeric.toLocaleString("en-IN")}`;
};

// ==================================================
// NORMALIZE CATEGORY
// ==================================================

const normalizeCategory = (category) => {
  return String(category || "")
    .trim()
    .toLowerCase();
};

// ==================================================
// NORMALIZE STATE
// ==================================================

const normalizeState = (state) => {
  return String(state || "")
    .trim()
    .toLowerCase();
};

// ==================================================
// CALCULATE MATCH
// ==================================================

function calculateMatch(scheme, answers, t) {
  const income = getIncomeValue(
    answers.income
  );

  const category = normalizeCategory(
    answers.category
  );

  const purpose = normalizePurpose(
    answers.purpose
  );

  const state = normalizeState(
    answers.state
  );

  const schemeType = normalizeSchemeType(
    scheme.type
  );

  let score = 0;

  const reasons = [];
  const warnings = [];

  // PURPOSE — 40 POINTS

  if (
    purpose !== "other" &&
    schemeType !== "other" &&
    schemeType !== purpose
  ) {
    return null;
  }

  if (
    purpose !== "other" &&
    schemeType === purpose
  ) {
    score += 40;

    reasons.push(
      t.schemesResults.reasons.purposeMatch
    );
  } else {
    score += 20;

    reasons.push(
      t.schemesResults.reasons.purposeUnknown
    );
  }

  // INCOME — 30 POINTS

  if (scheme.maxIncome) {
    if (
      income > 0 &&
      income <= scheme.maxIncome
    ) {
      score += 30;

      reasons.push(
        t.schemesResults.reasons.incomeMatch
      );
    } else if (
      income > scheme.maxIncome
    ) {
      warnings.push(
        t.schemesResults.reasons.incomeAbove
      );
    } else {
      score += 15;

      warnings.push(
        t.schemesResults.reasons.incomeUnknown
      );
    }
  } else {
    score += 20;

    reasons.push(
      t.schemesResults.reasons.noIncomeLimit
    );
  }

  // CATEGORY — 20 POINTS

  if (scheme.category) {
    const schemeCategory =
      normalizeCategory(
        scheme.category
      );

    if (
      category === "" ||
      category === "other"
    ) {
      score += 10;

      warnings.push(
        t.schemesResults.reasons.categoryUnknown
      );
    } else if (
      schemeCategory === category ||
      schemeCategory.includes(category) ||
      category.includes(schemeCategory)
    ) {
      score += 20;

      reasons.push(
        t.schemesResults.reasons.categoryMatch
      );
    } else {
      warnings.push(
        t.schemesResults.reasons.categoryMismatch
      );
    }
  } else {
    score += 10;

    reasons.push(
      t.schemesResults.reasons.noCategory
    );
  }

  // STATE — 10 POINTS

  if (scheme.state) {
    const schemeState =
      normalizeState(
        scheme.state
      );

    if (
      state &&
      schemeState &&
      (
        schemeState === state ||
        schemeState.includes(state) ||
        state.includes(schemeState)
      )
    ) {
      score += 10;

      reasons.push(
        t.schemesResults.reasons.stateMatch
      );
    } else {
      warnings.push(
        t.schemesResults.reasons.stateMismatch
      );
    }
  } else {
    score += 10;

    reasons.push(
      t.schemesResults.reasons.noState
    );
  }

  return {
    ...scheme,

    matchScore: Math.max(
      1,
      Math.min(
        Math.round(score),
        100
      )
    ),

    reasons,
    warnings,
  };
};

// ==================================================
// MAIN COMPONENT
// ==================================================

function Schemes() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const answers = location.state || {
    income: "",
    category: "",
    purpose: "",
    state: "",
    district: "",
  };

  // ==================================================
  // GENERATE RECOMMENDATIONS
  // ==================================================

  let matchedSchemes = schemes
    .map((scheme) =>
      calculateMatch(
        scheme,
        answers,
        t
      )
    )
    .filter(Boolean)
    .sort(
      (a, b) =>
        b.matchScore -
        a.matchScore
    );

  // ==================================================
  // FALLBACK
  // ==================================================

  if (
    matchedSchemes.length === 0 &&
    schemes.length > 0
  ) {
    const purpose =
      normalizePurpose(
        answers.purpose
      );

    const samePurposeSchemes =
      schemes.filter(
        (scheme) =>
          normalizeSchemeType(
            scheme.type
          ) === purpose
      );

    if (
      samePurposeSchemes.length > 0
    ) {
      matchedSchemes =
        samePurposeSchemes
          .map((scheme) => ({
            ...scheme,

            matchScore: 10,

            reasons: [
              t.schemesResults.reasons
                .fallbackPurpose,
            ],

            warnings: [
              t.schemesResults.reasons
                .fallbackWarning,
            ],
          }))
          .slice(0, 3);
    } else {
      matchedSchemes = [
        {
          ...schemes[0],

          matchScore: 1,

          reasons: [
            t.schemesResults.reasons
              .databaseFallback,
          ],

          warnings: [
            t.schemesResults.reasons
              .databaseFallbackWarning,
          ],
        },
      ];
    }
  }

  // ==================================================
  // OPEN CHANNEL PARTNERS
  // ==================================================

  const openChannelPartners = () => {
    navigate(
      "/channel-partners",
      {
        state: {
          state:
            answers.state ||
            "Tamil Nadu",

          district:
            answers.district ||
            answers.city ||
            "Chennai",
        },
      }
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">

      <div className="mx-auto w-full max-w-5xl">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400 sm:text-sm sm:tracking-[0.25em]">
            {t.schemesResults.resultsLabel}
          </p>

          <h1 className="break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t.schemesResults.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            {t.schemesResults.description}
          </p>

        </motion.div>

        {/* ASSESSMENT SUMMARY */}

        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 sm:mt-10 sm:p-6">

          <h2 className="text-lg font-bold sm:text-xl">
            {t.schemesResults.assessment}
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                {t.schemesResults.annualIncome}
              </p>

              <p className="break-words font-semibold">
                {formatIncome(
                  answers.income,
                  t
                )}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                {t.schemesResults.category}
              </p>

              <p className="break-words font-semibold">
                {answers.category ||
                  t.schemesResults.notSpecified}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                {t.schemesResults.purpose}
              </p>

              <p className="break-words font-semibold">
                {answers.purpose ||
                  t.schemesResults.notSpecified}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-400">
                {t.schemesResults.state}
              </p>

              <p className="break-words font-semibold">
                {answers.state ||
                  t.schemesResults.notSpecified}
              </p>
            </div>

            {answers.district && (
              <div className="min-w-0">
                <p className="text-sm text-slate-400">
                  {t.schemesResults.district}
                </p>

                <p className="break-words font-semibold">
                  {answers.district}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* CHANNEL PARTNER FINDER */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:mt-8 sm:p-6"
        >

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">

              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 sm:text-sm">
                {t.schemesResults.nextStep}
              </p>

              <h2 className="mt-2 break-words text-xl font-bold sm:text-2xl">
                {t.schemesResults.findPartnerTitle}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {t.schemesResults.findPartnerDescription}
              </p>

            </div>

            <button
              onClick={openChannelPartners}
              className="w-full shrink-0 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 md:w-auto"
            >
              📍 {t.schemesResults.findPartner} →
            </button>

          </div>

        </motion.section>

        {/* RECOMMENDATIONS */}

        <div className="mt-8 sm:mt-10">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h2 className="text-xl font-bold sm:text-2xl">
              {t.schemesResults.recommended}
            </h2>

            <span className="w-fit rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
              {matchedSchemes.length}{" "}
              {t.schemesResults.options}
            </span>

          </div>

          {/* PURPOSE NOTICE */}

          {normalizePurpose(
            answers.purpose
          ) !== "other" && (

            <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:p-5">

              <p className="text-sm font-semibold text-cyan-300">
                {t.schemesResults.purposeFiltered}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                {t.schemesResults.purposeMessage}{" "}

                <span className="break-words font-semibold text-white">
                  {answers.purpose}
                </span>

                ,{" "}

                {t.schemesResults.purposeMessageEnd}

              </p>

            </div>

          )}

          {/* SCHEME CARDS */}

          <div className="grid gap-5 md:grid-cols-2">

            {matchedSchemes.map(
              (scheme, index) => (

                <motion.div
                  key={`${scheme.id || scheme.name}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.12,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:border-emerald-400/40 sm:p-6"
                >

                  {/* HEADING */}

                  <div className="flex items-start justify-between gap-3 sm:gap-4">

                    <div className="min-w-0">

                      <p className="break-words text-xs font-semibold uppercase tracking-wider text-emerald-400 sm:text-sm">
                        {scheme.type ||
                          t.schemesResults.financialAssistance}
                      </p>

                      <h3 className="mt-2 break-words text-lg font-bold leading-6 sm:text-xl">
                        {scheme.name}
                      </h3>

                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-400/10 px-2.5 py-2 text-sm font-bold text-emerald-400 sm:px-3">
                      {scheme.matchScore}%
                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 break-words text-sm leading-6 text-slate-300">
                    {scheme.description}
                  </p>

                  {/* MATCH EXPLANATION */}

                  <div className="mt-5 rounded-xl bg-emerald-400/5 p-3.5 sm:p-4">

                    <p className="text-sm font-semibold text-emerald-400">
                      {t.schemesResults.whyRecommended}
                    </p>

                    <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-300">

                      {scheme.reasons?.map(
                        (
                          reason,
                          reasonIndex
                        ) => (
                          <li
                            key={
                              reasonIndex
                            }
                            className="break-words"
                          >
                            ✓ {reason}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                  {/* WARNINGS */}

                  {scheme.warnings?.length > 0 && (

                    <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3.5 sm:p-4">

                      <p className="text-sm font-semibold text-amber-400">
                        {t.schemesResults.eligibilityNote}
                      </p>

                      <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-300">

                        {scheme.warnings.map(
                          (
                            warning,
                            warningIndex
                          ) => (
                            <li
                              key={
                                warningIndex
                              }
                              className="break-words"
                            >
                              ⚠ {warning}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  )}

                  {/* MAXIMUM ASSISTANCE */}

                  <div className="mt-5 border-t border-white/10 pt-5">

                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      {t.schemesResults.maximumAssistance}
                    </p>

                    <p className="mt-1 break-words text-lg font-bold text-emerald-400">

                      {scheme.maxAmount
                        ? `₹${Number(
                            scheme.maxAmount
                          ).toLocaleString(
                            "en-IN"
                          )}`
                        : t.schemesResults.seeOfficialDetails}

                    </p>

                  </div>

                  {/* SOURCE */}

                  <p className="mt-4 break-words text-xs leading-5 text-slate-500">
                    {t.schemesResults.source}{" "}
                    {scheme.source?.name ||
                      t.schemesResults.sourceNotSpecified}
                  </p>

                  {/* DETAILS BUTTON */}

                  <button
                    onClick={() =>
                      navigate(
                        "/scheme-details",
                        {
                          state: {
                            scheme,
                            assessment: answers,
                          },
                        }
                      )
                    }
                    className="mt-5 w-full rounded-xl bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
                  >
                    {t.schemesResults.viewDetails} →
                  </button>

                </motion.div>

              )
            )}

          </div>

        </div>

        {/* DISCLAIMER */}

        <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 sm:p-5">

          <p className="text-sm font-semibold text-yellow-300">
            ⚠ {t.schemesResults.important}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {t.schemesResults.disclaimer}
          </p>

        </div>

        {/* BACK */}

        <button
          onClick={() =>
            navigate("/assessment")
          }
          className="mt-8 text-sm text-slate-400 transition hover:text-white"
        >
          ← {t.schemesResults.modifyAssessment}
        </button>

      </div>

    </main>
  );
}

export default Schemes;