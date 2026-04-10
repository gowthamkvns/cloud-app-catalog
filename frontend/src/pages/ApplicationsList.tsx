import { useAppContext } from '@/context/AppContext';
import AppCard from '@/components/AppCard';
import SearchFilters from '@/components/SearchFilters';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ApplicationsList = () => {
  const { getFilteredApplications, deleteApplication } = useAppContext();
  const apps = getFilteredApplications();
  const [page, setPage] = useState(1);
  const perPage = 9;
  const totalPages = Math.ceil(apps.length / perPage);
  const paginated = apps.slice((page - 1) * perPage, page * perPage);

  const handleDelete = (id: string) => {
    deleteApplication(id);
    toast({ title: 'Application deleted', description: 'The application has been removed.' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl text-foreground">Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">{apps.length} applications found</p>
      </div>

      <SearchFilters />

      {paginated.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No applications found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map(app => (
            <AppCard key={app.id} app={app} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                page === i + 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;
