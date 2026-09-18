/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Code2, 
  Terminal,
  Sparkles, 
  Layers, 
  ExternalLink, 
  ChevronRight,
  PlusCircle,
  Plus,
  FolderOpen
} from 'lucide-react';
import { PortfolioConfig, PortfolioLink, ThemeMode, TrimesterTopic, PortfolioCategory } from './types';
import { INITIAL_PORTFOLIO_DATA, TRIMESTER_TOPICS } from './portfolioData';
import { THEMES } from './utils/themeStyles';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { CategoryNav } from './components/CategoryNav';
import { LinkCard } from './components/LinkCard';
import { AddLinkInlineCard } from './components/AddLinkInlineCard';
import { CodeSaverModal } from './components/CodeSaverModal';
import { ShareModal } from './components/ShareModal';

const STORAGE_KEY = 'portfolio_custom_config_v13';

function getLinkTopic(link: PortfolioLink, categoryId: string): TrimesterTopic {
  if (link.topic) return link.topic;
  const text = `${link.title} ${link.description || ''} ${(link.tags || []).join(' ')} ${link.badge || ''}`.toLowerCase();
  if (categoryId !== '1-trimestre' && (text.includes('ai') || text.includes('ia') || text.includes('gemini') || text.includes('google') || text.includes('inteligencia') || text.includes('inteligência'))) {
    return 'google-ai';
  }
  if (text.includes('js') || text.includes('javascript') || text.includes('script') || text.includes('node') || text.includes('react') || text.includes('vue') || text.includes('ts')) {
    return 'js';
  }
  return 'html';
}

