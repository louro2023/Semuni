import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <svg viewBox="0 0 400 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="20" y="30" fontFamily="sans-serif" fontSize="14" letterSpacing="4" fill="#333">SECRETARIA DA</text>
      
      <g fontFamily="sans-serif" fontSize="64" fontWeight="bold">
        <text x="20" y="95" fill="#e88ae1">M</text>
        <text x="80" y="95" fill="#2951b5">U</text>
        <text x="130" y="95" fill="#e65c22">L</text>
        <text x="175" y="95" fill="#b1a6e8">H</text>
        <text x="230" y="95" fill="#2951b5">E</text>
        <text x="275" y="95" fill="#e88ae1">R</text>
      </g>
      
      {/* Heart cutout in R */}
      <path d="M295 65 C295 60, 305 60, 305 65 C305 70, 295 75, 295 75 C295 75, 285 70, 285 65 C285 60, 295 60, 295 65 Z" fill="#ffffff"/>
      
      <text x="180" y="115" fontFamily="sans-serif" fontSize="12" letterSpacing="3" fill="#333">DE NOVA IGUAÇU</text>
    </svg>
  );
};
