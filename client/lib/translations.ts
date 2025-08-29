export interface Translations {
  // Navigation
  nav: {
    talent: string;
    consultations: string;
    projects: string;
    categories: string;
    pricing: string;
    language: string;
    login: string;
    signUp: string;
  };

  // Footer
  footer: {
    description: string;
    company: string;
    about: string;
    contact: string;
    legal: string;
    termsConditions: string;
    privacyPolicy: string;
    copyright: string;
  };

  // Not Found pages
  notFound: {
    pageNotFound: string;
    pageNotFoundDesc: string;
    taskNotFound: string;
    providerNotFound: string;
    returnHome: string;
    goBack: string;
  };

  // Provider Dashboard
  providerDashboard: {
    overview: string;
    bookings: string;
    tasks: string;
    portfolio: string;
    consultations: string;
    feedback: string;
    settings: string;

    // Overview tab
    welcomeBack: string;
    totalTasksCompleted: string;
    consultationsDelivered: string;
    averageRating: string;
    totalReviews: string;
    recentActivity: string;
    noRecentActivity: string;
    tasksInProgress: string;
    upcomingConsultations: string;
    pendingProposals: string;
    viewAll: string;

    // Status Management
    status: string;
    availableNow: string;
    busy: string;
    inactive: string;
    statusExplain: {
      availableNow: string;
      busy: string;
      inactive: string;
    };
    statusChanged: string;

    // Profile Header
    profilePhoto: string;
    changePhoto: string;
    uploadPhoto: string;
    headline: string;
    location: string;
    languagesSpoken: string;
    memberSince: string;
    editProfile: string;
    previewAsCustomer: string;

    // Bookings Tab
    allBookings: string;
    pendingBookings: string;
    upcomingBookings: string;
    completedBookings: string;
    cancelledBookings: string;
    approveReschedule: string;
    declineReschedule: string;
    rescheduleRequest: string;
    cancellationRequest: string;
    approve: string;
    decline: string;
    startVideoCall: string;
    messageCustomer: string;
    bookingApproved: string;
    bookingDeclined: string;

    // Tasks Tab
    myProposals: string;
    activeTasks: string;
    completedTasks: string;
    taskProposals: string;
    submitProposal: string;
    viewTaskDetails: string;
    chatWithCustomer: string;
    submitDeliverable: string;
    markAsComplete: string;
    proposalSubmitted: string;
    taskCompleted: string;

    // Portfolio Tab
    publicProfile: string;
    addProject: string;
    editProject: string;
    deleteProject: string;
    projectTitle: string;
    projectDescription: string;
    projectImages: string;
    showPortfolioPublicly: string;
    portfolioUpdated: string;

    // Consultations Tab
    myConsultations: string;
    addConsultation: string;
    editConsultation: string;
    consultationTitle: string;
    consultationDescription: string;
    consultationPrice: string;
    consultationDuration: string;
    availableForVideoCall: string;
    availableSlots: string;
    consultationAdded: string;
    consultationUpdated: string;
    consultationDeleted: string;

    // Feedback Tab
    customerReviews: string;
    myReviews: string;
    leaveReview: string;
    replyToReview: string;
    rating: string;
    reviewText: string;
    reviewSubmitted: string;

    // Settings Tab
    changePassword: string;
    deleteAccount: string;
    emailNotifications: string;
    subscriptionPlan: string;
    currentPlan: string;
    upgradeDowngrade: string;
    paymentHistory: string;
    profileSaved: string;
    passwordChanged: string;
    accountDeleted: string;

    // Common Actions
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    confirm: string;
    upload: string;
    preview: string;
    back: string;
    next: string;
    finish: string;
  };

  // Categories
  categories: {
    developmentIt: string;
    designCreative: string;
    aiServices: string;
    salesMarketing: string;
    writingTranslation: string;
    adminSupport: string;
    financeAccounting: string;
    legal: string;
    hrTraining: string;
    engineeringArchitecture: string;
    otherServices: string;
    consultations: string;
  };

  // Homepage
  home: {
    heroTitle: string;
    heroSubtitle: string;
    findTalent: string;
    findTalentDesc: string;
    findConsultations: string;
    findConsultationsDesc: string;
    postTask: string;
    postTaskDesc: string;
    browseCategories: string;
    topRatedProviders: string;
    howItWorks: string;
    howItWorksSteps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
    };
    viewProfile: string;
  };

  // Providers page
  providers: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    filterByRating: string;
    offersConsultations: string;
    filterBySkills: string;
    skillsPlaceholder: string;
    showMore: string;
    showLess: string;
    clearFilters: string;
    noResults: string;
    noResultsDesc: string;
    noResultsSkills: string;
    showingResults: string;
    loadMore: string;
    consultationBadge: string;
    viewProfile: string;
    rating: {
      all: string;
      fiveStars: string;
      fourPlus: string;
      threePlus: string;
    };
  };

  // Consultations page
  consultations: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    skillsPlaceholder: string;
    allCategories: string;
    noResults: string;
    noResultsDesc: string;
    noResultsFilter: string;
    showingResults: string;
    loadMore: string;
    viewProfile: string;
    bookSession: string;
    perSession: string;
    duration: string;
    videoCall: string;
    inPerson: string;
    priceRange: string;
    experienceYears: string;
    languages: string;
    consultationAvailable: string;
    consultationsAvailable: string;
    sessionTypes: {
      all: string;
      video: string;
      inPerson: string;
      phone: string;
    };
  };

  // Tasks page
  tasks: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    filterBy: string;
    priority: string;
    budgetRange: string;
    taskType: string;
    experienceLevel: string;
    sortBy: string;
    clearFilters: string;
    noResults: string;
    noResultsDesc: string;
    showingResults: string;
    loadMore: string;
    viewTask: string;
    apply: string;
    posted: string;
    budget: string;
    fixed: string;
    hourly: string;
    proposals: string;
    priorities: {
      all: string;
      high: string;
      medium: string;
      low: string;
    };
    taskTypes: {
      all: string;
      fixed: string;
      hourly: string;
      flexible: string;
    };
    experienceLevels: {
      all: string;
      entry: string;
      intermediate: string;
      expert: string;
    };
    sorting: {
      newest: string;
      budgetHigh: string;
      budgetLow: string;
      deadline: string;
    };
  };

  // Pricing page
  pricing: {
    title: string;
    subtitle: string;
    providerPlans: string;
    choosePlan: string;
    monthlyPlan: string;
    monthlyDesc: string;
    annualPlan: string;
    annualDesc: string;
    recommended: string;
    save: string;
    startMonthly: string;
    selectAnnual: string;
    customerMembership: string;
    alwaysFree: string;
    customerDesc: string;
    whatsIncluded: string;
    compareFeatures: string;
    features: string;
    customer: string;
    monthly: string;
    annual: string;
    free: string;
    faq: string;
    monthlyFeatures: string[];
    annualFeatures: string[];
    customerFeatures: string[];
    faqItems: Array<{
      question: string;
      answer: string;
    }>;
    // Pricing units
    perMonth: string;
    perYear: string;
    notApplicable: string;
    // Feature comparison table
    searchVisibility: string;
    customerChat: string;
    reviewsRatings: string;
    priorityPosition: string;
    featuredBadge: string;
    dedicatedSupport: string;
  };

  // Provider data
  providerData: {
    sarahChen: {
      title: string;
      bio: string;
      skills: string[];
    };
    marcusJohnson: {
      title: string;
      bio: string;
      skills: string[];
    };
    elenaRodriguez: {
      title: string;
      bio: string;
      skills: string[];
    };
    davidKim: {
      title: string;
      bio: string;
      skills: string[];
    };
    priyaPatel: {
      title: string;
      bio: string;
      skills: string[];
    };
    alexThompson: {
      title: string;
      bio: string;
      skills: string[];
    };
    lisaWang: {
      title: string;
      bio: string;
      skills: string[];
    };
    jamesMitchell: {
      title: string;
      bio: string;
      skills: string[];
    };
  };

  // Skills translations
  skills: {
    // Development & IT
    react: string;
    nodejs: string;
    typescript: string;
    aws: string;
    graphql: string;
    postgresql: string;
    python: string;
    sql: string;
    javascript: string;
    php: string;
    docker: string;
    techManagement: string;
    teamBuilding: string;
    agile: string;
    projectManagement: string;
    machineLearning: string;
    analytics: string;
    tensorflow: string;
    powerBi: string;

    // Design & Creative
    figma: string;
    adobeXd: string;
    prototyping: string;
    userResearch: string;
    uiUx: string;
    branding: string;
    illustrator: string;
    photoshop: string;

    // AI Services
    aiMl: string;
    computerVision: string;
    nlp: string;
    deepLearning: string;
    pytorch: string;
    keras: string;
    aiStrategy: string;
    dataAnalysis: string;
    automation: string;

    // Sales & Marketing
    seo: string;
    googleAds: string;
    contentStrategy: string;
    facebookAds: string;
    emailMarketing: string;
    crm: string;
    hubspot: string;
    contentMarketing: string;

    // HR & Training
    careerPlanning: string;
    leadershipDevelopment: string;
    jobSearch: string;
    interviewTraining: string;
    coaching: string;

    // Finance & Accounting
    financialPlanning: string;
    investment: string;
    taxStrategy: string;
    businessFinance: string;
    riskManagement: string;
    accounting: string;
    portfolioManagement: string;
  };

  // Role Toggle
  roleToggle: {
    freelance: string;
    client: string;
    switching: string;
  };

  // Categories
  categorySelection: {
    primaryCategory: string;
    secondaryCategories: string;
    selectPrimaryCategory: string;
    selectSecondaryCategories: string;
    suggestedCategory: string;
    upToTwoSecondary: string;
  };

  // Customer Dashboard
  customerDashboard: {
    // Overview
    overview: string;
    recentActivity: string;
    noRecentActivity: string;
    quickActions: string;
    postNewTask: string;
    findFreelancers: string;
    bookConsultation: string;
    expertAdvice: string;
    browseProviders: string;
    findTalent: string;

    // Profile
    profile: string;
    editProfile: string;
    changePhoto: string;
    uploading: string;
    nameCompany: string;
    email: string;
    contactSupportToChangeEmail: string;
    linkedinUrl: string;
    websiteUrl: string;
    website: string;
    bio: string;
    bioPlaceholder: string;
    languagesSpoken: string;
    addLanguagePrompt: string;
    suggestions: string;
    demoNotice: string;
    photoConstraints: string;

    // Tasks
    tasks: string;
    yourTasks: string;
    postTask: string;
    taskTitle: string;
    description: string;
    budgetType: string;
    amount: string;
    deadline: string;
    cannotEdit: string;
    taskCanOnlyBeEdited: string;
    taskUpdated: string;
    proposals: string;
    fixed: string;
    hourly: string;
    flexible: string;
    view: string;
    edit: string;
    cannotEditStatus: string;

    // Bookings
    bookings: string;
    yourBookings: string;
    bookNow: string;
    reschedule: string;
    cancel: string;
    message: string;
    cancellationRequestSent: string;
    waitingForProviderResponse: string;
    rescheduleRequestSent: string;
    newTime: string;
    reason: string;
    yourRating: string;
    newDate: string;
    reasonOptional: string;
    explainRescheduleReason: string;
    sendRequest: string;

    // Feedback
    feedback: string;
    reviewsGiven: string;
    reviewsReceived: string;

    // Settings
    settings: string;
    accountSettings: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    updatePassword: string;
    deleteAccount: string;
    deleteAccountWarning: string;
    confirmAccountDeletion: string;
    typeDeleteConfirm: string;
    accountDeleted: string;

    // Notifications
    profileUpdatedSuccessfully: string;
    photoUpdated: string;
    photoUpdateSuccess: string;
    invalidFileType: string;
    selectImageFile: string;
    fileTooLarge: string;
    maxFileSize: string;
    uploadError: string;
    uploadFailed: string;
    fillAllFields: string;
    allPasswordFieldsRequired: string;
    passwordsDoNotMatch: string;
    newPasswordConfirmationMustMatch: string;
    passwordUpdated: string;
    passwordUpdateSuccess: string;
    accountDeletedSuccess: string;

    // Booking actions
    cancellationApproved: string;
    providerApprovedCancellation: string;
    cancellationDenied: string;
    providerDeniedCancellation: string;
    rescheduleApproved: string;
    providerApprovedReschedule: string;
    rescheduleDenied: string;
    providerDeniedReschedule: string;
    cancellationRequestSentNotification: string;
    pendingProviderApproval: string;
    rescheduleRequestSentNotification: string;
    providerWillBeNotified: string;

    // Feature development notices
    featureInDevelopment: string;
    messagingSystemSoon: string;
    realEditingSoon: string;
    realFeatureSoon: string;
    realUploadSoon: string;

    // Status translations
    status: {
      open: string;
      closed: string;
      completed: string;
      cancelled: string;
      upcoming: string;
      pendingCancellation: string;
      pendingReschedule: string;
    };

    // Form validation
    fillDateAndTime: string;
    selectNewDateTime: string;
    confirmCancelBooking: string;
    sureToCancel: string;
    yes: string;
    no: string;
    yesCancel: string;

    // Activity types
    activities: {
      taskPosted: string;
      consultationBooked: string;
      reviewReceived: string;
      taskCompleted: string;
    };
  };

  // Customer Registration & Onboarding
  customerOnboarding: {
    welcome: string;
    letsSetupProfile: string;
    canSkipForNow: string;
    profilePhoto: string;
    uploadPhoto: string;
    skipForNow: string;
    tellUsAboutYourself: string;
    whichLanguagesSpeak: string;
    addSocialLinks: string;
    linkedin: string;
    whatBringsYouHere: string;
    bioHeadline: string;
    saveAndContinue: string;
    skipThisStep: string;
    profileSetupComplete: string;
    welcomeToDashboard: string;
    getStarted: string;
    completeProfileLater: string;
  };

  // Task Creation
  taskCreation: {
    createNewTask: string;
    taskDetails: string;
    whatDoYouNeed: string;
    taskTitlePlaceholder: string;
    describeProject: string;
    taskDescriptionPlaceholder: string;
    budgetAndTimeline: string;
    budgetType: string;
    fixedPrice: string;
    hourlyRate: string;
    flexibleBudget: string;
    budgetAmount: string;
    estimatedHours: string;
    projectDeadline: string;
    skillsAndCategory: string;
    selectCategory: string;
    requiredSkills: string;
    addSkill: string;
    additionalInfo: string;
    isUrgent: string;
    requiresNDA: string;
    remoteWorkOk: string;
    publishTask: string;
    saveAsDraft: string;
    taskPublished: string;
    taskSavedAsDraft: string;
    priority: string;
    priorityNormal: string;
    priorityHigh: string;
    priorityUrgentLabel: string;
    priorityCritical: string;
    requiredInvoice: string;
    createTask: string;
    fillRequiredFields: string;
  };

  // Consultation Booking
  consultationBooking: {
    bookConsultation: string;
    selectDateTime: string;
    consultationDetails: string;
    duration: string;
    price: string;
    sessionType: string;
    videoCall: string;
    inPerson: string;
    phoneCall: string;
    whatToDiscuss: string;
    discussionTopics: string;
    contactInfo: string;
    phoneNumber: string;
    skypeId: string;
    bookingConfirmation: string;
    confirmBooking: string;
    bookingRequests: string;
    waitingConfirmation: string;
    bookingConfirmed: string;
    bookingDeclined: string;
  };

  // Authentication
  auth: {
    // Login
    login: string;
    loginTitle: string;
    loginSubtitle: string;
    email: string;
    password: string;
    showPassword: string;
    hidePassword: string;
    rememberMe: string;
    forgotPassword: string;
    loginButton: string;
    continueWithGoogle: string;
    dontHaveAccount: string;

    // Sign Up
    signUp: string;
    signUpTitle: string;
    signUpSubtitle: string;
    firstName: string;
    lastName: string;
    company: string;
    confirmPassword: string;
    country: string;
    accountType: string;
    accountTypeProvider: string;
    accountTypeCustomer: string;
    accountTypeProviderDesc: string;
    accountTypeCustomerDesc: string;
    agreeToTerms: string;
    termsAndConditions: string;
    privacyPolicy: string;
    marketingEmails: string;
    createAccount: string;
    alreadyHaveAccount: string;

    // Validation
    required: string;
    invalidEmail: string;
    passwordTooShort: string;
    passwordsDontMatch: string;
    mustAgreeToTerms: string;

    // Success
    loginSuccess: string;
    signUpSuccess: string;

    // Errors
    loginError: string;
    signUpError: string;
    emailAlreadyExists: string;
    invalidCredentials: string;
  };

  // Common
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    apply: string;
    reset: string;
    // Dynamic content translations
    providerSingular: string;
    addCustom: string;
    customSkillLabel: string;
    startTyping: string;
    providerPlural: string;
    consultationSingular: string;
    consultationPlural: string;
    taskSingular: string;
    taskPlural: string;
    more: string;
    years: string;
    hour: string;
    hours: string;
    responseTime: string;
    joined: string;
    reviews: string;
    session: string;
    since: string;
    members: string;
    available: string;
    unavailable: string;
    online: string;
    offline: string;
    verified: string;
    featured: string;
    new: string;
    popular: string;
    trending: string;
    expertSingular: string;
    expertPlural: string;
  };

  // Location data
  locations: {
    tallinnEstonia: string;
    tartuEstonia: string;
    parnuEstonia: string;
  };

  // Response times
  responseTimes: {
    oneHour: string;
    twoHours: string;
    threeHours: string;
    fourHours: string;
    sixHours: string;
  };

  // Provider Profile Page
  providerProfile: {
    providerNotFound: string;
    projectsCompleted: string;
    respondsIn: string;
    services: string;
    consultationsAvailable: string;
    portfolio: string;
    skills: string;
    languages: string;
    recentReviews: string;
    readyToStart: string;
    contactProvider: string;
    sendMessage: string;
    contactApplyNow: string;
    getQuote: string;
    bookSession: string;
    videoCall: string;
    duration: string;
    delivery: string;
    perSession: string;
    startingAt: string;
    perHour: string;
    weeks: string;
    week: string;
    minutes: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    agoText: string;
  };

  // Gating system
  gating: {
    title: string;
    body: {
      viewProfile: string;
      generic: string;
    };
    cta: {
      subscribe: string;
      learn: string;
      back: string;
    };
    badge: {
      required: string;
    };
  };
}

