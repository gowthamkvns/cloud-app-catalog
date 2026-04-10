import { useAppContext } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import AppCard from '@/components/AppCard';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const Recommendations = () => {
  const { getRecommendations } = useAppContext();
  const [selectedCat, setSelectedCat] = useState('');
  const recommendations = getRecommendations(selectedCat || undefined);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center glow-accent">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground">Recommended</h1>
          <p className="text-sm text-muted-foreground">Personalized suggestions based on usage & category</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCat('')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !selectedCat ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCat === cat ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {recommendations.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No recommendations for this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map(app => <AppCard key={app.id} app={app} />)}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
