import { useAppContext } from '@/context/AppContext';
import { CATEGORIES, ALL_TAGS } from '@/data/mockData';
import { Search, Filter, SortAsc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortOption } from '@/types/application';

const SearchFilters = () => {
  const { filters, setFilters } = useAppContext();

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          value={filters.search}
          onChange={e => setFilters({ search: e.target.value })}
          className="pl-10 bg-secondary border-border/50 focus:border-primary/50 h-10"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Category filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filters.category || 'all'} onValueChange={v => setFilters({ category: v === 'all' ? '' : v })}>
            <SelectTrigger className="w-[160px] h-9 bg-secondary border-border/50 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <Select value={filters.sort} onValueChange={v => setFilters({ sort: v as SortOption })}>
            <SelectTrigger className="w-[140px] h-9 bg-secondary border-border/50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usage">Most Used</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {ALL_TAGS.slice(0, 8).map(tag => {
          const active = filters.tags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={active ? 'default' : 'secondary'}
              className={`cursor-pointer text-xs transition-all ${
                active ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' : 'hover:bg-secondary/80'
              }`}
              onClick={() => {
                const newTags = active ? filters.tags.filter(t => t !== tag) : [...filters.tags, tag];
                setFilters({ tags: newTags });
              }}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilters;
