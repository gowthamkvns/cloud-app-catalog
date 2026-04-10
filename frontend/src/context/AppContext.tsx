import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Application, Filters } from '@/types/application';
import { mockApplications } from '@/data/mockData';

interface AppContextType {
  applications: Application[];
  filters: Filters;
  loading: boolean;
  setFilters: (f: Partial<Filters>) => void;
  addApplication: (app: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => void;
  updateApplication: (id: string, app: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  getFilteredApplications: () => Application[];
  getRecommendations: (category?: string) => Application[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [loading] = useState(false);
  const [filters, setFiltersState] = useState<Filters>({
    search: '', category: '', tags: [], version: '', sort: 'usage',
  });

  const setFilters = useCallback((f: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...f }));
  }, []);

  const addApplication = useCallback((app: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newApp: Application = {
      ...app, id: Date.now().toString(), createdAt: now, updatedAt: now, usageCount: 0,
    };
    setApplications(prev => [newApp, ...prev]);
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<Application>) => {
    setApplications(prev => prev.map(app =>
      app.id === id ? { ...app, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : app
    ));
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  }, []);

  const getFilteredApplications = useCallback(() => {
    let result = [...applications];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(s) || a.description.toLowerCase().includes(s));
    }
    if (filters.category) result = result.filter(a => a.category === filters.category);
    if (filters.tags.length) result = result.filter(a => filters.tags.some(t => a.tags.includes(t)));
    if (filters.version) result = result.filter(a => a.version.includes(filters.version));

    switch (filters.sort) {
      case 'usage': result.sort((a, b) => b.usageCount - a.usageCount); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'latest': result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)); break;
    }
    return result;
  }, [applications, filters]);

  const getRecommendations = useCallback((category?: string) => {
    let pool = [...applications];
    if (category) pool = pool.filter(a => a.category === category);
    return pool.sort((a, b) => b.usageCount - a.usageCount).slice(0, 6);
  }, [applications]);

  return (
    <AppContext.Provider value={{
      applications, filters, loading, setFilters,
      addApplication, updateApplication, deleteApplication,
      getFilteredApplications, getRecommendations,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
