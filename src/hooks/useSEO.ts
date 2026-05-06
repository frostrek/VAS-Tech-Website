import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  schema?: object; // For JSON-LD structured data
  ogImage?: string; // For Open Graph Image
}

export const useSEO = ({ title, description, canonical, schema, ogImage }: SEOProps) => {
  useEffect(() => {
    const domain = 'https://vastechconsulting.com';
    const currentUrl = typeof window !== 'undefined' ? `${domain}${window.location.pathname}` : domain;
    
    // Default image
    const finalImage = ogImage || `${domain}/logo.png`;
    // Format canonical
    let finalCanonical = canonical || currentUrl;
    if (finalCanonical.startsWith('/')) {
      finalCanonical = `${domain}${finalCanonical}`;
    }
    // Update Title
    const fullTitle = `${title} | VAS Tech`;
    document.title = fullTitle;

    // Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', description);
        document.head.appendChild(metaDescription);
      }
      
      // Also update OG description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) ogDescription.setAttribute('content', description);
      
      // Update Twitter description
      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDesc);
      }
      twitterDesc.setAttribute('content', description);
    }

    // Update Canonical
    if (finalCanonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', finalCanonical);
      } else {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        linkCanonical.setAttribute('href', finalCanonical);
        document.head.appendChild(linkCanonical);
      }
      
      // Update OG URL
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', finalCanonical);
    }

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // Update Twitter Title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', fullTitle);

    // Update OG Image
    if (finalImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', finalImage);
      } else {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        ogImageMeta.setAttribute('content', finalImage);
        document.head.appendChild(ogImageMeta);
      }
      
      // Update Twitter Image
      let twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImageMeta) {
        twitterImageMeta = document.createElement('meta');
        twitterImageMeta.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImageMeta);
      }
      twitterImageMeta.setAttribute('content', finalImage);
    }

    // Inject JSON-LD Structured Data
    let scriptTag = document.querySelector('script[id="dynamic-schema"]');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'dynamic-schema');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      // Remove schema if not provided for this page
      scriptTag.remove();
    }

  }, [title, description, canonical, schema, ogImage]);
};
