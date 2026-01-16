import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  FileText,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Activity,
  Globe,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "CVD Test", path: "/predict" },
    { name: "Models", path: "/models" },
    { name: "Research", path: "/research" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const resources = [
    { name: "Documentation", path: "/docs" },
    { name: "API Access", path: "/api" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Publications", path: "/publications" },
    { name: "FAQs", path: "/faq" },
    { name: "Support", path: "/support" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "HIPAA Compliance", path: "/hipaa" },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "https://facebook.com" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com" },
  ];

  const healthcarePartners = [
    { name: "American Heart Association", url: "https://heart.org" },
    { name: "CDC Cardiovascular Health", url: "https://cdc.gov" },
    { name: "WHO Cardiovascular Diseases", url: "https://who.int" },
    { name: "NIH Heart & Vascular", url: "https://nih.gov" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">CVD Risk Predictor</h2>
                <p className="text-blue-200 font-medium">
                  Empowering Heart Health Decisions
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Advanced cardiovascular disease risk prediction using machine
              learning models to help individuals and healthcare professionals
              make informed decisions about heart health.
            </p>
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">HIPAA Compliant</span>
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">Medical Grade</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition flex items-center gap-2 group"
                  >
                    <span className="group-hover:text-blue-400 transition">
                      •
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@cvdpredictor.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span>
                  123 Medical Innovation Drive
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Middle Section - Healthcare Partners */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Trusted by Healthcare Professionals Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {healthcarePartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 hover:bg-gray-800 transition p-4 rounded-lg text-center group"
              >
                <Globe className="w-6 h-6 mx-auto mb-2 text-blue-400 group-hover:text-blue-300 transition" />
                <span className="text-sm text-gray-300 group-hover:text-white transition">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>
              © {currentYear} CVD Risk Predictor. All rights reserved.
              <span className="mx-2">•</span>
              This tool is for informational purposes only and not a substitute
              for professional medical advice.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 transition p-2 rounded-lg"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-full shadow-lg z-50"
        aria-label="Back to top"
      >
        <ArrowUpRight className="w-5 h-5 rotate-[-45deg]" />
      </button>

      {/* Emergency Notice */}
      <div className="bg-red-900/30 border-t border-red-800 py-3">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-red-200">
            ⚠️ If you are experiencing chest pain, shortness of breath, or other
            symptoms of a heart attack, call emergency services immediately.
            This tool is for risk assessment only.
          </p>
        </div>
      </div>
    </footer>
  );
}
