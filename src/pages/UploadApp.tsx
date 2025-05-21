
import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, XCircle, File } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UploadFormData {
  appName: string;
  developerName: string;
  email: string;
  website: string;
  category: string;
  description: string;
  version: string;
  minAndroidVersion: string;
  features: string;
  whatsNew: string;
}

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

const ANDROID_VERSIONS = ["5.0", "6.0", "7.0", "8.0", "9.0", "10.0", "11.0", "12.0", "13.0"];

const UploadApp = () => {
  const [apkFile, setApkFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<UploadFormData>({
    defaultValues: {
      appName: "",
      developerName: "",
      email: "",
      website: "",
      category: "",
      description: "",
      version: "1.0.0",
      minAndroidVersion: "7.0",
      features: "",
      whatsNew: ""
    }
  });

  const handleApkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith(".apk")) {
        setApkFile(file);
      } else {
        toast.error("Please upload a valid APK file");
      }
    }
  };

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setIconFile(file);
      } else {
        toast.error("Please upload a valid image file");
      }
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageFiles = files.filter(file => file.type.startsWith("image/"));
      
      if (imageFiles.length + screenshots.length > 5) {
        toast.warning("You can upload a maximum of 5 screenshots");
        return;
      }
      
      setScreenshots(prev => [...prev, ...imageFiles].slice(0, 5));
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!apkFile) {
      toast.error("Please upload an APK file");
      return;
    }

    if (!iconFile) {
      toast.error("Please upload an app icon");
      return;
    }

    if (screenshots.length === 0) {
      toast.error("Please upload at least one screenshot");
      return;
    }

    setUploading(true);

    try {
      // This is where we'd integrate with Supabase
      // - Upload the APK to storage
      // - Upload the icon and screenshots to storage
      // - Create a record in the apps table with all the metadata
      
      console.log("Form data:", data);
      console.log("APK file:", apkFile);
      console.log("Icon:", iconFile);
      console.log("Screenshots:", screenshots);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("App uploaded successfully! It will be reviewed before publishing.");
      
      // Reset form
      form.reset();
      setApkFile(null);
      setIconFile(null);
      setScreenshots([]);
    } catch (error) {
      console.error("Error uploading app:", error);
      toast.error("Error uploading app. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-purple-500 p-8 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Upload Your App</h1>
              <p className="mt-2 opacity-90">
                Share your Android application with our community.
              </p>
            </div>
            
            <div className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* App Files Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">App Files</h2>
                    
                    {/* APK File */}
                    <div className="mb-6">
                      <Label htmlFor="apk-upload" className="mb-2 block">APK File (required)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {!apkFile ? (
                          <div>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-4">
                              Drag and drop your APK file here, or click to browse
                            </p>
                            <Input
                              id="apk-upload"
                              type="file"
                              accept=".apk"
                              className="hidden"
                              onChange={handleApkUpload}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => document.getElementById("apk-upload")?.click()}
                            >
                              Select APK
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <File className="h-6 w-6 text-brand-500 mr-2" />
                              <span className="text-sm font-medium truncate max-w-xs">
                                {apkFile.name}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                ({Math.round(apkFile.size / 1024 / 1024 * 10) / 10} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setApkFile(null)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <FormDescription className="mt-2">
                        Upload your compiled Android app package (APK).
                      </FormDescription>
                    </div>
                    
                    {/* App Icon */}
                    <div className="mb-6">
                      <Label htmlFor="icon-upload" className="mb-2 block">App Icon (required)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {!iconFile ? (
                          <div>
                            <p className="text-sm text-gray-500 mb-2">
                              Upload a square image for your app icon (512x512px recommended)
                            </p>
                            <Input
                              id="icon-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleIconUpload}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById("icon-upload")?.click()}
                            >
                              Select Icon
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(iconFile)}
                                alt="App icon preview"
                                className="w-16 h-16 rounded-md object-cover"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-gray-200"
                                onClick={() => setIconFile(null)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Screenshots */}
                    <div>
                      <Label htmlFor="screenshot-upload" className="mb-2 block">
                        Screenshots (required, max 5)
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="flex flex-wrap gap-4 mb-4">
                          {screenshots.length > 0 ? (
                            screenshots.map((screenshot, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={URL.createObjectURL(screenshot)}
                                  alt={`Screenshot ${index + 1}`}
                                  className="h-24 object-cover rounded-md border border-gray-200"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-gray-200"
                                  onClick={() => removeScreenshot(index)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 text-center w-full">
                              Upload screenshots of your app (at least one)
                            </p>
                          )}
                        </div>
                        {screenshots.length < 5 && (
                          <div className="text-center">
                            <Input
                              id="screenshot-upload"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleScreenshotUpload}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById("screenshot-upload")?.click()}
                            >
                              Add Screenshots
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* App Details Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">App Details</h2>
                    
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="appName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>App Name</FormLabel>
                            <FormControl>
                              <Input placeholder="My Awesome App" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CATEGORIES.map(category => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="version"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Version</FormLabel>
                            <FormControl>
                              <Input placeholder="1.0.0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="minAndroidVersion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Android Version</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Android version" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ANDROID_VERSIONS.map(version => (
                                  <SelectItem key={version} value={version}>
                                    Android {version}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your app in detail..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a detailed description of your app and its functionality.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Features</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List your app's main features, one per line..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            List the key features of your app, one per line.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="whatsNew"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>What's New</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="What's new in this version?" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Describe the changes in this version, if any.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  {/* Developer Details Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Developer Details</h2>
                    
                    <FormField
                      control={form.control}
                      name="developerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Developer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name or company name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be displayed as the app developer.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="mt-4 grid gap-6 grid-cols-1 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              For support inquiries.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://yourwebsite.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-brand-500 hover:bg-brand-600" 
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit App
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadApp;
