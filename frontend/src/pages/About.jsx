import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

function About() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const isTamil = language === "ta";

  const content = {
    en: {
      navBack: "← Back to Home",

      label: "ABOUT UDYAMSETU",

      titleStart: "Connecting People with",
      titleHighlight: "Financial Support",

      intro:
        "UdyamSetu is a prototype platform designed to help citizens discover government financial assistance schemes, understand basic eligibility requirements, and identify suitable official application channels.",

      cards: [
        {
          icon: "🔎",
          title: "Discover Schemes",
          text:
            "Explore various government financial assistance schemes and find schemes that may match your needs.",
        },
        {
          icon: "✓",
          title: "Understand Eligibility",
          text:
            "Use the assessment process to understand which schemes may match your basic profile and requirements.",
        },
        {
          icon: "📍",
          title: "Find Application Channels",
          text:
            "Find available official application routes and channel partners associated with financial assistance programmes.",
        },
      ],

      howLabel: "HOW IT WORKS",
      howTitle: "From discovering a scheme to applying",

      steps: [
        {
          number: "01",
          title: "Assessment",
          text:
            "Provide basic information about your requirements and profile.",
        },
        {
          number: "02",
          title: "Matching",
          text:
            "View schemes that may match your profile and requirements.",
        },
        {
          number: "03",
          title: "Verification",
          text:
            "Verify the latest scheme information with the relevant official authority.",
        },
        {
          number: "04",
          title: "Application",
          text:
            "Continue your application through an appropriate official channel.",
        },
      ],

      noticeTitle: "⚠ Prototype Notice",
      notice:
        "UdyamSetu is currently a prototype with limited features and a limited number of schemes. Information shown on this platform should be verified with the relevant official government authority before submitting an application or making a financial decision.",

      eligibility: "Check My Eligibility →",
      emi: "EMI Calculator",
    },

    ta: {
      navBack: "← முகப்புக்குத் திரும்பு",

      label: "UDYAMSETU பற்றி",

      titleStart: "மக்களை",
      titleHighlight: "நிதி உதவியுடன்",
      titleEnd: "இணைத்தல்",

      intro:
        "UdyamSetu என்பது அரசு வழங்கும் நிதி உதவித் திட்டங்களை குடிமக்கள் எளிதாகக் கண்டறியவும், அடிப்படை தகுதி விதிமுறைகளைப் புரிந்துகொள்ளவும், பொருத்தமான அதிகாரப்பூர்வ விண்ணப்ப வழிகளைக் கண்டறியவும் உதவும் ஒரு முன்மாதிரி தளமாகும்.",

      cards: [
        {
          icon: "🔎",
          title: "திட்டங்களைக் கண்டறியுங்கள்",
          text:
            "பல்வேறு அரசு நிதி உதவித் திட்டங்களைப் பார்வையிட்டு, உங்கள் தேவைகளுக்குப் பொருத்தமான திட்டங்களைக் கண்டறியுங்கள்.",
        },
        {
          icon: "✓",
          title: "தகுதியைப் புரிந்துகொள்ளுங்கள்",
          text:
            "மதிப்பீட்டு செயல்முறையின் மூலம் உங்கள் அடிப்படை சுயவிவரத்திற்குப் பொருந்தக்கூடிய திட்டங்களைப் புரிந்துகொள்ளுங்கள்.",
        },
        {
          icon: "📍",
          title: "விண்ணப்ப வழிகளைக் கண்டறியுங்கள்",
          text:
            "கிடைக்கக்கூடிய அதிகாரப்பூர்வ விண்ணப்ப வழிகள் மற்றும் நிதியுதவித் திட்டங்களுடன் தொடர்புடைய Channel Partners-ஐ கண்டறிய உதவுகிறது.",
        },
      ],

      howLabel: "இது எவ்வாறு செயல்படுகிறது",
      howTitle: "திட்டத்தை கண்டறிவதிலிருந்து விண்ணப்பிப்பது வரை",

      steps: [
        {
          number: "01",
          title: "மதிப்பீடு",
          text:
            "உங்கள் தேவைகள் மற்றும் சுயவிவரம் பற்றிய அடிப்படை தகவல்களை வழங்குங்கள்.",
        },
        {
          number: "02",
          title: "பொருத்தம்",
          text:
            "உங்கள் சுயவிவரத்திற்குப் பொருந்தக்கூடிய திட்டங்களைப் பாருங்கள்.",
        },
        {
          number: "03",
          title: "சரிபார்ப்பு",
          text:
            "அதிகாரப்பூர்வ அரசுத் துறையிடம் சமீபத்திய திட்டத் தகவல்களைச் சரிபார்க்கவும்.",
        },
        {
          number: "04",
          title: "விண்ணப்பம்",
          text:
            "பொருத்தமான அதிகாரப்பூர்வ வழியின் மூலம் விண்ணப்பத்தைத் தொடருங்கள்.",
        },
      ],

      noticeTitle: "⚠ முன்மாதிரி குறிப்பு",
      notice:
        "UdyamSetu தற்போது வரையறுக்கப்பட்ட அம்சங்கள் மற்றும் குறைந்த எண்ணிக்கையிலான திட்டங்களைக் கொண்ட ஒரு முன்மாதிரி தளமாகும். இந்த தளத்தில் காட்டப்படும் தகவல்களை எந்தவொரு விண்ணப்பம் அல்லது நிதி முடிவையும் எடுப்பதற்கு முன் சம்பந்தப்பட்ட அதிகாரப்பூர்வ அரசு துறையிடம் சரிபார்க்கவும்.",

      eligibility: "எனது தகுதியைச் சரிபார்க்கவும் →",
      emi: "EMI கணக்கீட்டாளர்",
    },
  };

  const t = isTamil ? content.ta : content.en;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      {/* NAVIGATION */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between">

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="text-xl font-bold"
        >
          <span className="text-emerald-400">
            Udyam
          </span>
          Setu
        </motion.button>

        <button
          onClick={() => navigate("/")}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {t.navBack}
        </button>

      </nav>


      {/* HERO */}
      <section className="mx-auto max-w-5xl py-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            {t.label}
          </p>

          <h1
            className={`mt-4 font-bold leading-tight md:text-6xl ${
              isTamil
                ? "text-4xl"
                : "text-4xl"
            }`}
          >

            {t.titleStart}{" "}

            <span className="text-emerald-400">
              {t.titleHighlight}
            </span>

            {t.titleEnd && (
              <>{" "}{t.titleEnd}</>
            )}

          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {t.intro}
          </p>

        </motion.div>


        {/* WHAT UDYAMSETU DOES */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {t.cards.map((card, index) => (

            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1 + index * 0.1,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >

              <div className="text-3xl">
                {card.icon}
              </div>

              <h2 className="mt-4 text-xl font-bold">
                {card.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {card.text}
              </p>

            </motion.div>

          ))}

        </div>


        {/* HOW IT WORKS */}
        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            {t.howLabel}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {t.howTitle}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-4">

            {t.steps.map((step) => (

              <div key={step.number}>

                <div className="font-bold text-emerald-400">
                  {step.number}
                </div>

                <h3 className="mt-2 font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </motion.section>


        {/* PROTOTYPE NOTICE */}
        <section className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6">

          <p className="font-semibold text-yellow-300">
            {t.noticeTitle}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            {t.notice}
          </p>

        </section>


        {/* BOTTOM ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/assessment")}
            className="rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            {t.eligibility}
          </button>

          <button
            onClick={() => navigate("/loan-calculator")}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            {t.emi}
          </button>

        </div>

      </section>

    </main>
  );
}

export default About;