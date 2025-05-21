import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import AppCard from "@/components/AppCard";
import FeaturedAppBanner from "@/components/FeaturedAppBanner";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Mock data - would be replaced with actual data from Supabase
const MOCK_FEATURED_APP = {
  id: "featured-1",
  name: "Productivity Master",
  developer: "AppStudio Inc.",
  description: "Boost your productivity with our all-in-one task management solution. Track projects, set deadlines, and collaborate with your team seamlessly.",
  banner: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=500&q=80",
  category: "Productivity"
};

const MOCK_APPS = [
  {
    id: "app-1",
    name: "Fitness Tracker Pro",
    developer: "HealthTech Solutions",
    icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Health & Fitness",
    downloads: 1500000,
    rating: 4.8
  },
  {
    id: "app-2",
    name: "Budget Master",
    developer: "FinApps Inc.",
    icon: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Finance",
    downloads: 750000,
    rating: 4.5
  },
  {
    id: "app-3",
    name: "Meditation Guide",
    developer: "ZenTech",
    icon: "https://images.unsplash.com/photo-1548695607-9c73430ba065?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Lifestyle",
    downloads: 2300000,
    rating: 4.9
  },
  {
    id: "app-4",
    name: "Recipe Book",
    developer: "CookingApps",
    icon: "https://images.unsplash.com/photo-1518291344630-4857135fb581?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Food & Drink",
    downloads: 950000,
    rating: 4.3
  },
  {
    id: "app-5",
    name: "Weather Live",
    developer: "MeteoTech",
    icon: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Weather",
    downloads: 3200000,
    rating: 4.7
  },
  {
    id: "app-6",
    name: "Language Buddy",
    developer: "LinguaLearn",
    icon: "https://images.unsplash.com/photo-1569728723358-d1b2db85eb1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Education",
    downloads: 4100000,
    rating: 4.6
  }
];

const CATEGORIES = [
  "Games", "Social", "Productivity", "Entertainment", 
  "Photo & Video", "Education", "Health & Fitness", "Food & Drink"
];

const Home = () => {
  const [popularApps, setPopularApps] = useState([]);
  const [recentApps, setRecentApps] = useState([]);
  const [featuredApp, setFeaturedApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    "Games", "Social", "Productivity", "Entertainment", 
    "Photo & Video", "Education", "Health & Fitness", "Food & Drink"
  ]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        
        // Fetch most downloaded apps
        const { data: popularAppsData, error: popularError } = await supabase
          .from('apps')
          .select('*')
          .order('downloads', { ascending: false })
          .limit(6);
        
        if (popularError) throw popularError;
        
        // Fetch most recently uploaded apps
        const { data: recentAppsData, error: recentError } = await supabase
          .from('apps')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);
        
        if (recentError) throw recentError;
        
        // Set the most downloaded app as the featured app
        if (popularAppsData && popularAppsData.length > 0) {
          setFeaturedApp({
            ...popularAppsData[0],
            banner: popularAppsData[0].banner_url || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=500&q=80"
          });
        }
        
        // Transform data to match AppCard component props
        const transformedPopularApps = popularAppsData?.map(app => ({
          id: app.id,
          name: app.name,
          developer: app.developer_id, // Later we can fetch the developer name
          icon: app.icon_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
          category: app.category,
          downloads: app.downloads,
          rating: app.rating || 0
        })) || [];
        
        const transformedRecentApps = recentAppsData?.map(app => ({
          id: app.id,
          name: app.name,
          developer: app.developer_id, // Later we can fetch the developer name
          icon: app.icon_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
          category: app.category,
          downloads: app.downloads,
          rating: app.rating || 0
        })) || [];

        setPopularApps(transformedPopularApps);
        setRecentApps(transformedRecentApps);
      } catch (error) {
        console.error("Error fetching apps:", error);
        // Fallback to mock data if there's an error
        setPopularApps(MOCK_APPS);
        setRecentApps(MOCK_APPS.slice().reverse());
        setFeaturedApp(MOCK_FEATURED_APP);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading apps...</p>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="mb-12">
              {featuredApp && <FeaturedAppBanner {...featuredApp} />}
            </section>

            {/* Most Downloaded Apps Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Most Downloaded Apps</h2>
                <Link to="/apps">
                  <Button variant="ghost" className="text-brand-500" size="sm">
                    View all <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {popularApps.map(app => (
                  <AppCard key={app.id} {...app} />
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <Link 
                    key={category} 
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-brand-300 transition-all"
                  >
                    <h3 className="font-medium text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-500 mt-1">Browse apps</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recently Added Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
                <Link to="/apps/recent">
                  <Button variant="ghost" className="text-brand-500" size="sm">
                    View all <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {recentApps.map(app => (
                  <AppCard key={app.id} {...app} />
                ))}
              </div>
            </section>

            {/* Upload CTA Section */}
            <section className="bg-gradient-to-r from-brand-500 to-purple-500 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Are You a Developer?</h2>
              <p className="mb-6 max-w-xl mx-auto">
                Share your Android app with millions of users. Upload your APK and start getting downloads today.
              </p>
              <Link to="/upload">
                <Button className="bg-white text-brand-600 hover:bg-white/90">
                  Upload Your App
                </Button>
              </Link>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
