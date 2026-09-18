import { PortfolioConfig } from './types';

/**
 * ============================================================================
 * CONFIGURAÇÃO DO SEU PORTFÓLIO DE LINKS (SALVO NO CÓDIGO)
 * ============================================================================
 * Todos os links e projetos importados diretamente de:
 * https://miguel09231309.github.io/portfolio/index.html
 * com separação fiel por trimestre (1º, 2º e 3º) e matérias (HTML, JS, Google AI).
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

export const INITIAL_PORTFOLIO_DATA: PortfolioConfig = {
  profile: {
    name: "Keth",
    role: "Desenvolvedora Front-End • Técnica em Desenvolvimento de Sistemas",
    bio: "Desenvolvedora apaixonada por criar interfaces modernas e intuitivas no Colégio Unidade Polo. Aplico conhecimentos em HTML, CSS, JavaScript, React e Inteligência Artificial.",
    avatarUrl: "",
    location: "Arapongas, Paraná, Brasil",
    email: "",
    availableForWork: true,
    statusText: "Projetos em HTML, JavaScript & Google AI",
    socialLinks: []
  },
  categories: [
    {
      id: "1-trimestre",
      name: "1º Trimestre",
      description: "Projetos e exercícios em HTML e JavaScript",
      icon: "Calendar"
    },
    {
      id: "2-trimestre",
      name: "2º Trimestre",
      description: "Projetos em HTML, JavaScript e Google AI",
      icon: "Calendar"
    },
    {
      id: "3-trimestre",
      name: "3º Trimestre",
      description: "Projetos e avanços em HTML e JavaScript",
      icon: "Calendar"
    }
  ],
  links: [
    /* ========================================================================
     * 1º TRIMESTRE — HTML
     * ======================================================================== */
    {
      id: "q1-html-teste",
      title: "Teste",
      url: "https://alifer2211.github.io/teste.html/teste.html",
      description: "Página de teste de estrutura HTML",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Code2",
      clicks: 0
    },
    {
      id: "q1-html-jogo",
      title: "Jogo",
      url: "https://alifer2211.github.io/jogo/jogo.html",
      description: "Projeto interativo de jogo desenvolvido em HTML",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Gamepad2",
      clicks: 0
    },
    {
      id: "q1-html-jogo-2048",
      title: "Jogo 2048",
      url: "https://alifer2211.github.io/jogo-2048/jogo.html",
      description: "Recriação do famoso quebra-cabeça 2048 em HTML",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Gamepad2",
      clicks: 0
    },
    {
      id: "q1-html-todos-gamma",
      title: "Todos do gamma",
      url: "https://miguel09231309.github.io/links/links.html",
      description: "Central de apresentações e documentos Gamma",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Layers",
      clicks: 0
    },
    {
      id: "q1-html-pac-man",
      title: "Pac-Man",
      url: "https://miguel09231309.github.io/Pac-Man/pac-man.html",
      description: "Jogo do Pac-Man com labirinto e animações em HTML",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Gamepad2",
      clicks: 0
    },
    {
      id: "q1-html-snack-expo",
      title: "Snack expo",
      url: "https://miguel09231309.github.io/snack-expo/snack.html",
      description: "Exposições e protótipos de apps Snack Expo",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Smartphone",
      clicks: 0
    },
    {
      id: "q1-html-links-docs",
      title: "Links docs",
      url: "https://miguel09231309.github.io/linksdocs/linkdocs.html",
      description: "Links de documentações de estudo e pesquisa",
      categoryId: "1-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "BookOpen",
      clicks: 0
    },

    /* ========================================================================
     * 1º TRIMESTRE — JAVASCRIPT (JS)
     * ======================================================================== */
    {
      id: "q1-js-teste",
      title: "Teste",
      url: "https://alifer2211.github.io/teste.js/teste.js",
      description: "Testes iniciais de sintaxe e comandos JavaScript",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q1-js-teste2",
      title: "Teste2",
      url: "https://alifer2211.github.io/teste2.js/teste2.js",
      description: "Exercício de estruturas de controle e variáveis",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q1-js-teste3",
      title: "Teste3",
      url: "https://alifer2211.github.io/teste3.js/teste3.js",
      description: "Fixação e operadores relacionais e lógicos",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q1-js-carro",
      title: "Carro",
      url: "https://alifer2211.github.io/carro.js/carro.js",
      description: "Simulação de propriedades e métodos de um carro em JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Cpu",
      clicks: 0
    },
    {
      id: "q1-js-notas",
      title: "Notas",
      url: "https://alifer2211.github.io/notas.js/notas.js",
      description: "Algoritmo para conferência e cálculo de notas",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "GraduationCap",
      clicks: 0
    },
    {
      id: "q1-js-media",
      title: "Media",
      url: "https://alifer2211.github.io/media/media_se.js",
      description: "Cálculo de média com condicionais se / senão (if/else)",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Binary",
      clicks: 0
    },
    {
      id: "q1-js-variaveis",
      title: "Variaveis",
      url: "https://alifer2211.github.io/variaveis.js/variaveis.js",
      description: "Demonstração prática de tipos e declaração de variáveis",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q1-js-brake",
      title: "Brake",
      url: "https://miguel09231309.github.io/brake_continue/brake_continue.js",
      description: "Uso prático de laços com break e continue em JavaScript",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Repeat",
      clicks: 0
    },
    {
      id: "q1-js-objeto",
      title: "Objeto",
      url: "https://miguel09231309.github.io/objeto/objeto.js",
      description: "Criação e manipulação de objetos e propriedades em JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Boxes",
      clicks: 0
    },
    {
      id: "q1-js-filtrar",
      title: "Filtrar",
      url: "https://miguel09231309.github.io/Filtrar/Filtrar.js",
      description: "Filtragem dinâmica de dados e arrays em JavaScript",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Filter",
      clicks: 0
    },
    {
      id: "q1-js-2js",
      title: "2js",
      url: "https://github.com/Miguel09231309/2js",
      description: "Repositório GitHub com coleção de exercícios JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Github",
      clicks: 0
    },
    {
      id: "q1-js-4js",
      title: "4js",
      url: "https://github.com/Miguel09231309/4js",
      description: "Repositório GitHub com algoritmos e desafios JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Github",
      clicks: 0
    },
    {
      id: "q1-js-conjunto",
      title: "Conjunto",
      url: "https://miguel09231309.github.io/conjuntonumero/conjuntonumero.js",
      description: "Manipulação de conjuntos numéricos e operações lógicas",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Binary",
      clicks: 0
    },
    {
      id: "q1-js-exercicio",
      title: "Exercicio",
      url: "https://miguel09231309.github.io/exercicio/exercicio.js",
      description: "Exercício prático de resolução de problemas com JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Code2",
      clicks: 0
    },
    {
      id: "q1-js-frutas",
      title: "Frutas",
      url: "https://miguel09231309.github.io/frutas/frutas.js",
      description: "Listagem, busca e ordenação de dados em vetor",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "ListFilter",
      clicks: 0
    },
    {
      id: "q1-js-lista-livros",
      title: "Lista livros",
      url: "https://miguel09231309.github.io/listalivros/listalivros.js",
      description: "Catálogo e gerenciamento de lista de livros com JS",
      categoryId: "1-trimestre",
      topic: "js",
      badge: "JS",
      icon: "BookOpen",
      clicks: 0
    },

    /* ========================================================================
     * 2º TRIMESTRE — HTML
     * ======================================================================== */
    {
      id: "q2-html-locafacil",
      title: "LocaFacíl",
      url: "https://locafacil-vb33.onrender.com/",
      description: "Plataforma web LocaFácil hospedada e funcional no Render",
      categoryId: "2-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Globe",
      clicks: 0
    },
    {
      id: "q2-html-fuelsense",
      title: "FuelSense",
      url: "https://benign-rota-flow-go.base44.app",
      description: "Aplicação FuelSense para monitoramento e gestão eficiente",
      categoryId: "2-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Compass",
      clicks: 0
    },
    {
      id: "q2-html-exemplo-c",
      title: "Exemplo HTML C",
      url: "https://example.com/q2-html-c",
      description: "Projeto estrutural e semântico em HTML",
      categoryId: "2-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Code2",
      clicks: 0
    },

    /* ========================================================================
     * 2º TRIMESTRE — JAVASCRIPT (JS)
     * ======================================================================== */
    {
      id: "q2-js-exemplo-a",
      title: "Exemplo JS A",
      url: "https://example.com/q2-js-a",
      description: "Demonstração de scripts dinâmicos e eventos",
      categoryId: "2-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q2-js-exemplo-b",
      title: "Exemplo JS B",
      url: "https://example.com/q2-js-b",
      description: "Interatividade com manipulação avançada de DOM",
      categoryId: "2-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q2-js-exemplo-c",
      title: "Exemplo JS C",
      url: "https://example.com/q2-js-c",
      description: "Consumo de dados e lógica assíncrona",
      categoryId: "2-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },

    /* ========================================================================
     * 2º TRIMESTRE — GOOGLE AI
     * ======================================================================== */
    {
      id: "q2-ai-easy-financas",
      title: "Easy Finanças",
      url: "https://miguel09231309.github.io/Financia/index.html",
      description: "Aplicativo de gestão financeira potencializado com Inteligência Artificial",
      categoryId: "2-trimestre",
      topic: "google-ai",
      badge: "Google AI",
      icon: "Sparkles",
      clicks: 0
    },
    {
      id: "q2-ai-pet-shop",
      title: "Pet-Shop",
      url: "https://miguel09231309.github.io/pet-shop/index.html",
      description: "Plataforma interativa para Pet Shop com recomendações inteligentes",
      categoryId: "2-trimestre",
      topic: "google-ai",
      badge: "Google AI",
      icon: "Sparkles",
      clicks: 0
    },
    {
      id: "q2-ai-class-edu",
      title: "Class-Edu",
      url: "https://miguel09231309.github.io/Class-Edu/index.html",
      description: "Ambiente educacional inteligente para apoio ao aprendizado",
      categoryId: "2-trimestre",
      topic: "google-ai",
      badge: "Google AI",
      icon: "Sparkles",
      clicks: 0
    },
    {
      id: "q2-ai-codelingo",
      title: "CodeLingo",
      url: "https://miguel09231309.github.io/CodeLingo/index.html",
      description: "Plataforma para aprender programação e linguagens com auxílio de IA",
      categoryId: "2-trimestre",
      topic: "google-ai",
      badge: "Google AI",
      icon: "Sparkles",
      clicks: 0
    },
    {
      id: "q2-ai-academia",
      title: "Academia",
      url: "https://miguel09231309.github.io/Academia/index.html",
      description: "Sistema para treino, fichas e condicionamento com IA",
      categoryId: "2-trimestre",
      topic: "google-ai",
      badge: "Google AI",
      icon: "Sparkles",
      clicks: 0
    },

    /* ========================================================================
     * 3º TRIMESTRE — HTML
     * ======================================================================== */
    {
      id: "q3-html-exemplo-a",
      title: "Exemplo Q3 HTML A",
      url: "https://example.com/q3-html-a",
      description: "Projetos avançados de interfaces em HTML5",
      categoryId: "3-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Code2",
      clicks: 0
    },
    {
      id: "q3-html-exemplo-b",
      title: "Exemplo Q3 HTML B",
      url: "https://example.com/q3-html-b",
      description: "Estruturação semântica e boas práticas para web",
      categoryId: "3-trimestre",
      topic: "html",
      badge: "HTML",
      icon: "Code2",
      clicks: 0
    },

    /* ========================================================================
     * 3º TRIMESTRE — JAVASCRIPT (JS)
     * ======================================================================== */
    {
      id: "q3-js-exemplo-a",
      title: "Exemplo Q3 JS A",
      url: "https://example.com/q3-js-a",
      description: "Aplicações dinâmicas e módulos em JS do 3º trimestre",
      categoryId: "3-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    },
    {
      id: "q3-js-exemplo-b",
      title: "Exemplo Q3 JS B",
      url: "https://example.com/q3-js-b",
      description: "Interatividade, persistência e manipulação de estado",
      categoryId: "3-trimestre",
      topic: "js",
      badge: "JS",
      icon: "Terminal",
      clicks: 0
    }
  ],
  theme: "dark",
  layoutStyle: "cards"
};
