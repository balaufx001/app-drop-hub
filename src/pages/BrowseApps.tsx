import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import AppCard from "@/components/AppCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search } from "lucide-react";

const BrowseApps = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchApps();
  }, [category]);

  const fetchApps = async () => {
    setLoading(true);
    try {
      let query = supabase.from('apps').select('*');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      // Sort by downloads in descending order
      query = query.order('downloads', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setApps(data || []);
    } catch (error) {
      console.error("Error fetching apps:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Filter apps based on search query
    if (!searchQuery.trim()) {
      fetchApps();
      return;
    }
    
    const filteredApps = apps.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (app.description && app.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setApps(filteredApps);
  };

  const CATEGORIES = [
    "Games",
    "Social",
    "Productivity",
    "Entertainment",
    "Photo & Video",
    "Education",
    "Health & Fitness",
    "Food & Drink",
    "Business",
    "Utilities",
    "Travel",
    "Music",
    "Finance"
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Browse Apps</h1>
          <form onSubmit={handleSearch} className="flex items-center">
            <Input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setCategory(null)}
              className={category === null ? "bg-brand-500 text-white hover:bg-brand-600" : ""}
            >
              All
            </Button>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                onClick={() => setCategory(cat)}
                className={category === cat ? "bg-brand-500 text-white hover:bg-brand-600" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p>Loading apps...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrowseApps;
