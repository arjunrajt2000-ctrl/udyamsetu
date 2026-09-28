import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const partnerData = [
  {
    name: {
      en: "Tamil Nadu Adi Dravidar Housing and Development Corporation (TAHDCO)",
      ta: "தமிழ்நாடு ஆதிதிராவிடர் வீட்டு வசதி மற்றும் மேம்பாட்டுக் கழகம் (TAHDCO)",
    },
    type: "SCA",
    state: "Tamil Nadu",
    district: "Chennai",
    description: {
      en: "A state-level channel partner that assists eligible beneficiaries under government financial assistance schemes.",
      ta: "அரசின் நிதியுதவி திட்டங்களின் கீழ் தகுதியான பயனாளிகளுக்கு உதவும் மாநில அளவிலான சேனல் பார்ட்னர்.",
    },
    contact: {
      en: "Official channel partner",
      ta: "அதிகாரப்பூர்வ சேனல் பார்ட்னர்",
    },
  },

  {
    name: {
      en: "State Bank of India",
      ta: "ஸ்டேட் பேங்க் ஆஃப் இந்தியா",
    },
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description: {
      en: "A public sector banking channel through which eligible beneficiaries may access government-supported financial assistance.",
      ta: "தகுதியான பயனாளிகளுக்கான அரசின் ஆதரவு பெற்ற நிதியுதவிகள் வழங்கப்படும் பொதுத்துறை வங்கி சேனல்.",
    },
    contact: {
      en: "Visit the nearest branch",
      ta: "அருகிலுள்ள கிளையை அணுகவும்",
    },
  },

  {
    name: {
      en: "Indian Bank",
      ta: "இந்தியன் வங்கி",
    },
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description: {
      en: "A public sector bank that may operate as an approved application channel.",
      ta: "அங்கீகரிக்கப்பட்ட விண்ணப்ப சேனலாக செயல்படக்கூடிய பொதுத்துறை வங்கி.",
    },
    contact: {
      en: "Visit the nearest branch",
      ta: "அருகிலுள்ள கிளையை அணுகவும்",
    },
  },

  {
    name: {
      en: "Canara Bank",
      ta: "கனரா வங்கி",
    },
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description: {
      en: "A public sector banking channel for eligible financial assistance applicants.",
      ta: "தகுதியான நிதியுதவி விண்ணப்பதாரர்களுக்கான பொதுத்துறை வங்கி சேனல்.",
    },
    contact: {
      en: "Visit the nearest branch",
      ta: "அருகிலுள்ள கிளையை அணுகவும்",
    },
  },

  {
    name: {
      en: "Punjab National Bank",
      ta: "பஞ்சாப் நேஷனல் வங்கி",
    },
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description: {
      en: "A public sector bank that can be checked as an available channel for financial assistance applications.",
      ta: "நிதியுதவி விண்ணப்பத்திற்கான கிடைக்கக்கூடிய சேனலாக சரிபார்க்கக்கூடிய பொதுத்துறை வங்கி.",
    },
    contact: {
      en: "Visit the nearest branch",
      ta: "அருகிலுள்ள கிளையை அணுகவும்",
    },
  },
];

const partnerTypes = ["All", "SCA", "PSB", "RRB", "NBFC-MFI"];

