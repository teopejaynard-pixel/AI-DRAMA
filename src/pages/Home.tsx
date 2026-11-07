import React from 'react';
import { Play, Info, Plus, ChevronRight } from 'lucide-react';
import { DramaCard } from '../components/ui/DramaCard';
import { motion } from 'motion/react';

// Mock data for initial UI
const MOCK_DRAMAS = [
  {
    id: '1',
    title: 'Neon Odyssey',
    coverImage: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=400&h=600',
    type: 'anime',
    rating: 4.8,
    isPremium: true,
  },
  {
    id: '2',
    title: 'The Silent Script',
    coverImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=400&h=600',
    type: 'realistic',
    rating: 4.9,
    isPremium: false,
  },
  {
    id: '3',
    title: 'Cyber Chronicles',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&h=600',
    type: 'cartoon',
    rating: 4.5,
    isPremium: true,
  },
  {
    id: '4',
    title: 'Midnight Echo',
    coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=400&h=600',
    type: 'realistic',
    rating: 4.7,
    isPremium: true,
  },
  {
    id: '5',
    title: 'Starlight Saga',
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&h=600',
    type: 'anime',
    rating: 4.6,
    isPremium: false,
  },
];

export const Home: React.FC = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src="/src/assets/images/ai_drama_hero_background_1793969571736.jpg" 
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-primary/20 backdrop-blur-md text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 border border-primary/30">
              Featured Series
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-4 glow-text leading-tight">
              NEON ODYSSEY
            </h1>
            <p className="text-muted text-sm md:text-lg mb-8 max-w-2xl line-clamp-3">
              In a world where memories can be digitilized, a rogue AI actor discovers a forgotten script that could rewrite the history of mankind. Experience the first-ever realistic AI-generated drama.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="glow-button flex items-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Play Now
              </button>
              <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                <Info className="w-5 h-5" />
                Details
              </button>
              <button className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Drama Rows */}
      <div className="px-6 md:px-12 -mt-16 relative z-10 space-y-12">
        <DramaRow title="Trending Now" dramas={MOCK_DRAMAS} />
        <DramaRow title="Realistic AI Dramas" dramas={MOCK_DRAMAS.filter(d => d.type === 'realistic')} />
        <DramaRow title="Hot Anime" dramas={MOCK_DRAMAS.filter(d => d.type === 'anime')} />
        <DramaRow title="Must-Watch Cartoons" dramas={MOCK_DRAMAS.filter(d => d.type === 'cartoon')} />
      </div>
    </div>
  );
};

const DramaRow: React.FC<{ title: string; dramas: any[] }> = ({ title, dramas }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">{title}</h2>
        <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {dramas.map((drama) => (
          <DramaCard key={drama.id} drama={drama} />
        ))}
      </div>
    </section>
  );
};
