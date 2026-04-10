import { Application } from '@/types/application';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  app: Application;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

const AppCard = ({ app, onDelete, compact }: Props) => {
  return (
    <div className="group glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:glow-primary animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
            {app.icon}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground text-sm">{app.name}</h3>
            <span className="text-xs text-muted-foreground">{app.category}</span>
          </div>
        </div>
        {!compact && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/edit/${app.id}`}
              className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(app.id)}
                className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {!compact && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {app.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {app.tags.slice(0, 3).map(tag => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 font-mono">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
        <span className="font-mono">v{app.version}</span>
        <div className="flex items-center gap-1 text-primary">
          <TrendingUp className="w-3 h-3" />
          <span className="font-semibold">{app.usageCount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
