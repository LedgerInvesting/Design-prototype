import React from 'react';

// Base icon interface
export interface BaseIconProps {
  color?: string;
  className?: string;
}

// Size-specific interfaces
export interface ExtraSmallIconProps extends BaseIconProps {
  // Extra small icons are typically 8x8px
}

export interface SmallIconProps extends BaseIconProps {
  // Small icons are typically 12x12px
}

export interface MediumIconProps extends BaseIconProps {
  // Medium icons are typically 22x22px
}

export interface TableIconProps extends BaseIconProps {
  // Table icons are typically used in data tables, 24x24px
}

export interface LogoIconProps extends BaseIconProps {
  // Logo icons for branding and navigation, variable sizes
}

export interface CardIconProps extends BaseIconProps {
  // Card icons are used beside card titles, 15x18px
}

// Icon size constants
export const ICON_SIZES = {
  extraSmall: 8,
  small: 12,
  medium: 22,
  table: 24,
  logo: 14, // Standard size for navigation logos
  card: 15, // Card icons are 15x18px
} as const;

// Extra Small Icons (8x8px)
export const ChevronDownExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M7.75 3L4.75 6L1.75 3" 
      stroke={color} 
      strokeWidth="1.6"
    />
  </svg>
);

export const ChevronUpExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M1.75 6L4.75 3L7.75 6" 
      stroke={color} 
      strokeWidth="1.6"
    />
  </svg>
);

export const ChevronRightExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M2.75 1.5L5.75 4.5L2.75 7.5" 
      stroke={color} 
      strokeWidth="1.6"
    />
  </svg>
);

export const PlusExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M5.50488 4.49734H0.504883" stroke={color} strokeWidth="1.4"/>
    <path d="M8.99023 4.49725L5.45468 4.49725" stroke={color} strokeWidth="1.4"/>
    <path d="M4.74707 8.73993L4.74707 5.20437" stroke={color} strokeWidth="1.4"/>
    <path d="M4.74707 6.2547L4.74707 0.254699" stroke={color} strokeWidth="1.4"/>
  </svg>
);

export const XExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M7.25 1.5L1.25 7.5M1.25 1.5L7.25 7.5" 
      stroke={color} 
      strokeWidth="1.6"
    />
  </svg>
);

export const XStyle2ExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4.24707 4.99731L1.74705 7.49733" stroke={color} strokeWidth="1.4"/>
    <path d="M7.74707 1.49728L5.24705 3.9973" stroke={color} strokeWidth="1.4"/>
    <path d="M7.74707 7.49734L5.24705 4.99733" stroke={color} strokeWidth="1.4"/>
    <path d="M4.24707 3.99731L1.74705 1.4973" stroke={color} strokeWidth="1.4"/>
  </svg>
);

export const ArrowLeftExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M4.97177 1.5L1.97177 4.5M1.97177 4.5L4.97177 7.5M1.97177 4.5H8.5285" 
      stroke={color} 
      strokeWidth="1.6"
    />
  </svg>
);

export const MinusExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 8 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M3 4.49734L-8.9407e-08 4.49734" stroke={color} strokeWidth="1.4"/>
    <path d="M8 4.49725H3" stroke={color} strokeWidth="1.4"/>
  </svg>
);

export const SearchExtraSmall: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 8 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4.5 5.5L6.5 7.5" stroke={color} strokeWidth="2"/>
    <circle cx="3" cy="4" r="2" stroke={color} strokeWidth="2"/>
  </svg>
);

// Small Icons (12x12px) - Auto-generated from SVG files

export const AddSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0V5H0.5V7H5.5V12H7.5V7H12.5V5H7.5V0H5.5ZM7.5 5V7H5.5V5H7.5Z" fill={color}/>
    </svg>
);

export const ArrowUpSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.5 10.25V3.25M6.5 3.25L2.5 7.68698M6.5 3.25L10.5 7.68698" stroke={color} strokeWidth="1.6"/>
  </svg>
);

export const ArrowDownSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.5 3.25L6.5 10.25M6.5 10.25L10.5 5.81302M6.5 10.25L2.5 5.81302" stroke={color} strokeWidth="1.6"/>
  </svg>
);

export const CalendarSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.6072 9.94904V2.77648H2.23926V5.16733V10.5468H10.0095M4.74061 4.21533V1.18406M8.32117 4.21533V1.18406M2.75638 5.70352H10.7564" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const CheckSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.25 5.75L5.25 8.75L8 6L10.75 3.25" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const ChevronBottomSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.50032 6.19428L3.28335 2.97732L1.86914 4.39153L6.50032 9.02271L11.1315 4.39153L9.71728 2.97732L6.50032 6.19428Z" fill={color}/>
    </svg>
);

export const ChevronLeftSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.04182 6.00001L9.25879 2.78305L7.84458 1.36884L3.2134 6.00001L7.84458 10.6312L9.25879 9.21698L6.04182 6.00001Z" fill={color}/>
    </svg>
);

export const ChevronRightSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.04802 6.00001L3.83105 2.78305L5.24527 1.36884L9.87645 6.00001L5.24527 10.6312L3.83105 9.21698L7.04802 6.00001Z" fill={color}/>
    </svg>
);

export const CircledCheckSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_424_396)">
    <circle cx="5.99975" cy="6.5" r="5.09253" stroke={color} strokeWidth="1.4"/>
    <path d="M8.31641 4.80679L5.22267 7.90023L3.68355 6.36111" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_424_396">
    <rect width="12" height="12" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
    </defs>
    </svg>
);

export const CircledXSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_424_405)">
    <circle cx="5.99975" cy="6.5" r="5.09253" stroke={color} strokeWidth="1.4"/>
    <path d="M4.23535 4.7337L7.77089 8.26924" stroke={color} strokeWidth="1.4"/>
    <path d="M7.77148 4.74069L4.23595 8.27623" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_424_405">
    <rect width="12" height="12" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
    </defs>
    </svg>
);

export const CloseSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.5 2.25L2.5 10.25M2.5 2.25L10.5 10.25" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const DocumentSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3.13281 9.53533V1.79127L7.84659 1.79127L9.86678 3.47476V8.35689V10.2087H3.80621" stroke={color} strokeWidth="1.4"/>
    <path d="M6.5 1.79127V4.48486" stroke={color} strokeWidth="1.4"/>
    <path d="M9.86719 5.15825L7.1736 5.15825" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const DownloadSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.5 0.324036L6.5 8.32404M6.5 8.32404L10.5 4.57404M6.5 8.32404L2.5 4.57404" stroke={color} strokeWidth="1.4"/>
    <path d="M1.5 10.9908H11.5" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const EditSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_41_330)">
    <path d="M7.5 2.25002L1 8.75002V10.75H3L9.5 4.25002" stroke={color} strokeWidth="1.4"/>
    <rect width="1.41426" height="1.41426" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10 2.75002)" fill={color}/>
    <path d="M1 10.75L12 10.75" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_41_330">
    <rect width="12" height="12" fill="white" transform="translate(0.5 0.25)"/>
    </clipPath>
    </defs>
    </svg>
);

export const EmptySmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <mask id="path-1-inside-1_41_324" fill="white">
    <path d="M6.49987 1.43889C9.09348 1.43889 11.196 3.54143 11.196 6.13504C11.196 8.72866 9.09348 10.8312 6.49987 10.8312C3.90625 10.8312 1.80371 8.72866 1.80371 6.13504C1.80371 3.54143 3.90625 1.43889 6.49987 1.43889ZM6.49987 9.52854C8.37405 9.52854 9.89337 8.00922 9.89337 6.13504C9.89337 4.26086 8.37405 2.74154 6.49987 2.74154C4.62569 2.74154 3.10637 4.26086 3.10637 6.13504C3.10637 8.00922 4.62569 9.52854 6.49987 9.52854Z"/>
    </mask>
    <path d="M6.49987 1.43889C9.09348 1.43889 11.196 3.54143 11.196 6.13504C11.196 8.72866 9.09348 10.8312 6.49987 10.8312C3.90625 10.8312 1.80371 8.72866 1.80371 6.13504C1.80371 3.54143 3.90625 1.43889 6.49987 1.43889ZM6.49987 9.52854C8.37405 9.52854 9.89337 8.00922 9.89337 6.13504C9.89337 4.26086 8.37405 2.74154 6.49987 2.74154C4.62569 2.74154 3.10637 4.26086 3.10637 6.13504C3.10637 8.00922 4.62569 9.52854 6.49987 9.52854Z" stroke={color} strokeWidth="2.8" mask="url(#path-1-inside-1_41_324)"/>
    <path d="M9.49976 2.635L4.03124 9.59056" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const EraserSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.667 6.25051L7.36776 10.5498L4.61529 10.5498L2.49052 8.425L8.16602 2.7495L11.667 6.25051Z" stroke={color} strokeWidth="1.4"/>
    <path d="M6.19548 4.72098L8.16113 2.75519L11.6641 6.25818L9.64931 8.27323L7.50835 6.25878" stroke={color} strokeWidth="1.4"/>
    <path d="M1 10.75L12 10.75" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const ExpandSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.28359 5.49562L10.5292 2.25M10.5292 2.25V6.48331M10.5292 2.25H6.2959" stroke={color} strokeWidth="1.4"/>
    <path d="M5.66766 6.99161L2.50009 10.1592M2.50009 10.1592L2.50009 5.92587M2.50009 10.1592L6.7334 10.1592" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const ExternalLinkSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.5 2.25L5.08065 7.66935M10.5 2.25V5.08871M10.5 2.25H7.40323M5.33871 3.28226H2.5V10.25H9.72581V6.89516" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const GraphSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3.5 10.1376V2.36237" stroke={color} strokeWidth="1.6"/>
    <path d="M9.5 10.1376L9.5 3.65826" stroke={color} strokeWidth="1.6"/>
    <path d="M6.5 10.1375L6.5 5.60199" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const LessSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_422_11)">
    <circle cx="6.49975" cy="6.5" r="5.09253" stroke={color} strokeWidth="1.4"/>
    <path d="M4 6.5H9" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_422_11">
    <rect width="12" height="12" fill="white" transform="translate(0.5 0.5)"/>
    </clipPath>
    </defs>
    </svg>
);

