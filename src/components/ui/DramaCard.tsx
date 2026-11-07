import React from 'react';
import { Play, Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface DramaCardProps {
  drama: {
    id: string;
    title: string;
    coverImage: string;
    type: string;
    rating: number;
    isPremium: boolean;
  };
  className?: string;
}

export const DramaCard: React.FC<DramaCardProps> = ({ drama, className }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/drama/${drama.id}`)}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-xl aspect-[2/3] glass-card",
        className
      )}
    >
      <img 
        src={drama.coverImage} 
        alt={drama.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <h3 className="font-bold text-sm leading-tight mb-1">{drama.title}</h3>
        <div className="flex items-center gap-2 text-[10px] text-muted">
          <span className="capitalize">{drama.type}</span>
          <span className="flex items-center gap-0.5 text-primary">
            <Star className="w-2.5 h-2.5 fill-current" />
            {drama.rating}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {drama.isPremium && (
          <span className="bg-primary text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase">Premium</span>
        )}
      </div>

      {/* Play Icon (Center) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50">
          <Play className="w-6 h-6 text-primary fill-current" />
        </div>
      </div>
    </div>
  );
};
