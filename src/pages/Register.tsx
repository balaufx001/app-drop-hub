
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would be replaced with Supabase authentication
      console.log("Register attempt:", name, email, password);
      
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Image */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-brand-500 to-purple-600 p-12 text-white">
        <div className="h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Android App Community</h2>
          <p className="text-lg opacity-90 mb-8">
            Create an account to download apps, track your favorite applications, and publish your own APKs.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-medium mb-2">Benefits of Joining</h3>
              <ul className="list-disc list-inside text-sm opacity-90 space-y-1">
                <li>Publish your own Android applications</li>
                <li>Track download statistics for your apps</li>
                <li>Bookmark favorite apps for later</li>
                <li>Get notified about app updates</li>
                <li>Join a community of mobile app enthusiasts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="bg-gradient-to-r from-brand-500 to-purple-500 w-10 h-10 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">AppMarket</span>
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-gray-500 mt-1">Sign up to get started</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Password must be at least 8 characters long.
                  </p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" className="mt-1" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-500 leading-tight"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-brand-500 hover:underline">
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-brand-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                      Creating account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-500 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          
          <div className="md:hidden mt-8 text-center text-sm text-gray-500">
            <p className="font-medium mb-2">Benefits of Joining</p>
            <ul className="text-left space-y-1 max-w-xs mx-auto">
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">•</span>
                Publish your own Android applications
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">•</span>
                Track download statistics for your apps
              </li>
              <li className="flex items-start">
                <span className="text-brand-500 mr-2">•</span>
                Bookmark favorite apps for later
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