export const LockSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_41_328)">
    <path d="M7.77209 5.85333H2.83984V10.7546H6.17041L10.1595 10.7549V5.04582" stroke={color} strokeWidth="1.6"/>
    <path d="M8.51988 5.02055V3.92106C8.51988 2.71931 7.54567 1.7451 6.34392 1.7451V1.7451C5.14218 1.7451 4.16797 2.71931 4.16797 3.92106V5.16747" stroke={color} strokeWidth="1.6"/>
    <circle cx="6.46049" cy="8.33627" r="0.970259" fill={color}/>
    </g>
    <defs>
    <clipPath id="clip0_41_328">
    <rect width="12" height="12" fill="white" transform="translate(0.5 0.25)"/>
    </clipPath>
    </defs>
    </svg>
);

export const OpenSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.626 2.375L7.12598 5.875M10.626 2.375V5.21371M10.626 2.375H7.5292" stroke={color} strokeWidth="1.6"/>
    <path d="M2.375 10.625L5.875 7.125M2.375 10.625L2.375 7.78629M2.375 10.625L5.47177 10.625" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const PlaySmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.3457 6.25L3.63351 10.1253L3.63351 2.37472L10.3457 6.25Z" stroke={color} strokeWidth="1.4" strokeLinejoin="bevel"/>
    </svg>
);

export const PlusSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_422_12)">
    <circle cx="6.49975" cy="6.5" r="5.09253" stroke={color} strokeWidth="1.4"/>
    <path d="M4 6.5H9" stroke={color} strokeWidth="1.4"/>
    <path d="M6.50488 4.005L6.50488 9.00501" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_422_12">
    <rect width="12" height="12" fill="white" transform="translate(0.5 0.5)"/>
    </clipPath>
    </defs>
    </svg>
);

export const ReplySmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2.50048 5.45472L9.95215 5.45472L9.95215 10.4066M2.50048 5.45472L5.88762 8.84186M2.50048 5.45472L5.86172 2.09349" stroke={color} strokeWidth="1.4"/>
    </svg>
);

export const S1ArrowDownSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5.88963 9.49088L2.8974 6.49866L1.61502 7.78104L4.60724 10.7733C5.22279 11.3888 6.15905 11.4702 6.61501 11.4987C6.6435 11.0997 6.61501 10.2163 5.88963 9.49088Z" fill={color}/>
    <path d="M5.61503 0.498657L7.61503 0.498657L7.61503 7.49866L7.11502 8.49866L6.11503 8.49866L5.61503 7.49866L5.61503 0.498657Z" fill={color}/>
    <path d="M8.39352 10.7733L11.3857 7.78104L10.1034 6.49866L7.11113 9.49088C6.61502 9.98699 6.6435 11.0427 6.61501 11.4987C7.01397 11.5272 7.83853 11.3282 8.39352 10.7733Z" fill={color}/>
    </svg>
);

export const S1ArrowRightSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.99125 6.61074L6.99902 9.60296L8.28141 10.8853L11.2736 7.89312C11.8892 7.27758 11.9705 6.34132 11.999 5.88536C11.6001 5.85686 10.7166 5.88536 9.99125 6.61074Z" fill={color}/>
    <path d="M0.999024 6.88534L0.999023 4.88534L7.99902 4.88534L8.99902 5.38534L8.99902 6.38534L7.99902 6.88534H0.999024Z" fill={color}/>
    <path d="M11.2736 4.10685L8.28141 1.11462L6.99902 2.39701L9.99125 5.38923C10.4874 5.88534 11.5431 5.85686 11.999 5.88536C12.0275 5.4864 11.8286 4.66183 11.2736 4.10685Z" fill={color}/>
    </svg>
);

export const S2ArrowRightSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.85 2.21949L10.8805 6.25L6.85 10.2805L5.86005 9.29056L8.20061 6.95H2.81949L2.81949 5.55L8.20061 5.55L5.86005 3.20944L6.85 2.21949Z" fill={color}/>
    </svg>
);

export const TrashSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_41_339)">
    <path d="M9.77649 4.99992L9.7765 10.0532L3.77658 10.0532L3.7766 4.99992M4.77663 1.49992L8.7765 1.49991M8.7765 3.49991L11.7765 3.49991M1.77667 3.49991L4.77663 3.49991M6.77658 5.49992L6.77658 7.49992" stroke={color} strokeWidth="1.4"/>
    </g>
    <defs>
    <clipPath id="clip0_41_339">
    <rect width="12" height="12" fill="white" transform="translate(0.5)"/>
    </clipPath>
    </defs>
    </svg>
);

export const CalculatorSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.85985 10.8735H2.48242V1.17754H9.74902V9.93763" stroke={color} strokeWidth="1.6"/>
    <rect x="4.27734" y="3.36914" width="3.73535" height="1.48592" fill={color}/>
    <rect x="4.27832" y="5.85506" width="1.53805" height="0.965044" fill={color}/>
    <rect x="4.27832" y="7.8201" width="1.53805" height="0.965044" fill={color}/>
    <rect x="6.46973" y="5.85506" width="1.53805" height="0.965044" fill={color}/>
    <rect x="6.46973" y="7.8201" width="1.53805" height="0.965044" fill={color}/>
  </svg>
);

export const UploadSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.00051 7.42175L6.00051 1.3828M6.00051 1.3828L2.37224 4.76259M6.00051 1.3828L9.70215 4.79488" stroke={color} strokeWidth="1.4"/>
    <path d="M1.82227 9.80004V7.40665M10.1777 9.79688V7.40665M2.51827 10.4967H9.49538" stroke={color} strokeWidth="1.4"/>
  </svg>
);

export const ConfigSmall: React.FC<SmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.small} height={ICON_SIZES.small} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="5.99728" cy="6.00336" r="3.37716" stroke={color} strokeWidth="1.5"/>
    <path d="M6.00098 0.496643V2.81317" stroke={color} strokeWidth="1.5"/>
    <path d="M6.00098 9.15709V11.4736" stroke={color} strokeWidth="1.5"/>
    <path d="M11.4951 5.979L9.17859 5.979" stroke={color} strokeWidth="1.5"/>
    <path d="M2.83398 5.979L0.517452 5.979" stroke={color} strokeWidth="1.5"/>
    <path d="M9.88281 2.10014L8.24478 3.73818" stroke={color} strokeWidth="1.5"/>
    <path d="M3.75977 8.224L2.12173 9.86203" stroke={color} strokeWidth="1.5"/>
    <path d="M9.8916 9.86176L8.25357 8.22372" stroke={color} strokeWidth="1.5"/>
    <path d="M3.76758 3.73788L2.12954 2.09985" stroke={color} strokeWidth="1.5"/>
  </svg>
);

// Medium Icons (22x22px) - Auto-generated from SVG files

export const AddMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.8418 5.10535V10.1053H4.8418V12.1053H9.8418V17.1053H11.8418V12.1053H16.8418V10.1053H11.8418V5.10535H9.8418ZM11.8418 10.1053V12.1053H9.8418V10.1053H11.8418Z" fill={color}/>
    </svg>
);

export const AttachMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 7.36364V13H13V5H7V18H16V9.72727" stroke={color} strokeWidth="2"/>
    </svg>
);

export const BellV2Medium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 15L7 15" stroke={color} strokeWidth="2"/>
    <path d="M17 15L19 15" stroke={color} strokeWidth="2"/>
    <path d="M13 18L9 18" stroke={color} strokeWidth="2"/>
    <path d="M3 15L5 15" stroke={color} strokeWidth="2"/>
    <path d="M16 14V9C16 6.23858 13.7614 4 11 4V4C8.23858 4 6 6.23858 6 9V14" stroke={color} strokeWidth="2"/>
    </svg>
);

