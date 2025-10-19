import { useState, useRef, useEffect } from 'react';
import { UIConfig } from '@/types/editor';

interface ComponentSelectorProps {
  imageUrl: string;
  imageType: string | null;
  config: UIConfig;
  onConfigChange: (config: UIConfig) => void;
}

interface SelectedRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ComponentSelector = ({ imageUrl, imageType, config }: ComponentSelectorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isSvg = imageType?.includes('svg') || imageUrl.includes('data:image/svg');

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPoint({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    setSelectedRegion({
      x: Math.min(startPoint.x, currentX),
      y: Math.min(startPoint.y, currentY),
      width: Math.abs(currentX - startPoint.x),
      height: Math.abs(currentY - startPoint.y),
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const applyStylesToRegion = () => {
    // Styles are applied through the config panel
    // This component just handles selection
  };

  useEffect(() => {
    if (selectedRegion) {
      applyStylesToRegion();
    }
  }, [config, selectedRegion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {isSvg ? (
        <div
          dangerouslySetInnerHTML={{ __html: atob(imageUrl.split(',')[1] || '') }}
          className="w-full h-full"
          style={{
            borderRadius: `${config.layout.cardBorderRadius}px`,
            border: `${config.stroke.weight}px solid ${config.stroke.color}`,
          }}
        />
      ) : (
        <img
          src={imageUrl}
          alt="Imported design"
          className="w-full h-auto"
          style={{
            borderRadius: `${config.layout.cardBorderRadius}px`,
            border: `${config.stroke.weight}px solid ${config.stroke.color}`,
          }}
        />
      )}
      
      {selectedRegion && (
        <div
          className="absolute border-2 border-primary bg-primary/10 pointer-events-none"
          style={{
            left: selectedRegion.x,
            top: selectedRegion.y,
            width: selectedRegion.width,
            height: selectedRegion.height,
            borderRadius: `${config.button.borderRadius}px`,
          }}
        >
          <div className="absolute -top-6 left-0 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
            Selected Region
          </div>
        </div>
      )}
    </div>
  );
};
