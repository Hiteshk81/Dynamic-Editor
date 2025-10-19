import { UIConfig } from '@/types/editor';
import { Image, Heart, MessageCircle, Share2 } from 'lucide-react';

interface PreviewAreaProps {
  config: UIConfig;
  importedImage?: string | null;
  importedImageType?: string | null;
}

export const PreviewArea = ({ config, importedImage, importedImageType }: PreviewAreaProps) => {
  const getShadowClass = (shadow: string) => {
    switch (shadow) {
      case 'small':
        return 'shadow-sm';
      case 'medium':
        return 'shadow-md';
      case 'large':
        return 'shadow-lg';
      default:
        return '';
    }
  };

  const getAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-center';
    }
  };

  const getGridAlignmentClass = (alignment: string) => {
    switch (alignment) {
      case 'left':
        return 'justify-items-start';
      case 'right':
        return 'justify-items-end';
      default:
        return 'justify-items-center';
    }
  };

  const sampleImages = [
    { id: 1, color: '#3b82f6' },
    { id: 2, color: '#8b5cf6' },
    { id: 3, color: '#ec4899' },
    { id: 4, color: '#f59e0b' },
    { id: 5, color: '#10b981' },
    { id: 6, color: '#6366f1' },
  ];

  const isSvg = importedImageType?.includes('svg') || importedImage?.includes('data:image/svg');

  return (
    <div 
      className="h-full overflow-y-auto bg-[hsl(var(--preview-bg))] p-8"
      style={{
        fontFamily: config.typography.fontFamily,
        fontSize: `${config.typography.fontSize}px`,
        fontWeight: config.typography.fontWeight,
      }}
      data-preview-area
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Imported Design Section - Shows ONLY this when image is uploaded */}
        {importedImage ? (
          <div
            className="rounded-lg transition-smooth"
            style={{
              borderRadius: `${config.layout.cardBorderRadius}px`,
              padding: `${config.layout.containerPadding}px`,
              backgroundColor: config.layout.sectionBackgroundColor,
              border: `${config.stroke.weight}px solid ${config.stroke.color}`,
            }}
          >
            <h2 className="text-2xl font-semibold mb-4" style={{ fontSize: `${config.typography.fontSize * 1.5}px` }}>
              Your Design
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Click and drag to select components in your design, then use the customization panel to edit them.
            </p>
            <div className="rounded-lg overflow-hidden relative" style={{ borderRadius: `${config.gallery.borderRadius}px` }}>
              {isSvg ? (
                <div
                  dangerouslySetInnerHTML={{ 
                    __html: importedImage.includes('base64') 
                      ? atob(importedImage.split(',')[1]) 
                      : importedImage 
                  }}
                  className="w-full select-none"
                  style={{
                    borderRadius: `${config.gallery.borderRadius}px`,
                    border: `${config.stroke.weight}px solid ${config.stroke.color}`,
                    fontFamily: config.typography.fontFamily,
                    fontSize: `${config.typography.fontSize}px`,
                  }}
                />
              ) : (
                <img 
                  src={importedImage} 
                  alt="Imported design" 
                  className="w-full h-auto"
                  style={{
                    borderRadius: `${config.gallery.borderRadius}px`,
                    border: `${config.stroke.weight}px solid ${config.stroke.color}`,
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          /* Sample UI - Only shown when no image is uploaded */
          <>
        {/* Header Section */}
        <div
          className="rounded-lg transition-smooth"
          style={{
            borderRadius: `${config.layout.cardBorderRadius}px`,
            padding: `${config.layout.containerPadding}px`,
            backgroundColor: config.layout.sectionBackgroundColor,
            border: `${config.stroke.weight}px solid ${config.stroke.color}`,
          }}
        >
          <h1 className="text-4xl font-bold mb-4" style={{ fontSize: `${config.typography.fontSize * 2}px` }}>
            Dynamic UI Preview
          </h1>
          <p className="text-muted-foreground mb-6">
            This is a live preview of your customizable design. All changes you make in the editor are reflected here in real-time.
          </p>

          <div className={`flex gap-4 ${getAlignmentClass(config.button.alignment)}`}>
            <button
              className={`px-6 py-3 font-medium transition-smooth ${getShadowClass(config.button.shadow)}`}
              style={{
                borderRadius: `${config.button.borderRadius}px`,
                backgroundColor: config.button.backgroundColor,
                color: config.button.textColor,
              }}
            >
              Get Started
            </button>
            <button
              className={`px-6 py-3 font-medium transition-smooth border ${getShadowClass(config.button.shadow)}`}
              style={{
                borderRadius: `${config.button.borderRadius}px`,
                borderColor: config.button.backgroundColor,
                color: config.button.backgroundColor,
                backgroundColor: 'transparent',
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div
          className="rounded-lg transition-smooth"
          style={{
            borderRadius: `${config.layout.cardBorderRadius}px`,
            padding: `${config.layout.containerPadding}px`,
            backgroundColor: config.layout.sectionBackgroundColor,
            border: `${config.stroke.weight}px solid ${config.stroke.color}`,
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ fontSize: `${config.typography.fontSize * 1.5}px` }}>
            Image Gallery
          </h2>

          {config.layoutType === 'grid' ? (
            <div
              className={`grid gap-${config.gallery.spacing / 4} ${getGridAlignmentClass(config.gallery.alignment)}`}
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: `${config.gallery.spacing}px`,
              }}
            >
              {sampleImages.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square transition-smooth hover:scale-105 cursor-pointer overflow-hidden"
                  style={{
                    borderRadius: `${config.gallery.borderRadius}px`,
                    backgroundColor: img.color,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Image className="w-12 h-12 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sampleImages.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center gap-4 p-4 transition-smooth hover:scale-[1.02] cursor-pointer"
                  style={{
                    borderRadius: `${config.gallery.borderRadius}px`,
                    backgroundColor: img.color,
                  }}
                >
                  <div
                    className="w-20 h-20 flex items-center justify-center rounded-lg bg-white/20"
                    style={{
                      borderRadius: `${config.gallery.borderRadius}px`,
                    }}
                  >
                    <Image className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-semibold">Gallery Item {img.id}</h3>
                    <p className="text-sm opacity-80">Sample description for this item</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="transition-smooth hover:scale-105 cursor-pointer overflow-hidden"
              style={{
                borderRadius: `${config.layout.cardBorderRadius}px`,
                padding: `${config.layout.containerPadding}px`,
                backgroundColor: config.layout.sectionBackgroundColor,
                border: `${config.stroke.weight}px solid ${config.stroke.color}`,
              }}
            >
              <div
                className="w-full h-48 mb-4 flex items-center justify-center"
                style={{
                  borderRadius: `${config.gallery.borderRadius}px`,
                  backgroundColor: `hsl(${220 + item * 40}, 70%, 60%)`,
                }}
              >
                <Image className="w-16 h-16 text-white opacity-50" />
              </div>
              <h3 className="font-semibold mb-2" style={{ fontSize: `${config.typography.fontSize * 1.25}px` }}>
                Card Title {item}
              </h3>
              <p className="text-muted-foreground mb-4">
                This is a sample card demonstrating the customizable design system.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary transition-smooth">
                  <Heart className="w-4 h-4" />
                  <span>24</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-smooth">
                  <MessageCircle className="w-4 h-4" />
                  <span>12</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-smooth">
                  <Share2 className="w-4 h-4" />
                  <span>8</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature List Section */}
        <div
          className="rounded-lg transition-smooth"
          style={{
            borderRadius: `${config.layout.cardBorderRadius}px`,
            padding: `${config.layout.containerPadding}px`,
            backgroundColor: config.layout.sectionBackgroundColor,
            border: `${config.stroke.weight}px solid ${config.stroke.color}`,
          }}
        >
          <h2 className="text-2xl font-semibold mb-6" style={{ fontSize: `${config.typography.fontSize * 1.5}px` }}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Real-time Preview', 'Customizable Typography', 'Flexible Layouts', 'Export Configuration'].map(
              (feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                    style={{
                      backgroundColor: config.button.backgroundColor,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature}</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize every aspect of your design with intuitive controls.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};
