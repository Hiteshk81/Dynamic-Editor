export interface TypographyConfig {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
}

export interface ButtonConfig {
  borderRadius: number;
  shadow: 'none' | 'small' | 'medium' | 'large';
  alignment: 'left' | 'center' | 'right';
  backgroundColor: string;
  textColor: string;
}

export interface GalleryConfig {
  alignment: 'left' | 'center' | 'right';
  spacing: number;
  borderRadius: number;
}

export interface LayoutConfig {
  cardBorderRadius: number;
  containerPadding: number;
  sectionBackgroundColor: string;
}

export interface StrokeConfig {
  color: string;
  weight: number;
}

export interface UIConfig {
  typography: TypographyConfig;
  button: ButtonConfig;
  gallery: GalleryConfig;
  layout: LayoutConfig;
  stroke: StrokeConfig;
  layoutType: 'grid' | 'list';
}

export const defaultConfig: UIConfig = {
  typography: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    shadow: 'medium',
    alignment: 'center',
    backgroundColor: '#8b5cf6',
    textColor: '#ffffff',
  },
  gallery: {
    alignment: 'center',
    spacing: 16,
    borderRadius: 8,
  },
  layout: {
    cardBorderRadius: 12,
    containerPadding: 24,
    sectionBackgroundColor: '#ffffff',
  },
  stroke: {
    color: '#e5e7eb',
    weight: 1,
  },
  layoutType: 'grid',
};
