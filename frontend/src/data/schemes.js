export const schemes = [
  {
    id: "nsfdc-mfs",

    name: "Micro Finance Scheme (MFS)",

    provider: "National Scheduled Castes Finance and Development Corporation (NSFDC)",

    type: "business",

    category: "SC",

    maxIncome: 500000,

    projectCostLimit: 140000,

    maxAmount: 125000,

    interestRate: "6.5% p.a.",

    description:
      "Micro-credit assistance for eligible Scheduled Caste beneficiaries undertaking small income-generating business activities.",

    benefits: [
      "Projects up to ₹1.40 lakh",
      "Maximum loan up to ₹1.25 lakh",
      "Beneficiary interest rate of 6.5% p.a.",
      "Implemented through authorized Channelizing Agencies"
    ],

    documents: [
      "Caste Certificate",
      "Income Proof",
      "KYC Documents",
      "Bank Account Details",
      "Project / Activity Details"
    ],

    application: {
      online: "PM-SURAJ Portal",
      offline: "Authorized Channelizing Agency"
    },

    source: {
      name: "NSFDC Official Website",
      url: "https://nsfdc.nic.in/faqs",
      verifiedOn: "2026-09-23"
    }
  },

  {
    id: "nsfdc-term-loan",

    name: "Term Loan",

    provider: "National Scheduled Castes Finance and Development Corporation (NSFDC)",

    type: "business",

    category: "SC",

    maxIncome: 500000,

    projectCostMin: 140001,

    projectCostLimit: 5000000,

    maxAmount: 4500000,

    interestRate: "8% p.a.",

    description:
      "Financial assistance for eligible Scheduled Caste beneficiaries undertaking larger income-generating activities.",

    benefits: [
      "Projects above ₹1.40 lakh",
      "Projects up to ₹50 lakh",
      "Maximum loan up to ₹45 lakh",
      "Beneficiary interest rate of 8% p.a.",
      "Repayment period up to 7 years"
    ],

    documents: [
      "Caste Certificate",
      "Income Proof",
      "KYC Documents",
      "Bank Account Details",
      "Project / Business Details"
    ],

    application: {
      online: "PM-SURAJ Portal",
      offline: "Authorized Channelizing Agency"
    },

    source: {
      name: "NSFDC Official Website",
      url: "https://nsfdc.nic.in/faqs",
      verifiedOn: "2026-09-23"
    }
  },

  {
    id: "nsfdc-udyam-nidhi",

    name: "Udyam Nidhi Yojana (UNY)",

    provider: "National Scheduled Castes Finance and Development Corporation (NSFDC)",

    type: "business",

    category: "SC",

    maxIncome: 500000,

    projectCostLimit: 500000,

    maxAmount: 450000,

    interestRate: "13%–15% p.a.",

    description:
      "Financial assistance for eligible Scheduled Caste beneficiaries pursuing small or micro income-generating activities.",

    benefits: [
      "Projects up to ₹5 lakh",
      "Maximum loan up to ₹4.5 lakh",
      "Implemented through eligible cooperative and banking partners"
    ],

    documents: [
      "Caste Certificate",
      "Income Proof",
      "KYC Documents",
      "Bank Account Details",
      "Project / Activity Details"
    ],

    application: {
      online: "PM-SURAJ Portal",
      offline: "Authorized Channelizing Agency"
    },

    source: {
      name: "NSFDC Official Website",
      url: "https://nsfdc.nic.in/faqs",
      verifiedOn: "2026-09-23"
    }
  },

  {
    id: "nsfdc-education",

    name: "Educational Loan Scheme (ELS)",

    provider: "National Scheduled Castes Finance and Development Corporation (NSFDC)",

    type: "education",

    category: "SC",

    maxIncome: 500000,

    maxAmount: 4000000,

    interestRate: "6.5% p.a.",

    description:
      "Educational financial assistance for eligible Scheduled Caste students pursuing recognized professional or technical courses in India or abroad.",

    benefits: [
      "Loans up to ₹40 lakh",
      "Up to 90% of course fee, whichever is lower",
      "Professional and technical education",
      "Courses in India or abroad",
      "Repayment up to 10–12 years"
    ],

    documents: [
      "Caste Certificate",
      "Income Proof",
      "KYC Documents",
      "Admission / Course Proof",
      "Fee Details",
      "Bank Account Details"
    ],

    application: {
      online: "PM-SURAJ Portal",
      offline: "Authorized Channelizing Agency"
    },

    source: {
      name: "NSFDC Official Website",
      url: "https://nsfdc.nic.in/faqs",
      verifiedOn: "2026-09-23"
    }
  }
]