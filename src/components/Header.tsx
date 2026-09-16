import React from 'react';
import { 
  Code2, 
  Share2, 
  Palette, 
  LayoutGrid, 
  List,
  Sparkles,
  Download
} from 'lucide-react';
import { ThemeMode } from '../types';
import { THEMES } from '../utils/themeStyles';

interface HeaderProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  layoutStyle: 'cards' | 'compact';
  onToggleLayout: () => void;
  onOpenCodeModal: () => void;
  onOpenShareModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onThemeChange,
  layoutStyle,
  onToggleLayout,
  onOpenCodeModal,
  onOpenShareModal,
}) => {
  const themeList: ThemeMode[] = ['dark', 'midnight', 'emerald', 'sunset', 'light'];

  const cycleTheme = () => {
    const currentIndex = themeList.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeList.length;
    onThemeChange(themeList[nextIndex]);
  };

  const themeConfig = THEMES[currentTheme];

  return (
    <header className="sticky top-4 z-40 w-full max-w-2xl mx-auto px-4 mb-6">
      <div 
        id="main-navigation-bar"
        className={`backdrop-blur-xl border rounded-2xl px-4 py-3 shadow-lg flex items-center justify-between transition-colors duration-300 ${
          currentTheme === 'light' 
            ? 'bg-white/85 border-slate-200/90 shadow-slate-200/50' 
            : 'bg-neutral-900/80 border-neutral-850 shadow-black/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-medium uppercase tracking-wider opacity-60">Portfólio</span>
            <div className="text-sm font-semibold leading-tight">Links & Projetos</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Layout (Cards vs Compact) */}
          <button
            id="toggle-layout-btn"
            onClick={onToggleLayout}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              currentTheme === 'light'
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
            title={layoutStyle === 'cards' ? 'Alternar para lista compacta' : 'Alternar para cards expandidos'}
            aria-label="Alternar modo de visualização"
          >
            {layoutStyle === 'cards' ? (
              <List className="w-4 h-4" />
            ) : (
              <LayoutGrid className="w-4 h-4" />
            )}
            <span className="hidden md:inline font-medium">
              {layoutStyle === 'cards' ? 'Cards' : 'Compacto'}
            </span>
          </button>

          {/* Theme Switcher Button */}
          <button
            id="theme-switcher-btn"
            onClick={cycleTheme}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              currentTheme === 'light'
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
            title={`Tema atual: ${themeConfig.name}. Clique para alternar.`}
            aria-label="Mudar tema de cores"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden md:inline font-medium capitalize">
              {themeConfig.name.split(' ')[0]}
            </span>
          </button>

          {/* Share Button */}
          <button
            id="share-portfolio-btn"
            onClick={onOpenShareModal}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              currentTheme === 'light'
                ? 'border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
            title="Compartilhar portfólio e QR Code"
            aria-label="Compartilhar portfólio"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Compartilhar</span>
          </button>

          {/* Code Saver & Editor Modal Trigger */}
          <button
            id="open-code-modal-btn"
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            title="Salvar configurações dentro do código e editar links"
          >
            <Code2 className="w-4 h-4" />
            <span>Salvar no Código</span>
          </button>
        </div>
      </div>
    </header>
  );
};
