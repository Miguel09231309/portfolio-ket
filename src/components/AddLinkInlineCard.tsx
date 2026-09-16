import React, { useState } from 'react';
import { 
  Plus, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Link2, 
  Layers, 
  Code2, 
  Terminal, 
  BarChart3,
  Bookmark,
  Send,
  HelpCircle,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PortfolioLink, PortfolioCategory, ThemeMode } from '../types';
import { THEMES } from '../utils/themeStyles';
import { renderIcon } from '../utils/iconMap';

interface AddLinkInlineCardProps {
  categories: PortfolioCategory[];
  onAddLink: (link: PortfolioLink) => void;
  currentTheme: ThemeMode;
  selectedCategoryId?: string;
  onSelectCategoryId?: (id: string) => void;
}

const QUICK_ICONS = [
  { id: 'Globe', label: 'Site / Web' },
  { id: 'Code2', label: 'Sistema / Dev' },
  { id: 'Terminal', label: 'App / Terminal' },
  { id: 'BarChart3', label: 'Dashboard' },
  { id: 'Layers', label: 'Design' },
  { id: 'Github', label: 'GitHub' },
  { id: 'Send', label: 'Contato' },
  { id: 'Link', label: 'Outro' },
];

export const AddLinkInlineCard: React.FC<AddLinkInlineCardProps> = ({
  categories,
  onAddLink,
  currentTheme,
  selectedCategoryId,
  onSelectCategoryId,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(
    selectedCategoryId || categories[0]?.id || '1-trimestre'
  );
  const [selectedIcon, setSelectedIcon] = useState('Globe');
  const [badge, setBadge] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync category if external prop changes
  React.useEffect(() => {
    if (selectedCategoryId) {
      setCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const theme = THEMES[currentTheme];

  const handleCategoryChange = (newCatId: string) => {
    setCategoryId(newCatId);
    if (onSelectCategoryId) {
      onSelectCategoryId(newCatId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('mailto:')) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const tags = tagsText
      ? tagsText.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const newLink: PortfolioLink = {
      id: `site-${Date.now()}`,
      title: title.trim(),
      url: cleanUrl,
      description: description.trim() || undefined,
      categoryId: categoryId || categories[0]?.id || 'sites',
      icon: selectedIcon,
      badge: badge.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      clicks: 0,
      featured: false,
    };

    onAddLink(newLink);

    // Reset fields
    setTitle('');
    setUrl('');
    setDescription('');
    setBadge('');
    setTagsText('');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div
      id="add-new-site-section"
      className={`w-full rounded-3xl p-5 sm:p-6 border transition-all duration-300 shadow-lg ${theme.cardClass}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <span>Espaço para Adicionar Novos Sites</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Novo
              </span>
            </h2>
            <p className={`text-xs ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
              Insira o nome e o link do seu site para publicar no portfólio
            </p>
          </div>
        </div>

        {addedSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Site Adicionado!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Trimester Selector */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${currentTheme === 'light' ? 'text-slate-800' : 'text-neutral-200'}`}>
            <span>Selecione o Trimestre do Site:</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {categories.map((cat) => {
              const isSelected = categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? `${theme.accentButton} border-transparent shadow-md scale-[1.02]`
                      : currentTheme === 'light'
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-indigo-500'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 1: Title & URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-medium mb-1 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
              Nome / Título do Site *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Sistema de Gestão, Portfólio, Meu Blog..."
              className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all outline-none border ${
                currentTheme === 'light'
                  ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-medium mb-1 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
              Link / URL do Site *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="seusite.com.br ou https://..."
                className={`w-full pl-3.5 pr-8 py-2.5 rounded-xl text-sm transition-all outline-none border ${
                  currentTheme === 'light'
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500'
                }`}
              />
              <ExternalLink className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Description */}
        <div>
          <label className={`block text-xs font-medium mb-1 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
            Descrição Curta (Opcional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Sistema web responsivo construído para clientes e empresas..."
            className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm transition-all outline-none border ${
              currentTheme === 'light'
                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white'
                : 'bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500'
            }`}
          />
        </div>

        {/* Quick Icon Selector */}
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
            Escolha um Ícone Representativo:
          </label>
          <div className="flex flex-wrap items-center gap-1.5">
            {QUICK_ICONS.map((icon) => {
              const isSelected = selectedIcon === icon.id;
              return (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => setSelectedIcon(icon.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-all ${
                    isSelected
                      ? `${theme.accentButton} border-transparent shadow-sm scale-105`
                      : currentTheme === 'light'
                        ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:bg-neutral-850 hover:text-white'
                  }`}
                >
                  {renderIcon(icon.id, 'w-3.5 h-3.5')}
                  <span>{icon.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggle Advanced Options */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showAdvanced ? 'Ocultar opções adicionais' : 'Mais opções (Selo/Badge, tags)'}</span>
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-neutral-800/60 animate-in fade-in">
              {/* Badge */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
                  Badge / Selo (opcional)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Ex: Novo, Online, Destaque"
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    currentTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-200'
                  }`}
                />
              </div>

              {/* Tags */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}`}>
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="React, Next, Node, Landing..."
                  className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                    currentTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-200'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button Bar */}
        <div className="pt-2 flex items-center justify-between">
          <span className={`text-[11px] ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-500'}`}>
            Dica: O site aparece instantaneamente e fica pronto para salvar no código.
          </span>

          <button
            type="submit"
            disabled={!title.trim() || !url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Site</span>
          </button>
        </div>
      </form>
    </div>
  );
};
