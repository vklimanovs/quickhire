import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

export default function Footer() {
  const { currentLanguage, t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link
              to={`/${currentLanguage}`}
              className="text-2xl font-bold text-white mb-4 block"
            >
              QuickHire
            </Link>
            <p className="text-gray-300 max-w-md">{t.footer.description}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`/${currentLanguage}/about`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLanguage}/contact`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase mb-4">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`/${currentLanguage}/terms`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.footer.termsConditions}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLanguage}/privacy`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
