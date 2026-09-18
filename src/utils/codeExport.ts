import { PortfolioConfig } from '../types';

/**
 * Converte a configuração em código TypeScript limpo e identado
 * pronto para ser colado em src/portfolioData.ts
 */
export function generateTypeScriptCode(config: PortfolioConfig): string {
  const jsonString = JSON.stringify(config, null, 2);

  return `import { PortfolioConfig } from './types';

/**
 * ============================================================================
 * CONFIGURAÇÃO DO SEU PORTFÓLIO DE LINKS (SALVO NO CÓDIGO)
 * ============================================================================
 * Atualizado em: ${new Date().toLocaleString('pt-BR')}
 * 
 * Todos os links e dados estão salvos diretamente neste código.
 */

export interface TrimesterTopicConfig {
  id: 'html' | 'js' | 'google-ai';
  name: string;
  shortName: string;
  icon: string;
  badgeClass: string;
  colorHex: string;
}

export const TRIMESTER_TOPICS: Record<string, TrimesterTopicConfig[]> = {
  '1-trimestre': [
    {
      id: 'html',
      name: 'HTML',
      shortName: 'HTML',
      icon: 'Code2',
      badgeClass: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
      colorHex: '#f97316'
    },
    {
      id: 'js',
      name: 'JavaScript (JS)',
      shortName: 'JavaScript',
      icon: 'Terminal',
      badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      colorHex: '#f59e0b'
    }
  ],
  '2-trimestre': [
    {
      id: 'html',
      name: 'HTML',
      shortName: 'HTML',
      icon: 'Code2',
      badgeClass: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
      colorHex: '#f97316'
    },
    {
      id: 'js',
      name: 'JavaScript (JS)',
      shortName: 'JavaScript',
      icon: 'Terminal',
      badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      colorHex: '#f59e0b'
    },
    {
      id: 'google-ai',
      name: 'Google AI',
      shortName: 'Google AI',
      icon: 'Sparkles',
      badgeClass: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      colorHex: '#6366f1'
    }
  ],
  '3-trimestre': [
    {
      id: 'html',
      name: 'HTML',
      shortName: 'HTML',
      icon: 'Code2',
      badgeClass: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
      colorHex: '#f97316'
    },
    {
      id: 'js',
      name: 'JavaScript (JS)',
      shortName: 'JavaScript',
      icon: 'Terminal',
      badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      colorHex: '#f59e0b'
    },
    {
      id: 'google-ai',
      name: 'Google AI',
      shortName: 'Google AI',
      icon: 'Sparkles',
      badgeClass: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400',
      colorHex: '#6366f1'
    }
  ]
};

export const INITIAL_PORTFOLIO_DATA: PortfolioConfig = ${jsonString};
`;
}

/**
 * Gera um arquivo HTML único e autônomo (single-file index.html)
 * com Tailwind CSS, React, ícones e a estrutura de trimestres e tópicos
 */
