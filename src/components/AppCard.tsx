
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface AppCardProps {
  id: string;
  name: string;
  developer: string;
  icon: string;
  category: string;
  downloads: number;
  rating: number;
}

const AppCard = ({ id, name, developer, icon, category, downloads, rating }: AppCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDownloads = (count: number) => {
    if (count >= 1_000_000) {
      return `${(count / 1_000_000).toFixed(1)}M`;
    } else if (count >= 1_000) {
      return `${(count / 1_000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        // Empty star
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    
    return (
      <div className="flex">
        {stars}
        <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Link to={`/app/${id}`}>
      <Card 
        className="app-card overflow-hidden h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="app-icon w-16 h-16 flex-shrink-0">
              <img src={icon} alt={`${name} icon`} className="w-16 h-16 object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{name}</h3>
              <p className="text-gray-500 text-sm">{developer}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {category}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Download size={12} className="mr-1" />
                  {formatDownloads(downloads)}
                </div>
              </div>
              <div className="mt-2">
                {renderStars(rating)}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AppCard;
