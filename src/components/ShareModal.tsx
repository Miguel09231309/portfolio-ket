import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, ExternalLink, QrCode } from 'lucide-react';
import { copyToClipboard } from '../utils/codeExport';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profileName }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://meuportfolio.dev';

  const handleCopy = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareText = encodeURIComponent(`Confira os links e projetos de ${profileName}: ${currentUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  // Simple clean SVG QR code visual illustration
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&margin=6`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-neutral-100">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">Compartilhar Portfólio</h3>
              <p className="text-xs text-neutral-400">Divulgue seus links na bio e redes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-6 space-y-6">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
            <div className="p-2 bg-white rounded-xl shadow-md mb-2">
              <img
                src={qrApiUrl}
                alt="QR Code do Portfólio"
                className="w-36 h-36 rounded-lg object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <QrCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>Escaneie a câmera para abrir no celular</span>
            </div>
          </div>

          {/* Copy Link Input Bar */}
          <div>
            <label className="block text-xs font-medium text-neutral-400 mb-1.5">
              Link do seu portfólio
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 font-mono truncate focus:outline-none"
              />
              <button
                id="copy-share-url-btn"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all active:scale-95 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Shortcuts */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-neutral-400">Compartilhar diretamente:</span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-xs font-semibold text-neutral-300 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
