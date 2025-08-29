import { useEffect, ReactElement } from "react";

interface SEOProps {
  title: string | ReactElement;
  description: string | ReactElement;
  keywords?: string;
  url?: string;
}

// Helper function to extract text from React elements
function extractTextFromElement(element: string | ReactElement): string {
  if (typeof element === "string") {
    return element;
  }

  // If it's a React element, try to extract text content
  if (element && typeof element === "object" && "props" in element) {
    // Handle LanguageText component
    if (element.props && element.props.ru) {
      return element.props.ru; // Default to Russian for SEO
    }

    // Handle other React elements - convert to string
    return String(element);
  }

  return String(element);
}

export default function SEO({ title, description, keywords, url }: SEOProps) {
  useEffect(() => {
    const titleText = extractTextFromElement(title);
    const descriptionText = extractTextFromElement(description);

    // Set page title
    document.title = titleText;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionText);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", descriptionText);
      document.head.appendChild(metaDescription);
    }

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        metaKeywords.setAttribute("content", keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Update or create canonical URL
    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", url);
      } else {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        canonical.setAttribute("href", url);
        document.head.appendChild(canonical);
      }
    }

    // Open Graph meta tags
    const ogTitle =
      document.querySelector('meta[property="og:title"]') ||
      document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", titleText);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription =
      document.querySelector('meta[property="og:description"]') ||
      document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.setAttribute("content", descriptionText);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogType =
      document.querySelector('meta[property="og:type"]') ||
      document.createElement("meta");
    ogType.setAttribute("property", "og:type");
    ogType.setAttribute("content", "website");
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }

    if (url) {
      const ogUrl =
        document.querySelector('meta[property="og:url"]') ||
        document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      ogUrl.setAttribute("content", url);
      if (!document.querySelector('meta[property="og:url"]')) {
        document.head.appendChild(ogUrl);
      }
    }
  }, [title, description, keywords, url]);

  return null; // This component doesn't render anything
}
