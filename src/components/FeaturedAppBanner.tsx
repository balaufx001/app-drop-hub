
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FeaturedAppProps {
  id: string;
  name: string;
  developer: string;
  description: string;
  banner: string;
  category: string;
}

const FeaturedAppBanner = ({ id, name, developer, description, banner, category }: FeaturedAppProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white">
      <div className="absolute inset-0 opacity-30">
        <img 
          src={banner} 
          alt={`${name} banner`} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm">
              Featured {category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{name}</h2>
          <p className="text-lg mb-2 text-white/80">by {developer}</p>
          <p className="mb-8 text-white/90 line-clamp-2 md:line-clamp-3">{description}</p>
          <Link to={`/app/${id}`}>
            <Button className="bg-white text-brand-600 hover:bg-white/90">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAppBanner;