export const BellMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13 15L19 15" stroke={color} strokeWidth="2"/>
    <path d="M13 17L9 17" stroke={color} strokeWidth="2"/>
    <path d="M3 15L9 15" stroke={color} strokeWidth="2"/>
    <path d="M16 14V9C16 6.23858 13.7614 4 11 4V4C8.23858 4 6 6.23858 6 9V14" stroke={color} strokeWidth="2"/>
    </svg>
);

export const BookMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.1952 4.13611H5.16504V14.6927H15.8634V5.4427" stroke={color} strokeWidth="2"/>
    <path d="M5.15527 14.1607V17.7866L16.8452 17.8639" stroke={color} strokeWidth="2"/>
    <path d="M8.97266 7.88147H13.5837" stroke={color} strokeWidth="2"/>
    <path d="M8.97266 10.7806H11.9515" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CalendarMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 17V5H4V9V18H17M8 7V2.5M14 7V2.5" stroke={color} strokeWidth="2"/>
    <path d="M4 9H18" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CarMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.8795 14.5V16H4.09766L4.09766 10.6667L5.79949 9V8L7.50132 6H14.2188L16.1097 8V9L18.0007 10.6667L18.0007 16H13.8406L13.8406 14.3333" stroke={color} strokeWidth="2"/>
    <path d="M16 8H19" stroke={color} strokeWidth="2"/>
    <path d="M3 8H6" stroke={color} strokeWidth="2"/>
    <path d="M9 13.5L12.5 13.5" stroke={color} strokeWidth="2"/>
    <path d="M7 11L15 11" stroke={color} strokeWidth="2"/>
    </svg>
);

export const ChatMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 18L14 15H18V12.25V5H11H4V15H9.5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const Check1Medium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.3691 13.5121V4.50818" stroke={color} strokeWidth="2"/>
    <path d="M11.3691 15.4073L11.3691 17.302" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CheckMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.08008 10.0875L9.50476 13.5121L13.3874 9.62948L15.9193 7.0976" stroke={color} strokeWidth="2"/>
    </svg>
);

export const ChevronDownMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14 9L11 12L8 9" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const ClockMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.1093 4.00197C6.66386 4.44123 4 7.39472 4 10.9728C4 14.8538 7.13401 18 11 18C14.866 18 18 14.8538 18 10.9728C18 7.38933 15.3281 4.43233 11.8752 4" stroke={color} strokeWidth="2"/>
    <path d="M11 11V5" stroke={color} strokeWidth="2"/>
    <path d="M12 12H15" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CloseMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.291 11.7075L5.00723 16.9913" stroke={color} strokeWidth="2"/>
    <path d="M16.3184 5.69709L11.7085 10.3069" stroke={color} strokeWidth="2"/>
    <path d="M16.6982 16.7137L11.699 11.7145" stroke={color} strokeWidth="2"/>
    <path d="M10.291 10.2856L5.713 5.70757" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CloudMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.68354 17C6.8481 17 3 16.35 3 11.8C3 8.5614 6.42857 7.54545 7.57143 8.13636M7.57143 11.0909C7 6.36364 9.68354 4 13.3291 4C16.9747 4 19 7.42105 19 10.614C19 11.7088 18.4599 13.0468 18.1899 13.5789" stroke={color} strokeWidth="2"/>
    <path d="M14.8 13L13 15.7273L16 16.2727L14.2 19" stroke={color} strokeWidth="2"/>
    </svg>
);

export const CopyMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 14V3L11 3L14 6" stroke={color} strokeWidth="2"/>
    <path d="M5 15H8" stroke={color} strokeWidth="2"/>
    <path d="M8 17.5V6L15 6L18 8.5V15.75V18.5H9" stroke={color} strokeWidth="2"/>
    <path d="M13 6V10" stroke={color} strokeWidth="2"/>
    <path d="M18 11L14 11" stroke={color} strokeWidth="2"/>
    </svg>
);

export const DocumentMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 16.5V5L13 5L16 7.5V14.75V17.5H7" stroke={color} strokeWidth="2"/>
    <path d="M11 5V9" stroke={color} strokeWidth="2"/>
    <path d="M16 10L12 10" stroke={color} strokeWidth="2"/>
    </svg>
);

export const Download2Medium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.275 12.9922L7.28279 10L6.00041 11.2824L8.99264 14.2746C9.60818 14.8902 10.5444 14.9715 11.0004 15C11.0289 14.6011 11.0004 13.7176 10.275 12.9922Z" fill={color}/>
    <path d="M10 5L12 5L12 10.5L11.5 11.5L10.5 11.5L10 10.5L10 5Z" fill={color}/>
    <path d="M4 14V17" stroke={color} strokeWidth="2"/>
    <path d="M18 5L18 17" stroke={color} strokeWidth="2"/>
    <path d="M5 18L17 18" stroke={color} strokeWidth="2"/>
    <path d="M12 4L17 4" stroke={color} strokeWidth="2"/>
    <path d="M12.7783 14.2746L15.7705 11.2824L14.4882 10L11.4959 12.9922C10.9998 13.4883 11.0283 14.544 10.9998 15C11.3988 15.0285 12.2233 14.8296 12.7783 14.2746Z" fill={color}/>
    </svg>
);

export const DownloadMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.275 12.9922L7.28279 10L6.00041 11.2824L8.99264 14.2746C9.60818 14.8902 10.5444 14.9715 11.0004 15C11.0289 14.6011 11.0004 13.7176 10.275 12.9922Z" fill={color}/>
    <path d="M10 4L12 4L12 11L11.5 12L10.5 12L10 11L10 4Z" fill={color}/>
    <path d="M5 14V17" stroke={color} strokeWidth="2"/>
    <path d="M17 14V17" stroke={color} strokeWidth="2"/>
    <path d="M6 18L16 18" stroke={color} strokeWidth="2"/>
    <path d="M12.7783 14.2746L15.7705 11.2824L14.4882 10L11.4959 12.9922C10.9998 13.4883 11.0283 14.544 10.9998 15C11.3988 15.0285 12.2233 14.8296 12.7783 14.2746Z" fill={color}/>
    </svg>
);

export const EmailMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 5V16H4V5H18Z" stroke={color} strokeWidth="2"/>
    <path d="M5 6L10.5 11.5" stroke={color} strokeWidth="2"/>
    <path d="M17 6L11.5 11.5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const ExpandMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.89031 13.5231L8.4761 12.1089L12.1752 8.40983L13.2358 8.05628L13.9429 8.76338L13.5894 9.82404L9.89031 13.5231Z" fill={color}/>
    <path d="M16.0546 6.97048L16.0546 12.2021L17.8682 12.2021L17.8682 6.97048C17.8682 6.09997 17.2637 5.38041 16.9614 5.03785C16.6995 4.73559 15.9757 4.29319 15.1909 4.29319L9.95922 4.29319L9.95922 6.10675L15.1909 6.10675C15.8021 6.10675 16.4322 5.52479 16.8109 5.17504C16.8358 5.15197 16.8597 5.12991 16.8824 5.10909C16.5651 5.40684 16.0546 6.02778 16.0546 6.97048Z" fill={color}/>
    <path d="M12.1097 8.47688L13.5239 9.89109L9.86949 13.5455L8.80883 13.8991L8.10172 13.1919L8.45528 12.1313L12.1097 8.47688Z" fill={color}/>
    <path d="M5.94538 15.0295L5.94538 9.79787L4.13182 9.79787L4.13182 15.0295C4.13182 15.9 4.73633 16.6196 5.03859 16.9621C5.30055 17.2644 6.02427 17.7068 6.80913 17.7068L12.0408 17.7068V15.8932L6.80913 15.8932C6.19785 15.8932 5.56779 16.4752 5.18913 16.825C5.16415 16.848 5.14027 16.8701 5.11755 16.8909C5.43487 16.5932 5.94538 15.9722 5.94538 15.0295Z" fill={color}/>
    </svg>
);

