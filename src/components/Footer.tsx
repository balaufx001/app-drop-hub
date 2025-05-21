
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-brand-500 to-purple-500 w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AppMarket</span>
          </Link>
          <p className="mt-4 text-gray-600 text-sm">
            The premier marketplace for mobile app distribution.
            Upload, discover, and download the latest Android apps.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">For Developers</h3>
          <ul className="space-y-2">
            <li><Link to="/upload" className="text-gray-600 hover:text-brand-500 text-sm">Upload App</Link></li>
            <li><Link to="/dashboard" className="text-gray-600 hover:text-brand-500 text-sm">Developer Dashboard</Link></li>
            <li><Link to="/docs" className="text-gray-600 hover:text-brand-500 text-sm">Documentation</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">For Users</h3>
          <ul className="space-y-2">
            <li><Link to="/apps" className="text-gray-600 hover:text-brand-500 text-sm">Browse Apps</Link></li>
            <li><Link to="/categories" className="text-gray-600 hover:text-brand-500 text-sm">Categories</Link></li>
            <li><Link to="/popular" className="text-gray-600 hover:text-brand-500 text-sm">Popular Apps</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-gray-600 hover:text-brand-500 text-sm">About Us</Link></li>
            <li><Link to="/terms" className="text-gray-600 hover:text-brand-500 text-sm">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-gray-600 hover:text-brand-500 text-sm">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} AppMarket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
