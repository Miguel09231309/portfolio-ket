import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Eye, Trash2 } from 'lucide-react';
import { PortfolioLink, ThemeMode } from '../types';
import { renderIcon } from '../utils/iconMap';
import { copyToClipboard } from '../utils/codeExport';
import { THEMES } from '../utils/themeStyles';

interface LinkCardProps {
  link: PortfolioLink;
  categoryName?: string;
  currentTheme: ThemeMode;
  layoutStyle: 'cards' | 'compact';
  onTrackClick: (linkId: string) => void;
  onDeleteLink?: (linkId: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  categoryName,
  currentTheme,
  layoutStyle,
  onTrackClick,
  onDeleteLink,
}) => {
  const [copied, setCopied] = useState(false);
  const theme = THEMES[currentTheme];

  const handleCardClick = (e: React.MouseEvent) => {
    // Only increment click tracker
    onTrackClick(link.id);
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await copyToClipboard(link.url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDeleteLink) {
      onDeleteLink(link.id);
    }
  };

  // Extract clean domain for preview
  let domain = '';
  try {
    const urlObj = new URL(link.url);
    domain = urlObj.hostname.replace(/^www\./, '');
  } catch {
    domain = link.url;
  }

  if (layoutStyle === 'compact') {
    return (
      <a
        id={`link-item-${link.id}`}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCardClick}
        className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 active:scale-[0.99] ${
          theme.cardClass
        } ${theme.cardHoverClass} ${
          link.featured ? 'ring-1 ring-indigo-500/40' : ''
        }`}
      >
        <div className="flex items-center gap-3.5 min-w-0 pr-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            {renderIcon(link.icon, 'w-5 h-5')}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold truncate group-hover:text-indigo-400 transition-colors">
                {link.title}
              </h3>
              {link.badge && (
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${theme.accentBadge}`}>
                  {link.badge}
                </span>
              )}
            </div>
            {link.description && (
              <p className="text-xs text-neutral-400 truncate mt-0.5">
                {link.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-neutral-800/60 transition-opacity"
            title="Copiar URL"
            aria-label="Copiar link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {onDeleteLink && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-1.5 rounded-lg opacity-40 hover:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Remover este site"
              aria-label="Remover site"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-lg bg-neutral-800/40 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </div>
        </div>
      </a>
    );
  }

  // Rich Card Layout
  return (
    <div
      id={`link-card-${link.id}`}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl ${
        theme.cardClass
      } ${theme.cardHoverClass} ${
        link.featured ? 'ring-1 ring-indigo-500/30' : ''
      }`}
    >
      {/* Optional Card Image Banner */}
      {link.image && (
        <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-neutral-900">
          <img
            src={link.image}
            alt={link.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
          {link.badge && (
            <div className="absolute top-3 left-3">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border shadow-lg ${theme.accentBadge}`}>
                {link.badge}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row with icon and actions */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              {!link.image && (
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                  {renderIcon(link.icon, 'w-5 h-5')}
                </div>
              )}
              <div>
                {!link.image && link.badge && (
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-1 ${theme.accentBadge}`}>
                    {link.badge}
                  </span>
                )}
                <span className="text-xs text-neutral-400 font-mono block">
                  {domain}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Copy URL Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-all"
                title="Copiar URL para área de transferência"
                aria-label="Copiar link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              {onDeleteLink && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Remover este site"
                  aria-label="Remover site"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCardClick}
              className="focus:outline-none"
            >
              {link.title}
            </a>
          </h3>

          {/* Description */}
          {link.description && (
            <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
              currentTheme === 'light' ? 'text-slate-600' : 'text-neutral-400'
            }`}>
              {link.description}
            </p>
          )}

          {/* Tags */}
          {link.tags && link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {link.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-medium ${
                    currentTheme === 'light'
                      ? 'bg-slate-100 border-slate-200 text-slate-600'
                      : 'bg-neutral-800/50 border-neutral-700/50 text-neutral-400'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer with Link Action and Click Metrics */}
        <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Eye className="w-3.5 h-3.5 opacity-60" />
            <span>{link.clicks || 0} acessos</span>
          </div>

          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCardClick}
            className={`inline-flex items-center gap-1.5 font-semibold text-xs transition-transform group-hover:translate-x-0.5 ${theme.accentText}`}
          >
            <span>Acessar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