export const ExposureMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.89551 15.876C10.2509 15.9561 10.6204 16 11 16C11.3058 16 11.6049 15.9705 11.8955 15.918V20H9.89551V15.876Z" fill={color}/>
    <path d="M11.8955 6.08105C11.6049 6.0285 11.3058 6 11 6C10.6204 6 10.2509 6.04291 9.89551 6.12305V2H11.8955V6.08105Z" fill={color}/>
    <path d="M6.01953 10C5.93936 10.3554 5.89551 10.7248 5.89551 11.1045C5.89551 11.4103 5.92496 11.7093 5.97754 12L1.89551 12L1.89551 10L6.01953 10Z" fill={color}/>
    <path d="M15.8145 12C15.867 11.7094 15.8955 11.4102 15.8955 11.1045C15.8955 10.7249 15.8526 10.3554 15.7725 10L19.8955 10L19.8955 12L15.8145 12Z" fill={color}/>
    <path d="M6.78809 13.6934C7.15126 14.2601 7.62484 14.7492 8.17969 15.1289L5.23926 18.0713L3.8252 16.6572L6.78809 13.6934Z" fill={color}/>
    <path d="M17.9668 5.34277L15.1289 8.17969C14.7492 7.62484 14.2601 7.15126 13.6934 6.78809L16.5527 3.92871L17.9668 5.34277Z" fill={color}/>
    <path d="M15.0039 13.6934C14.6407 14.2601 14.1672 14.7492 13.6123 15.1289L16.5527 18.0713L17.9668 16.6572L15.0039 13.6934Z" fill={color}/>
    <path d="M3.8252 5.34277L6.66309 8.17969C7.04281 7.62484 7.53187 7.15126 8.09863 6.78809L5.23926 3.92871L3.8252 5.34277Z" fill={color}/>
    <circle cx="11" cy="11" r="2" stroke={color} strokeWidth="2"/>
    </svg>
);

export const FolderMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5.30469 9.3583V4.43316L11.109 4.40167L12.628 6.22657L18.3249 6.22656V12.0058" stroke={color} strokeWidth="2"/>
    <path d="M18.2949 16.2946L18.2948 9.66779L3.70605 9.65906L3.70606 17.5447H17.2289" stroke={color} strokeWidth="2"/>
    </svg>
);

export const GraphArrowMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 12.1818L6.58541 9.79529C6.96275 9.44697 7.54258 9.44109 7.92691 9.78166L12.3576 13.708C13.0029 14.2797 14.0208 13.8217 14.0208 12.9595V9.18182L17.5 5.5M4 12.1818V4M4 12.1818V18M17.5 5.5V10M17.5 5.5H13" stroke={color} strokeWidth="2"/>
    <path d="M5 19L18 19" stroke={color} strokeWidth="2"/>
    </svg>
);

export const GraphMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 16V4" stroke={color} strokeWidth="2"/>
    <path d="M15 16L15 6" stroke={color} strokeWidth="2"/>
    <path d="M11 16L11 9" stroke={color} strokeWidth="2"/>
    </svg>
);

export const Help2Medium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.6094 12.7922L10.6094 15.7449" stroke={color} strokeWidth="2"/>
    <path d="M10.5957 16.8674L10.5957 18.7269" stroke={color} strokeWidth="2"/>
    <path d="M7.85498 8.96433C7.6763 8.43101 7.60764 7.85136 7.67319 7.25556C7.91517 5.05616 9.89429 3.46935 12.0937 3.71133C14.2931 3.9533 15.8799 5.93243 15.6379 8.13183C15.413 10.1758 13.6879 11.6907 11.6799 11.7004" stroke={color} strokeWidth="2"/>
    </svg>
);

export const HelpMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.0166 8.6785V6" stroke={color} strokeWidth="2"/>
    <path d="M15.0037 11.1452V5.96912M11.0127 18.0533V16.0336" stroke={color} strokeWidth="2"/>
    <path d="M8.02221 4.95575L14.0068 4.95575" stroke={color} strokeWidth="2"/>
    <path d="M14.0706 12.0999L10.9785 12.0999V14.4516" stroke={color} strokeWidth="2"/>
    </svg>
);

export const HomeMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11 12.0533L11 16.0533" stroke={color} strokeWidth="2"/>
    <path d="M11.5535 4.55326L17.0003 9.99997L17.0003 16.5533L5.00027 16.5533L5.00027 9.99997L10.447 4.55326" stroke={color} strokeWidth="2"/>
    </svg>
);

export const InboxMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 13.4878V18.5H19V13.4949M7 11.5L9.47934 7.5H16.5207L19 11.5M18.3333 12.8458H15.8264L14.5372 14.7991H11.8595L10.8678 12.8458H7.66667" stroke={color} strokeWidth="2"/>
    </svg>
);

export const LimitsMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5349 4.4751C12.0377 3.89346 10.3861 3.84438 8.85703 4.3361C7.32796 4.82781 6.01451 5.83041 5.13701 7.1757C4.25951 8.52099 3.87134 10.1271 4.03762 11.7247C4.20391 13.3222 4.91452 14.814 6.05026 15.9497C7.186 17.0855 8.67777 17.7961 10.2753 17.9624C11.8729 18.1287 13.479 17.7405 14.8243 16.863C16.1696 15.9855 17.1722 14.672 17.6639 13.143C18.1556 11.6139 18.1065 9.96226 17.5249 8.4651" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    <path d="M13 9L16 6" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
    </svg>
);

export const ListMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="9.05957" y="7.36841" width="11.98" height="1.99829" fill={color}/>
    <rect x="9.05957" y="12.0007" width="11.98" height="1.99829" fill={color}/>
    <rect x="9.05957" y="16.6332" width="11.98" height="1.99829" fill={color}/>
    <rect width="2.39784" height="1.99829" transform="matrix(-1 0 0 1 7.3584 7.36841)" fill={color}/>
    <rect width="2.39784" height="1.99829" transform="matrix(-1 0 0 1 7.3584 12.0007)" fill={color}/>
    <rect width="2.39784" height="1.99829" transform="matrix(-1 0 0 1 7.3584 16.6332)" fill={color}/>
    </svg>
);

export const LockMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.1422 11.1387H5.21777V18.6488H10.4795L17.166 18.6495V10.1928" stroke={color} strokeWidth="2"/>
    <path d="M15.1311 10.1971V7.45801C15.1311 5.18947 13.2921 3.35046 11.0236 3.35046V3.35046C8.75503 3.35046 6.91602 5.18947 6.91602 7.45801V10.1971" stroke={color} strokeWidth="2"/>
    <circle cx="10.9996" cy="14.7523" r="1.53285" fill={color}/>
    </svg>
);

export const PencilMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9 6L17 14V17H14L6 9" stroke={color} strokeWidth="2"/>
    <rect x="5" y="6.41418" width="2.41421" height="2.41421" transform="rotate(-45 5 6.41418)" fill={color}/>
    <path d="M17 17H5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const PieChartMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.52342 4.92422C4.16237 6.86473 3.0047 11.1519 4.93769 14.5C6.87069 17.848 11.1624 18.9891 14.5234 17.0486C15.8007 16.3112 16.7597 15.2349 17.3519 14" stroke={color} strokeWidth="2"/>
    <path d="M11.4764 10.626L11.4766 4.16345C13.716 4.46902 15.797 5.77349 17.0173 7.88711C17.521 8.75956 17.8319 9.6885 17.9635 10.6256L11.4764 10.626Z" stroke={color} strokeWidth="2"/>
    </svg>
);

export const PinMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.0667 19C6.3 15.8421 5 13.3078 5 10.0484C5 6.70796 7.91015 4 11.5 4C15.0899 4 18 6.70796 18 10.0484C18 13.3078 16.7 15.8421 11.9333 19" stroke={color} strokeWidth="2"/>
    <circle cx="11.5" cy="10.5" r="2.5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const PortfolioMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M17.4751 18.0693H3.4248L3.4248 7.48853H18.5747V17.032" stroke={color} strokeWidth="2"/>
    <path d="M8.3877 6.68384V5.6719C8.3877 4.22925 9.55719 3.05975 10.9998 3.05975V3.05975C12.4425 3.05975 13.612 4.22925 13.612 5.6719V6.68384" stroke={color} strokeWidth="2"/>
    <path d="M4.39355 12.1672H9.57079" stroke={color} strokeWidth="2"/>
    <path d="M12.585 12.1672H17.7622" stroke={color} strokeWidth="2"/>
    <path d="M9.57031 14.191H12.6059" stroke={color} strokeWidth="2"/>
    </svg>
);

export const PrinterMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 8H3V15.9839L5.78606 16M8 8H10.5H13M15 8H18V15.9839H15.1467" stroke={color} strokeWidth="2"/>
    <path d="M14 7V4H7V7" stroke={color} strokeWidth="2"/>
    <path d="M15 14V18H6V14" stroke={color} strokeWidth="2"/>
    <path d="M7 13L14 13" stroke={color} strokeWidth="2"/>
    <rect x="15" y="10" width="1" height="1" fill={color}/>
    </svg>
);

