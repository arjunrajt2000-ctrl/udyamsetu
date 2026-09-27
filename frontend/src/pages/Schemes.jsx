import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { schemes } from "../data/schemes";

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

const formatIncome = (income) => {
  if (
    income === null ||
    income === undefined ||
    income === ""
  ) {
    return "Not specified";
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
    return "Not specified";
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

function calculateMatch(scheme, answers) {
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
      "The scheme matches your selected funding purpose."
    );
  } else {
    score += 20;

    reasons.push(
      "The selected purpose does not provide enough information for a strict purpose match."
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
        "Your stated income is within the scheme's listed income limit."
      );
    } else if (
      income > scheme.maxIncome
    ) {
      warnings.push(
        "Your stated income may be above this scheme's listed income limit."
      );
    } else {
      score += 15;

      warnings.push(
        "Income information could not be fully compared with the scheme's income limit."
      );
    }
  } else {
    score += 20;

    reasons.push(
      "No maximum income limit is specified in the available scheme data."
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
        "Applicant category was not specific enough for a complete category match."
      );
    } else if (
      schemeCategory === category ||
      schemeCategory.includes(category) ||
      category.includes(schemeCategory)
    ) {
      score += 20;

      reasons.push(
        "Your applicant category matches the scheme's available category information."
      );
    } else {
      warnings.push(
        "Applicant category may not match the scheme's stated category requirements. Verify eligibility with the official authority."
      );
    }
  } else {
    score += 10;

    reasons.push(
      "No specific category restriction is available in the scheme data."
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
        "The scheme is associated with your selected state."
      );
    } else {
      warnings.push(
        "The scheme's state coverage may not match your selected state. Verify the official application route."
      );
    }
  } else {
    score += 10;

    reasons.push(
      "No state-specific restriction is specified in the available scheme data."
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
        answers
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
              "This scheme belongs to the purpose category you selected.",
            ],

            warnings: [
              "Your profile did not produce a strong match. Verify the official eligibility requirements before applying.",
            ],
          }))
          .slice(0, 3);
    } else {
      matchedSchemes = [
        {
          ...schemes[0],

          matchScore: 1,

          reasons: [
            "The current prototype database does not contain enough schemes for your selected purpose.",
          ],

          warnings: [
            "This scheme is shown only as a fallback and may not match your selected purpose. Verify official schemes before applying.",
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
          state: answers.state || "Tamil Nadu",
          district:
            answers.district ||
            answers.city ||
            "Chennai",
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">

      <div className="mx-auto max-w-5xl">

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

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            UdyamSetu Results
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Schemes matched to your profile
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            UdyamSetu analyzes your income, applicant
            category, funding purpose and state to identify
            potentially relevant government schemes.
          </p>

        </motion.div>

        {/* ASSESSMENT SUMMARY */}

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6">

          <h2 className="text-xl font-bold">
            Your Assessment
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>
              <p className="text-sm text-slate-400">
                Annual Income
              </p>

              <p className="font-semibold">
                {formatIncome(
                  answers.income
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Category
              </p>

              <p className="font-semibold">
                {answers.category ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Purpose
              </p>

              <p className="font-semibold">
                {answers.purpose ||
                  "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                State
              </p>

              <p className="font-semibold">
                {answers.state ||
                  "Not specified"}
              </p>
            </div>

            {answers.district && (
              <div>
                <p className="text-sm text-slate-400">
                  District / City
                </p>

                <p className="font-semibold">
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
          className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6"
        >

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Next Step
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Find an authorized Channel Partner
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Locate a suitable State Channelizing Agency,
                Public Sector Bank, Regional Rural Bank or
                NBFC-MFI for the next stage of your application.
              </p>

            </div>

            <button
              onClick={openChannelPartners}
              className="shrink-0 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              📍 Find Channel Partner →
            </button>

          </div>

        </motion.section>

        {/* RECOMMENDATIONS */}

        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Recommended Schemes
            </h2>

            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
              {matchedSchemes.length} options
            </span>

          </div>

          {/* PURPOSE NOTICE */}

          {normalizePurpose(
            answers.purpose
          ) !== "other" && (

            <div className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">

              <p className="text-sm font-semibold text-cyan-300">
                Purpose-filtered recommendations
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Because you selected{" "}

                <span className="font-semibold text-white">
                  {answers.purpose}
                </span>

                , UdyamSetu is prioritizing schemes
                designed for that purpose instead of
                displaying unrelated scheme types.
              </p>

            </div>

          )}

          {/* SCHEME CARDS */}

          <div className="grid gap-6 md:grid-cols-2">

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
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-emerald-400/40"
                >

                  {/* HEADING */}

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                        {scheme.type ||
                          "Financial Assistance"}
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {scheme.name}
                      </h3>

                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-400/10 px-3 py-2 font-bold text-emerald-400">
                      {scheme.matchScore}%
                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {scheme.description}
                  </p>

                  {/* MATCH EXPLANATION */}

                  <div className="mt-5 rounded-xl bg-emerald-400/5 p-4">

                    <p className="text-sm font-semibold text-emerald-400">
                      Why this was recommended
                    </p>

                    <ul className="mt-2 space-y-2 text-sm text-slate-300">

                      {scheme.reasons?.map(
                        (
                          reason,
                          reasonIndex
                        ) => (
                          <li
                            key={
                              reasonIndex
                            }
                          >
                            ✓ {reason}
                          </li>
                        )
                      )}

                    </ul>

                  </div>

                  {/* WARNINGS */}

                  {scheme.warnings?.length > 0 && (

                    <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">

                      <p className="text-sm font-semibold text-amber-400">
                        Eligibility note
                      </p>

                      <ul className="mt-2 space-y-2 text-sm text-slate-300">

                        {scheme.warnings.map(
                          (
                            warning,
                            warningIndex
                          ) => (
                            <li
                              key={
                                warningIndex
                              }
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
                      Maximum assistance
                    </p>

                    <p className="mt-1 text-lg font-bold text-emerald-400">

                      {scheme.maxAmount
                        ? `₹${Number(
                            scheme.maxAmount
                          ).toLocaleString(
                            "en-IN"
                          )}`
                        : "See official scheme details"}

                    </p>

                  </div>

                  {/* SOURCE */}

                  <p className="mt-4 text-xs text-slate-500">
                    Source:{" "}
                    {scheme.source?.name ||
                      "Source not specified"}
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
                    View Scheme Details →
                  </button>

                </motion.div>

              )
            )}

          </div>

        </div>

        {/* DISCLAIMER */}

        <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">

          <p className="text-sm font-semibold text-yellow-300">
            ⚠ Important
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Match percentage indicates how closely the
            available scheme data matches the information
            provided in your assessment. It does not confirm
            eligibility. Always verify the latest eligibility
            requirements with the official scheme authority.
          </p>

        </div>

        {/* BACK */}

        <button
          onClick={() =>
            navigate("/assessment")
          }
          className="mt-8 text-sm text-slate-400 transition hover:text-white"
        >
          ← Modify assessment
        </button>

      </div>

    </main>
  );
}

export default Schemes;