export function generateStandaloneHtml(config: PortfolioConfig): string {
  const configJson = JSON.stringify(config, null, 2);

  return `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.profile.name} • Portfólio de Links</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- React & ReactDOM CDN -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- Babel Standalone para rodar JSX direto no navegador -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body {
      background-color: #0c0d12;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }
  </style>
</head>
<body class="min-h-screen bg-[#0c0d12] text-neutral-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useMemo, useEffect } = React;

    const INITIAL_CONFIG = ${configJson};

    const TRIMESTER_TOPICS = {
      '1-trimestre': [
        { id: 'html', name: 'HTML', shortName: 'HTML', color: 'orange', badge: 'bg-orange-500/15 border-orange-500/30 text-orange-400' },
        { id: 'js', name: 'JavaScript (JS)', shortName: 'JavaScript', color: 'amber', badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400' }
      ],
      '2-trimestre': [
        { id: 'html', name: 'HTML', shortName: 'HTML', color: 'orange', badge: 'bg-orange-500/15 border-orange-500/30 text-orange-400' },
        { id: 'js', name: 'JavaScript (JS)', shortName: 'JavaScript', color: 'amber', badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400' },
        { id: 'google-ai', name: 'Google AI', shortName: 'Google AI', color: 'indigo', badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' }
      ],
      '3-trimestre': [
        { id: 'html', name: 'HTML', shortName: 'HTML', color: 'orange', badge: 'bg-orange-500/15 border-orange-500/30 text-orange-400' },
        { id: 'js', name: 'JavaScript (JS)', shortName: 'JavaScript', color: 'amber', badge: 'bg-amber-500/15 border-amber-500/30 text-amber-400' },
        { id: 'google-ai', name: 'Google AI', shortName: 'Google AI', color: 'indigo', badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' }
      ]
    };

    function App() {
      const [config, setConfig] = useState(() => {
        try {
          const saved = localStorage.getItem('portfolio_standalone_data');
          return saved ? JSON.parse(saved) : INITIAL_CONFIG;
        } catch {
          return INITIAL_CONFIG;
        }
      });

      const [selectedCat, setSelectedCat] = useState('1-trimestre');
      const [selectedTopic, setSelectedTopic] = useState('html');
      const [title, setTitle] = useState('');
      const [url, setUrl] = useState('');
      const [description, setDescription] = useState('');

      const availableTopics = TRIMESTER_TOPICS[selectedCat] || TRIMESTER_TOPICS['1-trimestre'];

      useEffect(() => {
        if (!availableTopics.some(t => t.id === selectedTopic)) {
          setSelectedTopic(availableTopics[0].id);
        }
      }, [selectedCat]);

      const handleAddLink = (e) => {
        e.preventDefault();
        if (!title.trim() || !url.trim()) return;
        const newLink = {
          id: 'link-' + Date.now(),
          title: title.trim(),
          url: url.trim().startsWith('http') ? url.trim() : 'https://' + url.trim(),
          description: description.trim(),
          categoryId: selectedCat,
          topic: selectedTopic,
          clicks: 0
        };
        const updated = { ...config, links: [newLink, ...config.links] };
        setConfig(updated);
        localStorage.setItem('portfolio_standalone_data', JSON.stringify(updated));
        setTitle('');
        setUrl('');
        setDescription('');
      };

      const handleDelete = (id) => {
        const updated = { ...config, links: config.links.filter(l => l.id !== id) };
        setConfig(updated);
        localStorage.setItem('portfolio_standalone_data', JSON.stringify(updated));
      };

      return (
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          {/* Perfil */}
          <div className="text-center p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-white mb-1">{config.profile.name}</h1>
            <p className="text-sm text-indigo-400 font-medium mb-2">{config.profile.role}</p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mb-4">{config.profile.bio}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {config.profile.socialLinks.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition">
                  {s.label || s.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Adicionar Novo Site */}
          <form onSubmit={handleAddLink} className="p-5 rounded-3xl bg-neutral-900/70 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Adicionar Novo Site / Projeto
              </h2>
              <span className="text-[11px] text-neutral-400">Salvo no Navegador</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Trimestre</label>
                <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)} className="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 border border-neutral-700 focus:outline-none focus:border-indigo-500">
                  {config.categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Matéria / Módulo</label>
                <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} className="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 border border-neutral-700 focus:outline-none focus:border-indigo-500">
                  {availableTopics.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <input type="text" placeholder="Nome do site ou projeto" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
              <input type="url" placeholder="https://meusite.com" value={url} onChange={e => setUrl(e.target.value)} required className="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
              <input type="text" placeholder="Descrição opcional" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md">
              Salvar Site no Portfólio
            </button>
          </form>

          {/* Listagem de Trimestres e Módulos */}
          <div className="space-y-6">
            {config.categories.map(cat => {
              const catLinks = config.links.filter(l => l.categoryId === cat.id);
              const topics = TRIMESTER_TOPICS[cat.id] || TRIMESTER_TOPICS['1-trimestre'];

              return (
                <div key={cat.id} className="p-5 rounded-3xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <h2 className="text-base font-bold text-white">{cat.name}</h2>
                    <span className="text-xs text-neutral-400">{catLinks.length} {catLinks.length === 1 ? 'site' : 'sites'}</span>
                  </div>

                  <div className="space-y-4">
                    {topics.map(topic => {
                      const topicLinks = catLinks.filter(l => (l.topic || 'html') === topic.id);

                      return (
                        <div key={topic.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={"text-xs font-bold px-2 py-0.5 rounded-md border " + topic.badge}>
                              {topic.name}
                            </span>
                            <span className="text-[11px] text-neutral-500">{topicLinks.length}</span>
                          </div>

                          {topicLinks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {topicLinks.map(link => (
                                <div key={link.id} className="p-3.5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 flex flex-col justify-between gap-2 hover:border-neutral-500 transition">
                                  <div>
                                    <div className="flex items-start justify-between gap-2">
                                      <h4 className="text-xs font-bold text-white leading-snug">{link.title}</h4>
                                      <button onClick={() => handleDelete(link.id)} className="text-neutral-500 hover:text-red-400 text-xs" title="Excluir">✕</button>
                                    </div>
                                    {link.description && (
                                      <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">{link.description}</p>
                                    )}
                                  </div>
                                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 mt-1 truncate">
                                    {link.url} ↗
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[11px] text-neutral-500 py-2 px-3 rounded-xl border border-dashed border-neutral-800 text-center">
                              Nenhum site em {topic.name} cadastrado ainda.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <footer className="text-center text-xs text-neutral-500 py-4">
            {config.profile.name} • Portfólio Autônomo HTML
          </footer>
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>`;
}

/**
 * Dispara o download direto de um arquivo no navegador
 */
export function downloadFile(content: string, filename = 'portfolioData.ts') {
  const isHtml = filename.endsWith('.html');
  const blob = new Blob([content], { type: isHtml ? 'text/html;charset=utf-8' : 'text/typescript;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copia texto para a área de transferência de forma segura
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error('Falha ao copiar:', err);
    return false;
  }
}