export const ReloadMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_41_554)">
    <path d="M16.458 6.61671L15.6783 7.24289C15.944 7.57374 16.3896 7.70086 16.7899 7.56002C17.1902 7.41918 17.458 7.04105 17.458 6.61671L16.458 6.61671ZM18.9067 12.2196L19.0592 11.2313L17.0826 10.9264L16.9301 11.9147L18.9067 12.2196ZM16.458 6.99999L16.458 7.99999C17.0103 7.99999 17.458 7.55227 17.458 6.99999L16.458 6.99999ZM13.5002 5.99999L12.5002 5.99999L12.5002 7.99999L13.5002 7.99999L13.5002 5.99999ZM16.458 6.61671L17.2377 5.99053C16.0882 4.55933 14.4816 3.56695 12.6872 3.17988L12.4763 4.15739L12.2655 5.1349C13.6112 5.42521 14.8162 6.16949 15.6783 7.24289L16.458 6.61671ZM12.4763 4.15739L12.6872 3.17988C10.8928 2.7928 9.01994 3.03457 7.3827 3.86463L7.8349 4.75655L8.28709 5.64847C9.51502 5.02593 10.9197 4.8446 12.2655 5.1349L12.4763 4.15739ZM7.8349 4.75655L7.3827 3.86463C5.74546 4.6947 4.44348 6.06255 3.69517 7.73873L4.60831 8.14639L5.52144 8.55405C6.08268 7.29691 7.05916 6.27102 8.28709 5.64847L7.8349 4.75655ZM4.60831 8.14639L3.69517 7.73873C2.94687 9.41491 2.79775 11.2975 3.27285 13.0705L4.23877 12.8117L5.2047 12.5529C4.84838 11.2231 4.96021 9.81118 5.52144 8.55405L4.60831 8.14639ZM4.23877 12.8117L3.27285 13.0705C3.74795 14.8436 4.81835 16.3994 6.3045 17.4769L6.89147 16.6672L7.47844 15.8576C6.36383 15.0495 5.56102 13.8827 5.2047 12.5529L4.23877 12.8117ZM6.89147 16.6672L6.3045 17.4769C7.79064 18.5543 9.60212 19.0879 11.435 18.9882L11.3807 17.9896L11.3263 16.9911C9.95165 17.0659 8.59304 16.6657 7.47844 15.8576L6.89147 16.6672ZM11.3807 17.9896L11.435 18.9882C13.268 18.8884 15.0108 18.1613 16.3712 16.9289L15.6999 16.1878L15.0285 15.4467C14.0082 16.371 12.701 16.9163 11.3263 16.9911L11.3807 17.9896ZM15.6999 16.1878L16.3712 16.9289C17.7317 15.6965 18.6269 14.0338 18.9067 12.2196L17.9184 12.0671L16.9301 11.9147C16.7202 13.2753 16.0488 14.5224 15.0285 15.4467L15.6999 16.1878ZM16.458 6.61671L17.458 6.61671L17.458 2.99999L16.458 2.99999L15.458 2.99999L15.458 6.61671L16.458 6.61671ZM16.458 2.99999L15.458 2.99999L15.458 6.99999L16.458 6.99999L17.458 6.99999L17.458 2.99999L16.458 2.99999ZM16.458 6.99999L16.458 5.99999L13.5002 5.99999L13.5002 6.99999L13.5002 7.99999L16.458 7.99999L16.458 6.99999Z" fill={color}/>
    </g>
    <defs>
    <clipPath id="clip0_41_554">
    <rect width="22" height="22" fill="white"/>
    </clipPath>
    </defs>
    </svg>
);

export const ReplaceMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.726 7.17548L14.7182 10.1677L16.0006 8.88533L13.0083 5.8931C12.3928 5.27756 11.4565 5.19621 11.0006 5.16771C10.9721 5.56667 11.0006 6.4501 11.726 7.17548Z" fill={color}/>
    <path d="M12 16.1677L10 16.1677L10 9.16772L10.5 8.16773L11.5 8.16773L12 9.16772L12 16.1677Z" fill={color}/>
    <path d="M9.22169 5.89312L6.22946 8.88534L7.51185 10.1677L10.5041 7.1755C11.0002 6.67939 10.9717 5.62368 11.0002 5.16772C10.6012 5.13923 9.77667 5.33813 9.22169 5.89312Z" fill={color}/>
    <path d="M6 17L10 17" stroke={color} strokeWidth="2"/>
    <path d="M12 17L16 17" stroke={color} strokeWidth="2"/>
    </svg>
);

export const SearchMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.5 14L18.5 17.5" stroke={color} strokeWidth="2"/>
    <circle cx="10.5" cy="10.5" r="5.5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const S1ArrowRightMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.1769 17.0304L9.76265 15.6161L13.3987 11.9801L4.79297 11.9801V9.98006L13.3588 9.98006L9.76265 6.38388L11.1769 4.96967L17.2072 11L11.1769 17.0304Z" fill={color}/>
    </svg>
);

export const S1ArrowUpMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8 12L11 9L14 12" stroke={color} strokeWidth="1.6"/>
    </svg>
);

export const S2ArrowDownMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.1143 5.49866H12.1143L12.1143 12.4987L11.6143 13.4987H10.6143L10.1143 12.4987V5.49866Z" fill={color}/>
    <path d="M10.3889 14.4909L7.39664 11.4987L6.11426 12.7811L9.10648 15.7733C9.72203 16.3888 10.6583 16.4702 11.1142 16.4987C11.5132 16.5272 12.3378 16.3282 12.8928 15.7733L15.885 12.781L14.6026 11.4987L11.6104 14.4909C11.1781 14.9231 11.1441 15.7802 11.1237 16.2952C11.1223 16.3292 11.1211 16.3617 11.1197 16.3925C11.1335 15.9576 11.0555 15.1575 10.3889 14.4909Z" fill={color}/>
    </svg>
);

export const S2ArrowLeftMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.50875 11.6107L10.501 14.603L9.21859 15.8853L6.22637 12.8931C5.61082 12.2776 5.52947 11.3413 5.50098 10.8854C5.89994 10.8569 6.78337 10.8854 7.50875 11.6107Z" fill={color}/>
    <path d="M16.501 11.8853L16.501 9.88534L9.50098 9.88534L8.50098 10.3853L8.50098 11.3853L9.50098 11.8853H16.501Z" fill={color}/>
    <path d="M6.22637 9.10685L9.21859 6.11462L10.501 7.39701L7.50875 10.3892C7.01264 10.8853 5.95693 10.8569 5.50098 10.8854C5.47248 10.4864 5.67139 9.66183 6.22637 9.10685Z" fill={color}/>
    </svg>
);

export const S2ArrowRightMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.4913 11.6107L11.499 14.603L12.7814 15.8853L15.7736 12.8931C16.3892 12.2776 16.4705 11.3413 16.499 10.8854C16.1001 10.8569 15.2166 10.8854 14.4913 11.6107Z" fill={color}/>
    <path d="M5.49902 11.8853L5.49902 9.88534L12.499 9.88534L13.499 10.3853L13.499 11.3853L12.499 11.8853H5.49902Z" fill={color}/>
    <path d="M15.7736 9.10685L12.7814 6.11462L11.499 7.39701L14.4912 10.3892C14.9874 10.8853 16.0431 10.8569 16.499 10.8854C16.5275 10.4864 16.3286 9.66183 15.7736 9.10685Z" fill={color}/>
    </svg>
);

export const S2ArrowUpMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.8857 16.5013L9.88572 16.5013L9.88573 9.50134L10.3857 8.50134L11.3857 8.50134L11.8857 9.50134L11.8857 16.5013Z" fill={color}/>
    <path d="M11.6111 7.5091L14.6034 10.5013L15.8857 9.21894L12.8935 6.22672C12.278 5.61117 11.3417 5.52982 10.8858 5.50133C10.4868 5.47283 9.66222 5.67175 9.10723 6.22673L6.11501 9.21896L7.39739 10.5013L10.3896 7.50912C10.8219 7.07687 10.8559 6.21984 10.8763 5.70478C10.8777 5.67081 10.879 5.63831 10.8803 5.60753C10.8665 6.04245 10.9445 6.84251 11.6111 7.5091Z" fill={color}/>
    </svg>
);

export const S3ArrowDownMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M11.0001 13.3358L4.70718 7.04291L3.29297 8.45712L9.79297 14.9571L11.0001 13.75L12.2072 14.9571L18.7072 8.45712L17.293 7.04291L11.0001 13.3358Z" fill={color}/>
    </svg>
);

export const S3ArrowLeftMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.66414 11L14.957 4.70712L13.5428 3.29291L7.04282 9.79291L8.24992 11L7.04282 12.2071L13.5428 18.7071L14.957 17.2929L8.66414 11Z" fill={color}/>
    </svg>
);

export const S3ArrowRightMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.3359 11L7.04297 4.70712L8.45718 3.29291L14.9572 9.79291L13.7501 11L14.9572 12.2071L8.45718 18.7071L7.04297 17.2929L13.3359 11Z" fill={color}/>
    </svg>
);

export const S3ArrowUpMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.9999 8.6642L17.2928 14.9571L18.707 13.5429L12.207 7.04288L10.9999 8.24999L9.79282 7.04288L3.29282 13.5429L4.70703 14.9571L10.9999 8.6642Z" fill={color}/>
    </svg>
);

