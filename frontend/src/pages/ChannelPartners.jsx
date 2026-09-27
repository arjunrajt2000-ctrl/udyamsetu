import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const partnerData = [
  {
    name: "Tamil Nadu Adi Dravidar Housing & Development Corporation (TAHDCO)",
    type: "SCA",
    state: "Tamil Nadu",
    district: "Chennai",
    description:
      "State-level channel partner supporting eligible beneficiaries under government financial assistance programmes.",
    contact: "Official channel partner",
  },
  {
    name: "State Bank of India",
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description:
      "Public sector banking channel through which eligible government-supported financial assistance may be routed.",
    contact: "Visit nearest branch",
  },
  {
    name: "Indian Bank",
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description:
      "Public sector banking institution with branches that may serve as an authorized application channel.",
    contact: "Visit nearest branch",
  },
  {
    name: "Canara Bank",
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description:
      "Public sector banking channel for eligible financial assistance applicants.",
    contact: "Visit nearest branch",
  },
  {
    name: "Punjab National Bank",
    type: "PSB",
    state: "Tamil Nadu",
    district: "Chennai",
    description:
      "Public sector bank that can be checked as an available application channel.",
    contact: "Visit nearest branch",
  },
];

const partnerTypes = [
  "All",
  "SCA",
  "PSB",
  "RRB",
  "NBFC-MFI",
];

function ChannelPartners() {
  const location = useLocation();

  // Preserve assessment location when arriving from another page.
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

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">

      <div className="mx-auto max-w-6xl">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">

          <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute right-[10%] top-[40%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

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

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            UdyamSetu Channel Partner Finder
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Find an authorized channel partner
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Government-supported financial assistance may be
            routed through authorized Channel Partners such as
            State Channelizing Agencies, Public Sector Banks,
            Regional Rural Banks and NBFC-MFIs.
          </p>

        </motion.div>

        {/* SEARCH PANEL */}
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
          className="relative z-10 mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >

          <h2 className="text-2xl font-bold">
            Search by location
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Select your location and preferred partner type
            to find available options in the prototype database.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            {/* STATE */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
              >

                <option value="Tamil Nadu">
                  Tamil Nadu
                </option>

                <option value="">
                  All States
                </option>

              </select>

            </div>

            {/* DISTRICT */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                District / City
              </label>

              <input
                type="text"
                value={district}
                onChange={(e) =>
                  setDistrict(e.target.value)
                }
                placeholder="Enter district or city"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white placeholder:text-slate-600 outline-none focus:border-emerald-400"
              />

            </div>

            {/* TYPE */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Partner Type
              </label>

              <select
                value={partnerType}
                onChange={(e) =>
                  setPartnerType(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-emerald-400"
              >

                {partnerTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type === "All"
                      ? "All Partner Types"
                      : type}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </motion.section>

        {/* RESULTS HEADER */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold">
              Available Partners
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {filteredPartners.length} partner
              {filteredPartners.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            {state || "All States"}
          </div>

        </div>

        {/* PARTNER CARDS */}
        <div className="relative z-10 mt-6 grid gap-6 md:grid-cols-2">

          {filteredPartners.map(
            (partner, index) => (

              <motion.div
                key={`${partner.name}-${index}`}
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
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-emerald-400/30"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                      {partner.type}
                    </span>

                    <h3 className="mt-3 text-xl font-bold leading-7">
                      {partner.name}
                    </h3>

                  </div>

                  <span className="text-2xl">
                    🏢
                  </span>

                </div>

                {/* LOCATION */}
                <div className="mt-5 rounded-xl bg-black/20 p-4">

                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold">
                    📍 {partner.district}, {partner.state}
                  </p>

                </div>

                {/* DESCRIPTION */}
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  {partner.description}
                </p>

                {/* ACTIONS */}
                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    onClick={() =>
                      openMap(partner.name)
                    }
                    className="flex-1 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    📍 Find on Map
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        "Please verify the partner's current authorization with the official scheme authority before submitting an application."
                      )
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    ℹ Verify
                  </button>

                </div>

              </motion.div>

            )
          )}

        </div>

        {/* NO RESULTS */}
        {filteredPartners.length === 0 && (

          <div className="relative z-10 mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 text-center">

            <p className="text-lg font-bold text-amber-300">
              No matching partners found
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Try another district or select
              "All Partner Types".
            </p>

          </div>

        )}

        {/* MAP SECTION */}
        <section className="relative z-10 mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">

          <h2 className="text-2xl font-bold">
            📍 Need a nearby location?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Use Google Maps to locate branches and offices
            near your selected district. Always verify that
            the organization is currently authorized for the
            relevant scheme before applying.
          </p>

          <button
            onClick={searchNearby}
            className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
          >
            🗺️ Search Nearby Partners
          </button>

        </section>

        {/* IMPORTANT NOTICE */}
        <section className="relative z-10 mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6">

          <p className="text-sm font-semibold text-yellow-300">
            ⚠ Important
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            This Channel Partner Finder is currently a
            prototype. Partner availability and authorization
            can change. Always verify the current authorized
            channel with the relevant government scheme
            authority before submitting an application or
            sharing documents.
          </p>

        </section>

      </div>

    </main>
  );
}

export default ChannelPartners;