import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, FileJson, Image as ImageIcon, Palette, Zap, Layout, Link as LinkIcon } from 'lucide-react';
import { UIConfig, defaultConfig } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState('');

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    try {
      if (fileType === 'application/json' || fileName.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target?.result as string) as UIConfig;
            localStorage.setItem('importedConfig', JSON.stringify(config));
            navigate('/editor');
            toast({
              title: "Configuration Imported",
              description: "Your design configuration has been loaded successfully.",
            });
          } catch (error) {
            toast({
              title: "Import Failed",
              description: "Invalid JSON configuration file.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      } else if (fileType.startsWith('image/') || fileName.endsWith('.svg')) {
        // Use FileReader to convert to base64, but pass via navigation state instead of localStorage
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          // Pass image data via navigation state instead of localStorage to avoid quota issues
          navigate('/editor', { 
            state: { 
              importedImage: imageData,
              importedImageType: fileType || 'image/svg+xml'
            } 
          });
          toast({
            title: "Design Imported",
            description: "Your design has been loaded for customization.",
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Unsupported File",
          description: "Please upload a JSON, PNG, SVG, or JPG file.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error processing your file.",
        variant: "destructive",
      });
    }
  };

  const handleFigmaImport = async () => {
    if (!figmaUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Figma file URL.",
        variant: "destructive",
      });
      return;
    }

    // Extract file ID from Figma URL
    const fileIdMatch = figmaUrl.match(/figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/);
    
    if (!fileIdMatch) {
      toast({
        title: "Invalid Figma URL",
        description: "Please enter a valid Figma file or design URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Figma Import",
      description: "To import from Figma, you'll need to export your design as SVG from Figma and upload it here. Direct Figma API import requires a backend setup.",
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-6">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Dynamic UI Editor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Import your Figma designs or upload images to customize every component with real-time preview
          </p>
        </div>

        {/* Upload Section */}
        <Card className="max-w-2xl mx-auto mb-16">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="figma">Figma Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="p-12">
              <div
                className={`text-center transition-all ${
                  isDragging ? 'scale-[1.02]' : ''
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Import Your Design</h2>
                <p className="text-muted-foreground mb-8">
                  Drag and drop your files or click to browse
                </p>
                
                <div className="flex gap-4 justify-center mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="w-4 h-4" />
                    <span>PNG, SVG, JPG</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileJson className="w-4 h-4" />
                    <span>JSON</span>
                  </div>
                </div>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".json,.png,.svg,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <Button
                  size="lg"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="mb-4"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </Button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('importedConfig', JSON.stringify(defaultConfig));
                    navigate('/editor');
                  }}
                >
                  Create New Design
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="figma" className="p-12">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <LinkIcon className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Import from Figma</h2>
                <p className="text-muted-foreground mb-8">
                  Export your Figma design as SVG and upload it above
                </p>

                <div className="space-y-4 max-w-md mx-auto mb-8">
                  <Input
                    type="text"
                    placeholder="https://www.figma.com/file/..."
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                    className="text-center"
                  />
                  <Button
                    size="lg"
                    onClick={handleFigmaImport}
                    className="w-full"
                  >
                    <LinkIcon className="w-5 h-5 mr-2" />
                    Connect Figma
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground max-w-md mx-auto">
                  <p className="font-semibold mb-2">How to export from Figma:</p>
                  <ol className="text-left space-y-1">
                    <li>1. Select your design in Figma</li>
                    <li>2. Right-click → Export → SVG</li>
                    <li>3. Upload the SVG file in the Upload tab</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Preview</h3>
            <p className="text-muted-foreground">
              See your changes instantly as you customize typography, colors, and layouts
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Component Control</h3>
            <p className="text-muted-foreground">
              Customize buttons, galleries, cards, and layouts with granular controls
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Export Anywhere</h3>
            <p className="text-muted-foreground">
              Export your designs as PNG, SVG, JPG, or JSON configuration files
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
