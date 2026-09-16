import React from 'react';
import { 
  MapPin, 
  Mail, 
  CheckCircle2, 
  Briefcase,
  ExternalLink 
} from 'lucide-react';
import { ProfileInfo, ThemeMode } from '../types';
import { renderIcon } from '../utils/iconMap';
import { THEMES } from '../utils/themeStyles';

interface ProfileCardProps {
  profile: ProfileInfo;
  currentTheme: ThemeMode;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, currentTheme }) => {
  const theme = THEMES[currentTheme];

  return (
    <div 
      id="portfolio-profile-card"
      className={`w-full max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${theme.cardClass}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        {/* Avatar with Status Badge (rendered only if avatarUrl is provided) */}
        {profile.avatarUrl ? (
          <div className="relative group shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/30 p-1 shadow-xl shadow-black/20 bg-neutral-900/40">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=6366f1&color=fff&size=200`;
                }}
              />
            </div>

            {/* Availability Status Dot */}
            {profile.availableForWork && (
              <div 
                className="absolute -bottom-1 -right-1 flex items-center justify-center p-1 rounded-full bg-neutral-900 border-2 border-neutral-800"
                title={profile.statusText}
              >
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                </span>
              </div>
            )}
          </div>
        ) : null}

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <span 
              className="inline-flex items-center text-indigo-400" 
              title="Perfil verificado"
            >
              <CheckCircle2 className="w-5 h-5 fill-indigo-500/20" />
            </span>
          </div>

          <p className={`text-sm sm:text-base font-medium mb-3 ${theme.accentText}`}>
            {profile.role}
          </p>

          <p className={`text-sm leading-relaxed mb-4 max-w-xl ${
            currentTheme === 'light' ? 'text-slate-600' : 'text-neutral-400'
          }`}>
            {profile.bio}
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-5">
            {profile.location && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                currentTheme === 'light' 
                  ? 'bg-slate-100 text-slate-700 border-slate-200' 
                  : 'bg-neutral-800/80 text-neutral-300 border-neutral-700/60'
              }`}>
                <MapPin className="w-3.5 h-3.5 opacity-70" />
                {profile.location}
              </span>
            )}

            {profile.availableForWork && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {profile.statusText || 'Disponível'}
              </span>
            )}
          </div>

          {/* Social Links Row */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-neutral-800/60">
              {profile.socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={`social-link-${social.id}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2 group ${
                    currentTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300'
                      : 'bg-neutral-800/50 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-600'
                  }`}
                  title={`${social.platform}: ${social.label || social.url}`}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {renderIcon(social.icon, 'w-4 h-4')}
                  </span>
                  {social.label && (
                    <span className="text-xs font-medium hidden md:inline-block">
                      {social.label}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
