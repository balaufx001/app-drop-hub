
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import AppDetail from "./pages/AppDetail";
import BrowseApps from "./pages/BrowseApps";
import UploadApp from "./pages/UploadApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check and create storage buckets if they don't exist
const ensureStorageBuckets = async () => {
  try {
    // Check for app_files bucket
    const { data: appFilesBuckets, error: appFilesError } = await supabase
      .storage
      .listBuckets();
    
    if (appFilesError) throw appFilesError;
    
    const appFilesBucketExists = appFilesBuckets?.find(bucket => bucket.name === 'app_files');
    const appImagesBucketExists = appFilesBuckets?.find(bucket => bucket.name === 'app_images');
    
    // Create buckets if they don't exist
    if (!appFilesBucketExists) {
      const { error } = await supabase.storage.createBucket('app_files', {
        public: true,
        fileSizeLimit: 512000000, // 500MB limit for APKs
        allowedMimeTypes: ['application/vnd.android.package-archive']
      });
      
      if (error) console.error("Error creating app_files bucket:", error);
    }
    
    if (!appImagesBucketExists) {
      const { error } = await supabase.storage.createBucket('app_images', {
        public: true,
        fileSizeLimit: 10000000, // 10MB limit for images
        allowedMimeTypes: ['image/*']
      });
      
      if (error) console.error("Error creating app_images bucket:", error);
    }
  } catch (error) {
    console.error("Error checking storage buckets:", error);
  }
};

const App = () => {
  useEffect(() => {
    ensureStorageBuckets();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app/:id" element={<AppDetail />} />
            <Route path="/apps" element={<BrowseApps />} />
            <Route path="/upload" element={<UploadApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
