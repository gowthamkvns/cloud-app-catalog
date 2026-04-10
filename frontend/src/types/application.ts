export interface Application {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  dependencies: string[];
  tags: string[];
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  icon: string;
  status: 'active' | 'deprecated' | 'beta';
}

export type SortOption = 'usage' | 'name' | 'latest';

export interface Filters {
  search: string;
  category: string;
  tags: string[];
  version: string;
  sort: SortOption;
}