function ChannelPartners() {
  const location = useLocation();

  const { language } = useLanguage();

  const isTamil = language === "ta";

  const incomingState = location.state || {};

  const initialState =
    incomingState.state || "Tamil Nadu";

  const initialDistrict =
    incomingState.district ||
    incomingState.city ||
    "Chennai";

  const [state, setState] = useState(initialState);
  const [district, setDistrict] = useState(initialDistrict);
  const [partnerType, setPartnerType] = useState("All");

  const filteredPartners = partnerData.filter((partner) => {
    const stateMatch =
      !state ||
      partner.state.toLowerCase() ===
        state.toLowerCase();

    const districtMatch =
      !district ||
      partner.district
        .toLowerCase()
        .includes(district.toLowerCase());

    const typeMatch =
      partnerType === "All" ||
      partner.type === partnerType;

    return (
      stateMatch &&
      districtMatch &&
      typeMatch
    );
  });

  const openMap = (partnerName) => {
    const query = encodeURIComponent(
      `${partnerName} ${district} ${state}`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const searchNearby = () => {
    const query = encodeURIComponent(
      `government financial assistance channel partner ${district} ${state}`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const text = {
    eyebrow: isTamil
      ? "UdyamSetu சேனல் பார்ட்னர் தேடல்"
      : "UdyamSetu Channel Partner Search",

    title: isTamil
      ? "அங்கீகரிக்கப்பட்ட சேனல் பார்ட்னரை கண்டறியுங்கள்"
      : "Find an Authorized Channel Partner",

    description: isTamil
      ? "அரசு ஆதரவு பெற்ற நிதியுதவிகள், மாநில சேனல் ஏஜென்சிகள், பொதுத்துறை வங்கிகள், பிராந்திய கிராமப்புற வங்கிகள் மற்றும் NBFC-MFI போன்ற அங்கீகரிக்கப்பட்ட சேனல் பார்ட்னர்கள் மூலம் வழங்கப்படலாம்."
      : "Government-supported financial assistance may be delivered through authorized channel partners such as State Channel Agencies, Public Sector Banks, Regional Rural Banks and NBFC-MFIs.",

    searchTitle: isTamil
      ? "இருப்பிடத்தின் அடிப்படையில் தேடுங்கள்"
      : "Search by Location",

    searchDescription: isTamil
      ? "உங்கள் இருப்பிடம் மற்றும் விருப்பமான பார்ட்னர் வகையைத் தேர்வு செய்து கிடைக்கக்கூடிய பார்ட்னர்களைக் கண்டறியுங்கள்."
      : "Select your location and preferred partner type to find available channel partners.",

    state: isTamil ? "மாநிலம்" : "State",

    district: isTamil
      ? "மாவட்டம் / நகரம்"
      : "District / City",

    districtPlaceholder: isTamil
      ? "மாவட்டம் அல்லது நகரத்தை உள்ளிடவும்"
      : "Enter district or city",

    type: isTamil
      ? "பார்ட்னர் வகை"
      : "Partner Type",

    allStates: isTamil
      ? "அனைத்து மாநிலங்களும்"
      : "All States",

    allTypes: isTamil
      ? "அனைத்து பார்ட்னர் வகைகளும்"
      : "All Partner Types",

    resultsTitle: isTamil
      ? "கிடைக்கக்கூடிய பார்ட்னர்கள்"
      : "Available Partners",

    partnersFound: isTamil
      ? "பார்ட்னர்கள் கிடைத்துள்ளனர்"
      : "partners found",

    partnerFound: isTamil
      ? "பார்ட்னர் கிடைத்துள்ளார்"
      : "partner found",

    location: isTamil
      ? "இருப்பிடம்"
      : "Location",

    viewMap: isTamil
      ? "வரைபடத்தில் காண்க"
      : "View on Map",

    verify: isTamil
      ? "சரிபார்க்கவும்"
      : "Verify",

    noPartners: isTamil
      ? "பொருத்தமான பார்ட்னர்கள் கிடைக்கவில்லை"
      : "No matching partners found",

    noPartnersDescription: isTamil
      ? 'வேறு மாவட்டத்தை முயற்சிக்கவும் அல்லது "அனைத்து பார்ட்னர் வகைகளும்" என்பதைத் தேர்வு செய்யவும்.'
      : 'Try another district or select "All Partner Types".',

    nearbyTitle: isTamil
      ? "📍 அருகிலுள்ள இடம் தேவையா?"
      : "📍 Need a Nearby Location?",

    nearbyDescription: isTamil
      ? "நீங்கள் தேர்வு செய்த மாவட்டத்திற்கு அருகிலுள்ள கிளைகள் மற்றும் அலுவலகங்களைக் கண்டறிய Google Maps-ஐ பயன்படுத்தலாம். விண்ணப்பிக்கும் முன் அந்த நிறுவனம் தொடர்புடைய திட்டத்திற்கு தற்போதும் அங்கீகரிக்கப்பட்டுள்ளதா என்பதை சரிபார்க்கவும்."
      : "Use Google Maps to find branches and offices near your selected district. Before applying, verify that the organization is currently authorized for the relevant scheme.",

    searchNearby: isTamil
      ? "🗺️ அருகிலுள்ள பார்ட்னர்களைத் தேடுங்கள்"
      : "🗺️ Search Nearby Partners",

    important: isTamil
      ? "⚠ முக்கியமானது"
      : "⚠ Important",

    notice: isTamil
      ? "இந்த சேனல் பார்ட்னர் தேடல் தற்போது ஒரு prototype ஆகும். பார்ட்னர்களின் கிடைக்கும் தன்மை மற்றும் அங்கீகாரம் மாறக்கூடும். விண்ணப்பிக்கும் முன் அல்லது ஆவணங்களை பகிர்வதற்கு முன், சம்பந்தப்பட்ட அரசு திட்ட அதிகாரியிடம் தற்போதைய அங்கீகரிக்கப்பட்ட சேனலை எப்போதும் சரிபார்க்கவும்."
      : "This channel partner search is currently a prototype. Partner availability and authorization may change. Before applying or sharing documents, always verify the currently authorized channel with the relevant government scheme authority.",

    verifyAlert: isTamil
      ? "விண்ணப்பிக்கும் முன், அந்த பார்ட்னரின் தற்போதைய அங்கீகாரத்தை அதிகாரப்பூர்வ திட்ட அமைப்பிடம் சரிபார்க்கவும்."
      : "Before applying, verify the partner's current authorization with the official scheme authority.",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14 lg:py-16">

      <div className="mx-auto max-w-6xl">

        {/* BACKGROUND GLOW */}

        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-[10%] top-[10%] h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:h-72 sm:w-72" />

          <div className="absolute right-[5%] top-[40%] h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl sm:right-[10%] sm:h-80 sm:w-80" />

        </div>


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
          className="relative z-10"
        >

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400 sm:text-sm sm:tracking-[0.25em]">
            {text.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {text.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
            {text.description}
          </p>

        </motion.div>


        {/* SEARCH */}

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
          className="relative z-10 mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur sm:mt-10 sm:p-6"
        >

          <h2 className="text-xl font-bold sm:text-2xl">
            {text.searchTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {text.searchDescription}
          </p>


          <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-3">

            {/* STATE */}

            <div className="min-w-0">

              <label className="mb-2 block text-sm font-semibold">
                {text.state}
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none focus:border-emerald-400 sm:p-4 sm:text-base"
              >

                <option value="Tamil Nadu">
                  {isTamil ? "தமிழ்நாடு" : "Tamil Nadu"}
                </option>

                <option value="">
                  {text.allStates}
                </option>

              </select>

            </div>


            {/* DISTRICT */}

            <div className="min-w-0">

              <label className="mb-2 block text-sm font-semibold">
                {text.district}
              </label>

              <input
                type="text"
                value={district}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }
                placeholder={text.districtPlaceholder}
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400 sm:p-4 sm:text-base"
              />

            </div>


            {/* TYPE */}

            <div className="min-w-0">

              <label className="mb-2 block text-sm font-semibold">
                {text.type}
              </label>

              <select
                value={partnerType}
                onChange={(e) =>
                  setPartnerType(e.target.value)
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 p-3.5 text-sm text-white outline-none focus:border-emerald-400 sm:p-4 sm:text-base"
              >

                {partnerTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type === "All"
                      ? text.allTypes
                      : type}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </motion.section>


        {/* RESULTS HEADER */}

        <div className="relative z-10 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">

          <div>

            <h2 className="text-xl font-bold sm:text-2xl">
              {text.resultsTitle}
            </h2>

            <p className="mt-1 text-sm text-slate-400">

              {filteredPartners.length}{" "}

              {filteredPartners.length === 1
                ? text.partnerFound
                : text.partnersFound}

            </p>

          </div>


          <div className="w-fit max-w-full break-words rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            {state || text.allStates}
          </div>

        </div>


        {/* PARTNER CARDS */}

        <div className="relative z-10 mt-5 grid gap-5 sm:mt-6 md:grid-cols-2">

          {filteredPartners.map(
            (partner, index) => (

              <motion.div
                key={`${partner.name.en}-${index}`}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-emerald-400/30 sm:p-6"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0 flex-1">

                    <span className="inline-flex max-w-full rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      {partner.type}
                    </span>

                    <h3 className="mt-3 break-words text-lg font-bold leading-6 sm:text-xl sm:leading-7">
                      {partner.name[language]}
                    </h3>

                  </div>

                  <span className="shrink-0 text-xl sm:text-2xl">
                    🏢
                  </span>

                </div>


                {/* LOCATION */}

                <div className="mt-4 rounded-xl bg-black/20 p-3.5 sm:mt-5 sm:p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {text.location}
                  </p>

                  <p className="mt-1 break-words text-sm font-semibold sm:text-base">
                    📍{" "}
                    {partner.district},{" "}
                    {isTamil ? "தமிழ்நாடு" : "Tamil Nadu"}
                  </p>

                </div>


                {/* DESCRIPTION */}

                <p className="mt-4 text-sm leading-6 text-slate-400 sm:mt-5">
                  {partner.description[language]}
                </p>


                {/* CONTACT */}

                <p className="mt-3 text-xs text-slate-500">
                  {partner.contact[language]}
                </p>


                {/* ACTIONS */}

                <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">

                  <button
                    onClick={() =>
                      openMap(
                        partner.name.en
                      )
                    }
                    className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 sm:flex-1"
                  >
                    {text.viewMap}
                  </button>


                  <button
                    onClick={() =>
                      alert(text.verifyAlert)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:w-auto"
                  >
                    ℹ {text.verify}
                  </button>

                </div>

              </motion.div>

            )
          )}

        </div>


        {/* NO RESULTS */}

        {filteredPartners.length === 0 && (

          <div className="relative z-10 mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-center sm:mt-8 sm:p-6">

            <p className="text-base font-bold text-amber-300 sm:text-lg">
              {text.noPartners}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {text.noPartnersDescription}
            </p>

          </div>

        )}


        {/* NEARBY MAP */}

        <section className="relative z-10 mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:mt-10 sm:p-6">

          <h2 className="text-xl font-bold sm:text-2xl">
            {text.nearbyTitle}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {text.nearbyDescription}
          </p>

          <button
            onClick={searchNearby}
            className="mt-5 w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            {text.searchNearby}
          </button>

        </section>


        {/* IMPORTANT NOTICE */}

        <section className="relative z-10 mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 sm:mt-8 sm:p-6">

          <p className="text-sm font-semibold text-yellow-300">
            {text.important}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {text.notice}
          </p>

        </section>

      </div>

    </main>
  );
}

export default ChannelPartners;