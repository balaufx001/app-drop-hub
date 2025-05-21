
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Calendar, ArrowDown, Info, FileText, Image } from "lucide-react";

// Mock data - would be replaced with actual data from Supabase
const MOCK_APP_DETAILS = {
  id: "app-1",
  name: "Fitness Tracker Pro",
  developer: "HealthTech Solutions",
  description: "Track your workouts, monitor your progress, and achieve your fitness goals with Fitness Tracker Pro. This comprehensive app provides personalized workout plans, nutrition tracking, and detailed analytics to help you stay on top of your fitness journey.",
  icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80",
  category: "Health & Fitness",
  downloads: 1500000,
  rating: 4.8,
  version: "2.3.4",
  size: "45.2 MB",
  updateDate: "2023-11-15",
  minAndroidVersion: "6.0",
  developer_email: "support@healthtech.com",
  developer_website: "https://healthtech-solutions.com",
  privacy_policy: "https://healthtech-solutions.com/privacy",
  screenshots: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&h=400&q=80",
    "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&h=400&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&h=400&q=80"
  ],
  features: [
    "Personalized workout plans",
    "Calorie and nutrition tracking",
    "Progress analytics and charts",
    "Goal setting and achievements",
    "Community challenges",
    "Sync with fitness wearables"
  ],
  whatsNew: "- Fixed sync issues with certain wearable devices\n- Improved UI for workout tracking\n- Added new community challenges\n- Performance improvements and bug fixes"
};

const AppDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState(MOCK_APP_DETAILS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with a Supabase fetch once integrated
    setLoading(false);
  }, [id]);

  const formatDownloads = (count: number) => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)} Million`;
    } else if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleDownload = () => {
    console.log("Downloading app:", app.name);
    // This would be handled by Supabase once integrated
    // We'd update the download count and record the download
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
      } else {
        // Empty star
        stars.push(<span key={i} className="text-gray-300 text-lg">★</span>);
      }
    }
    
    return (
      <div className="flex">
        {stars}
        <span className="ml-1 text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* App Header */}
          <div className="bg-gradient-to-r from-brand-500/10 to-purple-500/10 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="app-icon w-24 h-24 md:w-32 md:h-32">
                <img 
                  src={app.icon} 
                  alt={`${app.name} icon`} 
                  className="w-full h-full object-cover rounded-xl border border-gray-100" 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-50 text-xs">
                    {app.category}
                  </Badge>
                  <span className="text-xs text-gray-500">v{app.version}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mt-2">{app.name}</h1>
                <p className="text-gray-500">{app.developer}</p>
                
                <div className="mt-3 flex items-center space-x-4">
                  <div className="flex items-center">
                    {renderStars(app.rating)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Download size={16} className="mr-1" />
                    {formatDownloads(app.downloads)} downloads
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    onClick={handleDownload}
                    className="bg-brand-500 hover:bg-brand-600"
                  >
                    <ArrowDown size={16} className="mr-2" />
                    Download APK
                  </Button>
                </div>
              </div>
              
              <div className="md:w-64 md:border-l md:border-gray-200 md:pl-6 flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-6">
                <div>
                  <span className="text-sm text-gray-500 block">Size</span>
                  <span className="font-medium">{app.size}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Android</span>
                  <span className="font-medium">{app.minAndroidVersion}+</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Updated</span>
                  <span className="font-medium">{app.updateDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* App Content */}
          <div className="p-6">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
                <TabsTrigger value="whats-new">What's New</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">
                      {app.description}
                    </p>
                    
                    <h2 className="text-xl font-semibold mb-3">Features</h2>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {app.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <Info size={18} className="mr-2 text-gray-500" />
                      Additional Information
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Developer</h3>
                        <p>{app.developer}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                        <p className="break-all">{app.developer_email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Website</h3>
                        <a 
                          href={app.developer_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-brand-500 hover:underline break-all"
                        >
                          {app.developer_website.replace(/https?:\/\//i, '')}
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Privacy Policy</h3>
                        <a 
                          href={app.privacy_policy} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-brand-500 hover:underline"
                        >
                          View Privacy Policy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="screenshots">
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {app.screenshots.map((screenshot, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={screenshot} 
                        alt={`Screenshot ${index + 1}`} 
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="whats-new">
                <div className="flex items-start space-x-3">
                  <Calendar size={20} className="text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-medium">Updated on {app.updateDate}</h3>
                    <p className="text-gray-600 text-sm">Version {app.version}</p>
                  </div>
                </div>
                <div className="mt-4 pl-8">
                  <p className="whitespace-pre-line text-gray-700">
                    {app.whatsNew}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppDetail;