export const SendMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16.5 11.25L5.5 5.75V10.25M16.5 11.25L5.5 16.75L5.5 12.25M16.5 11.25H6.5" stroke={color} strokeWidth="2"/>
    </svg>
);

export const SmallArrowRightMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.4945 6.96951L15.525 11L11.4945 15.0305L10.5046 14.0406L12.8451 11.7H7.46402L7.46402 10.3L12.8451 10.3L10.5046 7.95946L11.4945 6.96951Z" fill={color}/>
    </svg>
);

export const TrashMedium: React.FC<MediumIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.0001 9.5L15.0001 16.5533L7.00021 16.5533L7.00023 9.5M8.00026 5L14.0001 5M14.0001 7L18.0001 7M4.00031 7L8.00026 7M11.0002 11L11.0002 14" stroke={color} strokeWidth="2"/>
    </svg>
);

export const UnlockMedium: React.FC<MediumIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.1422 11.1387H5.21777V18.6488H10.4795L17.166 18.6495V10.1928" stroke={color} strokeWidth="2"/>
    <path d="M15.1311 7.2276V7.2276C15.1311 5.08632 13.3953 3.35046 11.254 3.35046L11.0236 3.35046C8.75503 3.35046 6.91602 5.18947 6.91602 7.45801V10.1971" stroke={color} strokeWidth="2"/>
    <circle cx="10.9996" cy="14.7523" r="1.53285" fill={color}/>
    </svg>
);

export const SettingsMedium: React.FC<MediumIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.medium} height={ICON_SIZES.medium} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="13.7244" cy="15.1384" r="2.5" transform="rotate(-180 13.7244 15.1384)" stroke={color} strokeWidth="1.5"/>
    <path d="M9.31055 15.1384H3.30963" stroke={color} strokeWidth="2"/>
    <path d="M19.1899 15.1384H16.1713" stroke={color} strokeWidth="2"/>
    <circle cx="8.76709" cy="7.86157" r="2.5" stroke={color} strokeWidth="1.5"/>
    <path d="M13.3665 7.86157L19.2898 7.86157" stroke={color} strokeWidth="2"/>
    <path d="M3.40283 7.86157L6.20791 7.86157" stroke={color} strokeWidth="2"/>
  </svg>
);

// Status Icons (18x18px) - Visual indicators for states
export const StatusWarning: React.FC<MediumIconProps> = ({ 
  color = '#FFDD61', 
  className 
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="9" fill={color}/>
    <rect x="8.25" y="4.5" width="1.5" height="6" fill="#17211B"/>
    <circle cx="9" cy="13" r="1" fill="#17211B"/>
  </svg>
);

export const StatusError: React.FC<MediumIconProps> = ({ 
  color = '#FF8588', 
  className 
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="9" fill={color}/>
    <rect x="8.25" y="4.5" width="1.5" height="6" fill="#17211B"/>
    <circle cx="9" cy="13" r="1" fill="#17211B"/>
  </svg>
);

export const StatusSuccess: React.FC<MediumIconProps> = ({ 
  color = '#7FFFB0', 
  className 
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="9" fill={color}/>
    <path d="M5 9L8 12L13 6" stroke="#17211B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Table Icons (24x24px) - Auto-generated from SVG files
// These icons are specifically designed for use in table headers

export const AmmountTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M14.9752 9.67105C14.9752 9.211 14.8007 8.76127 14.4738 8.37875C14.147 7.99623 13.6823 7.69809 13.1387 7.52203C12.5952 7.34598 11.997 7.29991 11.4199 7.38967C10.8428 7.47942 10.3128 7.70096 9.89672 8.02626C9.48067 8.35157 9.19734 8.76604 9.08255 9.21726C8.96777 9.66847 9.02668 10.1362 9.25184 10.5612C9.47701 10.9862 9.85831 11.3495 10.3475 11.6051C10.8367 11.8607 11.4119 11.9971 12.0003 11.9971" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.0287 14.3205C9.0287 14.781 9.20318 15.2311 9.53006 15.614C9.85695 15.9969 10.3216 16.2953 10.8652 16.4716C11.4088 16.6478 12.0069 16.6939 12.584 16.6041C13.1611 16.5142 13.6911 16.2925 14.1072 15.9669C14.5232 15.6412 14.8066 15.2264 14.9214 14.7747C15.0361 14.3231 14.9772 13.8549 14.7521 13.4295C14.5269 13.004 14.1456 12.6404 13.6564 12.3846C13.1672 12.1287 12.723 12.0043 12.1346 12.0043" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.9834 17.9399L11.9834 16.6599" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.0166 7.34496L12.0166 6.06262" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const CalendarTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18 10.6H6M14.6667 5V7.8M9.33333 5V7.8M9.2 18H14.8C15.9201 18 16.4802 18 16.908 17.7711C17.2843 17.5698 17.5903 17.2485 17.782 16.8534C18 16.4042 18 15.8161 18 14.64V9.76C18 8.58389 18 7.99583 17.782 7.54662C17.5903 7.15148 17.2843 6.83022 16.908 6.62889C16.4802 6.4 15.9201 6.4 14.8 6.4H9.2C8.0799 6.4 7.51984 6.4 7.09202 6.62889C6.71569 6.83022 6.40973 7.15148 6.21799 7.54662C6 7.99583 6 8.58389 6 9.76V14.64C6 15.8161 6 16.4042 6.21799 16.8534C6.40973 17.2485 6.71569 17.5698 7.09202 17.7711C7.51984 18 8.07989 18 9.2 18Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const DocumentTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.25 6.16168V8.64C13.25 8.97603 13.25 9.14405 13.3181 9.27239C13.378 9.38529 13.4737 9.47708 13.5913 9.5346C13.725 9.6 13.9 9.6 14.25 9.6H16.8316M17 10.7929V15.12C17 16.1281 17 16.6321 16.7956 17.0172C16.6159 17.3559 16.329 17.6312 15.9762 17.8038C15.5751 18 15.0501 18 14 18H10C8.9499 18 8.42485 18 8.02377 17.8038C7.67096 17.6312 7.38413 17.3559 7.20436 17.0172C7 16.6321 7 16.1281 7 15.12V8.88C7 7.87191 7 7.36786 7.20436 6.98282C7.38413 6.64413 7.67096 6.36876 8.02377 6.19619C8.42485 6 8.9499 6 10 6H12.0074C12.466 6 12.6953 6 12.9111 6.04973C13.1024 6.09383 13.2853 6.16656 13.453 6.26525C13.6423 6.37656 13.8044 6.53222 14.1287 6.84353L16.1213 8.75647C16.4456 9.06778 16.6077 9.22344 16.7237 9.40509C16.8265 9.56614 16.9023 9.74172 16.9482 9.92538C17 10.1325 17 10.3527 17 10.7929Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const FileTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.7 8.98889L11.9191 7.60066C11.6944 7.20112 11.582 7.00134 11.4144 6.85539C11.2661 6.72632 11.0874 6.62816 10.8913 6.56801C10.6694 6.5 10.4181 6.5 9.9156 6.5H7.24C6.45593 6.5 6.06389 6.5 5.76441 6.63564C5.50099 6.75495 5.28681 6.94532 5.15259 7.17948C5 7.44568 5 7.79416 5 8.49111V8.98889M5 8.98889H15.64C16.8161 8.98889 17.4042 8.98889 17.8534 9.19234C18.2485 9.37131 18.5698 9.65687 18.7711 10.0081C19 10.4074 19 10.9301 19 11.9756V14.7133C19 15.7588 19 16.2815 18.7711 16.6808C18.5698 17.032 18.2485 17.3176 17.8534 17.4965C17.4042 17.7 16.8161 17.7 15.64 17.7H8.36C7.18389 17.7 6.59583 17.7 6.14662 17.4965C5.75148 17.3176 5.43022 17.032 5.22889 16.6808C5 16.2815 5 15.7588 5 14.7133V8.98889Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const StatusTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="7.3" stroke={color} strokeWidth="1.4"/>
    <path d="M8.68652 12.4808L10.7801 14.5736L15.5274 9.82629" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const TextTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5.5 7.80371H18.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 11.8037H18.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 15.8037H12" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const WarningTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4.91602 9.3192C4.91602 7.93061 4.91602 7.23632 5.17339 6.70595C5.39977 6.23942 5.76101 5.86012 6.20532 5.62241C6.71044 5.35217 7.37167 5.35217 8.69414 5.35217H15.3059C16.6283 5.35217 17.2896 5.35217 17.7947 5.62241C18.239 5.86012 18.6002 6.23942 18.8266 6.70595C19.084 7.23632 19.084 7.93061 19.084 9.3192V15.0808C19.084 16.4694 19.084 17.1637 18.8266 17.6941C18.6002 18.1606 18.239 18.5399 17.7947 18.7776C17.2896 19.0479 16.6283 19.0479 15.3059 19.0479H8.69414C7.37167 19.0479 6.71044 19.0479 6.20532 18.7776C5.76101 18.5399 5.39977 18.1606 5.17339 17.6941C4.91602 17.1637 4.91602 16.4694 4.91602 15.0808V9.3192Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8.63196V12.7434" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12.0005" cy="15.5514" r="0.838379" fill={color}/>
    </svg>
);

export const TickTable: React.FC<TableIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4.91602 9.3192C4.91602 7.93061 4.91602 7.23632 5.17339 6.70595C5.39977 6.23942 5.76101 5.86012 6.20532 5.62241C6.71044 5.35217 7.37167 5.35217 8.69414 5.35217H15.3059C16.6283 5.35217 17.2896 5.35217 17.7947 5.62241C18.239 5.86012 18.6002 6.23942 18.8266 6.70595C19.084 7.23632 19.084 7.93061 19.084 9.3192V15.0808C19.084 16.4694 19.084 17.1637 18.8266 17.6941C18.6002 18.1606 18.239 18.5399 17.7947 18.7776C17.2896 19.0479 16.6283 19.0479 15.3059 19.0479H8.69414C7.37167 19.0479 6.71044 19.0479 6.20532 18.7776C5.76101 18.5399 5.39977 18.1606 5.17339 17.6941C4.91602 17.1637 4.91602 16.4694 4.91602 15.0808V9.3192Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.68652 12.4808L10.7801 14.5736L15.5274 9.82629" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ArrangeTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.table} height={ICON_SIZES.table} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7 9L12 4L17 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 15L12 20L7 15" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StatusCheckTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.2998 8.77778L8.44266 11L12.2998 7" stroke={color} strokeWidth="2"/>
    <circle cx="9.2998" cy="9" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const StatusAlertTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="2"/>
    <path d="M9 5.5V8.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 11.5V12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const StatusErrorTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.5 11.5L9 9L11.5 6.5M11.5 11.5L6.5 6.5" stroke={color} strokeWidth="2.4"/>
    <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const StatusProgressTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="2" strokeDasharray="3 3"/>
    <path d="M17.5 9C17.5 9.5676 17.442 10.1218 17.3359 10.6582L15.376 10.2705C15.4569 9.86118 15.5 9.4366 15.5 9C15.5 8.5634 15.4569 8.13882 15.376 7.72949L17.3359 7.34082C17.4422 7.87757 17.5 8.43207 17.5 9ZM13.7217 1.93262C14.6485 2.55303 15.4458 3.35066 16.0664 4.27734L15.2373 4.83398L15.2363 4.83301L14.4062 5.38965C13.9312 4.68013 13.3199 4.06881 12.6104 3.59375L13.7217 1.93262ZM9 0.5C9.56753 0.5 10.1218 0.556997 10.6582 0.663086L10.2705 2.62402C9.86118 2.54306 9.4366 2.5 9 2.5C8.5634 2.5 8.13882 2.54306 7.72949 2.62402L7.34082 0.663086C7.87751 0.556876 8.43213 0.5 9 0.5Z" fill={color}/>
    <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const StatusAddTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="9" cy="9" r="7.5" stroke="#B4C2C5" strokeWidth="2"/>
    <path d="M9 12.5V5.5" stroke="#B4C2C5" strokeWidth="2"/>
    <path d="M5.5 9L12.5 9" stroke="#B4C2C5" strokeWidth="2"/>
  </svg>
);

export const StatusProhibitedTable: React.FC<TableIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5 4.5L4.5 13.5" stroke="#D9E7EC" strokeWidth="2.4"/>
    <circle cx="9" cy="9" r="7.5" stroke="#D9E7EC" strokeWidth="2"/>
  </svg>
);

// Logo Icons - Brand and navigation logos
export const KorraLogo: React.FC<LogoIconProps> = ({ 
  color = 'white', 
  className 
}) => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M46.8356 6.30742V8.97977H41.6976V19.7094H39.045V7.64468C39.045 6.90647 39.6396 6.30742 40.3724 6.30742H46.8367H46.8356Z" fill={color}/>
    <path d="M37.4748 6.30742V8.97977H32.3368V19.7094H29.6841V7.64468C29.6841 6.90647 30.2788 6.30742 31.0116 6.30742H37.4759H37.4748Z" fill={color}/>
    <path d="M2.65265 0.917053H0V19.7268H2.65265V0.917053Z" fill={color}/>
    <path d="M21.2558 6.10085C17.4743 6.10085 14.3986 9.19938 14.3986 13.009C14.3986 16.8185 17.4743 19.9171 21.2558 19.9171C25.0373 19.9171 28.1129 16.8185 28.1129 13.009C28.1129 9.19938 25.0373 6.10085 21.2558 6.10085ZM21.2558 17.2447C18.9377 17.2447 17.0512 15.3443 17.0512 13.009C17.0512 10.6736 18.9377 8.7732 21.2558 8.7732C23.5739 8.7732 25.4603 10.6736 25.4603 13.009C25.4603 15.3443 23.5739 17.2447 21.2558 17.2447Z" fill={color}/>
    <path d="M57.3484 6.29872V7.43702C56.2422 6.57161 54.9073 6.10085 53.5292 6.10085C49.9614 6.10085 47.0583 9.19938 47.0583 13.009C47.0583 16.8185 49.9614 19.9171 53.5292 19.9171C54.9062 19.9171 56.2412 19.4463 57.3473 18.5798V19.7192H60V6.29872H57.3484ZM57.3484 13.009C57.3484 15.3443 55.6357 17.2447 53.5292 17.2447C51.4226 17.2447 49.711 15.3443 49.711 13.009C49.711 10.6736 51.4237 8.7732 53.5292 8.7732C55.6347 8.7732 57.3484 10.6736 57.3484 13.009Z" fill={color}/>
    <path d="M12.8744 6.30742V8.97977H7.0741V9.88867C7.0741 13.1796 9.94006 16.0955 13.0956 16.9783L13.2931 17.0338V19.7746L12.9672 19.705C8.39898 18.7244 4.42145 14.5963 4.42145 9.88976V7.64577C4.42145 6.90755 5.01608 6.3085 5.74886 6.3085H12.8744V6.30742Z" fill={color}/>
  </svg>
);

