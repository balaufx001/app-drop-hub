
import { useState } from "react";
import Layout from "@/components/Layout";
import AppCard from "@/components/AppCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter } from "lucide-react";

// Mock data - would be replaced with actual data from Supabase
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
  },
  {
    id: "app-7",
    name: "News Reader",
    developer: "MediaCorp",
    icon: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "News",
    downloads: 2700000,
    rating: 4.2
  },
  {
    id: "app-8",
    name: "Photo Editor Pro",
    developer: "CreativeTech",
    icon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Photo & Video",
    downloads: 5200000,
    rating: 4.8
  },
  {
    id: "app-9",
    name: "Music Player",
    developer: "AudioWave",
    icon: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
    category: "Music",
    downloads: 7800000,
    rating: 4.7
  }
];

const CATEGORIES = [
  "All Categories",
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

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "downloads", label: "Most Downloads" }
];

const BrowseApps = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("popular");
  const [apps, setApps] = useState(MOCK_APPS);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", searchTerm);
    // This would be handled by Supabase once integrated
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log("Category:", category);
    // This would be handled by Supabase once integrated
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    console.log("Sort:", sort);
    // This would be handled by Supabase once integrated
  };

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Apps</h1>
          <p className="text-gray-500">
            Discover and download the latest Android applications
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for apps..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </form>
            
            <div className="flex gap-4 items-center">
              <div className="w-40">
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                className="md:hidden"
                onClick={toggleFilters}
              >
                <Filter size={18} />
              </Button>
            </div>
          </div>
          
          {/* Mobile Filters (Collapsible) */}
          <div className={`md:hidden mt-4 ${filtersExpanded ? "block" : "hidden"}`}>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 8).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="w-full justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Category Sidebar */}
          <div className="hidden md:block w-56 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-3">Categories</h2>
              <div className="space-y-1">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                    className="w-full justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Apps Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {apps.map(app => (
                <AppCard key={app.id} {...app} />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-8 text-center">
              <Button variant="outline">
                Load More Apps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrowseApps;
