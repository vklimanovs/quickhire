import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import { useLanguage } from "../lib/LanguageContext";
import { useSubscription } from "../lib/SubscriptionContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../hooks/use-toast";
import { Check, Users, Briefcase, Crown } from "lucide-react";
import LanguageText from "../components/common/LanguageText";
import CustomButton from "../components/forms/Button";
import CustomCard from "../components/forms/Card";

type BillingPeriod = "monthly" | "annual";
type SelectedPlan = "client" | null;

export default function Pricing() {
  const { currentLanguage, t } = useLanguage();
  const { openSubscriptionModal } = useSubscription();
  const { user, switchRole } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle URL parameters for plan preselection
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam === "monthly" || planParam === "annual") {
      setBillingPeriod(planParam);
    }
  }, [searchParams]);

  const handlePlanSelect = async (plan: SelectedPlan) => {
    if (plan === "client") {
      setSelectedPlan(plan);
      setIsLoading(true);

      try {
        // Simulate subscription process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Check if this came from role switching
        const source = searchParams.get("source");
        if (source === "role-switch" && user) {
          // After successful "subscription", switch to client role
          await switchRole("customer");

          toast({
            title:
              currentLanguage === "ru"
                ? "Подписка активирована!"
                : currentLanguage === "en"
                  ? "Subscription activated!"
                  : "Tellimus aktiveeritud!",
            description:
              currentLanguage === "ru"
                ? "Переключение на панель клиента"
                : currentLanguage === "en"
                  ? "Switching to client dashboard"
                  : "Lähme kliendi juhtpaneelile",
            variant: "default",
          });

          // Navigate back to dashboard or previous page
          window.history.back();
        } else {
          // Regular subscription flow
          openSubscriptionModal("general");

          toast({
            title:
              currentLanguage === "ru"
                ? "Подписка"
                : currentLanguage === "en"
                  ? "Subscription"
                  : "Tellimus",
            description:
              currentLanguage === "ru"
                ? "Открытие модуля подписки..."
                : currentLanguage === "en"
                  ? "Opening subscription modal..."
                  : "Tellimuse modaali avamine...",
            variant: "default",
          });
        }
      } catch (error) {
        toast({
          title:
            currentLanguage === "ru"
              ? "Ошибка"
              : currentLanguage === "en"
                ? "Error"
                : "Viga",
          description:
            currentLanguage === "ru"
              ? "Не удалось обработать подписку"
              : currentLanguage === "en"
                ? "Failed to process subscription"
                : "Tellimuse töötlemine ebaõnnestus",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setSelectedPlan(null);
      }
    }
  };

  const getClientPrice = () => {
    return billingPeriod === "monthly" ? "€10" : "€100";
  };

  const getClientPeriod = () => {
    switch (currentLanguage) {
      case "ru":
        return billingPeriod === "monthly" ? "/месяц" : "/год";
      case "en":
        return billingPeriod === "monthly" ? "/month" : "/year";
      default:
        return billingPeriod === "monthly" ? "/kuus" : "/aastas";
    }
  };

  const getButtonText = () => {
    if (selectedPlan === "client" && isLoading) {
      return currentLanguage === "ru"
        ? "Обработка..."
        : currentLanguage === "en"
          ? "Processing..."
          : "Töötlemine...";
    }

    const price = getClientPrice();
    const action =
      currentLanguage === "ru"
        ? "Подписаться"
        : currentLanguage === "en"
          ? "Subscribe"
          : "Tellima";

    return `${action} (${price})`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={
          <LanguageText
            ru="Простые тарифные планы | QuickHire.ee"
            en="Simple Pricing Plans | QuickHire.ee"
            et="Lihtne hinnakiri | QuickHire.ee"
          />
        }
        description={
          <LanguageText
            ru="Простые, прозрачные цены. Начните нанимать лучших специалистов уже сегодня с нашим планом Клиент за €10/месяц или сэкономьте 20% при годовой оплате."
            en="Simple, transparent pricing. Start hiring top talent today with our Client plan at €10/month or save 20% with annual billing."
            et="Lihtne, läbipaistev hinnakiri. Alustage täna parimaid spetsialiste palkamist meie Kliendi plaaniga €10/kuus või säästa 20% aastamaksega."
          />
        }
        keywords={
          currentLanguage === "ru"
            ? "цены, подписки, цены платформы, Эстония"
            : currentLanguage === "en"
              ? "pricing, subscriptions, platform prices, Estonia"
              : "hinnakiri, tellimused, platvormi hinnad, Eesti"
        }
        url={`https://quickhire.ee/${currentLanguage}/pricing`}
      />
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <LanguageText
              ru="Простые цены, мощные результаты"
              en="Simple Pricing, Powerful Results"
              et="Lihtne hinnakiri, võimsad tulemused"
            />
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <LanguageText
              ru="Выберите план, который подходит именно вам. Начните бесплатно как фрилансер или ускорьте свой бизнес с планом Клиент."
              en="Choose the plan that fits your needs. Start free as a freelancer or accelerate your business with our Client plan."
              et="Valige endale sobiv plaan. Alustage tasuta vabakutselisena või kiirendage oma äri meie Kliendi plaaniga."
            />
          </p>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 inline-flex"
            role="tablist"
            aria-label={
              currentLanguage === "ru"
                ? "Период выставления счетов"
                : currentLanguage === "en"
                  ? "Billing period"
                  : "Arveldusperiood"
            }
          >
            <button
              role="tab"
              aria-selected={billingPeriod === "monthly"}
              aria-controls="monthly-panel"
              id="monthly-tab"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {currentLanguage === "ru"
                ? "Ежемесячно"
                : currentLanguage === "en"
                  ? "Monthly"
                  : "Kuukiri"}
            </button>
            <button
              role="tab"
              aria-selected={billingPeriod === "annual"}
              aria-controls="annual-panel"
              id="annual-tab"
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                billingPeriod === "annual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {currentLanguage === "ru"
                ? "Ежегодно"
                : currentLanguage === "en"
                  ? "Annual"
                  : "Aastakiri"}
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {currentLanguage === "ru"
                  ? "Сэкономьте 20%"
                  : currentLanguage === "en"
                    ? "Save 20%"
                    : "Säästa 20%"}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mb-16">
          {/* Freelance Plan - Free */}
          <CustomCard
            border
            shadow="sm"
            padding="lg"
            className="relative w-full md:w-80 lg:w-96 flex flex-col"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentLanguage === "ru"
                  ? "Фрилансер"
                  : currentLanguage === "en"
                    ? "Freelance"
                    : "Vabakutseline"}
              </h3>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {currentLanguage === "ru"
                  ? "Бесплатно"
                  : currentLanguage === "en"
                    ? "Free"
                    : "Tasuta"}
              </div>
              <p className="text-gray-600 text-sm">
                {currentLanguage === "ru"
                  ? "Для профессионалов, ищущих проекты"
                  : currentLanguage === "en"
                    ? "For professionals looking for projects"
                    : "Professionaalidele, kes otsivad projekte"}
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Просматривайте все про��кты и задачи"
                    : currentLanguage === "en"
                      ? "Browse all projects and tasks"
                      : "Sirvi kõiki projekte ja ülesandeid"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Отправляйте конкурентные предложения"
                    : currentLanguage === "en"
                      ? "Submit competitive proposals"
                      : "Esitage konkurentsivõimelisi pakkumisi"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Предлагайте экспертные услуги"
                    : currentLanguage === "en"
                      ? "Offer expert services"
                      : "Pakkuge ekspertteenuseid"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Проводите профессиональные консультации"
                    : currentLanguage === "en"
                      ? "Provide professional consultations"
                      : "Pakkuge professionaalseid konsultatsioone"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Никаких комиссий или скрытых платежей"
                    : currentLanguage === "en"
                      ? "No commission or hidden fees"
                      : "Ei mingeid vahendustasusid või varjatud tasusid"}
                </span>
              </div>
            </div>

            <button
              disabled
              className="w-full bg-gray-100 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed mt-auto"
            >
              {currentLanguage === "ru"
                ? "Всегда бесплатно"
                : currentLanguage === "en"
                  ? "Always Free"
                  : "Alati tasuta"}
            </button>
          </CustomCard>

          {/* Client Plan */}
          <CustomCard
            border
            shadow="lg"
            padding="lg"
            className="relative transform transition-all w-full md:w-80 lg:w-96 flex flex-col lg:scale-105"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                <Crown className="h-4 w-4 mr-1" />
                {currentLanguage === "ru"
                  ? "Самы�� популярный"
                  : currentLanguage === "en"
                    ? "Most Popular"
                    : "Populaarseim"}
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentLanguage === "ru"
                  ? "Клиент"
                  : currentLanguage === "en"
                    ? "Client"
                    : "Klient"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {currentLanguage === "ru"
                  ? "Для бизнеса, быстро нанимающего лучшие таланты"
                  : currentLanguage === "en"
                    ? "For businesses hiring top talent quickly"
                    : "Ettevõtetele, kes palkavad kiirest parimaid talente"}
              </p>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {getClientPrice()}
                </span>
                <span className="text-gray-600 ml-2">{getClientPeriod()}</span>
              </div>
              {billingPeriod === "annual" && (
                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {currentLanguage === "ru"
                    ? "Сэкономьт�� 20% — €96/год"
                    : currentLanguage === "en"
                      ? "Save 20% — €96/year"
                      : "Säästa 20% — €96/aastas"}
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Публикуйте неограниченные проекты"
                    : currentLanguage === "en"
                      ? "Post unlimited projects"
                      : "Avaldage piiramatud projektid"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Прямые сообщения лучшим профессионалам"
                    : currentLanguage === "en"
                      ? "Direct messaging with top professionals"
                      : "Otsesõnumid tippprofessionaalidega"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Полный доступ к контактной информации"
                    : currentLanguage === "en"
                      ? "Full access to contact information"
                      : "Täielik juurdepääs kontaktandmetele"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Мгновенное бронирование консультаций"
                    : currentLanguage === "en"
                      ? "Instant consultation booking"
                      : "Kohesed konsultatsiooni broneeringud"}
                </span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  {currentLanguage === "ru"
                    ? "Приоритетная поддержка клиентов"
                    : currentLanguage === "en"
                      ? "Priority customer support"
                      : "Prioriteetne klienditugi"}
                </span>
              </div>
            </div>

            <button
              onClick={() => handlePlanSelect("client")}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all mt-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {selectedPlan === "client"
                ? getButtonText()
                : searchParams.get("source") === "role-switch"
                  ? currentLanguage === "ru"
                    ? "Подписаться и переключиться"
                    : currentLanguage === "en"
                      ? "Subscribe & Switch"
                      : "Telli ja lülita"
                  : currentLanguage === "ru"
                    ? "Начать сейчас"
                    : currentLanguage === "en"
                      ? "Start Now"
                      : "Alusta kohe"}
            </button>
          </CustomCard>
        </div>

        {/* CTA Section */}
        {selectedPlan && (
          <div className="text-center mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-blue-900 font-medium">{getButtonText()}</p>
              <p className="text-blue-700 text-sm mt-2">
                {currentLanguage === "ru"
                  ? "Нажмите кнопку выше для продолжения"
                  : currentLanguage === "en"
                    ? "Click the button above to continue"
                    : "Jätkamiseks kliki ülalolevas nupul"}
              </p>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentLanguage === "ru"
                ? "Часто задаваемые вопросы"
                : currentLanguage === "en"
                  ? "Frequently Asked Questions"
                  : "Korduma kippuvad küsimused"}
            </h2>
          </div>

          <CustomCard border shadow="sm" padding="md" className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                {currentLanguage === "ru"
                  ? "Могу ли я отменить в любое время?"
                  : currentLanguage === "en"
                    ? "Can I cancel anytime?"
                    : "Kas saan igal ajal tühistada?"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "ru"
                  ? "Да, отменяйте в любое время без комиссий."
                  : currentLanguage === "en"
                    ? "Yes, cancel anytime with no fees."
                    : "Jah, tühistage igal ajal ilma tasudeta."}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                {currentLanguage === "ru"
                  ? "Что происходит с проектами при отмене?"
                  : currentLanguage === "en"
                    ? "What happens to projects when I cancel?"
                    : "Mis juhtub projektidega, kui tühistan?"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "ru"
                  ? "Активные проекты остаются до завершения, но новые создать нельзя."
                  : currentLanguage === "en"
                    ? "Active projects remain until completion, but no new ones can be created."
                    : "Aktiivsed projektid jäävad valmimiseni, kuid uusi luua ei saa."}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                {currentLanguage === "ru"
                  ? "Есть ли комиссии за транзакции?"
                  : currentLanguage === "en"
                    ? "Are there transaction fees?"
                    : "Kas on tehingutasusid?"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "ru"
                  ? "Нет, мы не берем комиссию."
                  : currentLanguage === "en"
                    ? "No, we don't take commission."
                    : "Ei, me ei võta vahendustasu."}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">
                {currentLanguage === "ru"
                  ? "Могу ли я поменять план?"
                  : currentLanguage === "en"
                    ? "Can I change plans?"
                    : "Kas saan plaani muuta?"}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === "ru"
                  ? "Да, переключайтесь между месячным и годовым планом в любое время."
                  : currentLanguage === "en"
                    ? "Yes, switch between monthly and annual plans anytime."
                    : "Jah, vahetage kuu- ja aastaplaani vahel igal ajal."}
              </p>
            </div>
          </CustomCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
