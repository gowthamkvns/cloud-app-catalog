import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { CATEGORIES, ALL_TAGS, ICONS } from '@/data/mockData';
import { Application } from '@/types/application';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

const AppForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, addApplication, updateApplication } = useAppContext();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', description: '', category: '', version: '',
    dependencies: [] as string[], tags: [] as string[],
    icon: '☁️', status: 'active' as Application['status'],
  });
  const [depInput, setDepInput] = useState('');

  useEffect(() => {
    if (isEdit) {
      const app = applications.find(a => a.id === id);
      if (app) {
        setForm({
          name: app.name, description: app.description, category: app.category,
          version: app.version, dependencies: app.dependencies, tags: app.tags,
          icon: app.icon, status: app.status,
        });
      }
    }
  }, [id, isEdit, applications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateApplication(id!, form);
    } else {
      addApplication(form);
    }
    navigate('/applications');
  };

  const addDep = () => {
    if (depInput.trim() && !form.dependencies.includes(depInput.trim())) {
      setForm(f => ({ ...f, dependencies: [...f.dependencies, depInput.trim()] }));
      setDepInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="glass-card rounded-xl p-6 sm:p-8">
        <h1 className="font-heading font-bold text-xl mb-6 text-foreground">
          {isEdit ? 'Edit Application' : 'Add New Application'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Icon + Name */}
          <div className="flex gap-3">
            <Select value={form.icon} onValueChange={v => setForm(f => ({ ...f, icon: v }))}>
              <SelectTrigger className="w-16 h-10 bg-secondary border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ICONS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              placeholder="Application name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              className="flex-1 bg-secondary border-border/50 h-10"
            />
          </div>

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            required
            className="bg-secondary border-border/50 min-h-[80px]"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
              <SelectTrigger className="bg-secondary border-border/50 h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input
              placeholder="Version (e.g., 1.0.0)"
              value={form.version}
              onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
              required
              className="bg-secondary border-border/50 h-10"
            />
          </div>

          {/* Dependencies */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Dependencies</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add dependency"
                value={depInput}
                onChange={e => setDepInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDep())}
                className="bg-secondary border-border/50 h-9 text-sm"
              />
              <Button type="button" variant="secondary" size="sm" onClick={addDep}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.dependencies.map(d => (
                <Badge key={d} variant="secondary" className="gap-1 text-xs font-mono">
                  {d}
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive" onClick={() =>
                    setForm(f => ({ ...f, dependencies: f.dependencies.filter(x => x !== d) }))
                  } />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map(tag => {
                const active = form.tags.includes(tag);
                return (
                  <Badge
                    key={tag}
                    variant={active ? 'default' : 'secondary'}
                    className={`cursor-pointer text-xs transition-all ${
                      active ? 'bg-primary/20 text-primary border-primary/30' : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => setForm(f => ({
                      ...f,
                      tags: active ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
                    }))}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>

          <Button type="submit" className="w-full h-10 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Application' : 'Add Application'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppForm;