export const MarketplaceLogo: React.FC<LogoIconProps> = ({ 
  color = '#ceb5fb', 
  className 
}) => (
  <svg width={ICON_SIZES.logo} height={ICON_SIZES.logo} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_101_1296)">
      <path d="M2.09815e-07 0L5.5 5.09966e-07L5.5 2.54546L0 2.54545L2.09815e-07 0Z" fill={color}/>
      <path d="M8.5 0L14 5.09966e-07V2.54546L8.5 2.54545V0Z" fill={color}/>
      <path d="M2.09815e-07 5.72727L5.5 5.72727L5.5 8.27273H0L2.09815e-07 5.72727Z" fill={color}/>
      <path d="M8.5 5.72727L14 5.72727V8.27273H8.5V5.72727Z" fill={color}/>
      <path d="M5.5 2.54546L8.5 2.54545V5.72727L5.5 5.72727L5.5 2.54546Z" fill={color}/>
      <path d="M5.5 8.27273H8.5V11.4545H5.5V8.27273Z" fill={color}/>
      <path d="M2.09815e-07 11.4545H5.5V14H0L2.09815e-07 11.4545Z" fill={color}/>
      <path d="M8.5 11.4545L14 11.4545V14H8.5V11.4545Z" fill={color}/>
    </g>
    <defs>
      <clipPath id="clip0_101_1296">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const ReportsLogo: React.FC<LogoIconProps> = ({ 
  color = '#9ad5f7', 
  className 
}) => (
  <svg width={ICON_SIZES.logo} height={ICON_SIZES.logo} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 2.16667L7 2.16667V4.33333L1 4.33333L1 2.16667Z" fill={color}/>
    <path d="M7 0L13 5.52463e-07V2.16667L7 2.16667V0Z" fill={color}/>
    <path d="M1 6.5L7 6.5V8.66667L1 8.66667L1 6.5Z" fill={color}/>
    <path d="M7 4.33333L13 4.33333V6.5L7 6.5V4.33333Z" fill={color}/>
    <path d="M1 10.8333L7 10.8333V13H1L1 10.8333Z" fill={color}/>
    <path d="M7 8.66667L13 8.66667V10.8333L7 10.8333V8.66667Z" fill={color}/>
  </svg>
);

