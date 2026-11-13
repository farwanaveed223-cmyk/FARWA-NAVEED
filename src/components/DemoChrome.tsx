import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  ...rest
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Visual preview'}
        className={`flex items-center justify-center bg-gradient-to-br from-[#1b1b1b] via-[#131313] to-[#231d14] text-center p-6 ${className}`}
      >
        <div className="max-w-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C6A875]">
            {fallbackLabel || 'Farwa Studio Visual'}
          </p>
          {alt && <p className="mt-2 text-xs text-[#A09C9A]">{alt}</p>}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}

interface DemoReturnBarProps {
  demoName: string;
  clientBrand: string;
  categoryLabel: string;
  onBack: () => void;
  theme?: 'light' | 'dark';
}

export function DemoReturnBar({
  demoName,
  clientBrand,
  categoryLabel,
  onBack,
  theme = 'light',
}: DemoReturnBarProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`sticky top-0 z-50 border-b text-xs transition-colors ${
        isDark
          ? 'border-white/10 bg-[#0A0A0A]/95 text-[#F2EFEB]'
          : 'border-neutral-200 bg-white/95 text-neutral-800'
      }`}
    >
      <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#C6A875] text-[#090909] hover:bg-[#DCC9A3]'
                : 'bg-neutral-900 text-white hover:bg-neutral-700'
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Farwa&apos;s Agency</span>
          </button>
          <span
            className={`hidden sm:inline truncate ${
              isDark ? 'text-white/60' : 'text-neutral-500'
            }`}
          >
            {categoryLabel} · <strong className={isDark ? 'text-white' : 'text-neutral-900'}>{clientBrand}</strong> ({demoName})
          </span>
        </div>

        <div
          className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 text-[11px] font-medium ${
            isDark ? 'text-[#C6A875]' : 'text-neutral-600'
          }`}
        >
          <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Interactive Demo · Sample Data Only</span>
        </div>
      </div>
    </div>
  );
}
