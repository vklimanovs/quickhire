import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Card from "./Card";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center px-4">
          <Card shadow="md" padding="lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-600 mb-6">{description}</p>
            <p className="text-sm text-gray-500 mb-6">
              This page is under construction. Continue prompting to help us
              build out this section!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
