import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Edit3, 
  Save, 
  RotateCcw, 
  Sparkles,
  Info,
  CheckCircle2,
  FileCode2,
  ListPlus,
  UserCheck
} from 'lucide-react';
import { PortfolioConfig, PortfolioLink, PortfolioCategory, ThemeMode } from '../types';
import { generateTypeScriptCode, downloadFile, copyToClipboard } from '../utils/codeExport';
import { AVAILABLE_ICONS, renderIcon } from '../utils/iconMap';
import { INITIAL_PORTFOLIO_DATA } from '../portfolioData';

interface CodeSaverModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onUpdateConfig: (newConfig: PortfolioConfig) => void;
  onResetToDefault: () => void;
  currentTheme: ThemeMode;
}

export const CodeSaverModal: React.FC<CodeSaverModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
  currentTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'addLink' | 'manageLinks' | 'profile'>('code');
  const [copied, setCopied] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form state for adding a new link
  const [newLink, setNewLink] = useState<Partial<PortfolioLink>>({
    title: '',
    url: '',
    description: '',
    categoryId: config.categories[0]?.id || '1-trimestre',
    icon: 'Globe',
    badge: '',
    tags: [],
    featured: false,
    image: '',
  });
  const [tagInput, setTagInput] = useState('');

  // Editing existing link state
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  if (!isOpen) return null;

  const generatedCode = generateTypeScriptCode(config);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(generatedCode);
    if (success) {
      setCopied(true);
      showNotification('Código TypeScript copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadCode = () => {
    downloadFile(generatedCode, 'portfolioData.ts');
    showNotification('Arquivo portfolioData.ts baixado com sucesso!');
  };

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) {
      showNotification('Preencha ao menos o Título e a URL do link.');
      return;
    }

    const tagsArray = tagInput
      ? tagInput.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const linkToAdd: PortfolioLink = {
      id: `link-${Date.now()}`,
      title: newLink.title.trim(),
      url: newLink.url.trim().startsWith('http') || newLink.url.trim().startsWith('mailto') 
        ? newLink.url.trim() 
        : `https://${newLink.url.trim()}`,
      description: newLink.description?.trim(),
      categoryId: newLink.categoryId || config.categories[0]?.id || 'geral',
      icon: newLink.icon || 'Link',
      badge: newLink.badge?.trim() || undefined,
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      featured: !!newLink.featured,
      image: newLink.image?.trim() || undefined,
      clicks: 0,
    };

    const updatedLinks = [linkToAdd, ...config.links];
    onUpdateConfig({
      ...config,
      links: updatedLinks,
    });

    // Reset form
    setNewLink({
      title: '',
      url: '',
      description: '',
      categoryId: config.categories[0]?.id || 'destaques',
      icon: 'Link',
      badge: '',
      tags: [],
      featured: false,
      image: '',
    });
    setTagInput('');
    showNotification('Link adicionado! Ele já aparece no portfólio e no código.');
    setActiveTab('code');
  };

  const handleDeleteLink = (id: string) => {
    const updatedLinks = config.links.filter((l) => l.id !== id);
    onUpdateConfig({
      ...config,
      links: updatedLinks,
    });
    showNotification('Link removido do portfólio.');
  };

  const handleMoveLink = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= config.links.length) return;

    const newLinks = [...config.links];
    const [moved] = newLinks.splice(index, 1);
    newLinks.splice(targetIndex, 0, moved);

    onUpdateConfig({
      ...config,
      links: newLinks,
    });
  };

  const handleProfileFieldChange = (field: string, value: any) => {
    onUpdateConfig({
      ...config,
      profile: {
        ...config.profile,
        [field]: value,
      },
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-100">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-neutral-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>Salvar no Código & Editor</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  src/portfolioData.ts
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Configure visualmente ou copie o código TypeScript pronto para salvar no seu repositório
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-neutral-800/60 bg-neutral-950/40 overflow-x-auto scrollbar-none">
          <button
            id="tab-btn-code"
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Código TypeScript ({config.links.length} links)</span>
          </button>

          <button
            id="tab-btn-add-link"
            onClick={() => setActiveTab('addLink')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'addLink'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Novo Link</span>
          </button>

          <button
            id="tab-btn-manage-links"
            onClick={() => setActiveTab('manageLinks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'manageLinks'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <ListPlus className="w-4 h-4" />
            <span>Gerenciar / Reordenar Links</span>
          </button>

          <button
            id="tab-btn-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Editar Perfil & Bio</span>
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: CODE EXPORT */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              {/* How it works banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                  <Info className="w-4 h-4" />
                  <span>Como seus links ficam salvos dentro do código:</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  O arquivo <strong><code className="text-indigo-300">src/portfolioData.ts</code></strong> contém a fonte oficial de dados dos seus links, categorias e perfil.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-neutral-300">
                  <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="font-bold text-indigo-400 block mb-0.5">1. Copie ou Baixe</span>
                    Use os botões abaixo para copiar o código TypeScript pronto.
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="font-bold text-indigo-400 block mb-0.5">2. Cole no Arquivo</span>
                    Substitua o conteúdo de <code className="text-indigo-300">src/portfolioData.ts</code>.
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <span className="font-bold text-indigo-400 block mb-0.5">3. Salvo no Git</span>
                    Seus links ficam versionados no código, sem custos ou banco externo.
                  </div>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    id="copy-ts-code-btn"
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 active:scale-95"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Código Copiado!' : 'Copiar Código TypeScript'}</span>
                  </button>

                  <button
                    id="download-ts-file-btn"
                    onClick={handleDownloadCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 font-medium text-xs transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>Baixar portfolioData.ts</span>
                  </button>
                </div>

                <button
                  onClick={onResetToDefault}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-400 transition-colors"
                  title="Restaurar dados originais"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar dados iniciais</span>
                </button>
              </div>

              {/* Monospace Code Display */}
              <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950/90 overflow-hidden shadow-inner">
                <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 border-b border-neutral-800/80 text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                    <span className="ml-1 text-neutral-300 font-semibold">src/portfolioData.ts</span>
                  </span>
                  <span>{config.links.length} links • TypeScript</span>
                </div>

                <pre className="p-4 text-xs font-mono text-neutral-300 overflow-x-auto max-h-[340px] leading-relaxed selection:bg-indigo-500/30">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW LINK */}
          {activeTab === 'addLink' && (
            <form onSubmit={handleCreateLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Título do Link / Projeto *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLink.title || ''}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    placeholder="Ex: Meu Portfólio no GitHub, SaaS Analytics..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    URL de Destino *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLink.url || ''}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="https://exemplo.com ou github.com/seu-user"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Descrição Curta
                </label>
                <textarea
                  rows={2}
                  value={newLink.description || ''}
                  onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                  placeholder="Breve explicação do projeto, artigo ou serviço..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={newLink.categoryId}
                    onChange={(e) => setNewLink({ ...newLink, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  >
                    {config.categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Icon Selector */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Ícone
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={newLink.icon}
                      onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                    >
                      {AVAILABLE_ICONS.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-indigo-400 shrink-0">
                      {renderIcon(newLink.icon, 'w-5 h-5')}
                    </div>
                  </div>
                </div>

                {/* Badge (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Badge de Destaque
                  </label>
                  <input
                    type="text"
                    value={newLink.badge || ''}
                    onChange={(e) => setNewLink({ ...newLink, badge: e.target.value })}
                    placeholder="Ex: ⭐ Destaque, Novo, Demo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tags (comma-separated) */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="React, TypeScript, Tailwind, OpenSource"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Image Banner URL */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Imagem de Capa (URL opcional)
                  </label>
                  <input
                    type="url"
                    value={newLink.image || ''}
                    onChange={(e) => setNewLink({ ...newLink, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={!!newLink.featured}
                  onChange={(e) => setNewLink({ ...newLink, featured: e.target.checked })}
                  className="rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-neutral-300 select-none">
                  Marcar como link com borda iluminada (Destaque visual)
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Link ao Portfólio</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: MANAGE / REORDER LINKS */}
          {activeTab === 'manageLinks' && (
            <div className="space-y-3">
              <div className="text-xs text-neutral-400 mb-2 flex items-center justify-between">
                <span>Total de links cadastrados: {config.links.length}</span>
                <span>Use as setas para reordenar os links</span>
              </div>

              {config.links.length === 0 ? (
                <div className="text-center py-10 text-neutral-500 text-sm">
                  Nenhum link cadastrado ainda. Use a aba "Adicionar Novo Link".
                </div>
              ) : (
                <div className="space-y-2">
                  {config.links.map((link, idx) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 shrink-0">
                          {renderIcon(link.icon, 'w-4 h-4')}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate">{link.title}</span>
                            {link.badge && (
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-500 truncate block">
                            {link.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleMoveLink(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Mover para cima"
                          aria-label="Mover para cima"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveLink(idx, 'down')}
                          disabled={idx === config.links.length - 1}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Mover para baixo"
                          aria-label="Mover para baixo"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 ml-1"
                          title="Excluir link"
                          aria-label="Excluir link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    value={config.profile.name}
                    onChange={(e) => handleProfileFieldChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Cargo / Especialidade
                  </label>
                  <input
                    type="text"
                    value={config.profile.role}
                    onChange={(e) => handleProfileFieldChange('role', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Bio / Apresentação
                </label>
                <textarea
                  rows={3}
                  value={config.profile.bio}
                  onChange={(e) => handleProfileFieldChange('bio', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    URL da Foto de Perfil (Avatar)
                  </label>
                  <input
                    type="url"
                    value={config.profile.avatarUrl}
                    onChange={(e) => handleProfileFieldChange('avatarUrl', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Localização (Cidade, País)
                  </label>
                  <input
                    type="text"
                    value={config.profile.location}
                    onChange={(e) => handleProfileFieldChange('location', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Texto de Disponibilidade
                  </label>
                  <input
                    type="text"
                    value={config.profile.statusText}
                    onChange={(e) => handleProfileFieldChange('statusText', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="available-work-check"
                    checked={config.profile.availableForWork}
                    onChange={(e) => handleProfileFieldChange('availableForWork', e.target.checked)}
                    className="rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <label htmlFor="available-work-check" className="text-xs text-neutral-300 select-none">
                    Exibir indicador de disponibilidade (Ponto verde pulsante)
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>As alterações no perfil são sincronizadas no código instantaneamente.</span>
                <button
                  type="button"
                  onClick={() => {
                    showNotification('Perfil atualizado com sucesso!');
                    setActiveTab('code');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
                >
                  Ver Código Atualizado
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-neutral-800/80 bg-neutral-900/90 flex items-center justify-between">
          <div className="text-xs text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dados salvos em tempo real no estado e exportáveis para TypeScript</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold transition-colors"
            >
              Fechar Visualização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
