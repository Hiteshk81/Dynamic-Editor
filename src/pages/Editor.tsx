import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { ExportDialog } from '@/components/ExportDialog';
import { UIConfig, defaultConfig } from '@/types/editor';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Palette, Maximize2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [config, setConfig] = useState<UIConfig>(defaultConfig);
  const [importedImage, setImportedImage] = useState<string | null>(null);
  const [importedImageType, setImportedImageType] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);


  useEffect(() => {
    // Check for image data from navigation state first (higher priority)
    if (location.state?.importedImage) {
      setImportedImage(location.state.importedImage);
      setImportedImageType(location.state.importedImageType);
      // Clear the state after loading
      window.history.replaceState({}, document.title);
    } else {
      // Fallback to localStorage for backwards compatibility
      const savedImage = localStorage.getItem('importedImage');
      const savedImageType = localStorage.getItem('importedImageType');
      if (savedImage) {
        setImportedImage(savedImage);
        setImportedImageType(savedImageType);
        localStorage.removeItem('importedImage');
        localStorage.removeItem('importedImageType');
      }
    }

    const savedConfig = localStorage.getItem('importedConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
        localStorage.removeItem('importedConfig');
      } catch (error) {
        console.error('Failed to load config:', error);
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isFullscreen, location]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsFullscreen(false)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit Fullscreen
          </Button>
          <span className="text-sm text-muted-foreground flex items-center px-3 bg-card rounded-md border border-border">
            Press ESC to exit
          </span>
        </div>
        <PreviewArea config={config} importedImage={importedImage} importedImageType={importedImageType} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Dynamic UI Editor</h1>
            <p className="text-xs text-muted-foreground">Create & customize beautiful designs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Live Preview
          </Button>
          <ExportDialog config={config} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className="w-[380px] border-r border-border flex-shrink-0 overflow-hidden">
          <EditorPanel config={config} onConfigChange={setConfig} />
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-full" />

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden">
          <PreviewArea config={config} importedImage={importedImage} importedImageType={importedImageType} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
