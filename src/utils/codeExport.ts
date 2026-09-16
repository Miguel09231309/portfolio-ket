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
 * Você pode editar diretamente os links, redes sociais, perfil e categorias
 * neste arquivo. O portfólio atualizará instantaneamente.
 */

export const INITIAL_PORTFOLIO_DATA: PortfolioConfig = ${jsonString};
`;
}

/**
 * Dispara o download direto de um arquivo no navegador
 */
export function downloadFile(content: string, filename = 'portfolioData.ts') {
  const blob = new Blob([content], { type: 'text/typescript;charset=utf-8' });
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
