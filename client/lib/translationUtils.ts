// Translation utility to reduce redundant conditional patterns
export const translateText = (
  texts: { ru: string; en: string; et: string },
  currentLanguage: string,
): string => {
  const lang = currentLanguage as keyof typeof texts;
  return texts[lang] || texts.en;
};

// Common CSS classes to reduce repetition
export const commonStyles = {
  input:
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  inputDisabled:
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed",
  primaryButton:
    "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
  secondaryButton:
    "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors",
  flexItems: "flex items-center",
  cardBase: "bg-white border border-gray-200 rounded-xl p-6",
  cardHover:
    "bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200",
};

// Preset translations for common UI elements
export const commonTranslations = {
  edit: (currentLanguage: string) =>
    translateText(
      {
        ru: "Редактировать",
        en: "Edit",
        et: "Muuda",
      },
      currentLanguage,
    ),

  save: (currentLanguage: string) =>
    translateText(
      {
        ru: "Сохранить",
        en: "Save",
        et: "Salvesta",
      },
      currentLanguage,
    ),

  cancel: (currentLanguage: string) =>
    translateText(
      {
        ru: "Отмена",
        en: "Cancel",
        et: "Tühista",
      },
      currentLanguage,
    ),

  delete: (currentLanguage: string) =>
    translateText(
      {
        ru: "Удалить",
        en: "Delete",
        et: "Kustuta",
      },
      currentLanguage,
    ),

  confirm: (currentLanguage: string) =>
    translateText(
      {
        ru: "Подтвердить",
        en: "Confirm",
        et: "Kinnita",
      },
      currentLanguage,
    ),

  loading: (currentLanguage: string) =>
    translateText(
      {
        ru: "Загрузка...",
        en: "Loading...",
        et: "Laadimine...",
      },
      currentLanguage,
    ),

  budgetTypes: {
    fixed: (currentLanguage: string) =>
      translateText(
        {
          ru: "Фиксированная",
          en: "Fixed",
          et: "Fikseeritud",
        },
        currentLanguage,
      ),

    hourly: (currentLanguage: string) =>
      translateText(
        {
          ru: "Почасовая",
          en: "Hourly",
          et: "Tunnis",
        },
        currentLanguage,
      ),

    flexible: (currentLanguage: string) =>
      translateText(
        {
          ru: "Гибкий",
          en: "Flexible",
          et: "Paindlik",
        },
        currentLanguage,
      ),
  },

  // Provider Availability Translations
  availability: {
    modal: {
      title: (currentLanguage: string) =>
        translateText(
          {
            ru: "Доступность",
            en: "Availability",
            et: "Saadavus",
          },
          currentLanguage,
        ),

      status: (currentLanguage: string) =>
        translateText(
          {
            ru: "Статус",
            en: "Status",
            et: "Olek",
          },
          currentLanguage,
        ),

      awayPeriod: (currentLanguage: string) =>
        translateText(
          {
            ru: "Период отсутствия",
            en: "Away Period",
            et: "Eemaloleku periood",
          },
          currentLanguage,
        ),
    },

    states: {
      available: (currentLanguage: string) =>
        translateText(
          {
            ru: "Доступен сейчас",
            en: "Available now",
            et: "Praegu saadaval",
          },
          currentLanguage,
        ),

      busy: (currentLanguage: string) =>
        translateText(
          {
            ru: "Занят",
            en: "Busy",
            et: "Hõivatud",
          },
          currentLanguage,
        ),

      inactive: (currentLanguage: string) =>
        translateText(
          {
            ru: "Неактивен / На перерыве",
            en: "Inactive / On break",
            et: "Mitteaktiivne / Puhkusel",
          },
          currentLanguage,
        ),
    },

    descriptions: {
      available: (currentLanguage: string) =>
        translateText(
          {
            ru: "Готов принимать новые заказы и отвечать на сообщения",
            en: "Ready to take new bookings and respond to messages",
            et: "Valmis võtma uusi broneeringuid ja vastama sõnumitele",
          },
          currentLanguage,
        ),

      busy: (currentLanguage: string) =>
        translateText(
          {
            ru: "Типичный ответ: ~24-48 часов",
            en: "Typical response: ~24-48h",
            et: "Tüüpiline vastamise aeg: ~24-48h",
          },
          currentLanguage,
        ),

      inactive: (currentLanguage: string) =>
        translateText(
          {
            ru: "Не принимаю новые заказы, ограниченная доступность",
            en: "Not taking new bookings, limited availability",
            et: "Ei võta uusi broneeringuid, piiratud saadavus",
          },
          currentLanguage,
        ),
    },

    unavailable: {
      badge: (currentLanguage: string) =>
        translateText(
          {
            ru: "Недоступен",
            en: "Unavailable",
            et: "Pole saadaval",
          },
          currentLanguage,
        ),

      until: (currentLanguage: string) =>
        translateText(
          {
            ru: "до",
            en: "until",
            et: "kuni",
          },
          currentLanguage,
        ),

      awayMessage: (currentLanguage: string) =>
        translateText(
          {
            ru: "Я отсутствую до {date}. Отвечу, когда вернусь.",
            en: "I'm away until {date}. I'll reply when I'm back.",
            et: "Olen eemal kuni {date}. Vastan, kui tagasi jõuan.",
          },
          currentLanguage,
        ),
    },
  },

  // Subscription Management Translations
  subscription: {
    title: (currentLanguage: string) =>
      translateText(
        {
          ru: "Управление подпиской",
          en: "Subscription Management",
          et: "Tellimuse haldus",
        },
        currentLanguage,
      ),

    currentPlan: (currentLanguage: string) =>
      translateText(
        {
          ru: "Текущий план",
          en: "Current Plan",
          et: "Praegune plaan",
        },
        currentLanguage,
      ),

    managePlan: (currentLanguage: string) =>
      translateText(
        {
          ru: "Управление планом",
          en: "Manage Plan",
          et: "Halda plaani",
        },
        currentLanguage,
      ),

    paymentHistory: (currentLanguage: string) =>
      translateText(
        {
          ru: "История платежей",
          en: "Payment History",
          et: "Maksete ajalugu",
        },
        currentLanguage,
      ),

    planExpired: (currentLanguage: string) =>
      translateText(
        {
          ru: "План истек",
          en: "Plan Expired",
          et: "Plaan aegunud",
        },
        currentLanguage,
      ),

    renewPlan: (currentLanguage: string) =>
      translateText(
        {
          ru: "Продлить план",
          en: "Renew Plan",
          et: "Uuenda plaani",
        },
        currentLanguage,
      ),

    planFeatures: (currentLanguage: string) =>
      translateText(
        {
          ru: "Функции плана",
          en: "Plan Features",
          et: "Plaani funktsioonid",
        },
        currentLanguage,
      ),
  },

  // Feature Development Notices
  featureInDevelopment: (currentLanguage: string) =>
    translateText(
      {
        ru: "Функция в разработке",
        en: "Feature in development",
        et: "Funktsioon arendamisel",
      },
      currentLanguage,
    ),

  comingSoon: (currentLanguage: string) =>
    translateText(
      {
        ru: "Скоро будет доступно!",
        en: "Coming soon!",
        et: "Tuleb varsti!",
      },
      currentLanguage,
    ),
};
