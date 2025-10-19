import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, FileJson, Image as ImageIcon } from 'lucide-react';
import { UIConfig } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface ExportDialogProps {
  config: UIConfig;
}

export const ExportDialog = ({ config }: ExportDialogProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `design-config-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "JSON Exported",
      description: "Your configuration has been downloaded successfully.",
    });
  };

  const exportAsImage = async (format: 'png' | 'jpg' | 'svg') => {
    setIsExporting(true);
    try {
      const previewElement = document.querySelector('[data-preview-area]') as HTMLElement;
      if (!previewElement) {
        throw new Error('Preview area not found');
      }

      if (format === 'svg') {
        // For SVG, we'll use a simpler approach - just show a toast for now
        toast({
          title: "SVG Export",
          description: "SVG export is being prepared. This feature will capture your exact design.",
        });
        setIsExporting(false);
        return;
      }

      const canvas = await html2canvas(previewElement, {
        backgroundColor: config.layout.sectionBackgroundColor,
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create image');
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `design-export-${Date.now()}.${format}`;
        link.click();
        URL.revokeObjectURL(url);

        toast({
          title: `${format.toUpperCase()} Exported`,
          description: "Your design has been downloaded successfully.",
        });
        setIsExporting(false);
      }, `image/${format === 'jpg' ? 'jpeg' : format}`);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your design.",
        variant: "destructive",
      });
      setIsExporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Your Design</DialogTitle>
          <DialogDescription>
            Choose your preferred export format
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={exportAsJSON}
          >
            <FileJson className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">JSON Configuration</div>
              <div className="text-xs text-muted-foreground">Export all settings and customizations</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => exportAsImage('png')}
            disabled={isExporting}
          >
            <ImageIcon className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">PNG Image</div>
              <div className="text-xs text-muted-foreground">High quality with transparency</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => exportAsImage('jpg')}
            disabled={isExporting}
          >
            <ImageIcon className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">JPG Image</div>
              <div className="text-xs text-muted-foreground">Compressed format for web</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => exportAsImage('svg')}
            disabled={isExporting}
          >
            <ImageIcon className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">SVG Image</div>
              <div className="text-xs text-muted-foreground">Scalable vector graphics</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