export const translations: Record<string, Translations> = {
  et: {
    nav: {
      talent: "Talent",
      consultations: "Konsultatsioonid",
      projects: "Projektid",
      categories: "Kategooriad",
      pricing: "Hinnakiri",
      language: "Keel",
      login: "Logi sisse",
      signUp: "Registreeru",
    },
    footer: {
      description:
        "Ühenda kogenud professionaalidega ja leia oma projektidele ideaalne talent. Hangi ekspertkonsultatsioone ja kvaliteetseid teenuseid ühes kohas.",
      company: "Ettev��te",
      about: "Meist",
      contact: "Kontakt",
      legal: "Õiguslik",
      termsConditions: "Tingimused ja Nõuded",
      privacyPolicy: "Privaatsuspoliitika",
      copyright: "© 2024 QuickHire. Kõik õigused kaitstud.",
    },
    notFound: {
      pageNotFound: "404 - Lehte ei leitud",
      pageNotFoundDesc: "Oops! Otsite lehte, mis ei eksisteeri.",
      taskNotFound: "Ülesannet ei leitud",
      providerNotFound: "Teenusepakkujat ei leitud",
      returnHome: "Tagasi avalehele",
      goBack: "Mine tagasi",
    },
    categories: {
      developmentIt: "Arendus ja IT",
      designCreative: "Disain ja loovus",
      aiServices: "AI teenused",
      salesMarketing: "Müük ja turundus",
      writingTranslation: "Kirjutamine ja tõlkimine",
      adminSupport: "Admin ja tugi",
      financeAccounting: "Rahandus ja raamatupidamine",
      legal: "Õigus",
      hrTraining: "HR ja koolitus",
      engineeringArchitecture: "Inseneeria ja arhitektuur",
      otherServices: "Muud teenused",
      consultations: "Konsultatsioonid",
    },
    home: {
      heroTitle: "Leia õige spetsialist või konsultatsioon minutitega",
      heroSubtitle:
        "Palka oskuslikke eksperte, broneeri nõustamissessioone või postita ülesandeid – kõik ühes kohas.",
      findTalent: "Leia talenti",
      findTalentDesc: "Suhtle tipptegijatega oma projekti jaoks.",
      findConsultations: "Broneeri konsultatsioone",
      findConsultationsDesc: "Saa kohandatud nõu professionaalidelt.",
      postTask: "Postita ülesanne",
      postTaskDesc: "Jaga oma vajadusi ja saa pakkumisi.",
      browseCategories: "Avasta teenuseid",
      topRatedProviders: "Kõrgeima hinnanguga teenusepakkujad",
      howItWorks: "Kuidas see toimib",
      howItWorksSteps: {
        step1Title: "Postita ülesanne või leia talenti",
        step1Desc: "Kirjelda oma vajadusi või sirvi eksperte.",
        step2Title: "Suhtle ja leppige kokku",
        step2Desc: "Vestle, läbirääkimisi ja kinnita detailid.",
        step3Title: "Saavuta tulemused",
        step3Desc: "Töö tarnitakse ja sa annad hinnangu.",
      },
      viewProfile: "Vaata profiili",
    },
    providers: {
      title: "Leia talenti",
      subtitle:
        "Leia oskuslikke professionaale, kes on valmis aitama sinu projektidega",
      searchPlaceholder: "Otsi talenti (nt. veebiarendaja)",
      allCategories: "Kõik kategooriad",
      filterByRating: "Filtreeri hinnangu järgi",
      offersConsultations:
        "Näita ainult konsultatsioone pakkuvaid teenusepakkujaid",
      filterBySkills: "Filtreeri oskuste järgi",
      skillsPlaceholder: "Otsi ja lisa oskusi",
      noResultsSkills: "Oskuste järgi ei leitud",
      showMore: "Näita rohkem",
      showLess: "Näita vähem",
      clearFilters: "Tühista filtrid",
      noResults: "Eksperte ei leitud",
      noResultsDesc:
        "Tulemused ei vasta teie filtritele. Proovige laiendada otsingut või uurida kategooriaid.",
      showingResults: "Näitan",
      loadMore: "Laadi rohkem teenusepakkujaid",
      consultationBadge: "Konsultatsioon",
      viewProfile: "Vaata profiili",
      rating: {
        all: "Kõik hinnangud",
        fiveStars: "⭐ 5 tärni",
        fourPlus: "⭐ 4+ tärni",
        threePlus: "⭐ 3+ tärni",
      },
    },

    consultations: {
      title: "Sirvi ekspertkonsultatsioone",
      subtitle:
        "Broneeri ükshaaval sessioonid tööstuse ekspertidega ja saa personaalset nõu",
      searchPlaceholder:
        "Otsi konsultatsioone (nt. karjäärinõustamine, SEO audit jne)",
      skillsPlaceholder: "Otsi ja lisa oskusi (nt. SEO, juhtimine, turundus)",
      allCategories: "Kõik kategooriad",
      noResults: "Konsultatsioone ei leitud",
      noResultsDesc:
        "Tulemused ei vasta teie filtritele. Proovige laiendada otsingut või uurida kategooriaid.",
      noResultsFilter:
        "Konsultatsioone ei leitud. Proovi eemaldada filter või laiendada otsingut.",
      consultationAvailable: "konsultatsioon saadaval",
      consultationsAvailable: "konsultatsiooni saadaval",
      showingResults: "Näitan",
      loadMore: "Laadi rohkem konsultatsioone",
      viewProfile: "Vaata profiili",
      bookSession: "Broneeri sessioon",
      perSession: "sessiooni kohta",
      duration: "Kestus",
      videoCall: "Videokõne",
      inPerson: "Silmast silma",
      priceRange: "Hinnavahemik",
      experienceYears: "aastat kogemust",
      languages: "Keeled",
      sessionTypes: {
        all: "Kõik tüübid",
        video: "Videokõne",
        inPerson: "Silmast silma",
        phone: "Telefon",
      },
    },

    tasks: {
      title: "Leia tööülesandeid",
      subtitle: "Sirvi uusi tööülesandeid ja leia sobiv projekt oma oskustele",
      searchPlaceholder: "Otsi ülesandeid (nt. logo disain, kirjutamine jne)",
      allCategories: "Kõik kategooriad",
      filterBy: "Filtreeri",
      priority: "Prioriteet",
      budgetRange: "Eelarve",
      taskType: "Ülesande tüüp",
      experienceLevel: "Kogemuse tase",
      sortBy: "Sorteeri",
      clearFilters: "Tühista filtrid",
      noResults: "Ülesandeid ei leitud",
      noResultsDesc:
        "Tulemused ei vasta teie filtritele. Proovige laiendada otsingut või uurida kategooriaid.",
      showingResults: "Näitan",
      loadMore: "Laadi rohkem ��lesandeid",
      viewTask: "Vaata ülesannet",
      apply: "Kandideeri",
      posted: "Postitatud",
      budget: "Eelarve",
      fixed: "Fikseeritud",
      hourly: "Tunni",
      proposals: "pakkumist",
      priorities: {
        all: "Kõik prioriteedid",
        high: "Kõrge",
        medium: "Keskmine",
        low: "Madal",
      },
      taskTypes: {
        all: "Kõik tüübid",
        fixed: "Fikseeritud hind",
        hourly: "Tunnitasu",
        flexible: "Paindlik",
      },
      experienceLevels: {
        all: "Kõik tasemed",
        entry: "Algaja",
        intermediate: "Keskmine",
        expert: "Ekspert",
      },
      sorting: {
        newest: "Uusimad",
        budgetHigh: "Eelarve (kõrge-madal)",
        budgetLow: "Eelarve (madal-kõrge)",
        deadline: "Tähtaeg",
      },
    },
    pricing: {
      title: "Lihtne hinnakiri, piiramatud võimalused.",
      subtitle: "Saa nähtavaks, püsi nähtav ja meelita rohkem kliente.",
      providerPlans: "Teenusepakkujate plaanid",
      choosePlan: "Vali plaan, mis sobib sinu ����riga kõige paremini",
      monthlyPlan: "Kuuplaan",
      monthlyDesc: "Ideaalne alustamiseks",
      annualPlan: "Aastaplaan",
      annualDesc: "Parim v��ärtus professionaalidele",
      recommended: "Soovitatud",
      save: "Säästa €20!",
      startMonthly: "Alusta kuuplaaniga",
      selectAnnual: "Vali aastaplaan",
      customerMembership: "Klientide liikmelisus",
      alwaysFree: "Alati tasuta",
      customerDesc:
        "Klientidele tasuta – palka teenusepakkujaid ja broneeri konsultatsioone ilma kuluteta",
      whatsIncluded: "Mis on kaasas",
      compareFeatures: "Võrdle funktsioone kõigis plaanides",
      features: "Funktsioonid",
      customer: "Klient",
      monthly: "Kuine",
      annual: "Aastane",
      free: "Tasuta",
      faq: "Korduma kippuvad küsimused",
      monthlyFeatures: [
        "Nähtav teenusepakkujate otsingus",
        "Piiramatud teenuse- ja konsultatsioonikirjed",
        "Piiramatud ülesannete taotlused",
        "Sisseehitatud klientide vestlus",
        "Klientide arvustused ja hinnangud",
        "T��hista igal ajal",
      ],
      annualFeatures: [
        "Kõik kuuplaanis pluss:",
        "Eelistatud positsioon otsingutulemites",
        "Soovitatud m��rgis profiilil",
        "Suurem nähtavus ja rohkem pöördumisi",
        "Deditseeritud tugikanal",
      ],
      customerFeatures: [
        "Postita piiramatul hulgal ülesandeid",
        "Sirvi ja palka teenusepakkujaid",
        "Broneeri konsultatsioone",
        "Juurdepääs teenusepakkujate hinnangutele ja arvustustele",
      ],
      faqItems: [
        {
          question: "Kas ma saan oma tellimuse igal ajal tühistada?",
          answer:
            "Jah, sa saad oma teenusepakkuja tellimuse igal ajal tühistada. Sinu konto jääb aktiivseks kuni praeguse arveldusperioodi lõpuni.",
        },
        {
          question: "Milliseid makseviise te vastu võtate?",
          answer:
            "Me võtame vastu kõiki peamisi krediitkaarte, PayPal'i ja pangaülekandeid aastatellimuste puhul.",
        },
        {
          question: "Kas klientidele tõesti ei ole tasu?",
          answer:
            "Absoluutselt! Kliendid saavad postita ülesandeid, sirvida teenusepakkujaid ja broneerida konsultatsioone täiesti tasuta. Me võtame tasu ainult teenusepakkujatelt suurema nähtavuse ja funktsioonide eest.",
        },
        {
          question: "Kas ma saan kuuplaanilt aastplaanile üle minna?",
          answer:
            "Jah, sa saad igal ajal aastplaanile üle minna ja me arvestame vahe proportsionaalselt. Sa saad kohe juurdepääsu kõigile premium funktsioonidele.",
        },
      ],
      // Pricing units
      perMonth: "/kuus",
      perYear: "/aastas",
      notApplicable: "Pole rakendatav",
      // Feature comparison table
      searchVisibility: "Otsingu nähtavus",
      customerChat: "Klientide vestlus",
      reviewsRatings: "Arvustused ja hinnangud",
      priorityPosition: "Eelistatud positsioon",
      featuredBadge: "Soovitatud märgis",
      dedicatedSupport: "Deditseeritud tugi",
    },
    providerData: {
      sarahChen: {
        title: "Full-Stack arendaja",
        bio: "Kogenud arendaja, kes spetsialiseerub React, Node.js ja pilve arhitektuurile.",
        skills: [
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "GraphQL",
          "PostgreSQL",
        ],
      },
      marcusJohnson: {
        title: "UI/UX disainer",
        bio: "Loov disainer, kes keskendub kasutajale orienteeritud disainile ja modernsele liidesele.",
        skills: [
          "Figma",
          "Adobe XD",
          "Prototüüpimine",
          "Kasutajauuringud",
          "UI/UX",
          "Branding",
        ],
      },
      elenaRodriguez: {
        title: "Digiturunduse ekspert",
        bio: "Kasvule orienteeritud turundaja SEO ja tasustatava reklaami kogemusega.",
        skills: [
          "SEO",
          "Google Ads",
          "Analüütika",
          "Sisu strateegia",
          "Facebook Ads",
          "Email turundus",
        ],
      },
      davidKim: {
        title: "Ärikonsultant",
        bio: "Strateegiline konsultant, kes aitab ettevõtetel skaleerida ja optimeerida tegevust.",
        skills: [
          "Strateegia",
          "Operatsioonid",
          "Rahandus",
          "Juhtimine",
          "Ärianalüüs",
          "Projekti juhtimine",
        ],
      },
      priyaPatel: {
        title: "Sisulooja",
        bio: "Professionaalne kirjanik, kes loob veenvat sisu tehnika- ja ärivaldkonnale.",
        skills: [
          "Tekstikirjutamine",
          "Ajaveeb",
          "Tehniline kirjutamine",
          "SEO kirjutamine",
          "Sisuturundus",
          "Koopikirjutamine",
        ],
      },
      alexThompson: {
        title: "Andmeteadlane",
        bio: "Andmete ekspert, kes spetsialiseerub masinõppele ja ärianalüütikale.",
        skills: [
          "Python",
          "Masinõpe",
          "Analüütika",
          "SQL",
          "TensorFlow",
          "Power BI",
        ],
      },
      lisaWang: {
        title: "AI lahenduste arhitekt",
        bio: "AI spetsialist, kes aitab ettevõtetel juurutada tipptasemel AI lahendusi.",
        skills: [
          "AI/ML",
          "Python",
          "TensorFlow",
          "Arvutinägemine",
          "NLP",
          "Deep Learning",
        ],
      },
      jamesMitchell: {
        title: "Finantsnõustaja",
        bio: "Kogenud finantplaanija, kes spetsialiseerub ��rikasvu strateegiatele.",
        skills: [
          "Finantplaneerimine",
          "Investeerimine",
          "Maksu strateegia",
          "Ärirahastus",
          "Riskijuhtimine",
          "Raamatupidamine",
        ],
      },
    },
    common: {
      loading: "Laadimine...",
      error: "Viga",
      retry: "Proovi uuesti",
      cancel: "Tühista",
      save: "Salvesta",
      edit: "Muuda",
      delete: "Kustuta",
      back: "Tagasi",
      next: "Edasi",
      previous: "Eelmine",
      close: "Sulge",
      search: "Otsi",
      filter: "Filtreeri",
      sort: "Sorteeri",
      apply: "Rakenda",
      reset: "Lähtesta",
      // Dynamic content translations
      providerSingular: "teenusepakkuja",
      providerPlural: "teenusepakkujat",
      addCustom: "Lisa kohandatud",
      customSkillLabel: "KOHANDATUD",
      startTyping: "Alustage sisestamist soovituste nägemiseks...",
      consultationSingular: "konsultatsioon",
      consultationPlural: "konsultatsiooni",
      taskSingular: "��lesanne",
      taskPlural: "ülesannet",
      more: "rohkem",
      years: "aastat",
      hour: "tund",
      hours: "tundi",
      responseTime: "vastamise aeg",
      joined: "liitus",
      reviews: "arvustust",
      session: "sessioon",
      since: "alates",
      members: "liiget",
      available: "saadaval",
      unavailable: "pole saadaval",
      online: "veebis",
      offline: "võrguühenduseta",
      verified: "kinnitatud",
      featured: "soovitatud",
      new: "uus",
      popular: "populaarne",
      trending: "tõusev",
      expertSingular: "ekspert",
      expertPlural: "eksperti",
    },
    locations: {
      tallinnEstonia: "Tallinn, Eesti",
      tartuEstonia: "Tartu, Eesti",
      parnuEstonia: "Pärnu, Eesti",
    },
    responseTimes: {
      oneHour: "1 tund",
      twoHours: "2 tundi",
      threeHours: "3 tundi",
      fourHours: "4 tundi",
      sixHours: "6 tundi",
    },
    providerProfile: {
      providerNotFound: "Teenusepakkujat ei leitud",
      projectsCompleted: "projekti lõpetatud",
      respondsIn: "Vastab",
      services: "Teenused",
      consultationsAvailable: "Saadaolevad konsultatsioonid",
      portfolio: "Portfell",
      skills: "Oskused",
      languages: "Keeled",
      recentReviews: "Hiljutised arvustused",
      readyToStart: "Valmis alustama?",
      contactProvider:
        "Võta ühendust {name} et arutada oma projekti nõudeid ja saada kohandatud pakkumine.",
      sendMessage: "Saada sõnum",
      contactApplyNow: "V��ta ühendust / Kandideeri kohe",
      getQuote: "Küsi pakkumist",
      bookSession: "Broneeri sessioon",
      videoCall: "Videokõne",
      duration: "Kestus",
      delivery: "Kohaletoimetamine",
      perSession: "sessiooni kohta",
      startingAt: "Alates",
      perHour: "tunni kohta",
      weeks: "n��dalat",
      week: "nädal",
      minutes: "minutit",
      seoTitle: "{name} - {title} | QuickHire.ee",
      seoDescription:
        "Palka {name}, oskuslik {title} asukohas {location}. {bio}",
      seoKeywords: "{name}, {title}, {skills}, {location}",
      agoText: "tagasi",
    },

    gating: {
      title: "Kliendi ligipääs nõutav",
      body: {
        viewProfile:
          "Täielike freelancerite profiilide vaatamine on saadaval kliendi tellimuse abil.",
        generic:
          "Tellige, et vaadata profiile, alustada vestlusi ja broneerida konsultatsioone.",
      },
      cta: {
        subscribe: "Telli nüüd",
        learn: "Loe rohkem",
        back: "Tagasi nimekirja",
      },
      badge: {
        required: "Kliendi tellimus nõutav.",
      },
    },
    skills: {
      // Development & IT
      react: "React",
      nodejs: "Node.js",
      typescript: "TypeScript",
      aws: "AWS",
      graphql: "GraphQL",
      postgresql: "PostgreSQL",
      python: "Python",
      docker: "Docker",
      sql: "SQL",
      javascript: "JavaScript",
      php: "PHP",
      techManagement: "Tehnoloogia juhtimine",
      teamBuilding: "Meeskonna ehitamine",
      agile: "Agile",
      projectManagement: "Projekti juhtimine",
      machineLearning: "Masinõpe",
      analytics: "Analüütika",
      tensorflow: "TensorFlow",
      powerBi: "Power BI",

      // Design & Creative
      figma: "Figma",
      adobeXd: "Adobe XD",
      prototyping: "Prototüüpimine",
      userResearch: "Kasutajauuringud",
      uiUx: "UI/UX",
      branding: "Branding",
      illustrator: "Illustrator",
      photoshop: "Photoshop",

      // AI Services
      aiMl: "AI/ML",
      computerVision: "Arvutinägemine",
      nlp: "NLP",
      deepLearning: "Deep Learning",
      pytorch: "PyTorch",
      keras: "Keras",
      aiStrategy: "AI strateegia",
      dataAnalysis: "Andmeanalüüs",
      automation: "Automatiseerimine",

      // Sales & Marketing
      seo: "SEO",
      googleAds: "Google Ads",
      contentStrategy: "Sisu strateegia",
      facebookAds: "Facebook Ads",
      emailMarketing: "Email turundus",
      crm: "CRM",
      hubspot: "HubSpot",
      contentMarketing: "Sisuturundus",

      // HR & Training
      careerPlanning: "Karjääri planeerimine",
      leadershipDevelopment: "Juhtimise arendamine",
      jobSearch: "T��ö otsimine",
      interviewTraining: "Intervjuu treening",
      coaching: "Juhendamine",

      // Finance & Accounting
      financialPlanning: "Finantplaneerimine",
      investment: "Investeerimine",
      taxStrategy: "Maksu strateegia",
      businessFinance: "Ärirahastus",
      riskManagement: "Riskijuhtimine",
      accounting: "Raamatupidamine",
      portfolioManagement: "Portfelli haldus",
    },
    roleToggle: {
      freelance: "Freelancer",
      client: "Klient",
      switching: "Vahetamine...",
    },
    categorySelection: {
      primaryCategory: "Põhikategooria",
      secondaryCategories: "Teisesed kategooriad",
      selectPrimaryCategory: "Valige põhikategooria",
      selectSecondaryCategories: "Valige kuni 2 teisest kategooriat",
      suggestedCategory: "Soovitatud kategooria",
      upToTwoSecondary: "Kuni 2 teisest kategooriat",
    },
    customerDashboard: {
      // Overview
      overview: "Ülevaade",
      recentActivity: "Hiljutine tegevus",
      noRecentActivity: "Hiljutist tegevust pole",
      quickActions: "Kiired tegevused",
      postNewTask: "Loo uus ülesanne",
      findFreelancers: "Leia vabakutselisi",
      bookConsultation: "Broneeri konsultatsioon",
      expertAdvice: "Ekspertnõu",
      browseProviders: "Sirvi teenusepakkujaid",
      findTalent: "Leia talenti",

      // Profile
      profile: "Profiil",
      editProfile: "Muuda",
      changePhoto: "Muuda fotot",
      uploading: "Laadin...",
      nameCompany: "Nimi/Ettevõte",
      email: "E-mail",
      contactSupportToChangeEmail: "E-maili muutmiseks pöörduge toe poole",
      linkedinUrl: "LinkedIn URL",
      websiteUrl: "Veebisaidi URL",
      website: "Veebisait",
      bio: "Lühikirjeldus",
      bioPlaceholder: "Rääkige endast või oma ettevõttest...",
      languagesSpoken: "Valdab keeli",
      addLanguagePrompt: "Sisestage keel ja vajutage Enter",
      suggestions: "Soovitused: ",
      demoNotice: "Demo - p��ris funktsioon tuleb varsti",
      photoConstraints: "JPG, PNG või GIF. Maksimaalselt 5MB.",

      // Tasks
      tasks: "Ülesanded",
      yourTasks: "Teie ülesanded",
      postTask: "Loo ülesanne",
      taskTitle: "Ülesande pealkiri",
      description: "Kirjeldus",
      budgetType: "Eelarve tüüp",
      amount: "Summa (€)",
      deadline: "Tähtaeg",
      cannotEdit: "Nellä saa muuta",
      taskCanOnlyBeEdited:
        "Ülesannet saab muuta ainult siis, kui see on avatud.",
      taskUpdated: "Ülesanne uuendatud",
      proposals: "pakkumist",
      fixed: "Fikseeritud",
      hourly: "Tunnis",
      flexible: "Paindlik",
      view: "Vaata",
      edit: "Muuda",
      cannotEditStatus: "Ei saa muuta",

      // Bookings
      bookings: "Broneeringud",
      yourBookings: "Teie broneeringud",
      bookNow: "Broneeri",
      reschedule: "Muuda aega",
      cancel: "Tühista",
      message: "Sõnum",
      cancellationRequestSent: "Tühistamise taotlus saadetud",
      waitingForProviderResponse: "Ootatakse teenusepakkuja vastust",
      rescheduleRequestSent: "Ümberplaneerimise taotlus saadetud",
      newTime: "Uus aeg",
      reason: "Põhjus: ",
      yourRating: "Teie hinnang",
      newDate: "Uus kuupäev",
      reasonOptional: "Põhjus (valikuline)",
      explainRescheduleReason: "Selgitage ümberplaneerimise põhjust...",
      sendRequest: "Saada taotlus",

      // Feedback
      feedback: "Tagasiside",
      reviewsGiven: "Antud arvustused",
      reviewsReceived: "Saadud arvustused",

      // Settings
      settings: "Seaded",
      accountSettings: "Konto seaded",
      changePassword: "Muuda parooli",
      currentPassword: "Praegune parool",
      newPassword: "Uus parool",
      confirmNewPassword: "Kinnita uut parooli",
      updatePassword: "Uuenda parooli",
      deleteAccount: "Kustuta konto",
      deleteAccountWarning:
        "Seda tegevust ei saa tagasi võtta. Kõik teie andmed kustutatakse jäädavalt.",
      confirmAccountDeletion: "Kinnita konto kustutamine",
      typeDeleteConfirm:
        'Kustutamise kinnitamiseks sisestage allpool sõna "kustuta":',
      accountDeleted: "Konto kustutatud",

      // Notifications
      profileUpdatedSuccessfully: "Profiil edukalt uuendatud",
      photoUpdated: "Foto uuendatud",
      photoUpdateSuccess: "Teie profiilipilt on edukalt uuendatud.",
      invalidFileType: "Vale failitüüp",
      selectImageFile: "Palun valige pildifail.",
      fileTooLarge: "Fail on liiga suur",
      maxFileSize: "Maksimaalne failisuurus on 5MB.",
      uploadError: "Üleslaadimise viga",
      uploadFailed: "Foto ��leslaadimine ebaõnnestus. Palun proovige uuesti.",
      fillAllFields: "Täitke kõik väljad",
      allPasswordFieldsRequired: "Kõik parooli väljad on kohustuslikud.",
      passwordsDoNotMatch: "Paroolid ei ühti",
      newPasswordConfirmationMustMatch: "Uus parool ja kinnitus peavad ühtima.",
      passwordUpdated: "Parool uuendatud",
      passwordUpdateSuccess: "Teie parool on edukalt uuendatud.",
      accountDeletedSuccess: "Teie konto on edukalt kustutatud.",

      // Booking actions
      cancellationApproved: "Tühistamine heaks kiidetud",
      providerApprovedCancellation:
        "Teenusepakkuja kiitis broneeringu t��histamise heaks.",
      cancellationDenied: "Tühistamine tagasi lükatud",
      providerDeniedCancellation:
        "Teenusepakkuja l��kkas tühistamise taotluse tagasi.",
      rescheduleApproved: "Ümberplaneerimine heaks kiidetud",
      providerApprovedReschedule:
        "Teenusepakkuja kiitis broneeringu ümberplaneerimise uuele ajale heaks.",
      rescheduleDenied: "Ümberplaneerimine tagasi lükatud",
      providerDeniedReschedule:
        "Teenusepakkuja lükkas ümberplaneerimise taotluse tagasi.",
      cancellationRequestSentNotification:
        "Tühistamise taotlus saadetud. Ootatakse teenusepakkuja heakskiitu.",
      pendingProviderApproval: "Ootatakse teenusepakkuja heakskiitu.",
      rescheduleRequestSentNotification: "Ümberplaneerimise taotlus saadetud",
      providerWillBeNotified:
        "Teenusepakkuja saab teie ümberplaneerimise taotlusest teate.",

      // Feature development notices
      featureInDevelopment: "Funktsioon arendamisel",
      messagingSystemSoon: "Sõnumisüsteem on varsti saadaval.",
      realEditingSoon: "See on demo - päris redigeerimine tuleb varsti",
      realFeatureSoon: "See on demo - päris funktsioon tuleb varsti",
      realUploadSoon: "Demo - p��ris üleslaadimine tuleb varsti",

      // Status translations
      status: {
        open: "Avatud",
        closed: "Suletud",
        completed: "Lõpetatud",
        cancelled: "Tühistatud",
        upcoming: "Tulemas",
        pendingCancellation: "Ootab tühistamist",
        pendingReschedule: "Ootab ümberplaneerimist",
      },

      // Form validation
      fillDateAndTime: "Täitke kuupäev ja kellaaeg",
      selectNewDateTime: "Palun valige uus kuupäev ja kellaaeg.",
      confirmCancelBooking: "Tühista broneering",
      sureToCancel:
        "Kas olete kindel, et soovite selle broneeringu t��histada?",
      yes: "Jah",
      no: "Ei",
      yesCancel: "Jah, tühista",

      // Activity types
      activities: {
        taskPosted: "Postitas ülesande",
        consultationBooked: "Broneerisin konsultatsiooni",
        reviewReceived: "Sain arvustuse",
        taskCompleted: "Lõpetasin projekti",
      },
    },
    customerOnboarding: {
      welcome: "Tere tulemast!",
      letsSetupProfile: "Seadistame teie profiili",
      canSkipForNow: "Võite selle praegu vahele jätta",
      profilePhoto: "Profiilipilt",
      uploadPhoto: "Laadi foto üles",
      skipForNow: "Jäta praegu vahele",
      tellUsAboutYourself: "Rääkige meile endast",
      whichLanguagesSpeak: "Milliseid keeli räägite?",
      addSocialLinks: "Lisage sotsiaalmeedia lingid",
      linkedin: "LinkedIn",
      whatBringsYouHere: "Mis teid siia toob?",
      bioHeadline: "Bio/Pealkiri",
      saveAndContinue: "Salvesta ja jätka",
      skipThisStep: "Jäta see samm vahele",
      profileSetupComplete: "Profiili seadistamine lõpetatud",
      welcomeToDashboard: "Tere tulemast juhtpaneelile",
      getStarted: "Alusta",
      completeProfileLater: "Lõpeta profiil hiljem",
    },
    taskCreation: {
      createNewTask: "Loo uus ülesanne",
      taskDetails: "Ülesande detailid",
      whatDoYouNeed: "Mida vajate?",
      taskTitlePlaceholder: "nt. Veebisaidi arendus, logo disain...",
      describeProject: "Kirjeldage oma projekti",
      taskDescriptionPlaceholder:
        "Rääkige oma projektist, nõuetest ja eesmärkidest...",
      budgetAndTimeline: "Eelarve ja ajakava",
      budgetType: "Eelarve tüüp",
      fixedPrice: "Fikseeritud hind",
      hourlyRate: "Tunnitasu",
      flexibleBudget: "Paindlik eelarve",
      budgetAmount: "Eelarve summa",
      estimatedHours: "Hinnanguline tundide arv",
      projectDeadline: "Projekti tähtaeg",
      skillsAndCategory: "Oskused ja kategooria",
      selectCategory: "Valige kategooria",
      requiredSkills: "Nõutavad oskused",
      addSkill: "Lisa oskus",
      additionalInfo: "Lisainfo",
      isUrgent: "Kiire",
      requiresNDA: "Nõuab salastamislepingut",
      remoteWorkOk: "Kaugtöö võimalik",
      publishTask: "Avalda ülesanne",
      saveAsDraft: "Salvesta mustandina",
      taskPublished: "Ülesanne avaldatud",
      taskSavedAsDraft: "Ülesanne salvestatud mustandina",
      priority: "Prioriteet",
      priorityNormal: "Tavaline",
      priorityHigh: "Kõrge",
      priorityUrgentLabel: "Kiire",
      priorityCritical: "Kriitiline",
      requiredInvoice: "Nõutav arve",
      createTask: "Loo ülesanne",
      fillRequiredFields: "Palun täitke kõik nõutavad väljad",
    },
    consultationBooking: {
      bookConsultation: "Broneeri konsultatsioon",
      selectDateTime: "Valige kuupäev ja kellaaeg",
      consultationDetails: "Konsultatsiooni detailid",
      duration: "Kestus",
      price: "Hind",
      sessionType: "Sessiooni tüüp",
      videoCall: "Videokõne",
      inPerson: "Silmast silma",
      phoneCall: "Telefonikõne",
      whatToDiscuss: "Mida arutada?",
      discussionTopics: "Arutluse teemad",
      contactInfo: "Kontaktinfo",
      phoneNumber: "Telefoninumber",
      skypeId: "Skype ID",
      bookingConfirmation: "Broneeringu kinnitus",
      confirmBooking: "Kinnita broneering",
      bookingRequests: "Broneeringu taotlused",
      waitingConfirmation: "Ootan kinnitust",
      bookingConfirmed: "Broneering kinnitatud",
      bookingDeclined: "Broneering tagasi lükatud",
    },

    // Provider Dashboard
    providerDashboard: {
      overview: "Ülevaade",
      bookings: "Broneeringud",
      tasks: "Ülesanded",
      portfolio: "Portfoolio",
      consultations: "Konsultatsioonid",
      feedback: "Tagasiside",
      settings: "Seaded",

      // Overview tab
      welcomeBack: "Tere tulemast tagasi",
      totalTasksCompleted: "Lõpetatud ülesandeid",
      consultationsDelivered: "Läbiviidud konsultatsioone",
      averageRating: "Keskmine hinnang",
      totalReviews: "Arvustusi kokku",
      recentActivity: "Hiljutine tegevus",
      noRecentActivity: "Hiljutist tegevust pole",
      tasksInProgress: "Pooleliolevad ülesanded",
      upcomingConsultations: "Eelseisvad konsultatsioonid",
      pendingProposals: "Ootel pakkumised",
      viewAll: "Vaata kõiki",

      // Status Management
      status: "Olek",
      availableNow: "Praegu saadaval",
      busy: "Hõivatud",
      inactive: "Mitteaktiivne",
      statusExplain: {
        availableNow:
          "Kliendid saavad broneerida, sõnumeid saata ja näevad teid otsingus",
        busy: "Näidatakse kui hõivatud, uusi broneeringuid ei saa teha, aga sõnumeid võib saata",
        inactive:
          "Profiil peidetud otsingust, ei saa broneerida ega sõnumeid saata",
      },
      statusChanged: "Olek muudetud",

      // Profile Header
      profilePhoto: "Profiilipilt",
      changePhoto: "Muuda pilti",
      uploadPhoto: "Laadi üles pilt",
      headline: "Pealkiri",
      location: "Asukoht",
      languagesSpoken: "Räägitavad keeled",
      memberSince: "Liige alates",
      editProfile: "Muuda profiili",

      // Bookings Tab
      allBookings: "Kõik broneeringud",
      pendingBookings: "Ootel broneeringud",
      upcomingBookings: "Eelseisvad broneeringud",
      completedBookings: "Lõpetatud broneeringud",
      cancelledBookings: "Tühistatud broneeringud",
      approveReschedule: "Kinnita ümberplaneerimine",
      declineReschedule: "Keeldu ümberplaneerimisest",
      rescheduleRequest: "���mberplaneerimise taotlus",
      cancellationRequest: "Tühistamise taotlus",
      approve: "Kinnita",
      decline: "Keeldu",
      startVideoCall: "Alusta videokõnet",
      messageCustomer: "Kirjuta kliendile",
      bookingApproved: "Broneering kinnitatud",
      bookingDeclined: "Broneering tagasi lükatud",

      // Tasks Tab
      myProposals: "Minu pakkumised",
      activeTasks: "Aktiivsed ülesanded",
      completedTasks: "Lõpetatud ülesanded",
      taskProposals: "Ülesannete pakkumised",
      submitProposal: "Esita pakkumine",
      viewTaskDetails: "Vaata ülesande detaile",
      chatWithCustomer: "Vestle kliendiga",
      submitDeliverable: "Esita tulemus",
      markAsComplete: "Märgi lõpetatuks",
      proposalSubmitted: "Pakkumine esitatud",
      taskCompleted: "Ülesanne lõpetatud",

      // Portfolio Tab
      publicProfile: "Avalik profiil",
      addProject: "Lisa projekt",
      editProject: "Muuda projekti",
      deleteProject: "Kustuta projekt",
      projectTitle: "Projekti pealkiri",
      projectDescription: "Projekti kirjeldus",
      projectImages: "Projekti pildid",
      showPortfolioPublicly: "Näita portfoolliot avalikult",
      previewAsCustomer: "Eelvaade kui klient",
      portfolioUpdated: "Portfoolio uuendatud",

      // Consultations Tab
      myConsultations: "Minu konsultatsioonid",
      addConsultation: "Lisa konsultatsioon",
      editConsultation: "Muuda konsultatsiooni",
      consultationTitle: "Konsultatsiooni pealkiri",
      consultationDescription: "Konsultatsiooni kirjeldus",
      consultationPrice: "Konsultatsiooni hind",
      consultationDuration: "Konsultatsiooni kestus",
      availableForVideoCall: "Saadaval videokõneks",
      availableSlots: "Saadaolevad ajad",
      consultationAdded: "Konsultatsioon lisatud",
      consultationUpdated: "Konsultatsioon uuendatud",
      consultationDeleted: "Konsultatsioon kustutatud",

      // Feedback Tab
      customerReviews: "Klientide arvustused",
      myReviews: "Minu arvustused",
      leaveReview: "Jäta arvustus",
      replyToReview: "Vasta arvustusele",
      rating: "Hinnang",
      reviewText: "Arvustuse tekst",
      reviewSubmitted: "Arvustus esitatud",

      // Settings Tab
      changePassword: "Muuda parooli",
      deleteAccount: "Kustuta konto",
      emailNotifications: "E-posti teavitused",
      subscriptionPlan: "Tellimuse pakett",
      currentPlan: "Praegune pakett",
      upgradeDowngrade: "Uuenda/Vähenda",
      paymentHistory: "Maksete ajalugu",
      profileSaved: "Profiil salvestatud",
      passwordChanged: "Parool muudetud",
      accountDeleted: "Konto kustutatud",

      // Common Actions
      save: "Salvesta",
      cancel: "T��hista",
      edit: "Muuda",
      delete: "Kustuta",
      confirm: "Kinnita",
      upload: "Laadi üles",
      preview: "Eelvaade",
      back: "Tagasi",
      next: "Edasi",
      finish: "Lõpeta",
    },

    // Authentication
    auth: {
      // Login
      login: "Logi sisse",
      loginTitle: "Logi sisse oma kontole",
      loginSubtitle: "Tere tulemast tagasi! Sisestage oma andmed.",
      email: "E-post",
      password: "Parool",
      showPassword: "Näita parooli",
      hidePassword: "Peida parool",
      rememberMe: "Jäta mind meelde",
      forgotPassword: "Unustasin parooli",
      loginButton: "Logi sisse",
      continueWithGoogle: "Jätka Google'iga",
      dontHaveAccount: "Pole veel kontot?",

      // Sign Up
      signUp: "Registreeru",
      signUpTitle: "Loo oma konto",
      signUpSubtitle: "Alusta QuickHire'iga juba t��na",
      firstName: "Eesnimi",
      lastName: "Perekonnanimi",
      company: "Ettevõte (valikuline)",
      confirmPassword: "Kinnita parool",
      country: "Riik",
      accountType: "Konto tüüp",
      accountTypeProvider: "Freelancer",
      accountTypeCustomer: "Klient",
      accountTypeProviderDesc: "Pakun teenuseid",
      accountTypeCustomerDesc: "Otsin teenuseid",
      agreeToTerms: "Nõustun tingimustega",
      termsAndConditions: "Tingimused ja Eeskirjad",
      privacyPolicy: "Privaatsuspoliitika",
      marketingEmails: "Turunduskirjad",
      createAccount: "Loo konto",
      alreadyHaveAccount: "On juba konto?",

      // Validation
      required: "See väli on kohustuslik",
      invalidEmail: "Vale e-posti formaat",
      passwordTooShort: "Parool peab olema vähemalt 8 märki",
      passwordsDontMatch: "Paroolid ei ühti",
      mustAgreeToTerms: "Tingimustega nõustumine on kohustuslik",

      // Success
      loginSuccess: "Edukalt sisse logitud",
      signUpSuccess: "Konto edukalt loodud",

      // Errors
      loginError: "Sisselogimine ebaõnnestus",
      signUpError: "Registreerimine ebaõnnestus",
      emailAlreadyExists: "E-post on juba kasutusel",
      invalidCredentials: "Valed sisselogimisandmed",
    },
  },

  en: {
    nav: {
      talent: "Talent",
      consultations: "Consultations",
      projects: "Projects",
      categories: "Categories",
      pricing: "Pricing",
      language: "Language",
      login: "Login",
      signUp: "Sign Up",
    },
    footer: {
      description:
        "Connect with skilled professionals and find the perfect talent for your projects. Get expert consultations and quality services all in one place.",
      company: "Company",
      about: "About",
      contact: "Contact",
      legal: "Legal",
      termsConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      copyright: "© 2024 QuickHire. All rights reserved.",
    },
    notFound: {
      pageNotFound: "404 - Page Not Found",
      pageNotFoundDesc: "Oops! The page you're looking for doesn't exist.",
      taskNotFound: "Task not found",
      providerNotFound: "Provider not found",
      returnHome: "Return to Home",
      goBack: "Go Back",
    },
    categories: {
      developmentIt: "Development & IT",
      designCreative: "Design & Creative",
      aiServices: "AI Services",
      salesMarketing: "Sales & Marketing",
      writingTranslation: "Writing & Translation",
      adminSupport: "Admin & Support",
      financeAccounting: "Finance & Accounting",
      legal: "Legal",
      hrTraining: "HR & Training",
      engineeringArchitecture: "Engineering & Architecture",
      otherServices: "Other Services",
      consultations: "Consultations",
    },
    home: {
      heroTitle: "Find the right professional or consultation in minutes",
      heroSubtitle:
        "Hire skilled experts, book advice sessions, or post a task — all in one place.",
      findTalent: "Find Talent",
      findTalentDesc: "Connect with top experts for your project.",
      findConsultations: "Book Consultations",
      findConsultationsDesc: "Get tailored advice from professionals.",
      postTask: "Post a Task",
      postTaskDesc: "Share your needs and receive proposals.",
      browseCategories: "Explore Services",
      topRatedProviders: "Top Rated Providers",
      howItWorks: "How It Works",
      howItWorksSteps: {
        step1Title: "Post a Task or Find Talent",
        step1Desc: "Describe your needs or browse experts.",
        step2Title: "Connect & Agree",
        step2Desc: "Chat, negotiate, and confirm the details.",
        step3Title: "Get It Done",
        step3Desc: "Work is delivered, and you leave a review.",
      },
      viewProfile: "View Profile",
    },
    providers: {
      title: "Find Talent",
      subtitle: "Find skilled professionals ready to help with your projects",
      searchPlaceholder: "Search talent (e.g. web developer)",
      allCategories: "All Categories",
      filterByRating: "Filter by Rating",
      offersConsultations: "Show only providers who offer consultations",
      filterBySkills: "Filter by Skills",
      skillsPlaceholder: "Search and add skills (e.g., JavaScript, TypeScript)",
      noResultsSkills:
        "No providers match your skill filters. Try removing a skill or broadening your search.",
      showMore: "Show More",
      showLess: "Show Less",
      clearFilters: "Clear Filters",
      noResults: "No experts found",
      noResultsDesc:
        "No results match your filters. Try broadening your search or explore categories.",
      showingResults: "Showing",
      loadMore: "Load More Providers",
      consultationBadge: "Consultation",
      viewProfile: "View Profile",
      rating: {
        all: "All Ratings",
        fiveStars: "⭐ 5 Stars",
        fourPlus: "⭐ 4+ Stars",
        threePlus: "⭐ 3+ Stars",
      },
    },

    consultations: {
      title: "Browse Expert Consultations",
      subtitle:
        "Book one-on-one sessions with industry experts and get personalized advice",
      searchPlaceholder:
        "Search consultations (e.g. career advice, SEO audit, etc.)",
      skillsPlaceholder:
        "Search and add skills (e.g., SEO, Leadership, Marketing)",
      allCategories: "All Categories",
      noResults: "No consultations found",
      noResultsDesc:
        "No results match your filters. Try broadening your search or explore categories.",
      noResultsFilter:
        "No consultations found. Try removing a filter or broadening your search.",
      consultationAvailable: "consultation available",
      consultationsAvailable: "consultations available",
      showingResults: "Showing",
      loadMore: "Load More Consultations",
      viewProfile: "View Profile",
      bookSession: "Book Session",
      perSession: "per session",
      duration: "Duration",
      videoCall: "Video Call",
      inPerson: "In Person",
      priceRange: "Price Range",
      experienceYears: "years experience",
      languages: "Languages",
      sessionTypes: {
        all: "All Types",
        video: "Video Call",
        inPerson: "In Person",
        phone: "Phone",
      },
    },

    tasks: {
      title: "Find Projects That Match Your Skills",
      subtitle:
        "Browse new tasks and find projects that fit your interests and expertise",
      searchPlaceholder: "Search tasks (e.g. logo design, writing, etc.)",
      allCategories: "All Categories",
      filterBy: "Filter By",
      priority: "Priority",
      budgetRange: "Budget Range",
      taskType: "Task Type",
      experienceLevel: "Experience Level",
      sortBy: "Sort By",
      clearFilters: "Clear Filters",
      noResults: "No tasks found",
      noResultsDesc:
        "No results match your filters. Try broadening your search or explore categories.",
      showingResults: "Showing",
      loadMore: "Load More Tasks",
      viewTask: "View Task",
      apply: "Apply",
      posted: "Posted",
      budget: "Budget",
      fixed: "Fixed",
      hourly: "Hourly",
      proposals: "proposals",
      priorities: {
        all: "All Priorities",
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      taskTypes: {
        all: "All Types",
        fixed: "Fixed Price",
        hourly: "Hourly Rate",
        flexible: "Flexible",
      },
      experienceLevels: {
        all: "All Levels",
        entry: "Entry Level",
        intermediate: "Intermediate",
        expert: "Expert",
      },
      sorting: {
        newest: "Newest First",
        budgetHigh: "Budget (High-Low)",
        budgetLow: "Budget (Low-High)",
        deadline: "Deadline",
      },
    },
    pricing: {
      title: "Simple Pricing, Unlimited Opportunities.",
      subtitle: "Get listed, stay visible, and attract more customers.",
      providerPlans: "Provider Plans",
      choosePlan: "Choose the plan that works best for your business",
      monthlyPlan: "Monthly Plan",
      monthlyDesc: "Perfect for getting started",
      annualPlan: "Annual Plan",
      annualDesc: "Best value for professionals",
      recommended: "Recommended",
      save: "Save €20!",
      startMonthly: "Start Monthly Plan",
      selectAnnual: "Select Annual Plan",
      customerMembership: "Customer Membership",
      alwaysFree: "Always Free",
      customerDesc:
        "No fees for customers — hire providers and book consultations at no cost",
      whatsIncluded: "What's Included",
      compareFeatures: "Compare features across all plans",
      features: "Features",
      customer: "Customer",
      monthly: "Monthly",
      annual: "Annual",
      free: "Free",
      faq: "Frequently Asked Questions",
      monthlyFeatures: [
        "Visible in provider search",
        "Unlimited service & consultation listings",
        "Unlimited task applications",
        "Built-in customer chat",
        "Customer reviews & ratings",
        "Cancel anytime",
      ],
      annualFeatures: [
        "Everything in Monthly Plan plus:",
        "Priority listing in search results",
        "Featured badge on profile",
        "Increased visibility and leads",
        "Dedicated support channel",
      ],
      customerFeatures: [
        "Post unlimited tasks",
        "Browse & hire providers",
        "Book consultations",
        "Access to provider ratings & reviews",
      ],
      faqItems: [
        {
          question: "Can I cancel my subscription anytime?",
          answer:
            "Yes, you can cancel your provider subscription at any time. Your account will remain active until the end of your current billing period.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
        },
        {
          question: "Is there really no fee for customers?",
          answer:
            "Absolutely! Customers can post tasks, browse providers, and book consultations completely free. We only charge providers for increased visibility and features.",
        },
        {
          question: "Can I upgrade from monthly to annual?",
          answer:
            "Yes, you can upgrade to the annual plan at any time and we'll prorate the difference. You'll immediately get access to all premium features.",
        },
      ],
      // Pricing units
      perMonth: "/month",
      perYear: "/year",
      notApplicable: "Not applicable",
      // Feature comparison table
      searchVisibility: "Search visibility",
      customerChat: "Customer chat",
      reviewsRatings: "Reviews & ratings",
      priorityPosition: "Priority position",
      featuredBadge: "Featured badge",
      dedicatedSupport: "Dedicated support",
    },
    providerData: {
      sarahChen: {
        title: "Full-Stack Developer",
        bio: "Experienced developer specializing in React, Node.js, and cloud architecture.",
        skills: [
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "GraphQL",
          "PostgreSQL",
        ],
      },
      marcusJohnson: {
        title: "UI/UX Designer",
        bio: "Creative designer focused on user-centered design and modern interfaces.",
        skills: [
          "Figma",
          "Adobe XD",
          "Prototyping",
          "User Research",
          "UI/UX",
          "Branding",
        ],
      },
      elenaRodriguez: {
        title: "Digital Marketing Expert",
        bio: "Growth-focused marketer with expertise in SEO and paid advertising.",
        skills: [
          "SEO",
          "Google Ads",
          "Analytics",
          "Content Strategy",
          "Facebook Ads",
          "Email Marketing",
        ],
      },
      davidKim: {
        title: "Business Consultant",
        bio: "Strategic consultant helping companies scale and optimize operations.",
        skills: [
          "Strategy",
          "Operations",
          "Finance",
          "Leadership",
          "Business Analysis",
          "Project Management",
        ],
      },
      priyaPatel: {
        title: "Content Creator",
        bio: "Professional writer creating compelling content for tech and business sectors.",
        skills: [
          "Copywriting",
          "Blogging",
          "Technical Writing",
          "SEO Writing",
          "Content Marketing",
          "Copywriting",
        ],
      },
      alexThompson: {
        title: "Data Scientist",
        bio: "Data expert specializing in machine learning and business analytics.",
        skills: [
          "Python",
          "Machine Learning",
          "Analytics",
          "SQL",
          "TensorFlow",
          "Power BI",
        ],
      },
      lisaWang: {
        title: "AI Solutions Architect",
        bio: "AI specialist helping companies implement cutting-edge AI solutions.",
        skills: [
          "AI/ML",
          "Python",
          "TensorFlow",
          "Computer Vision",
          "NLP",
          "Deep Learning",
        ],
      },
      jamesMitchell: {
        title: "Financial Advisor",
        bio: "Experienced financial planner specializing in business growth strategies.",
        skills: [
          "Financial Planning",
          "Investment",
          "Tax Strategy",
          "Business Finance",
          "Risk Management",
          "Accounting",
        ],
      },
    },
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Try Again",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      apply: "Apply",
      reset: "Reset",
      // Dynamic content translations
      providerSingular: "provider",
      providerPlural: "providers",
      addCustom: "Add custom",
      customSkillLabel: "CUSTOM",
      startTyping: "Start typing to see suggestions...",
      consultationSingular: "consultation",
      consultationPlural: "consultations",
      taskSingular: "task",
      taskPlural: "tasks",
      more: "more",
      years: "years",
      hour: "hour",
      hours: "hours",
      responseTime: "response time",
      joined: "joined",
      reviews: "reviews",
      session: "session",
      since: "since",
      members: "members",
      available: "available",
      unavailable: "unavailable",
      online: "online",
      offline: "offline",
      verified: "verified",
      featured: "featured",
      new: "new",
      popular: "popular",
      trending: "trending",
      expertSingular: "expert",
      expertPlural: "experts",
    },
    locations: {
      tallinnEstonia: "Tallinn, Estonia",
      tartuEstonia: "Tartu, Estonia",
      parnuEstonia: "Pärnu, Estonia",
    },
    responseTimes: {
      oneHour: "1 hour",
      twoHours: "2 hours",
      threeHours: "3 hours",
      fourHours: "4 hours",
      sixHours: "6 hours",
    },
    providerProfile: {
      providerNotFound: "Provider not found",
      projectsCompleted: "projects completed",
      respondsIn: "Responds in",
      services: "Services",
      consultationsAvailable: "Consultations Available",
      portfolio: "Portfolio",
      skills: "Skills",
      languages: "Languages",
      recentReviews: "Recent Reviews",
      readyToStart: "Ready to start?",
      contactProvider:
        "Contact {name} to discuss your project requirements and get a custom quote.",
      sendMessage: "Send Message",
      contactApplyNow: "Contact / Apply Now",
      getQuote: "Get Quote",
      bookSession: "Book Session",
      videoCall: "Video Call",
      duration: "Duration",
      delivery: "Delivery",
      perSession: "per session",
      startingAt: "Starting at",
      perHour: "per hour",
      weeks: "weeks",
      week: "week",
      minutes: "minutes",
      seoTitle: "{name} - {title} | QuickHire.ee",
      seoDescription: "Hire {name}, a skilled {title} in {location}. {bio}",
      seoKeywords: "{name}, {title}, {skills}, {location}",
      agoText: "ago",
    },

    gating: {
      title: "Client access required",
      body: {
        viewProfile:
          "Viewing full freelancer profiles is available with a client subscription.",
        generic:
          "Subscribe to view profiles, start chats, and book consultations.",
      },
      cta: {
        subscribe: "Subscribe now",
        learn: "Learn more",
        back: "Back to list",
      },
      badge: {
        required: "Client subscription required.",
      },
    },
    skills: {
      // Development & IT
      react: "React",
      nodejs: "Node.js",
      typescript: "TypeScript",
      aws: "AWS",
      graphql: "GraphQL",
      postgresql: "PostgreSQL",
      python: "Python",
      docker: "Docker",
      sql: "SQL",
      javascript: "JavaScript",
      php: "PHP",
      techManagement: "Tech Management",
      teamBuilding: "Team Building",
      agile: "Agile",
      projectManagement: "Project Management",
      machineLearning: "Machine Learning",
      analytics: "Analytics",
      tensorflow: "TensorFlow",
      powerBi: "Power BI",

      // Design & Creative
      figma: "Figma",
      adobeXd: "Adobe XD",
      prototyping: "Prototyping",
      userResearch: "User Research",
      uiUx: "UI/UX",
      branding: "Branding",
      illustrator: "Illustrator",
      photoshop: "Photoshop",

      // AI Services
      aiMl: "AI/ML",
      computerVision: "Computer Vision",
      nlp: "NLP",
      deepLearning: "Deep Learning",
      pytorch: "PyTorch",
      keras: "Keras",
      aiStrategy: "AI Strategy",
      dataAnalysis: "Data Analysis",
      automation: "Automation",

      // Sales & Marketing
      seo: "SEO",
      googleAds: "Google Ads",
      contentStrategy: "Content Strategy",
      facebookAds: "Facebook Ads",
      emailMarketing: "Email Marketing",
      crm: "CRM",
      hubspot: "HubSpot",
      contentMarketing: "Content Marketing",

      // HR & Training
      careerPlanning: "Career Planning",
      leadershipDevelopment: "Leadership Development",
      jobSearch: "Job Search",
      interviewTraining: "Interview Training",
      coaching: "Coaching",

      // Finance & Accounting
      financialPlanning: "Financial Planning",
      investment: "Investment",
      taxStrategy: "Tax Strategy",
      businessFinance: "Business Finance",
      riskManagement: "Risk Management",
      accounting: "Accounting",
      portfolioManagement: "Portfolio Management",
    },
    roleToggle: {
      freelance: "Freelance",
      client: "Client",
      switching: "Switching...",
    },
    categorySelection: {
      primaryCategory: "Primary Category",
      secondaryCategories: "Secondary Categories",
      selectPrimaryCategory: "Select primary category",
      selectSecondaryCategories: "Select up to 2 secondary categories",
      suggestedCategory: "Suggested category",
      upToTwoSecondary: "Up to 2 secondary categories",
    },
    customerDashboard: {
      // Overview
      overview: "Overview",
      recentActivity: "Recent Activity",
      noRecentActivity: "No recent activity",
      quickActions: "Quick Actions",
      postNewTask: "Post New Task",
      findFreelancers: "Find freelancers",
      bookConsultation: "Book Consultation",
      expertAdvice: "Expert advice",
      browseProviders: "Browse Providers",
      findTalent: "Find talent",

      // Profile
      profile: "Profile",
      editProfile: "Edit",
      changePhoto: "Change Photo",
      uploading: "Uploading...",
      nameCompany: "Name/Company",
      email: "Email",
      contactSupportToChangeEmail: "Contact support to change email",
      linkedinUrl: "LinkedIn URL",
      websiteUrl: "Website URL",
      website: "Website",
      bio: "Bio",
      bioPlaceholder: "Tell us about yourself or your company...",
      languagesSpoken: "Languages Spoken",
      addLanguagePrompt: "Type a language and press Enter",
      suggestions: "Suggestions: ",
      demoNotice: "Demo - real feature coming soon",
      photoConstraints: "JPG, PNG or GIF. Max 5MB.",

      // Tasks
      tasks: "Tasks",
      yourTasks: "Your Tasks",
      postTask: "Post Task",
      taskTitle: "Task Title",
      description: "Description",
      budgetType: "Budget Type",
      amount: "Amount (€)",
      deadline: "Deadline",
      cannotEdit: "Cannot edit",
      taskCanOnlyBeEdited: "Task can only be edited while it is open.",
      taskUpdated: "Task updated",
      proposals: "proposals",
      fixed: "Fixed",
      hourly: "Hourly",
      flexible: "Flexible",
      view: "View",
      edit: "Edit",
      cannotEditStatus: "Cannot edit",

      // Bookings
      bookings: "Bookings",
      yourBookings: "Your Bookings",
      bookNow: "Book Now",
      reschedule: "Reschedule",
      cancel: "Cancel",
      message: "Message",
      cancellationRequestSent: "Cancellation request sent",
      waitingForProviderResponse: "Waiting for provider response",
      rescheduleRequestSent: "Reschedule request sent",
      newTime: "New time",
      reason: "Reason: ",
      yourRating: "Your rating",
      newDate: "New Date",
      reasonOptional: "Reason (optional)",
      explainRescheduleReason: "Explain reason for rescheduling...",
      sendRequest: "Send Request",

      // Feedback
      feedback: "Feedback",
      reviewsGiven: "Reviews Given",
      reviewsReceived: "Reviews Received",

      // Settings
      settings: "Settings",
      accountSettings: "Account Settings",
      changePassword: "Change Password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
      updatePassword: "Update Password",
      deleteAccount: "Delete Account",
      deleteAccountWarning:
        "This action cannot be undone. All your data will be permanently deleted.",
      confirmAccountDeletion: "Confirm Account Deletion",
      typeDeleteConfirm: 'To confirm deletion, type "delete" below:',
      accountDeleted: "Account deleted",

      // Notifications
      profileUpdatedSuccessfully: "Profile updated successfully",
      photoUpdated: "Photo updated",
      photoUpdateSuccess: "Your profile photo has been successfully updated.",
      invalidFileType: "Invalid file type",
      selectImageFile: "Please select an image file.",
      fileTooLarge: "File too large",
      maxFileSize: "Maximum file size is 5MB.",
      uploadError: "Upload error",
      uploadFailed: "Failed to upload photo. Please try again.",
      fillAllFields: "Fill all fields",
      allPasswordFieldsRequired: "All password fields are required.",
      passwordsDoNotMatch: "Passwords do not match",
      newPasswordConfirmationMustMatch:
        "New password and confirmation must match.",
      passwordUpdated: "Password updated",
      passwordUpdateSuccess: "Your password has been successfully updated.",
      accountDeletedSuccess: "Your account has been successfully deleted.",

      // Booking actions
      cancellationApproved: "Cancellation approved",
      providerApprovedCancellation:
        "Provider approved the booking cancellation.",
      cancellationDenied: "Cancellation denied",
      providerDeniedCancellation: "Provider denied the cancellation request.",
      rescheduleApproved: "Reschedule approved",
      providerApprovedReschedule:
        "Provider approved the booking reschedule to the new time.",
      rescheduleDenied: "Reschedule denied",
      providerDeniedReschedule: "Provider denied the reschedule request.",
      cancellationRequestSentNotification:
        "Cancellation request sent. Pending provider approval.",
      pendingProviderApproval: "Pending provider approval.",
      rescheduleRequestSentNotification: "Reschedule request sent",
      providerWillBeNotified:
        "Provider will be notified of your reschedule request.",

      // Feature development notices
      featureInDevelopment: "Feature in development",
      messagingSystemSoon: "Messaging system will be available soon.",
      realEditingSoon: "This is a demo - real editing coming soon",
      realFeatureSoon: "This is a demo - real feature coming soon",
      realUploadSoon: "Demo - real upload coming soon",

      // Status translations
      status: {
        open: "Open",
        closed: "Closed",
        completed: "Completed",
        cancelled: "Cancelled",
        upcoming: "Upcoming",
        pendingCancellation: "Pending Cancellation",
        pendingReschedule: "Pending Reschedule",
      },

      // Form validation
      fillDateAndTime: "Fill date and time",
      selectNewDateTime: "Please select new date and time.",
      confirmCancelBooking: "Cancel Booking",
      sureToCancel: "Are you sure you want to cancel this booking?",
      yes: "Yes",
      no: "No",
      yesCancel: "Yes, cancel",

      // Activity types
      activities: {
        taskPosted: "Posted task",
        consultationBooked: "Booked consultation with",
        reviewReceived: "Received 5-star review from",
        taskCompleted: "Completed project",
      },
    },
    customerOnboarding: {
      welcome: "Welcome!",
      letsSetupProfile: "Let's set up your profile",
      canSkipForNow: "You can skip this for now",
      profilePhoto: "Profile Photo",
      uploadPhoto: "Upload Photo",
      skipForNow: "Skip for now",
      tellUsAboutYourself: "Tell us about yourself",
      whichLanguagesSpeak: "Which languages do you speak?",
      addSocialLinks: "Add social links",
      linkedin: "LinkedIn",
      whatBringsYouHere: "What brings you here?",
      bioHeadline: "Bio/Headline",
      saveAndContinue: "Save & Continue",
      skipThisStep: "Skip this step",
      profileSetupComplete: "Profile setup complete",
      welcomeToDashboard: "Welcome to your dashboard",
      getStarted: "Get Started",
      completeProfileLater: "Complete profile later",
    },
    taskCreation: {
      createNewTask: "Create New Task",
      taskDetails: "Task Details",
      whatDoYouNeed: "What do you need?",
      taskTitlePlaceholder: "e.g. Website development, logo design...",
      describeProject: "Describe your project",
      taskDescriptionPlaceholder:
        "Tell us about your project, requirements, and goals...",
      budgetAndTimeline: "Budget & Timeline",
      budgetType: "Budget Type",
      fixedPrice: "Fixed Price",
      hourlyRate: "Hourly Rate",
      flexibleBudget: "Flexible Budget",
      budgetAmount: "Budget Amount",
      estimatedHours: "Estimated Hours",
      projectDeadline: "Project Deadline",
      skillsAndCategory: "Skills & Category",
      selectCategory: "Select Category",
      requiredSkills: "Required Skills",
      addSkill: "Add Skill",
      additionalInfo: "Additional Info",
      isUrgent: "Urgent",
      requiresNDA: "Requires NDA",
      remoteWorkOk: "Remote work OK",
      publishTask: "Publish Task",
      saveAsDraft: "Save as Draft",
      taskPublished: "Task published",
      taskSavedAsDraft: "Task saved as draft",
      priority: "Priority",
      priorityNormal: "Normal",
      priorityHigh: "High",
      priorityUrgentLabel: "Urgent",
      priorityCritical: "Critical",
      requiredInvoice: "Required invoice",
      createTask: "Create Task",
      fillRequiredFields: "Please fill in all required fields",
    },
    consultationBooking: {
      bookConsultation: "Book Consultation",
      selectDateTime: "Select Date & Time",
      consultationDetails: "Consultation Details",
      duration: "Duration",
      price: "Price",
      sessionType: "Session Type",
      videoCall: "Video Call",
      inPerson: "In Person",
      phoneCall: "Phone Call",
      whatToDiscuss: "What to discuss?",
      discussionTopics: "Discussion topics",
      contactInfo: "Contact Info",
      phoneNumber: "Phone Number",
      skypeId: "Skype ID",
      bookingConfirmation: "Booking Confirmation",
      confirmBooking: "Confirm Booking",
      bookingRequests: "Booking Requests",
      waitingConfirmation: "Waiting for confirmation",
      bookingConfirmed: "Booking confirmed",
      bookingDeclined: "Booking declined",
    },

    // Provider Dashboard
    providerDashboard: {
      overview: "Overview",
      bookings: "Bookings",
      tasks: "Tasks",
      portfolio: "Portfolio",
      consultations: "Consultations",
      feedback: "Feedback",
      settings: "Settings",

      // Overview tab
      welcomeBack: "Welcome back",
      totalTasksCompleted: "Total tasks completed",
      consultationsDelivered: "Consultations delivered",
      averageRating: "Average rating",
      totalReviews: "Total reviews",
      recentActivity: "Recent activity",
      noRecentActivity: "No recent activity",
      tasksInProgress: "Tasks in progress",
      upcomingConsultations: "Upcoming consultations",
      pendingProposals: "Pending proposals",
      viewAll: "View all",

      // Status Management
      status: "Status",
      availableNow: "Available now",
      busy: "Busy",
      inactive: "Inactive",
      statusExplain: {
        availableNow: "Customers can book, message, and see you in listings",
        busy: "Shown as 'Busy' badge, cannot be booked but can receive messages",
        inactive: "Profile hidden from search, cannot be booked or messaged",
      },
      statusChanged: "Status changed",

      // Profile Header
      profilePhoto: "Profile photo",
      changePhoto: "Change photo",
      uploadPhoto: "Upload photo",
      headline: "Headline",
      location: "Location",
      languagesSpoken: "Languages spoken",
      memberSince: "Member since",
      editProfile: "Edit Profile",

      // Bookings Tab
      allBookings: "All bookings",
      pendingBookings: "Pending bookings",
      upcomingBookings: "Upcoming bookings",
      completedBookings: "Completed bookings",
      cancelledBookings: "Cancelled bookings",
      approveReschedule: "Approve reschedule",
      declineReschedule: "Decline reschedule",
      rescheduleRequest: "Reschedule request",
      cancellationRequest: "Cancellation request",
      approve: "Approve",
      decline: "Decline",
      startVideoCall: "Start video call",
      messageCustomer: "Message customer",
      bookingApproved: "Booking approved",
      bookingDeclined: "Booking declined",

      // Tasks Tab
      myProposals: "My proposals",
      activeTasks: "Active tasks",
      completedTasks: "Completed tasks",
      taskProposals: "Task proposals",
      submitProposal: "Submit proposal",
      viewTaskDetails: "View task details",
      chatWithCustomer: "Chat with customer",
      submitDeliverable: "Submit deliverable",
      markAsComplete: "Mark as complete",
      proposalSubmitted: "Proposal submitted",
      taskCompleted: "Task completed",

      // Portfolio Tab
      publicProfile: "Public profile",
      addProject: "Add project",
      editProject: "Edit project",
      deleteProject: "Delete project",
      projectTitle: "Project title",
      projectDescription: "Project description",
      projectImages: "Project images",
      showPortfolioPublicly: "Show portfolio publicly",
      previewAsCustomer: "Preview as customer",
      portfolioUpdated: "Portfolio updated",

      // Consultations Tab
      myConsultations: "My consultations",
      addConsultation: "Add consultation",
      editConsultation: "Edit consultation",
      consultationTitle: "Consultation title",
      consultationDescription: "Consultation description",
      consultationPrice: "Consultation price",
      consultationDuration: "Consultation duration",
      availableForVideoCall: "Available for video call",
      availableSlots: "Available slots",
      consultationAdded: "Consultation added",
      consultationUpdated: "Consultation updated",
      consultationDeleted: "Consultation deleted",

      // Feedback Tab
      customerReviews: "Customer reviews",
      myReviews: "My reviews",
      leaveReview: "Leave review",
      replyToReview: "Reply to review",
      rating: "Rating",
      reviewText: "Review text",
      reviewSubmitted: "Review submitted",

      // Settings Tab
      changePassword: "Change password",
      deleteAccount: "Delete account",
      emailNotifications: "Email notifications",
      subscriptionPlan: "Subscription plan",
      currentPlan: "Current plan",
      upgradeDowngrade: "Upgrade/Downgrade",
      paymentHistory: "Payment history",
      profileSaved: "Profile saved",
      passwordChanged: "Password changed",
      accountDeleted: "Account deleted",

      // Common Actions
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      upload: "Upload",
      preview: "Preview",
      back: "Back",
      next: "Next",
      finish: "Finish",
    },

    // Authentication
    auth: {
      // Login
      login: "Log in",
      loginTitle: "Log in to your account",
      loginSubtitle: "Welcome back! Please enter your details.",
      email: "Email",
      password: "Password",
      showPassword: "Show password",
      hidePassword: "Hide password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password",
      loginButton: "Log in",
      continueWithGoogle: "Continue with Google",
      dontHaveAccount: "Don't have an account?",

      // Sign Up
      signUp: "Sign up",
      signUpTitle: "Create your account",
      signUpSubtitle: "Get started with QuickHire today",
      firstName: "First name",
      lastName: "Last name",
      company: "Company (optional)",
      confirmPassword: "Confirm password",
      country: "Country",
      accountType: "Account type",
      accountTypeProvider: "Freelancer",
      accountTypeCustomer: "Client",
      accountTypeProviderDesc: "Offering services",
      accountTypeCustomerDesc: "Looking for services",
      agreeToTerms: "Agree to terms",
      termsAndConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      marketingEmails: "Marketing emails",
      createAccount: "Create account",
      alreadyHaveAccount: "Already have an account?",

      // Validation
      required: "This field is required",
      invalidEmail: "Invalid email format",
      passwordTooShort: "Password must be at least 8 characters",
      passwordsDontMatch: "Passwords do not match",
      mustAgreeToTerms: "You must agree to the terms",

      // Success
      loginSuccess: "Successfully logged in",
      signUpSuccess: "Account created successfully",

      // Errors
      loginError: "Login failed",
      signUpError: "Sign up failed",
      emailAlreadyExists: "Email already exists",
      invalidCredentials: "Invalid credentials",
    },
  },

  ru: {
    nav: {
      talent: "Талант",
      consultations: "Консультации",
      projects: "Проекты",
      categories: "Категории",
      pricing: "Цены",
      language: "Язык",
      login: "Войти",
      signUp: "Регистрация",
    },
    footer: {
      description:
        "Соединяйтесь с квалифицированн��ми профессионалами и находите идеальные таланты для ваших проектов. Получайте экспертные консультации и качественные услуги в одном месте.",
      company: "Компания",
      about: "О нас",
      contact: "Контакты",
      legal: "Правовая информация",
      termsConditions: "Условия и положения",
      privacyPolicy: "Политика конфиденциальности",
      copyright: "© 2024 QuickHire. Все права защищены.",
    },
    notFound: {
      pageNotFound: "404 - Страница не найдена",
      pageNotFoundDesc: "Упс! Страница, которую вы ищете, не существует.",
      taskNotFound: "Задача н�� найдена",
      providerNotFound: "Поставщик не н��йден",
      returnHome: "Вернуться на главну���",
      goBack: "Назад",
    },
    categories: {
      developmentIt: "Разработка и IT",
      designCreative: "Дизайн и ��ворчество",
      aiServices: "AI-�����ервисы",
      salesMarketing: "Продажи и маркетин��",
      writingTranslation: "��аписание и перевод",
      adminSupport: "Администрирование и поддержка",
      financeAccounting: "Финансы и бухгалтерия",
      legal: "Юридические услуги",
      hrTraining: "HR и обучение",
      engineeringArchitecture: "Инжен��рия и архитектура",
      otherServices: "Др��г��е услуги",
      consultations: "Консультации",
    },
    home: {
      heroTitle:
        "Найдите подходящег�� специалиста или ко��с��льтацию за считанные минуты",
      heroSubtitle:
        "Нанимайте опытных экспертов, бронируйте консультации или размещайте задачи — в��ё в одном месте.",
      findTalent: "Найти таланты",
      findTalentDesc: "Работайте с лучшими экспертами для вашего проекта.",
      findConsultations: "Забронировать консультации",
      findConsultationsDesc: "Получи��е персональные советы от профессионалов.",
      postTask: "Разместить задачу",
      postTaskDesc: "Поделитесь вашими потребностями и получите предложен��я.",
      browseCategories: "Исс��едуйте услуги",
      topRatedProviders: "Лучшие поставщики",
      howItWorks: "Как это работает",
      howItWorksSteps: {
        step1Title: "Разместите за��ачу или найд��те таланты",
        step1Desc: "Опишите ваши потребности или просмотрите экспертов.",
        step2Title: "Свяжитесь и договоритесь",
        step2Desc: "Общайтесь, ведите переговоры и подтвердите детали.",
        step3Title: "Выполните работу",
        step3Desc: "Работа доставляется, и вы оставляете отзыв.",
      },
      viewProfile: "Посмотреть профиль",
    },
    providers: {
      title: "Найти талант",
      subtitle:
        "Найдите опытных профессионалов, готовых помочь с вашими проектами",
      searchPlaceholder: "Поиск таланта (напр. веб-разработчик)",
      allCategories: "Все категории",
      filterByRating: "Фильтр по рейтингу",
      offersConsultations: "Показать только тех, кто предлагает консультации",
      filterBySkills: "Фильтр по навыкам",
      skillsPlaceholder:
        "Поиск и добавление навыков (напр. JavaScript, TypeScript)",
      showMore: "Показать больше",
      showLess: "Показать меньше",
      clearFilters: "��чистить фильтры",
      noResults: "Эксперты не найдены",
      noResultsDesc:
        "Результаты не соответствуют вашим фильтрам. Попробуйте расширить поиск или изучите категории.",
      noResultsSkills:
        "Поставщики не соответствуют вашим фильтрам. Попробуйте удал��ть навык или расширить поиск.",
      showingResults: "��оказа��о",
      loadMore: "Загрузить больше поставщиков",
      consultationBadge: "Консул��тация",
      viewProfile: "Посмотреть профиль",
      rating: {
        all: "Все рейтинги",
        fiveStars: "⭐ 5 звёзд",
        fourPlus: "⭐ 4+ звёзды",
        threePlus: "⭐ 3+ звёзды",
      },
    },

    consultations: {
      title: "Консультации экспертов",
      subtitle:
        "Забронируйте ин��ивидуальные сессии с эксперта���� отр��сли и получ����е персональные советы",
      searchPlaceholder:
        "Поиск консультаций (напр. карьерные советы, SEO-аудит и т.д.)",
      skillsPlaceholder:
        "Поиск и добавление навыков (напр. SEO, лидерство, маркетинг)",
      allCategories: "Все категории",
      noResults: "Консультаций не найдено",
      noResultsDesc:
        "Результаты не соответствуют вашим фильтрам. Попро��уйте расширить поиск или изучите категории.",
      noResultsFilter:
        "Консультаций не найдено. Попробуйте удалить фи��ьтр или расширить поиск.",
      consultationAvailable: "консультация доступна",
      consultationsAvailable: "консультаций до��тупно",
      showingResults: "Показано",
      loadMore: "Загрузить больше консультаций",
      viewProfile: "Пос��отреть профиль",
      bookSession: "Забронировать с��с��ию",
      perSession: "за сессию",
      duration: "Продолжительно���т��",
      videoCall: "Видеозвонок",
      inPerson: "Лично",
      priceRange: "Ценовой диа��аз��н",
      experienceYears: "лет опыта",
      languages: "Яз��ки",
      sessionTypes: {
        all: "Все ��ипы",
        video: "Видеозвонок",
        inPerson: "Лично",
        phone: "Телефон",
      },
    },

    tasks: {
      title: "Най��и зада��и по вашим навыкам",
      subtitle:
        "Просматривайте новые задачи и находите проекты, соответствующие вашим интересам и опыту",
      searchPlaceholder:
        "Поиск задач (напр. дизайн логотипа, написание и т.д.)",
      allCategories: "Все категории",
      filterBy: "Фильтр по",
      priority: "Приоритет",
      budgetRange: "Бюджет",
      taskType: "Тип задачи",
      experienceLevel: "Уровень опыта",
      sortBy: "Сортировать по",
      clearFilters: "Очистить фильтры",
      noResults: "Задач не найдено",
      noResultsDesc:
        "Результат�� не соответствуют вашим фильтрам. Попробуйте расширить по��ск или изучите категории.",
      showingResults: "Показано",
      loadMore: "Загрузить больше задач",
      viewTask: "Посмотреть задачу",
      apply: "Подать заявку",
      posted: "О��убликовано",
      budget: "Бюджет",
      fixed: "Фиксированная",
      hourly: "Почасовая",
      proposals: "предложений",
      priorities: {
        all: "Все приоритеты",
        high: "Высок��й",
        medium: "Средний",
        low: "Низкий",
      },
      taskTypes: {
        all: "Все типы",
        fixed: "Фиксированная цена",
        hourly: "Почасовая оплата",
        flexible: "Гибкий",
      },
      experienceLevels: {
        all: "Все у��овни",
        entry: "Начальный",
        intermediate: "Средн��й",
        expert: "Э��сперт",
      },
      sorting: {
        newest: "Сна��ала новые",
        budgetHigh: "��юджет (вы��ок��й-низкий)",
        budgetLow: "Бюджет (низкий-высо��ий)",
        deadline: "Срок",
      },
    },
    pricing: {
      title: "П����стые тарифы, безграничные возможности.",
      subtitle:
        "Станьте видимыми, оставайтесь на виду и привл��кайте больше клиентов.",
      providerPlans: "Планы для ��оставщиков",
      choosePlan:
        "Выберите п��ан, который лучше в��его подходит для ваш��го бизнеса",
      monthlyPlan: "М�����сячны���� план",
      monthlyDesc: "Иде��льн��� для н��чал��",
      annualPlan: "Годовой план",
      annualDesc: "Лучшее пред��о��ение для профессионалов",
      recommended: "Рекомендуется",
      save: "Сэконо���ьте €20!",
      startMonthly: "Начать месячн��й план",
      selectAnnual: "Выбрать годов��й план",
      customerMembership: "Членство клиента",
      alwaysFree: "Всегда бесплатно",
      customerDesc:
        "Без ����миссий для клиентов — нани��айте пост��вщиков и бронируйте консультации бесплатно",
      whatsIncluded: "Что в��лючено",
      compareFeatures: "Сравните функции во всех п��анах",
      features: "Функци��",
      customer: "Клиен��",
      monthly: "Меся��ный",
      annual: "Годовой",
      free: "Бесплатно",
      faq: "Часто задаваемые ����опросы",
      monthlyFeatures: [
        "Видимость в поиске поставщико��",
        "Неогранич��нное количество услуг и консульта����ий",
        "Неограниченные зая����ки на задачи",
        "Встроенн���й чат с клиент����и",
        "Отзывы и рейтинги клиентов",
        "Отмена в любое вр��мя",
      ],
      annualFeatures: [
        "Всё из месячного плана плюс:",
        "Приоритетн��е размещение в результатах поиска",
        "Рек��мендуемый значок в профиле",
        "Повышенная видимость и больше лидо��",
        "Выд����енны�� канал поддерж��и",
      ],
      customerFeatures: [
        "Размещени�� неогранич������нного количества з��дач",
        "Пр��смотр и наем пос��авщиков",
        "Бронирование консул��таций",
        "Дост��п к рейтингам и отзывам поставщиков",
      ],
      faqItems: [
        {
          question: "Могу ли я отменить подпи��ку в л��бое время?",
          answer:
            "Да, вы может�� отмен��ть подписку поставщика в любое врем��. Ваш аккау��т останется активным до конц�� текущего ��ас��ётного ��ерио��а.",
        },
        {
          question: "Какие способы оплаты вы принимаете?",
          answer:
            "Мы принимаем все основные кредитные карты, PayPal и банковские пе��ев��ды для годовых подписок.",
        },
        {
          question: "Действительно ли нет комиссии для клиентов?",
          answer:
            "Абсолютно! Клиенты могут размещать задачи, просмат��ивать поставщиков и бронироват�� ��онсультации сове��шенно бесплатно. Мы взимаем плату то��ько с п��ставщи��ов за п��вышенную ��идимость и функци��.",
        },
        {
          question: "Могу ��и я перейти с месяч��ого на год����вой план?",
          answer:
            "Да, вы может�� пе��ейти на го��овой план �� лю��ое время, и ��ы пропорционально засчитаем разницу. Вы неме��ленно получите доступ ко всем премиум-фу��кци��м.",
        },
      ],
      // Pricing units
      perMonth: "/меся��",
      perYear: "/год",
      notApplicable: "Не применимо",
      // Feature comparison table
      searchVisibility: "Видимость в поиске",
      customerChat: "Чат �� клиентами",
      reviewsRatings: "Отзывы и рейтинги",
      priorityPosition: "Приоритет��ая позиция",
      featuredBadge: "Рекомендуемый з��ачок",
      dedicatedSupport: "Выделенная поддержка",
    },
    providerData: {
      sarahChen: {
        title: "Full-Stack разработчик",
        bio: "Опытный раз��аботчик, специализир��ющийся на React, Node.js и обла��но���� архитекту��е.",
        skills: [
          "React",
          "Node.js",
          "TypeScript",
          "AWS",
          "GraphQL",
          "PostgreSQL",
        ],
      },
      marcusJohnson: {
        title: "UI/UX диза���нер",
        bio: "Креативн��й дизайнер, фокусирующий��я на пользовательском дизайне и современных интерфейсах.",
        skills: [
          "Figma",
          "Adobe XD",
          "Прототипировани��",
          "Пользователь��кие и��следо��ания",
          "UI/UX",
          "Бр��нд��нг",
        ],
      },
      elenaRodriguez: {
        title: "Эксперт по цифровому маркетингу",
        bio: "Маркетолог, ориентированный на рост, с опытом в SEO и платной рекламе.",
        skills: [
          "SEO",
          "Google Ads",
          "Аналитика",
          "Контент-стратегия",
          "Facebook Ads",
          "Email-марке��инг",
        ],
      },
      davidKim: {
        title: "Бизнес-консультант",
        bio: "Стратегический консультант, помо��ающий компаниям масшт��бироваться и о��т��мизировать операции.",
        skills: [
          "��т��атегия",
          "����ерации",
          "Финансы",
          "Ли��ер��тво",
          "��изнес-анализ",
          "Упра��лен��е проектами",
        ],
      },
      priyaPatel: {
        title: "Создатель контента",
        bio: "Профессио��альный пис��тель, созда��щий убедитель��ы�� контент для технологических и бизнес-секторов.",
        skills: [
          "Копирайтинг",
          "Блог��инг",
          "Техн��ческое написание",
          "SEO-написание",
          "Ко��тент-маркетинг",
          "Копирай��инг",
        ],
      },
      alexThompson: {
        title: "Специалист по данны����",
        bio: "Эксперт по данным, специализирующий��я на машинном обучении и бизнес-анали��ике.",
        skills: [
          "Python",
          "Машинное обучение",
          "Аналитик��",
          "SQL",
          "TensorFlow",
          "Power BI",
        ],
      },
      lisaWang: {
        title: "Архитектор AI реше��ий",
        bio: "Специалист по AI, помогающий компания�� внедрять передо��ые AI решения.",
        skills: [
          "AI/ML",
          "Python",
          "TensorFlow",
          "Компьютерное зрение",
          "NLP",
          "Глубо��ое обуч��ние",
        ],
      },
      jamesMitchell: {
        title: "Финанс��вый консультант",
        bio: "Опытный фин��н����вый планиро����щи��, специализирующийся на стратегиях роста бизнеса.",
        skills: [
          "Финансовое пл��нирование",
          "Инвес��ирование",
          "Налого��ая стратеги��",
          "Бизнес-финансы",
          "Управление рисками",
          "Бухгалтерия",
        ],
      },
    },
    common: {
      loading: "Загрузка...",
      error: "Ошибка",
      retry: "Попробовать снова",
      cancel: "Отмен��",
      save: "Сохрани��ь",
      edit: "Редактировать",
      delete: "��дали��ь",
      back: "Назад",
      next: "Далее",
      previous: "Предыдущий",
      close: "Закрыть",
      search: "Пои��к",
      filter: "Фильтр",
      sort: "Сортировка",
      apply: "Применить",
      reset: "Сбросить",
      // Dynamic content translations
      providerSingular: "поставщик",
      providerPlural: "поставщиков",
      addCustom: "Добавить пользовательский",
      customSkillLabel: "ПОЛЬЗОВАТЕЛЬСКИЙ",
      startTyping: "Начните ввод для просмотра предложений...",
      consultationSingular: "кон��ул��тация",
      consultationPlural: "консультаций",
      taskSingular: "задач��",
      taskPlural: "задач",
      more: "ещё",
      years: "��ет",
      hour: "час",
      hours: "часов",
      responseTime: "��ремя ответа",
      joined: "присоединился",
      reviews: "отзывов",
      session: "сессия",
      since: "с",
      members: "участников",
      available: "доступен",
      unavailable: "недоступен",
      online: "онлайн",
      offline: "оффлайн",
      verified: "проверен",
      featured: "рекоме��дуемый",
      new: "новый",
      popular: "популярный",
      trending: "популярный",
      expertSingular: "��ксперт",
      expertPlural: "э��с��ертов",
    },
    locations: {
      tallinnEstonia: "Таллинн, Эстония",
      tartuEstonia: "Тарту, Эстония",
      parnuEstonia: "Пярну, Эстония",
    },
    responseTimes: {
      oneHour: "1 ��ас",
      twoHours: "2 часа",
      threeHours: "3 часа",
      fourHours: "4 часа",
      sixHours: "6 часов",
    },
    skills: {
      // Development & IT
      react: "React",
      nodejs: "Node.js",
      typescript: "TypeScript",
      aws: "AWS",
      graphql: "GraphQL",
      postgresql: "PostgreSQL",
      python: "Python",
      docker: "Docker",
      sql: "SQL",
      javascript: "JavaScript",
      php: "PHP",
      techManagement: "Управление техноло��иями",
      teamBuilding: "Формирование команды",
      agile: "Agile",
      projectManagement: "Управление проектами",
      machineLearning: "Машинное обучение",
      analytics: "А��алитика",
      tensorflow: "TensorFlow",
      powerBi: "Power BI",

      // Design & Creative
      figma: "Figma",
      adobeXd: "Adobe XD",
      prototyping: "Протот��пирование",
      userResearch: "Пользов��тельские исследования",
      uiUx: "UI/UX",
      branding: "Брендинг",
      illustrator: "Illustrator",
      photoshop: "Photoshop",

      // AI Services
      aiMl: "AI/ML",
      computerVision: "Компьютерное зрение",
      nlp: "NLP",
      deepLearning: "Глубок��е обу��ение",
      pytorch: "PyTorch",
      keras: "Keras",
      aiStrategy: "AI стратегия",
      dataAnalysis: "Анал��з данных",
      automation: "Автоматизация",

      // Sales & Marketing
      seo: "SEO",
      googleAds: "Google Ads",
      contentStrategy: "Контент-стратегия",
      facebookAds: "Facebook Ads",
      emailMarketing: "Email-м��ркет��нг",
      crm: "CRM",
      hubspot: "HubSpot",
      contentMarketing: "Контент-маркети��г",

      // HR & Training
      careerPlanning: "Карьерное планирование",
      leadershipDevelopment: "Ра��витие лидерства",
      jobSearch: "Поиск работы",
      interviewTraining: "Трен��нг ���обеседований",
      coaching: "Коучинг",

      // Finance & Accounting
      financialPlanning: "Финанс���вое планирование",
      investment: "Инвестирование",
      taxStrategy: "Нал��говая страт��гия",
      businessFinance: "Бизнес-ф��нансы",
      riskManagement: "Упра��ление рисками",
      accounting: "��ухгалтери��",
      portfolioManagement: "Управле��ие портфелем",
    },
    providerProfile: {
      providerNotFound: "Поставщ��к не найден",
      projectsCompleted: "про��ктов завершено",
      respondsIn: "Отвечает в течение",
      services: "У��луги",
      consultationsAvailable: "Дост��пные ко����сультации",
      portfolio: "Портфолио",
      skills: "Навыки",
      languages: "Языки",
      recentReviews: "Неда��ние отз��вы",
      readyToStart: "Готовы начать?",
      contactProvider:
        "Свяжитес�� с {name}, чтобы обсудить требо��ания к вашему проекту и получить индивидуальное предложение.",
      sendMessage: "О��пр��вить сообщение",
      contactApplyNow: "Связаться / Подать заявку се����час",
      getQuote: "Получить предложение",
      bookSession: "Забронировать сес����ию",
      videoCall: "В��д����озво���ок",
      duration: "Продолжительность",
      delivery: "Достав��а",
      perSession: "��а сессию",
      startingAt: "Начиная с",
      perHour: "в час",
      weeks: "недель",
      week: "неделя",
      minutes: "минут",
      seoTitle: "{name} - {title} | QuickHire.ee",
      seoDescription:
        "Най��ите {name}, квалиф��цированного {title} в {location}. {bio}",
      seoKeywords: "{name}, {title}, {skills}, {location}",
      agoText: "назад",
    },

    gating: {
      title: "Требуется доступ клиента",
      body: {
        viewProfile:
          "Просмотр полных профилей фрилансеров ��оступен с подпиской клиента.",
        generic:
          "Подпишитесь, чтобы просматривать профили, н��чинать чат�� и бронировать консультации.",
      },
      cta: {
        subscribe: "Подписат��ся сейчас",
        learn: "Узнать больше",
        back: "Вернуться к списку",
      },
      badge: {
        required: "Требуется подписка клиента.",
      },
    },
    roleToggle: {
      freelance: "Фрилансер",
      client: "Клиент",
      switching: "Переключение...",
    },
    categorySelection: {
      primaryCategory: "Основная категория",
      secondaryCategories: "Дополнительные категории",
      selectPrimaryCategory: "Выберите основную категорию",
      selectSecondaryCategories: "Выберите до 2 дополнительных категорий",
      suggestedCategory: "Рекомендуемая категория",
      upToTwoSecondary: "До 2 дополнительных категорий",
    },
    customerDashboard: {
      // Overview
      overview: "Обзор",
      recentActivity: "Недавняя активность",
      noRecentActivity: "Нет недавней активности",
      quickActions: "Быстрые действия",
      postNewTask: "Создать задач��",
      findFreelancers: "Найти фрилан��еров",
      bookConsultation: "��абронировать консультацию",
      expertAdvice: "Экспертные советы",
      browseProviders: "Найти п��ставщиков",
      findTalent: "Найти таланты",

      // Profile
      profile: "Профиль",
      editProfile: "Редактировать",
      changePhoto: "Изменить фото",
      uploading: "Загрузка...",
      nameCompany: "Имя/Компания",
      email: "E-mail",
      contactSupportToChangeEmail:
        "Для изменения email обратитесь в подд����ржку",
      linkedinUrl: "LinkedIn URL",
      websiteUrl: "Веб-сайт",
      website: "Веб-сайт",
      bio: "Краткое оп��сание",
      bioPlaceholder: "Расскажите о себе или своей компании...",
      languagesSpoken: "��ладею языками",
      addLanguagePrompt: "Добави��ь язык и нажать Enter",
      suggestions: "Предложения: ",
      demoNotice: "Демо - реальная функ��ия скоро",
      photoConstraints: "JPG, PNG или GIF. Максимум 5MB.",

      // Tasks
      tasks: "Задачи",
      yourTasks: "Ваши задачи",
      postTask: "С��здать задачу",
      taskTitle: "Название за��ачи",
      description: "Описание",
      budgetType: "Тип бюдж��та",
      amount: "Сумма (€)",
      deadline: "Дедлайн",
      cannotEdit: "Нельзя редакт��ровать",
      taskCanOnlyBeEdited:
        "Задачу м��жно редактировать то��ько пока она открыта.",
      taskUpdated: "Задача обновлена",
      proposals: "предложений",
      fixed: "Фиксированная",
      hourly: "Почасовая",
      flexible: "Гибкий",
      view: "Просмотр",
      edit: "Из��енить",
      cannotEditStatus: "Нельзя ��зменить",

      // Bookings
      bookings: "Брониро��ания",
      yourBookings: "Ваши бронировани��",
      bookNow: "Забронировать",
      reschedule: "Перенести",
      cancel: "О��менить",
      message: "��ообщение",
      cancellationRequestSent: "Запро�� на отм��ну отправлен",
      waitingForProviderResponse: "Ожидается ответ поставщика",
      rescheduleRequestSent: "Запрос на перенос отправлен",
      newTime: "Новое время",
      reason: "Причина: ",
      yourRating: "Ваша ����ценка",
      newDate: "Новая дата",
      reasonOptional: "Причина (оп��ионально)",
      explainRescheduleReason: "Объ��сните при��ину переноса...",
      sendRequest: "Отправит�� запрос",

      // Feedback
      feedback: "Отзывы",
      reviewsGiven: "Данные отзывы",
      reviewsReceived: "Полученные отзывы",

      // Settings
      settings: "Н��стройки",
      accountSettings: "Настройки ак��аунта",
      changePassword: "Изменить пароль",
      currentPassword: "Текущий пароль",
      newPassword: "Новый па���оль",
      confirmNewPassword: "Подтвердить ��овый пароль",
      updatePassword: "Обновить пароль",
      deleteAccount: "Удалить аккаунт",
      deleteAccountWarning:
        "Это д��й��твие необра��имо. Все ваши данные будут удалены.",
      confirmAccountDeletion: "По����твердить удаление аккаунта",
      typeDeleteConfirm:
        'Чтобы п��дтвердить удален��е, введите слово "удалит��" ниже:',
      accountDeleted: "Аккаунт удалён",

      // Notifications
      profileUpdatedSuccessfully: "Профиль обновлён успеш������",
      photoUpdated: "Фото обновлено",
      photoUpdateSuccess: "Ваше фото пр��филя было успешно о��новлено.",
      invalidFileType: "Неверный ти�� файла",
      selectImageFile: "Пожалуйста, выберите изображение.",
      fileTooLarge: "Файл слишком большой",
      maxFileSize: "Максималь����й размер файл�� 5MB.",
      uploadError: "Ошибка загрузки",
      uploadFailed: "Не ����алос�� з��грузить фото. Попробуйт�� снова.",
      fillAllFields: "Запол��ите все поля",
      allPasswordFieldsRequired:
        "Все поля пароля об��зательны д��я за��олнения.",
      passwordsDoNotMatch: "Пароли не совпадают",
      newPasswordConfirmationMustMatch:
        "Новый пароль и под��вержд��ние должны совпадать.",
      passwordUpdated: "Паро��ь обновлён",
      passwordUpdateSuccess: "Ваш ��ароль был успешно о��новлён.",
      accountDeletedSuccess: "Ваш аккаунт был успешно ����ал��н.",

      // Booking actions
      cancellationApproved: "Отмена одобрена",
      providerApprovedCancellation: "Поставщик одобрил отм�����у бронирования.",
      cancellationDenied: "Отмена отклонена",
      providerDeniedCancellation: "Поста��щик отклонил запро�� на отмену.",
      rescheduleApproved: "Перенос одобрен",
      providerApprovedReschedule:
        "Поставщик одобрил перено�� бронирования ��а новое время.",
      rescheduleDenied: "Перен��с о��клонен",
      providerDeniedReschedule: "Поставщик от��лонил запрос на пер��нос.",
      cancellationRequestSentNotification:
        "��апрос на отмену отправлен. Ожидаетс�� одобрение поставщика.",
      pendingProviderApproval: "О����дается одобрение поставщика.",
      rescheduleRequestSentNotification: "Запрос на пе��енос отправлен",
      providerWillBeNotified:
        "Поставщик по��учит уведомление о вашем запросе на п��ренос.",

      // Feature development notices
      featureInDevelopment: "Фун��ция в ��азработ��е",
      messagingSystemSoon:
        "Система сообщений будет доступна в ближайшее время.",
      realEditingSoon: "Это д��мо - реальное редактирование скоро",
      realFeatureSoon: "Это демо - ��еальная функция скоро",
      realUploadSoon: "Демо - ��еальная загрузка скоро",

      // Status translations
      status: {
        open: "Открыта",
        closed: "Закрыта",
        completed: "Завершена",
        cancelled: "Отменена",
        upcoming: "Предстоящая",
        pendingCancellation: "Ожидает отмены",
        pendingReschedule: "Ожидает перенос���",
      },

      // Form validation
      fillDateAndTime: "Заполнит�� дату и время",
      selectNewDateTime: "По��алуйста, выберите новую дату и время.",
      confirmCancelBooking: "Отмени��ь бронирование",
      sureToCancel: "Вы уверены, что хотите отменить это ��р��нирова��ие?",
      yes: "Да",
      no: "Нет",
      yesCancel: "Да, отменить",

      // Activity types
      activities: {
        taskPosted: "Созд��л задачу",
        consultationBooked: "Забронировал консультац��ю с",
        reviewReceived: "Получил 5-з��ездочный отзыв от",
        taskCompleted: "Завершил проект",
      },
    },
    customerOnboarding: {
      welcome: "Добро пожаловать!",
      letsSetupProfile: "Настроим ваш профиль",
      canSkipForNow: "Можете проп���стить пока",
      profilePhoto: "Ф��то профиля",
      uploadPhoto: "��агрузить фото",
      skipForNow: "Пропустить пока",
      tellUsAboutYourself: "Расска��ите о себе",
      whichLanguagesSpeak: "��а каки�� язы��ах говорите?",
      addSocialLinks: "Добавить социальные сс��лки",
      linkedin: "LinkedIn",
      whatBringsYouHere: "Что привело вас сюда?",
      bioHeadline: "Б��о/Заголовок",
      saveAndContinue: "Сох��анить и продолжить",
      skipThisStep: "Пропустить э��от шаг",
      profileSetupComplete: "Настройка профиля завершена",
      welcomeToDashboard: "Добро пожаловать в панель управления",
      getStarted: "Начать",
      completeProfileLater: "��авершить профиль позже",
    },
    taskCreation: {
      createNewTask: "Создать новую задачу",
      taskDetails: "Детали задачи",
      whatDoYouNeed: "Что вам нужно?",
      taskTitlePlaceholder: "например, разработка сайта, дизайн логотипа...",
      describeProject: "Опишите ваш проек��",
      taskDescriptionPlaceholder:
        "Расск��жите о вашем п����екте, требования�� и целях...",
      budgetAndTimeline: "Бюджет и сроки",
      budgetType: "Тип бюджета",
      fixedPrice: "Фиксированная цена",
      hourlyRate: "Почасовая оплата",
      flexibleBudget: "Гибкий бюджет",
      budgetAmount: "Сумма бюджета",
      estimatedHours: "Пре��полагаемые час��",
      projectDeadline: "Срок ��ро��кта",
      skillsAndCategory: "Навыки и ��атегория",
      selectCategory: "Выберите категорию",
      requiredSkills: "Необходимы�� навыки",
      addSkill: "Добавить навык",
      additionalInfo: "Дополнительная и��формация",
      isUrgent: "Срочн��",
      requiresNDA: "Требует NDA",
      remoteWorkOk: "��даленная ра��ота ОК",
      publishTask: "Оп��бликовать задачу",
      saveAsDraft: "Сохранить как черновик",
      taskPublished: "Задача опубликована",
      taskSavedAsDraft: "Задача сохранена как черновик",
      priority: "Приоритет",
      priorityNormal: "Нормальный",
      priorityHigh: "Высокий",
      priorityUrgentLabel: "Срочный",
      priorityCritical: "Критич��ский",
      requiredInvoice: "Требуется счет",
      createTask: "Создать задачу",
      fillRequiredFields: "Пожалуйста, запол��ите все обязательные поля",
    },
    consultationBooking: {
      bookConsultation: "Забро��иров��ть консультацию",
      selectDateTime: "Выберите дату и время",
      consultationDetails: "Дета��и ����нсу��ьтации",
      duration: "Пр��должит��льность",
      price: "Цена",
      sessionType: "Тип сессии",
      videoCall: "Видеозвонок",
      inPerson: "Лично",
      phoneCall: "Телефонный з��онок",
      whatToDiscuss: "Что ��бсудить?",
      discussionTopics: "Темы для обсуждения",
      contactInfo: "Контактная информация",
      phoneNumber: "Номер телефона",
      skypeId: "Skype ID",
      bookingConfirmation: "Подтверждение бронирования",
      confirmBooking: "Подтвердить ��ронирование",
      bookingRequests: "Запросы на бронирование",
      waitingConfirmation: "Ож��дание подтверждения",
      bookingConfirmed: "Бронирование ��одтверждено",
      bookingDeclined: "Бронирование отклонено",
    },

    // Provider Dashboard
    providerDashboard: {
      overview: "Обзор",
      bookings: "Бронирования",
      tasks: "Задачи",
      portfolio: "Портфолио",
      consultations: "Консультаци��",
      feedback: "Отз����ы",
      settings: "Настройки",

      // Overview tab
      welcomeBack: "Добро пожаловать",
      totalTasksCompleted: "Всего задач в��полнено",
      consultationsDelivered: "П��оведено консультаций",
      averageRating: "Средний рейтинг",
      totalReviews: "Всего отзывов",
      recentActivity: "Не��авняя активность",
      noRecentActivity: "Нет недавней активности",
      tasksInProgress: "Задачи в работе",
      upcomingConsultations: "Пред��тоящие консультации",
      pendingProposals: "Ож��дающие предложения",
      viewAll: "Посмотреть все",

      // Status Management
      status: "��татус",
      availableNow: "Доступен ��ейчас",
      busy: "За��ят",
      inactive: "Неакти��ен",
      statusExplain: {
        availableNow:
          "Клиенты могут бронировать, отправлять со��бщения и видят вас в поиске",
        busy: "О��ображается как 'Занят', нельзя ��ронировать, но можно пол��чать сообщен��я",
        inactive:
          "Профиль скрыт из поиска, нельзя бронировать или отправлять сообщения",
      },
      statusChanged: "Статус изменен",

      // Profile Header
      profilePhoto: "Фото профиля",
      changePhoto: "Изменить фото",
      uploadPhoto: "Загрузить фото",
      headline: "Заголовок",
      location: "Местоположение",
      languagesSpoken: "Языки общения",
      memberSince: "Участник с",
      editProfile: "Редактировать профиль",

      // Bookings Tab
      allBookings: "В��е б��онирования",
      pendingBookings: "Ожидающие бронирования",
      upcomingBookings: "Предстоящие бронирования",
      completedBookings: "Завершенные бронирования",
      cancelledBookings: "Отмененные бронирования",
      approveReschedule: "Подтвердить пере��ос",
      declineReschedule: "Отклонить перенос",
      rescheduleRequest: "Запрос на перенос",
      cancellationRequest: "За����рос на отмену",
      approve: "Подтвердить",
      decline: "Отклонить",
      startVideoCall: "Начать видеозвонок",
      messageCustomer: "Напи��ать клиен��у",
      bookingApproved: "Б��онирование ��од��верждено",
      bookingDeclined: "Бронирование отклонено",

      // Tasks Tab
      myProposals: "Мои предложе��ия",
      activeTasks: "Активные задачи",
      completedTasks: "Завершенные задачи",
      taskProposals: "Предложения по задачам",
      submitProposal: "Отправить предложение",
      viewTaskDetails: "Посмотреть детали зад��чи",
      chatWithCustomer: "Чат с клиентом",
      submitDeliverable: "Отправить резу��ьтат",
      markAsComplete: "Отметить как заверш��н��ое",
      proposalSubmitted: "Предложение отправлено",
      taskCompleted: "За��ача завершен��",

      // Portfolio Tab
      publicProfile: "Публичный профиль",
      addProject: "Добавить прое��т",
      editProject: "Редактиров��ть проект",
      deleteProject: "Удалить проект",
      projectTitle: "Название проекта",
      projectDescription: "Описание проекта",
      projectImages: "Изображени�� проекта",
      showPortfolioPublicly: "По����зывать портфол��о публично",
      previewAsCustomer: "Предпросмотр как клиент",
      portfolioUpdated: "Портфолио обновлено",

      // Consultations Tab
      myConsultations: "Мои консультации",
      addConsultation: "Добавить консультацию",
      editConsultation: "Редактировать консультаци��",
      consultationTitle: "Назв��ние консультации",
      consultationDescription: "Описание консультации",
      consultationPrice: "Цена консультации",
      consultationDuration: "��лите��ьность ��онсультации",
      availableForVideoCall: "Доступно для видеозв����нка",
      availableSlots: "Доступные слоты",
      consultationAdded: "Консульт��ция добавлена",
      consultationUpdated: "Консультация о��новлена",
      consultationDeleted: "Ко��су��ьтация удалена",

      // Feedback Tab
      customerReviews: "Отзывы клиентов",
      myReviews: "��ои отзывы",
      leaveReview: "Оставить отзыв",
      replyToReview: "Ответить на отзыв",
      rating: "Рейтинг",
      reviewText: "Текст отзыва",
      reviewSubmitted: "Отзыв отправлен",

      // Settings Tab
      changePassword: "Изменить пароль",
      deleteAccount: "Удалить аккаунт",
      emailNotifications: "Email уведомления",
      subscriptionPlan: "Пла�� ��одписки",
      currentPlan: "Текущий план",
      upgradeDowngrade: "Повысить/Понизить",
      paymentHistory: "История платежей",
      profileSaved: "Профил�� сохранен",
      passwordChanged: "Пароль изменен",
      accountDeleted: "Аккаунт удален",

      // Common Actions
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Реда��тировать",
      delete: "Удалит��",
      confirm: "Подтвердить",
      upload: "Загрузить",
      preview: "Предпросмотр",
      back: "Назад",
      next: "Далее",
      finish: "Завершить",
    },

    // Authentication
    auth: {
      // Login
      login: "��ойти",
      loginTitle: "Вход �� акка����т",
      loginSubtitle: "Добро пожалова��ь! Введите ваши данные.",
      email: "E-mail",
      password: "Пароль",
      showPassword: "Показать пароль",
      hidePassword: "Скрыть пароль",
      rememberMe: "За��омнить меня",
      forgotPassword: "Забыли пароль",
      loginButton: "Войти",
      continueWithGoogle: "Продолжить с Google",
      dontHaveAccount: "Нет аккаунта?",

      // Sign Up
      signUp: "Регистрация",
      signUpTitle: "��оздать аккаунт",
      signUpSubtitle: "Начните с QuickHire у��е сегодня",
      firstName: "Имя",
      lastName: "Фамилия",
      company: "Компани�� (необязательно)",
      confirmPassword: "Подтвердить пароль",
      country: "Страна",
      accountType: "Тип аккаунта",
      accountTypeProvider: "Фрилансер",
      accountTypeCustomer: "Клиент",
      accountTypeProviderDesc: "Предлагаю услу��и",
      accountTypeCustomerDesc: "Ищу услуги",
      agreeToTerms: "Сог��аситься с условиями",
      termsAndConditions: "Условия и положения",
      privacyPolicy: "Политика конфиденциальности",
      marketingEmails: "Маркетинговые письма",
      createAccount: "Создать аккаунт",
      alreadyHaveAccount: "Уже есть аккаунт?",

      // Validation
      required: "Это поле обяз����ельно",
      invalidEmail: "Неверный ф��рмат e-mail",
      passwordTooShort: "Пароль должен содержать минимум 8 символов",
      passwordsDontMatch: "Пароли не совпадают",
      mustAgreeToTerms: "Необходимо со��ласиться с условиями",

      // Success
      loginSuccess: "Вхо�� выполнен успешно",
      signUpSuccess: "Аккаунт создан успешно",

      // Errors
      loginError: "Ошибка входа",
      signUpError: "Ошибка регистрации",
      emailAlreadyExists: "E-mail уже существует",
      invalidCredentials: "Неверные учетные данные",
    },
  },
};

export type Language = keyof typeof translations;

export const languages = [
  { code: "et" as Language, name: "Eesti", flag: "🇪🇪" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
];

export const defaultLanguage: Language = "et";

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations[defaultLanguage];
}
