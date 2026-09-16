import { PortfolioConfig } from './types';

/**
 * ============================================================================
 * CONFIGURAÇÃO DO SEU PORTFÓLIO DE LINKS (SALVO NO CÓDIGO)
 * ============================================================================
 * Você pode editar diretamente os links, redes sociais, perfil e categorias
 * neste arquivo de código. O portfólio atualizará automaticamente!
 * 
 * DICA: Você também pode usar o botão "Editor & Código" no app para editar
 * visualmente e copiar o código pronto para colar aqui.
 */

export const INITIAL_PORTFOLIO_DATA: PortfolioConfig = {
  profile: {
    name: "Keth",
    role: "Desenvolvedora Full Stack & UI Designer",
    bio: "Criando experiências digitais memoráveis, desenvolvedora de sistemas.",
    avatarUrl: "",
    location: "Arapongas, Paraná, Brasil",
    email: "contato@keth.dev",
    availableForWork: true,
    statusText: "Disponível para novos projetos e freelas",
    socialLinks: [
      {
        id: "github",
        platform: "GitHub",
        url: "https://github.com",
        icon: "Github",
        label: "@keth"
      },
      {
        id: "linkedin",
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: "Linkedin",
        label: "Keth"
      },
      {
        id: "instagram",
        platform: "Instagram",
        url: "https://instagram.com",
        icon: "Instagram",
        label: "@keth.code"
      },
      {
        id: "whatsapp",
        platform: "WhatsApp",
        url: "https://wa.me/5511999999999",
        icon: "MessageCircle",
        label: "Falar no WhatsApp"
      },
      {
        id: "email",
        platform: "E-mail",
        url: "mailto:contato@keth.dev",
        icon: "Mail",
        label: "contato@keth.dev"
      }
    ]
  },
  categories: [
    {
      id: "1-trimestre",
      name: "1º Trimestre",
      description: "Sites e projetos do 1º trimestre",
      icon: "Calendar"
    },
    {
      id: "2-trimestre",
      name: "2º Trimestre",
      description: "Sites e projetos do 2º trimestre",
      icon: "Calendar"
    },
    {
      id: "3-trimestre",
      name: "3º Trimestre",
      description: "Sites e projetos do 3º trimestre",
      icon: "Calendar"
    }
  ],
  links: [],
  theme: "dark",
  layoutStyle: "cards"
};
