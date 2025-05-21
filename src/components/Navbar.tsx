
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // This would be replaced with actual authentication after Supabase integration
  const isAuthenticated = false;

  return (
    <nav className="border-b border-gray-200 py-4 bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-brand-500 to-purple-500 w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-gray-900">AppMarket</span>
        </Link>

        <div className="flex-1 max-w-md mx-4 relative">
          <form onSubmit={(e) => { e.preventDefault(); console.log("Search for:", searchTerm); }}>
            <Input
              type="text"
              placeholder="Search for apps..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/apps">
            <Button variant="ghost">Browse Apps</Button>
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/upload">
                <Button variant="outline">Upload App</Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost">My Profile</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
