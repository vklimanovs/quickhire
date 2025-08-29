import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { currentLanguage, t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-16">
            {/* 404 Icon */}
            <div className="mb-8">
              <span className="text-9xl font-bold text-blue-100 block">
                404
              </span>
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.notFound.pageNotFound}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {t.notFound.pageNotFoundDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={`/${currentLanguage}`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                {t.notFound.returnHome}
              </Link>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.notFound.goBack}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