export default function App() {
  // Initialize configuration directly from src/portfolioData.ts or local cache
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.profile && 
          Array.isArray(parsed.links) && 
          Array.isArray(parsed.categories) && 
          parsed.links.length >= INITIAL_PORTFOLIO_DATA.links.length
        ) {
          parsed.categories = parsed.categories.filter((c: any) => c.id !== '4-trimestre');
          parsed.links = parsed.links.filter((l: any) => l.categoryId !== '4-trimestre');
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Usando dados padrão do código:', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('1-trimestre');
  const [selectedTopicId, setSelectedTopicId] = useState<TrimesterTopic>('html');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [layoutStyle, setLayoutStyle] = useState<'cards' | 'compact'>(
    config.layoutStyle || 'cards'
  );

  // Sync updates to localStorage for live editing resilience
  const handleUpdateConfig = (newConfig: PortfolioConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Erro ao salvar localmente:', e);
    }
  };

  // Add new site
  const handleAddLink = (newLink: PortfolioLink) => {
    const updatedLinks = [newLink, ...config.links];
    handleUpdateConfig({
      ...config,
      links: updatedLinks,
    });
  };

  // Delete site
  const handleDeleteLink = (linkId: string) => {
    const updatedLinks = config.links.filter((l) => l.id !== linkId);
    handleUpdateConfig({
      ...config,
      links: updatedLinks,
    });
  };

  // Select trimester and topic and scroll to add form
  const handleAddInTopic = (catId: string, topicId: TrimesterTopic) => {
    setSelectedCategoryId(catId);
    setSelectedTopicId(topicId);
    const el = document.getElementById('add-new-site-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(INITIAL_PORTFOLIO_DATA);
  };

  const handleThemeChange = (newTheme: ThemeMode) => {
    handleUpdateConfig({
      ...config,
      theme: newTheme,
    });
  };

  const handleToggleLayout = () => {
    const nextLayout = layoutStyle === 'cards' ? 'compact' : 'cards';
    setLayoutStyle(nextLayout);
    handleUpdateConfig({
      ...config,
      layoutStyle: nextLayout,
    });
  };

  // Click tracker for links
  const handleTrackClick = (linkId: string) => {
    const updatedLinks = config.links.map((link) => {
      if (link.id === linkId) {
        return { ...link, clicks: (link.clicks || 0) + 1 };
      }
      return link;
    });

    handleUpdateConfig({
      ...config,
      links: updatedLinks,
    });
  };

  // Filter links by category and search
  const filteredLinks = useMemo(() => {
    return config.links.filter((link) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || link.categoryId === activeCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        link.title.toLowerCase().includes(q) ||
        link.description?.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        link.tags?.some((t) => t.toLowerCase().includes(q)) ||
        link.badge?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [config.links, activeCategory, searchQuery]);

  const currentTheme = config.theme || 'dark';
  const theme = THEMES[currentTheme] || THEMES.dark;

  // Set document background color matching active theme
  useEffect(() => {
    document.body.className = `${theme.bodyClass} min-h-screen font-sans antialiased transition-colors duration-300`;
  }, [theme]);

  // Group links by category if viewing 'all' and no active search query
  const shouldGroupByCategory = activeCategory === 'all' && !searchQuery;

  return (
    <div className={`min-h-screen pb-20 relative overflow-x-hidden ${theme.bodyClass}`}>
      {/* Subtle Background Glow Top Gradient */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b ${theme.headerBackground} blur-3xl pointer-events-none -z-10`} 
      />

      {/* Persistent App Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        layoutStyle={layoutStyle}
        onToggleLayout={handleToggleLayout}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Main Container */}
      <main className="w-full max-w-2xl mx-auto px-4">
        {/* Profile Card */}
        <ProfileCard profile={config.profile} currentTheme={currentTheme} />

        {/* Quick In-Code Notice Banner */}
        <div className="my-5 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between gap-3 text-neutral-300">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">
              Configurado em <strong>src/portfolioData.ts</strong>
            </span>
          </div>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <span>Salvar no Código</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Space to add new sites / links */}
        <div className="mb-6">
          <AddLinkInlineCard
            categories={config.categories}
            onAddLink={handleAddLink}
            currentTheme={currentTheme}
            selectedCategoryId={selectedCategoryId}
            selectedTopicId={selectedTopicId}
            onSelectCategoryId={setSelectedCategoryId}
            onSelectTopicId={setSelectedTopicId}
          />
        </div>

        {/* Categories & Search Bar */}
        <CategoryNav
          categories={config.categories}
          activeCategoryId={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalLinksCount={config.links.length}
          filteredCount={filteredLinks.length}
          currentTheme={currentTheme}
        />

        {/* Links List / Grid */}
        <div className="space-y-8 mt-6">
          {searchQuery && filteredLinks.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-3xl border border-neutral-800 bg-neutral-900/40">
              <FolderOpen className="w-10 h-10 mx-auto text-neutral-500 mb-3 opacity-60" />
              <h3 className="text-base font-bold text-neutral-300 mb-1">
                Nenhum site encontrado
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mb-4">
                Não encontramos nenhum resultado para "{searchQuery}".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer"
              >
                Limpar busca
              </button>
            </div>
          ) : searchQuery ? (
            /* Search results list */
            <div
              className={
                layoutStyle === 'cards'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                  : 'flex flex-col gap-2.5'
              }
            >
              {filteredLinks.map((link) => {
                const cat = config.categories.find((c) => c.id === link.categoryId);
                return (
                  <LinkCard
                    key={link.id}
                    link={link}
                    categoryName={cat?.name}
                    currentTheme={currentTheme}
                    layoutStyle={layoutStyle}
                    onTrackClick={handleTrackClick}
                    onDeleteLink={handleDeleteLink}
                  />
                );
              })}
            </div>
          ) : shouldGroupByCategory ? (
            /* Grouped by Trimester view (1º, 2º, 3º) with sub-topics */
            config.categories.map((category) => {
              const categoryLinks = config.links.filter((l) => l.categoryId === category.id);
              const topics = TRIMESTER_TOPICS[category.id] || TRIMESTER_TOPICS['1-trimestre'];

              return (
                <section 
                  key={category.id} 
                  className={`space-y-5 p-5 sm:p-6 rounded-3xl border transition-all ${
                    currentTheme === 'light' 
                      ? 'bg-white/90 border-slate-200 shadow-sm' 
                      : 'bg-neutral-900/40 border-neutral-800/80 shadow-md'
                  }`}
                >
                  {/* Category Main Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className={`text-base sm:text-lg font-bold ${currentTheme === 'light' ? 'text-slate-900' : 'text-neutral-100'}`}>
                            {category.name}
                          </h2>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                            categoryLinks.length > 0
                              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                              : 'bg-neutral-800/60 border-neutral-700 text-neutral-400'
                          }`}>
                            {categoryLinks.length} {categoryLinks.length === 1 ? 'site' : 'sites'}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
                          {category.id === '1-trimestre' 
                            ? 'Módulos: HTML e JavaScript (JS)' 
                            : 'Módulos: HTML, JavaScript (JS) e Google AI'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddInTopic(category.id, 'html')}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                      title={`Adicionar site no ${category.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Adicionar no {category.name}</span>
                      <span className="sm:hidden">Adicionar</span>
                    </button>
                  </div>

                  {/* Topics Subsections */}
                  <div className="space-y-6 pt-1">
                    {topics.map((topic) => {
                      const topicLinks = categoryLinks.filter(
                        (l) => getLinkTopic(l, category.id) === topic.id
                      );

                      return (
                        <div key={topic.id} className="space-y-3">
                          {/* Topic Subheader */}
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg border flex items-center justify-center ${topic.badgeClass}`}>
                                {topic.id === 'html' && <Code2 className="w-4 h-4 text-orange-400" />}
                                {topic.id === 'js' && <Terminal className="w-4 h-4 text-amber-400" />}
                                {topic.id === 'google-ai' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                              </div>
                              <h3 className={`text-sm font-bold ${currentTheme === 'light' ? 'text-slate-800' : 'text-neutral-200'}`}>
                                {topic.name}
                              </h3>
                              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                                topicLinks.length > 0 
                                  ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                                  : 'bg-neutral-850 border-neutral-800 text-neutral-500'
                              }`}>
                                {topicLinks.length}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddInTopic(category.id, topic.id)}
                              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                              title={`Adicionar site em ${topic.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar em {topic.shortName}</span>
                            </button>
                          </div>

                          {/* Topic Links */}
                          {topicLinks.length > 0 ? (
                            <div
                              className={
                                layoutStyle === 'cards'
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-3.5'
                                  : 'flex flex-col gap-2'
                              }
                            >
                              {topicLinks.map((link) => (
                                <LinkCard
                                  key={link.id}
                                  link={link}
                                  categoryName={category.name}
                                  currentTheme={currentTheme}
                                  layoutStyle={layoutStyle}
                                  onTrackClick={handleTrackClick}
                                  onDeleteLink={handleDeleteLink}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className={`py-3 px-3.5 rounded-2xl border border-dashed text-center flex items-center justify-between gap-3 ${
                              currentTheme === 'light'
                                ? 'border-slate-300/80 bg-slate-50/60'
                                : 'border-neutral-800/80 bg-neutral-950/25'
                            }`}>
                              <span className={`text-xs ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
                                Nenhum site em <strong className={currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}>{topic.name}</strong> adicionado ainda.
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddInTopic(category.id, topic.id)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/20 text-indigo-300 text-xs font-medium inline-flex items-center gap-1 transition-all cursor-pointer shrink-0"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Adicionar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })
          ) : (
            /* Filtered single trimester view */
            (() => {
              const selectedCat = config.categories.find((c) => c.id === activeCategory);
              if (!selectedCat) return null;
              const categoryLinks = config.links.filter((l) => l.categoryId === selectedCat.id);
              const topics = TRIMESTER_TOPICS[selectedCat.id] || TRIMESTER_TOPICS['1-trimestre'];

              return (
                <section 
                  key={selectedCat.id} 
                  className={`space-y-5 p-5 sm:p-6 rounded-3xl border transition-all ${
                    currentTheme === 'light' 
                      ? 'bg-white/90 border-slate-200 shadow-sm' 
                      : 'bg-neutral-900/40 border-neutral-800/80 shadow-md'
                  }`}
                >
                  {/* Category Main Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className={`text-base sm:text-lg font-bold ${currentTheme === 'light' ? 'text-slate-900' : 'text-neutral-100'}`}>
                            {selectedCat.name}
                          </h2>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                            categoryLinks.length > 0
                              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                              : 'bg-neutral-800/60 border-neutral-700 text-neutral-400'
                          }`}>
                            {categoryLinks.length} {categoryLinks.length === 1 ? 'site' : 'sites'}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
                          {selectedCat.id === '1-trimestre' 
                            ? 'Módulos: HTML e JavaScript (JS)' 
                            : 'Módulos: HTML, JavaScript (JS) e Google AI'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddInTopic(selectedCat.id, 'html')}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                      title={`Adicionar site no ${selectedCat.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Adicionar no {selectedCat.name}</span>
                      <span className="sm:hidden">Adicionar</span>
                    </button>
                  </div>

                  {/* Topics Subsections */}
                  <div className="space-y-6 pt-1">
                    {topics.map((topic) => {
                      const topicLinks = categoryLinks.filter(
                        (l) => getLinkTopic(l, selectedCat.id) === topic.id
                      );

                      return (
                        <div key={topic.id} className="space-y-3">
                          {/* Topic Subheader */}
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg border flex items-center justify-center ${topic.badgeClass}`}>
                                {topic.id === 'html' && <Code2 className="w-4 h-4 text-orange-400" />}
                                {topic.id === 'js' && <Terminal className="w-4 h-4 text-amber-400" />}
                                {topic.id === 'google-ai' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                              </div>
                              <h3 className={`text-sm font-bold ${currentTheme === 'light' ? 'text-slate-800' : 'text-neutral-200'}`}>
                                {topic.name}
                              </h3>
                              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                                topicLinks.length > 0 
                                  ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                                  : 'bg-neutral-850 border-neutral-800 text-neutral-500'
                              }`}>
                                {topicLinks.length}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddInTopic(selectedCat.id, topic.id)}
                              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors cursor-pointer"
                              title={`Adicionar site em ${topic.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Adicionar em {topic.shortName}</span>
                            </button>
                          </div>

                          {/* Topic Links */}
                          {topicLinks.length > 0 ? (
                            <div
                              className={
                                layoutStyle === 'cards'
                                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-3.5'
                                  : 'flex flex-col gap-2'
                              }
                            >
                              {topicLinks.map((link) => (
                                <LinkCard
                                  key={link.id}
                                  link={link}
                                  categoryName={selectedCat.name}
                                  currentTheme={currentTheme}
                                  layoutStyle={layoutStyle}
                                  onTrackClick={handleTrackClick}
                                  onDeleteLink={handleDeleteLink}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className={`py-3 px-3.5 rounded-2xl border border-dashed text-center flex items-center justify-between gap-3 ${
                              currentTheme === 'light'
                                ? 'border-slate-300/80 bg-slate-50/60'
                                : 'border-neutral-800/80 bg-neutral-950/25'
                            }`}>
                              <span className={`text-xs ${currentTheme === 'light' ? 'text-slate-500' : 'text-neutral-400'}`}>
                                Nenhum site em <strong className={currentTheme === 'light' ? 'text-slate-700' : 'text-neutral-300'}>{topic.name}</strong> adicionado ainda.
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAddInTopic(selectedCat.id, topic.id)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/20 text-indigo-300 text-xs font-medium inline-flex items-center gap-1 transition-all cursor-pointer shrink-0"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Adicionar</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })()
          )}
        </div>

        {/* Quick Add Link Action Card */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 text-center">
          <button
            id="footer-add-link-btn"
            onClick={() => {
              setIsCodeModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-dashed border-neutral-700 hover:border-indigo-500 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900/40 hover:bg-neutral-900/90 transition-all group"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Adicionar Novo Link ou Projeto ao Código</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-neutral-500 space-y-2">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>{config.profile.name}</span>
            <span>•</span>
            <span>Portfólio de Links</span>
          </p>
          <p className="text-[11px] text-neutral-600">
            Salvo diretamente no código TypeScript • Desenvolvido com React & Tailwind CSS
          </p>
        </footer>
      </main>

      {/* Code Saver & Visual Editor Modal */}
      <CodeSaverModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetToDefault={handleResetToDefault}
        currentTheme={currentTheme}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profileName={config.profile.name}
      />
    </div>
  );
}