export const AnalyticsLogo: React.FC<LogoIconProps> = ({ 
  color = '#64EF99', 
  className 
}) => (
  <svg width={ICON_SIZES.logo} height={ICON_SIZES.logo} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g clipPath="url(#clip0_101_1318)">
      <path d="M11.6667 0L14 2.33334L11.6667 4.66668L9.33333 2.33334L11.6667 0Z" fill={color}/>
      <path d="M7.00001 4.66661L9.33335 6.99995L7.00001 9.33328L4.66668 6.99995L7.00001 4.66661Z" fill={color}/>
      <path d="M2.33333 9.33332L4.66667 11.6667L2.33333 14L0 11.6667L2.33333 9.33332Z" fill={color}/>
      <path d="M11.6667 4.66668L14 6.99995L11.6667 9.33328L9.33335 6.99995L11.6667 4.66668Z" fill={color}/>
      <path d="M7.00001 9.33328L9.33335 11.6667L7.00001 14L4.66667 11.6667L7.00001 9.33328Z" fill={color}/>
      <path d="M11.6667 9.33328L14 11.6667L11.6667 14L9.33335 11.6667L11.6667 9.33328Z" fill={color}/>
    </g>
    <defs>
      <clipPath id="clip0_101_1318">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export const ContractsLogo: React.FC<LogoIconProps> = ({ 
  color = '#FFE671', 
  className 
}) => (
  <svg width={ICON_SIZES.logo} height={ICON_SIZES.logo} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.29297 11.2928L5.79297 6.79285L7.20718 8.20706L2.70718 12.7071L1.29297 11.2928Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.29297 11.2928L11.793 6.79285L13.2072 8.20706L8.70718 12.7071L7.29297 11.2928Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.79297 6.20706L1.29297 1.70706L2.70718 0.292847L7.20718 4.79285L5.79297 6.20706Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.793 6.20706L7.29297 1.70706L8.70718 0.292847L13.2072 4.79285L11.793 6.20706Z" fill={color}/>
  </svg>
);

export const KLogo: React.FC<LogoIconProps> = ({
  color = 'white',
  className
}) => (
  <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4.24689 1.45764H2.41797V14.4264H4.24689V1.45764Z" fill={color}/>
    <path d="M11.2945 5.17413V7.01663H7.29534V7.64329C7.29534 9.91231 9.27133 11.9227 11.447 12.5314L11.5832 12.5696V14.4593L11.3584 14.4114C8.2088 13.7352 5.46642 10.889 5.46642 7.64404V6.09688C5.46642 5.5879 5.8764 5.17488 6.38162 5.17488H11.2945V5.17413Z" fill={color}/>
  </svg>
);

// Card Icons (15x18px) - Used beside card titles
export const CardsCheck: React.FC<CardIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.card} height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0.799805" width="14" height="18" rx="3" fill="#E0BFFB"/>
    <path d="M10.0633 7.45874L6.97863 10.5436L5.27828 8.89672" stroke="#17211B" strokeWidth="1.4"/>
  </svg>
);

export const CardsGraph: React.FC<CardIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.card} height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0.799805" y="0.0952148" width="14" height="18" rx="3" fill="#BEE4FB"/>
    <path d="M4.56885 9.33726L6.59985 7.427L8.53885 8.9782L11.1031 6.55626" stroke="#17211B" strokeWidth="1.4"/>
    <line x1="4.43335" y1="11.7089" x2="11.5102" y2="11.7089" stroke="#17211B" strokeWidth="1.4"/>
  </svg>
);

export const CardsText: React.FC<CardIconProps> = ({
  color = 'currentColor',
  className
}) => (
  <svg width={ICON_SIZES.card} height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0.799805" width="14" height="18" rx="3" fill="#FFDD61"/>
    <path d="M4.7998 7H8.7998" stroke="#17211B" strokeWidth="1.4"/>
    <path d="M4.7998 10H10.7998" stroke="#17211B" strokeWidth="1.4"/>
  </svg>
);

// Icon categories structure
export const icons = {
  extraSmall: {
    chevronDown: ChevronDownExtraSmall,
    chevronUp: ChevronUpExtraSmall,
    chevronRight: ChevronRightExtraSmall,
    plus: PlusExtraSmall,
    x: XExtraSmall,
    xStyle2: XStyle2ExtraSmall,
    arrowLeft: ArrowLeftExtraSmall,
    minus: MinusExtraSmall,
    search: SearchExtraSmall,
  },
  small: {
    add: AddSmall,
    calendar: CalendarSmall,
    check: CheckSmall,
    chevronBottom: ChevronBottomSmall,
    chevronLeft: ChevronLeftSmall,
    chevronRight: ChevronRightSmall,
    circledCheck: CircledCheckSmall,
    circledX: CircledXSmall,
    close: CloseSmall,
    document: DocumentSmall,
    download: DownloadSmall,
    edit: EditSmall,
    empty: EmptySmall,
    eraser: EraserSmall,
    expand: ExpandSmall,
    externalLink: ExternalLinkSmall,
    graph: GraphSmall,
    less: LessSmall,
    lock: LockSmall,
    open: OpenSmall,
    play: PlaySmall,
    plus: PlusSmall,
    reply: ReplySmall,
    s1ArrowDown: S1ArrowDownSmall,
    s1ArrowRight: S1ArrowRightSmall,
    s2ArrowRight: S2ArrowRightSmall,
    trash: TrashSmall,
  },
  medium: {
    add: AddMedium,
    attach: AttachMedium,
    bellV2: BellV2Medium,
    bell: BellMedium,
    book: BookMedium,
    calendar: CalendarMedium,
    car: CarMedium,
    chat: ChatMedium,
    check1: Check1Medium,
    check: CheckMedium,
    chevronDown: ChevronDownMedium,
    clock: ClockMedium,
    close: CloseMedium,
    cloud: CloudMedium,
    copy: CopyMedium,
    document: DocumentMedium,
    download2: Download2Medium,
    download: DownloadMedium,
    email: EmailMedium,
    expand: ExpandMedium,
    exposure: ExposureMedium,
    folder: FolderMedium,
    graphArrow: GraphArrowMedium,
    graph: GraphMedium,
    help2: Help2Medium,
    help: HelpMedium,
    home: HomeMedium,
    inbox: InboxMedium,
    limits: LimitsMedium,
    list: ListMedium,
    lock: LockMedium,
    pencil: PencilMedium,
    pieChart: PieChartMedium,
    pin: PinMedium,
    portfolio: PortfolioMedium,
    printer: PrinterMedium,
    reload: ReloadMedium,
    replace: ReplaceMedium,
    search: SearchMedium,
    s1ArrowRight: S1ArrowRightMedium,
    s1ArrowUp: S1ArrowUpMedium,
    s2ArrowDown: S2ArrowDownMedium,
    s2ArrowLeft: S2ArrowLeftMedium,
    s2ArrowRight: S2ArrowRightMedium,
    s2ArrowUp: S2ArrowUpMedium,
    s3ArrowDown: S3ArrowDownMedium,
    s3ArrowLeft: S3ArrowLeftMedium,
    s3ArrowRight: S3ArrowRightMedium,
    s3ArrowUp: S3ArrowUpMedium,
    send: SendMedium,
    smallArrowRight: SmallArrowRightMedium,
    statusError: StatusError,
    statusSuccess: StatusSuccess,
    statusWarning: StatusWarning,
    trash: TrashMedium,
    unlock: UnlockMedium,
    settings: SettingsMedium,
  },
  table: {
    // These icons are specifically designed for use in table headers (24x24px)
    ammount: AmmountTable,
    arrange: ArrangeTable,
    calendar: CalendarTable,
    document: DocumentTable,
    file: FileTable,
    status: StatusTable,
    text: TextTable,
    warning: WarningTable,
    tick: TickTable,
    statusCheck: StatusCheckTable,
    statusAlert: StatusAlertTable,
    statusError: StatusErrorTable,
    statusProgress: StatusProgressTable,
    statusAdd: StatusAddTable,
    statusProhibited: StatusProhibitedTable,
  },
  logos: {
    // Brand and navigation logos
    korra: KorraLogo,
    k: KLogo,
    marketplace: MarketplaceLogo,
    reports: ReportsLogo,
    analytics: AnalyticsLogo,
    contracts: ContractsLogo,
  },
  cards: {
    // Card icons used beside card titles (15x18px)
    check: CardsCheck,
    graph: CardsGraph,
    text: CardsText,
  },
} as const;

// Utility type for all icon categories
export type IconCategory = keyof typeof icons;
export type IconSize = keyof typeof ICON_SIZES;

// Helper function to get icon size
export const getIconSize = (category: IconCategory): number => {
  switch (category) {
    case 'extraSmall':
      return ICON_SIZES.extraSmall;
    case 'small':
      return ICON_SIZES.small;
    case 'medium':
      return ICON_SIZES.medium;
    case 'table':
      return ICON_SIZES.table;
    case 'logos':
      return ICON_SIZES.logo;
    case 'cards':
      return ICON_SIZES.card;
    default:
      return ICON_SIZES.small;
  }
};

// Example icon component structure (to be used as template for actual icons)
const ExampleIcon: React.FC<ExtraSmallIconProps> = ({ 
  color = 'currentColor', 
  className 
}) => (
  <svg
    width={ICON_SIZES.extraSmall}
    height={ICON_SIZES.extraSmall}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* SVG paths will go here */}
  </svg>
);

// Export structure for easy imports
export { icons as default };

// Types are already exported above, no need to re-export