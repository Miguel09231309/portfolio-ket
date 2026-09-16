import React from 'react';
import { Search, X, Layers } from 'lucide-react';
import { PortfolioCategory, ThemeMode } from '../types';
import { renderIcon } from '../utils/iconMap';
import { THEMES } from '../utils/themeStyles';

interface CategoryNavProps {
  categories: PortfolioCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalLinksCount: number;
  filteredCount: number;
  currentTheme: ThemeMode;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalLinksCount,
  filteredCount,
  currentTheme,
}) => {
  const theme = THEMES[currentTheme];

  return (
    <div className="w-full max-w-2xl mx-auto my-6 space-y-4 px-1">
      {/* Search Input */}
      <div className="relative">
        <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
          currentTheme === 'light' ? 'text-slate-400' : 'text-neutral-500'
        }`} />
        <input
          id="search-links-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar links, projetos, ferramentas ou tags..."
          className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-sm transition-all outline-none border ${
            currentTheme === 'light'
              ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              : 'bg-neutral-900/90 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors`}
            aria-label="Limpar busca"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <button
          id="category-pill-all"
          onClick={() => onSelectCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
            activeCategoryId === 'all'
              ? `${theme.accentButton} border-transparent shadow-sm`
              : currentTheme === 'light'
                ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:text-neutral-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Todos os Trimestres ({totalLinksCount})</span>
        </button>

        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              id={`category-pill-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                isActive
                  ? `${theme.accentButton} border-transparent shadow-sm`
                  : currentTheme === 'light'
                    ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:text-neutral-200'
              }`}
            >
              {category.icon && renderIcon(category.icon, 'w-3.5 h-3.5')}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Result feedback if searching */}
      {searchQuery && (
        <div className="text-xs px-1 opacity-70 flex items-center justify-between">
          <span>
            Exibindo {filteredCount} {filteredCount === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
          </span>
          <button 
            onClick={() => onSearchChange('')}
            className="text-indigo-400 hover:underline"
          >
            Limpar filtro
          </button>
        </div>
      )}
    </div>
  );
};
