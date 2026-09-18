import fs from 'fs';
import { INITIAL_PORTFOLIO_DATA, TRIMESTER_TOPICS } from '../src/portfolioData';

const configJson = JSON.stringify(INITIAL_PORTFOLIO_DATA, null, 2);
const topicsJson = JSON.stringify(TRIMESTER_TOPICS, null, 2);

const standaloneHtml = `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfólio de Links • Keth</title>
  <meta name="description" content="Portfólio de projetos escolares e desenvolvimento web de Keth organizado por trimestres (1º, 2º e 3º) e matérias (HTML, JavaScript e Google AI)." />
  
  <!-- Fontes Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          },
          colors: {
            dark: {
              950: '#07080b',
              900: '#0c0d12',
              850: '#11131a',
              800: '#161922',
              750: '#1c202c',
              700: '#232837',
              600: '#32394c'
            }
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #0c0d12;
      color: #f1f5f9;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(120, 120, 120, 0.3);
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(120, 120, 120, 0.5);
    }
  </style>
</head>
<body class="min-h-screen bg-[#0c0d12] text-neutral-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">

  <!-- Container Principal -->
  <div id="app" class="min-h-screen flex flex-col"></div>

  <!-- Toast Notification Container -->
  <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <script>
    (function() {
      // Dados iniciais salvos diretamente no código
      const INITIAL_DATA = ${configJson};
      const TRIMESTER_TOPICS = ${topicsJson};

      const STORAGE_KEY = 'portfolio_keth_standalone_v1';

      // Estado do aplicativo
      let state = {
        config: loadConfig(),
        activeCategory: 'all', // 'all', '1-trimestre', '2-trimestre', '3-trimestre'
        activeTopic: 'all',    // 'all', 'html', 'js', 'google-ai'
        searchQuery: '',
        isAddModalOpen: false,
        isExportModalOpen: false
      };

      function loadConfig() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.profile && Array.isArray(parsed.links) && parsed.links.length > 0) {
              return parsed;
            }
          }
        } catch (e) {
          console.warn('Erro ao carregar do cache:', e);
        }
        return INITIAL_DATA;
      }

      function saveConfig(newConfig) {
        state.config = newConfig;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
        } catch (e) {
          console.error('Erro ao salvar no localStorage:', e);
        }
        render();
      }

      function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'px-4 py-3 rounded-2xl bg-neutral-900/95 border border-neutral-700/80 text-white shadow-2xl text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 pointer-events-auto transform translate-y-2 opacity-0';
        
        let iconSvg = '<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';
        if (type === 'error') {
          iconSvg = '<svg class="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
        }

        toast.innerHTML = iconSvg + '<span>' + escapeHtml(message) + '</span>';
        container.appendChild(toast);

        requestAnimationFrame(() => {
          toast.classList.remove('translate-y-2', 'opacity-0');
        });

        setTimeout(() => {
          toast.classList.add('opacity-0', 'translate-y-2');
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      }

      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      // Ícones SVG embutidos para garantir 100% de disponibilidade sem depender de conexões externas
      const ICONS = {
        code: '<svg class="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
        terminal: '<svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        sparkles: '<svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
        external: '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>',
        copy: '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
        trash: '<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>',
        search: '<svg class="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
        plus: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>',
        checkCircle: '<svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        calendar: '<svg class="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        mapPin: '<svg class="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
        download: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>',
        refresh: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>'
      };

      function getTopicBadge(topic) {
        if (topic === 'html') {
          return '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/15 border border-orange-500/30 text-orange-400">' + ICONS.code + ' HTML</span>';
        }
        if (topic === 'google-ai') {
          return '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">' + ICONS.sparkles + ' Google AI</span>';
        }
        return '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-400">' + ICONS.terminal + ' JavaScript</span>';
      }

      function getCategoryLabel(catId) {
        if (catId === '1-trimestre') return '1º Trimestre';
        if (catId === '2-trimestre') return '2º Trimestre';
        if (catId === '3-trimestre') return '3º Trimestre';
        return catId;
      }

      function render() {
        const app = document.getElementById('app');
        if (!app) return;

        const profile = state.config.profile;
        const allLinks = state.config.links;

        // Filtragem
        const query = state.searchQuery.trim().toLowerCase();
        const filteredLinks = allLinks.filter(link => {
          const matchCat = state.activeCategory === 'all' || link.categoryId === state.activeCategory;
          const matchTopic = state.activeTopic === 'all' || (link.topic || 'html') === state.activeTopic;
          const matchSearch = !query || 
            (link.title && link.title.toLowerCase().includes(query)) ||
            (link.description && link.description.toLowerCase().includes(query)) ||
            (link.url && link.url.toLowerCase().includes(query)) ||
            (link.badge && link.badge.toLowerCase().includes(query));
          return matchCat && matchTopic && matchSearch;
        });

        // Contagens
        const countQ1 = allLinks.filter(l => l.categoryId === '1-trimestre').length;
        const countQ2 = allLinks.filter(l => l.categoryId === '2-trimestre').length;
        const countQ3 = allLinks.filter(l => l.categoryId === '3-trimestre').length;

        // Construção do HTML
        let html = '';

        // HEADER
        html += \`
          <header class="sticky top-0 z-30 bg-[#0c0d12]/90 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-8 py-3.5">
            <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
              
              <!-- Brand -->
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                  \${escapeHtml(profile.name.charAt(0) || 'K')}
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="font-bold text-sm sm:text-base tracking-tight text-white">\${escapeHtml(profile.name)}</span>
                    <span title="Verificada">\${ICONS.checkCircle}</span>
                  </div>
                  <p class="text-[11px] text-neutral-400 font-medium hidden sm:block">Portfólio de Links • Colégio Unidade Polo</p>
                </div>
              </div>

              <!-- Search Bar & Actions -->
              <div class="flex items-center gap-2.5 flex-1 max-w-md justify-end">
                <div class="relative w-full max-w-xs">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    \${ICONS.search}
                  </span>
                  <input 
                    id="search-input"
                    type="text"
                    value="\${escapeHtml(state.searchQuery)}"
                    placeholder="Pesquisar projetos..."
                    class="w-full pl-9 pr-8 py-1.5 text-xs rounded-xl bg-neutral-900 border border-neutral-700/80 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  \${state.searchQuery ? \`
                    <button id="clear-search-btn" class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-white text-xs">
                      ✕
                    </button>
                  \` : ''}
                </div>

                <!-- Botão Adicionar Site -->
                <button 
                  id="open-add-modal-btn"
                  class="shrink-0 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  title="Cadastrar novo projeto"
                >
                  \${ICONS.plus}
                  <span class="hidden sm:inline">Adicionar</span>
                </button>

                <!-- Botão Backup / Código -->
                <button 
                  id="open-export-modal-btn"
                  class="shrink-0 p-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700/60 text-neutral-300 hover:text-white transition"
                  title="Configuração / Backup"
                >
                  \${ICONS.download}
                </button>
              </div>

            </div>
          </header>
        \`;

        // MAIN CONTENT
        html += \`
          <main class="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8">

            <!-- CARTÃO DE PERFIL -->
            <section class="p-6 sm:p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800/80 relative overflow-hidden backdrop-blur-sm">
              <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                
                <!-- Avatar -->
                <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-indigo-500/10 shrink-0">
                  <div class="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center font-extrabold text-2xl sm:text-3xl text-indigo-400">
                    \${escapeHtml(profile.name.charAt(0) || 'K')}
                  </div>
                  <div class="absolute -bottom-1 -right-1 p-1 rounded-full bg-neutral-900 border-2 border-neutral-800" title="Disponível">
                    <span class="relative flex h-3 w-3">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                </div>

                <!-- Bio & Dados -->
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">\${escapeHtml(profile.name)}</h1>
                    <span class="text-indigo-400">\${ICONS.checkCircle}</span>
                  </div>

                  <p class="text-sm sm:text-base font-semibold text-indigo-400 mb-2.5">
                    \${escapeHtml(profile.role)}
                  </p>

                  <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl mb-4">
                    \${escapeHtml(profile.bio)}
                  </p>

                  <!-- Pills de Informação Rápida -->
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    \${profile.location ? \`
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                        \${ICONS.mapPin} \${escapeHtml(profile.location)}
                      </span>
                    \` : ''}
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      \${escapeHtml(profile.statusText || 'Disponível')}
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      \${allLinks.length} Projetos Ativos
                    </span>
                  </div>
                </div>

              </div>
            </section>

            <!-- NAVEGAÇÃO POR TRIMESTRES (ABAS) -->
            <section class="space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-800">
                
                <!-- Abas dos Trimestres -->
                <div class="flex flex-wrap gap-2">
                  <button 
                    class="filter-cat-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 \${state.activeCategory === 'all' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'}"
                    data-cat="all"
                  >
                    <span>Todos os Projetos</span>
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">\${allLinks.length}</span>
                  </button>

                  <button 
                    class="filter-cat-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 \${state.activeCategory === '1-trimestre' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'}"
                    data-cat="1-trimestre"
                  >
                    <span>1º Trimestre</span>
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">\${countQ1}</span>
                  </button>

                  <button 
                    class="filter-cat-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 \${state.activeCategory === '2-trimestre' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'}"
                    data-cat="2-trimestre"
                  >
                    <span>2º Trimestre</span>
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">\${countQ2}</span>
                  </button>

                  <button 
                    class="filter-cat-btn px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 \${state.activeCategory === '3-trimestre' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-neutral-900/60 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'}"
                    data-cat="3-trimestre"
                  >
                    <span>3º Trimestre</span>
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] bg-black/30">\${countQ3}</span>
                  </button>
                </div>

                <!-- Filtro por Matéria -->
                <div class="flex items-center gap-1.5 bg-neutral-900/80 p-1 rounded-xl border border-neutral-800 text-xs">
                  <button 
                    class="filter-topic-btn px-2.5 py-1 rounded-lg font-medium transition \${state.activeTopic === 'all' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'}"
                    data-topic="all"
                  >
                    Todas
                  </button>
                  <button 
                    class="filter-topic-btn px-2.5 py-1 rounded-lg font-medium transition \${state.activeTopic === 'html' ? 'bg-orange-500/20 text-orange-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'}"
                    data-topic="html"
                  >
                    HTML
                  </button>
                  <button 
                    class="filter-topic-btn px-2.5 py-1 rounded-lg font-medium transition \${state.activeTopic === 'js' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'}"
                    data-topic="js"
                  >
                    JS
                  </button>
                  <button 
                    class="filter-topic-btn px-2.5 py-1 rounded-lg font-medium transition \${state.activeTopic === 'google-ai' ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'}"
                    data-topic="google-ai"
                  >
                    Google AI
                  </button>
                </div>

              </div>

              <!-- Indicador de resultados da pesquisa -->
              <div class="flex items-center justify-between text-xs text-neutral-400">
                <div>
                  Mostrando <strong class="text-white font-bold">\${filteredLinks.length}</strong> de \${allLinks.length} projetos
                  \${state.searchQuery ? \`<span class="ml-1 text-indigo-400">(pesquisando por "\${escapeHtml(state.searchQuery)}")</span>\` : ''}
                </div>
              </div>
            </section>

            <!-- GRID DE PROJETOS -->
            <section>
              \${filteredLinks.length === 0 ? \`
                <div class="text-center py-16 px-4 rounded-3xl bg-neutral-900/30 border border-neutral-800/60">
                  <div class="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400 mb-3">
                    \${ICONS.search}
                  </div>
                  <h3 class="text-base font-bold text-white mb-1">Nenhum projeto encontrado</h3>
                  <p class="text-xs text-neutral-400 max-w-sm mx-auto mb-4">Tente buscar por outro termo ou mudar os filtros de trimestre e matéria.</p>
                  <button id="reset-filters-btn" class="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition">
                    Limpar Filtros
                  </button>
                </div>
              \` : \`
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  \${filteredLinks.map(link => \`
                    <div class="group relative rounded-2xl p-5 bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between gap-4 shadow-sm hover:shadow-xl hover:shadow-black/30">
                      
                      <!-- Topo do Card -->
                      <div>
                        <div class="flex items-center justify-between gap-2 mb-2.5">
                          \${getTopicBadge(link.topic || 'html')}
                          <div class="flex items-center gap-1.5 text-[11px] text-neutral-500">
                            <span class="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/50">
                              \${getCategoryLabel(link.categoryId)}
                            </span>
                            \${link.clicks ? \`
                              <span class="text-neutral-500" title="\${link.clicks} acessos">
                                • \${link.clicks} \${link.clicks === 1 ? 'clique' : 'cliques'}
                              </span>
                            \` : ''}
                          </div>
                        </div>

                        <h3 class="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-1.5">
                          \${escapeHtml(link.title)}
                        </h3>

                        \${link.description ? \`
                          <p class="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                            \${escapeHtml(link.description)}
                          </p>
                        \` : ''}
                      </div>

                      <!-- Rodapé do Card com Ações -->
                      <div class="pt-3 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                        
                        <!-- Link Principal -->
                        <a 
                          href="\${escapeHtml(link.url)}" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          data-link-id="\${escapeHtml(link.id)}"
                          class="project-link flex-1 min-w-0 px-3 py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 text-xs font-semibold flex items-center justify-between gap-2 transition"
                        >
                          <span class="truncate">Acessar Projeto</span>
                          \${ICONS.external}
                        </a>

                        <!-- Botão Copiar Link -->
                        <button 
                          class="copy-link-btn p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                          data-url="\${escapeHtml(link.url)}"
                          title="Copiar link"
                        >
                          \${ICONS.copy}
                        </button>

                        <!-- Botão Excluir -->
                        <button 
                          class="delete-link-btn p-2 rounded-xl bg-neutral-800/80 hover:bg-red-500/20 text-neutral-500 hover:text-red-400 transition"
                          data-link-id="\${escapeHtml(link.id)}"
                          title="Remover projeto"
                        >
                          \${ICONS.trash}
                        </button>

                      </div>

                    </div>
                  \`).join('')}
                </div>
              \`}
            </section>

          </main>
        \`;

        // FOOTER
        html += \`
          <footer class="border-t border-neutral-800/80 py-8 px-4 text-center text-xs text-neutral-500">
            <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© \${new Date().getFullYear()} \${escapeHtml(profile.name)} • Portfólio Escolar 100% Autônomo</p>
              <div class="flex items-center gap-4 text-neutral-400">
                <span>HTML5</span>
                <span>•</span>
                <span>JavaScript</span>
                <span>•</span>
                <span>Google AI</span>
              </div>
            </div>
          </footer>
        \`;

        // MODAL: ADICIONAR SITE
        if (state.isAddModalOpen) {
          html += \`
            <div id="add-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-md bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
                
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    \${ICONS.plus} Adicionar Projeto
                  </h3>
                  <button id="close-add-modal-btn" class="text-neutral-400 hover:text-white text-sm">✕</button>
                </div>

                <form id="add-link-form" class="space-y-3.5">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="text-[11px] text-neutral-400 block mb-1 font-semibold">Trimestre</label>
                      <select id="modal-cat-select" class="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-indigo-500">
                        <option value="1-trimestre">1º Trimestre</option>
                        <option value="2-trimestre">2º Trimestre</option>
                        <option value="3-trimestre">3º Trimestre</option>
                      </select>
                    </div>
                    <div>
                      <label class="text-[11px] text-neutral-400 block mb-1 font-semibold">Matéria / Módulo</label>
                      <select id="modal-topic-select" class="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-indigo-500">
                        <option value="html">HTML</option>
                        <option value="js">JavaScript (JS)</option>
                        <option value="google-ai">Google AI</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="text-[11px] text-neutral-400 block mb-1 font-semibold">Nome do Projeto</label>
                    <input id="modal-title-input" type="text" placeholder="Ex: Meu Jogo HTML" required class="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
                  </div>

                  <div>
                    <label class="text-[11px] text-neutral-400 block mb-1 font-semibold">URL / Link</label>
                    <input id="modal-url-input" type="url" placeholder="https://..." required class="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
                  </div>

                  <div>
                    <label class="text-[11px] text-neutral-400 block mb-1 font-semibold">Descrição (opcional)</label>
                    <input id="modal-desc-input" type="text" placeholder="Breve resumo do projeto..." class="w-full bg-neutral-800 text-neutral-200 text-xs rounded-xl px-3 py-2.5 border border-neutral-700 focus:outline-none focus:border-indigo-500" />
                  </div>

                  <div class="pt-2 flex gap-2">
                    <button type="button" id="cancel-add-modal-btn" class="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition">
                      Cancelar
                    </button>
                    <button type="submit" class="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md">
                      Salvar Projeto
                    </button>
                  </div>
                </form>

              </div>
            </div>
          \`;
        }

        // MODAL: EXPORTAR / BACKUP
        if (state.isExportModalOpen) {
          html += \`
            <div id="export-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div class="w-full max-w-lg bg-neutral-900 border border-neutral-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
                
                <div class="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <h3 class="text-base font-bold text-white flex items-center gap-2">
                    \${ICONS.download} Backup & Código
                  </h3>
                  <button id="close-export-modal-btn" class="text-neutral-400 hover:text-white text-sm">✕</button>
                </div>

                <p class="text-xs text-neutral-400 leading-relaxed">
                  Este portfólio roda 100% autônomo. Você pode copiar o JSON com os dados salvos ou restaurar os 38 projetos padrão se desejar.
                </p>

                <div class="relative">
                  <textarea 
                    readonly 
                    rows="8" 
                    class="w-full font-mono text-[11px] p-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none resize-none"
                  >\${escapeHtml(JSON.stringify(state.config, null, 2))}</textarea>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                  <button 
                    id="reset-default-data-btn" 
                    class="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    \${ICONS.refresh} Restaurar Padrão
                  </button>

                  <div class="flex gap-2">
                    <button 
                      id="copy-json-btn"
                      class="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      \${ICONS.copy} Copiar JSON
                    </button>
                    <button 
                      id="close-export-modal-btn-2" 
                      class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                    >
                      Fechar
                    </button>
                  </div>
                </div>

              </div>
            </div>
          \`;
        }

        app.innerHTML = html;
        bindEvents();
      }

      function bindEvents() {
        // Busca
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            render();
            const newInput = document.getElementById('search-input');
            if (newInput) {
              newInput.focus();
              newInput.setSelectionRange(newInput.value.length, newInput.value.length);
            }
          });
        }

        const clearSearchBtn = document.getElementById('clear-search-btn');
        if (clearSearchBtn) {
          clearSearchBtn.addEventListener('click', () => {
            state.searchQuery = '';
            render();
          });
        }

        // Filtro por Categoria
        document.querySelectorAll('.filter-cat-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            state.activeCategory = btn.getAttribute('data-cat') || 'all';
            render();
          });
        });

        // Filtro por Matéria
        document.querySelectorAll('.filter-topic-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            state.activeTopic = btn.getAttribute('data-topic') || 'all';
            render();
          });
        });

        // Reset filtros
        const resetFiltersBtn = document.getElementById('reset-filters-btn');
        if (resetFiltersBtn) {
          resetFiltersBtn.addEventListener('click', () => {
            state.activeCategory = 'all';
            state.activeTopic = 'all';
            state.searchQuery = '';
            render();
          });
        }

        // Contagem de cliques no link
        document.querySelectorAll('.project-link').forEach(linkEl => {
          linkEl.addEventListener('click', () => {
            const linkId = linkEl.getAttribute('data-link-id');
            if (linkId) {
              const updatedLinks = state.config.links.map(l => {
                if (l.id === linkId) {
                  return { ...l, clicks: (l.clicks || 0) + 1 };
                }
                return l;
              });
              saveConfig({ ...state.config, links: updatedLinks });
            }
          });
        });

        // Copiar Link
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            if (url) {
              navigator.clipboard.writeText(url).then(() => {
                showToast('Link copiado para a área de transferência!');
              }).catch(() => {
                showToast('Link: ' + url);
              });
            }
          });
        });

        // Excluir Link
        document.querySelectorAll('.delete-link-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const linkId = btn.getAttribute('data-link-id');
            if (linkId && confirm('Deseja realmente remover este projeto do portfólio?')) {
              const updatedLinks = state.config.links.filter(l => l.id !== linkId);
              saveConfig({ ...state.config, links: updatedLinks });
              showToast('Projeto removido!');
            }
          });
        });

        // Modal Adicionar
        const openAddBtn = document.getElementById('open-add-modal-btn');
        if (openAddBtn) {
          openAddBtn.addEventListener('click', () => {
            state.isAddModalOpen = true;
            render();
          });
        }

        const closeAddBtn = document.getElementById('close-add-modal-btn');
        if (closeAddBtn) {
          closeAddBtn.addEventListener('click', () => {
            state.isAddModalOpen = false;
            render();
          });
        }

        const cancelAddBtn = document.getElementById('cancel-add-modal-btn');
        if (cancelAddBtn) {
          cancelAddBtn.addEventListener('click', () => {
            state.isAddModalOpen = false;
            render();
          });
        }

        const addForm = document.getElementById('add-link-form');
        if (addForm) {
          addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cat = document.getElementById('modal-cat-select').value;
            const topic = document.getElementById('modal-topic-select').value;
            const title = document.getElementById('modal-title-input').value.trim();
            let url = document.getElementById('modal-url-input').value.trim();
            const desc = document.getElementById('modal-desc-input').value.trim();

            if (!title || !url) return;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
              url = 'https://' + url;
            }

            const newLink = {
              id: 'custom-' + Date.now(),
              title: title,
              url: url,
              description: desc,
              categoryId: cat,
              topic: topic,
              badge: topic.toUpperCase(),
              icon: topic === 'html' ? 'Code2' : topic === 'google-ai' ? 'Sparkles' : 'Terminal',
              clicks: 0
            };

            const updatedLinks = [newLink, ...state.config.links];
            state.isAddModalOpen = false;
            saveConfig({ ...state.config, links: updatedLinks });
            showToast('Projeto cadastrado com sucesso!');
          });
        }

        // Modal Exportar
        const openExportBtn = document.getElementById('open-export-modal-btn');
        if (openExportBtn) {
          openExportBtn.addEventListener('click', () => {
            state.isExportModalOpen = true;
            render();
          });
        }

        const closeExportBtn = document.getElementById('close-export-modal-btn');
        if (closeExportBtn) {
          closeExportBtn.addEventListener('click', () => {
            state.isExportModalOpen = false;
            render();
          });
        }

        const closeExportBtn2 = document.getElementById('close-export-modal-btn-2');
        if (closeExportBtn2) {
          closeExportBtn2.addEventListener('click', () => {
            state.isExportModalOpen = false;
            render();
          });
        }

        const copyJsonBtn = document.getElementById('copy-json-btn');
        if (copyJsonBtn) {
          copyJsonBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(JSON.stringify(state.config, null, 2)).then(() => {
              showToast('JSON copiado para a área de transferência!');
            });
          });
        }

        const resetDefaultBtn = document.getElementById('reset-default-data-btn');
        if (resetDefaultBtn) {
          resetDefaultBtn.addEventListener('click', () => {
            if (confirm('Restaurar todos os 38 projetos originais de Keth?')) {
              state.isExportModalOpen = false;
              saveConfig(INITIAL_DATA);
              showToast('Dados restaurados para o padrão original!');
            }
          });
        }
      }

      // Inicia renderização quando o DOM estiver pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
      } else {
        render();
      }

    })();
  </script>
</body>
</html>
`;

fs.writeFileSync('./index.html', standaloneHtml, 'utf-8');
fs.writeFileSync('./public/standalone.html', standaloneHtml, 'utf-8');
console.log('Successfully generated standalone index.html and public/standalone.html');
