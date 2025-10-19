import { UIConfig } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, LayoutGrid, LayoutList } from 'lucide-react';
import { toast } from 'sonner';

interface EditorPanelProps {
  config: UIConfig;
  onConfigChange: (config: UIConfig) => void;
}

export const EditorPanel = ({ config, onConfigChange }: EditorPanelProps) => {
  const updateConfig = (section: keyof UIConfig, key: string, value: any) => {
    onConfigChange({
      ...config,
      [section]: {
        ...(config[section] as any),
        [key]: value,
      },
    });
  };

  const updateLayoutType = (type: 'grid' | 'list') => {
    onConfigChange({ ...config, layoutType: type });
  };

  const exportConfig = () => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ui-config.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Configuration exported successfully!');
  };

  const shadowOptions = [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const fontFamilies = ['Inter', 'Roboto', 'Poppins', 'Open Sans', 'Montserrat'];
  const fontWeights = [300, 400, 500, 600, 700];
  const alignmentOptions = ['left', 'center', 'right'];

  return (
    <div className="h-full overflow-y-auto bg-[hsl(var(--editor-bg))] p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">UI Editor</h2>
          <p className="text-sm text-muted-foreground">Customize your design in real-time</p>
        </div>
        <Button onClick={exportConfig} variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
        <Label className="text-sm font-semibold mb-3 block">Layout Type</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={config.layoutType === 'grid' ? 'default' : 'outline'}
            onClick={() => updateLayoutType('grid')}
            className="gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Grid
          </Button>
          <Button
            variant={config.layoutType === 'list' ? 'default' : 'outline'}
            onClick={() => updateLayoutType('list')}
            className="gap-2"
          >
            <LayoutList className="w-4 h-4" />
            List
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="typography" className="space-y-4 mt-4">
          <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Font Family</Label>
                <Select
                  value={config.typography.fontFamily}
                  onValueChange={(value) => updateConfig('typography', 'fontFamily', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontFamilies.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Font Weight</Label>
                <Select
                  value={config.typography.fontWeight.toString()}
                  onValueChange={(value) => updateConfig('typography', 'fontWeight', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map((weight) => (
                      <SelectItem key={weight} value={weight.toString()}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Font Size: {config.typography.fontSize}px
                </Label>
                <Slider
                  value={[config.typography.fontSize]}
                  onValueChange={([value]) => updateConfig('typography', 'fontSize', value)}
                  min={10}
                  max={60}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4 mt-4">
          <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
            <h3 className="font-semibold mb-4">Button</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Border Radius: {config.button.borderRadius}px
                </Label>
                <Slider
                  value={[config.button.borderRadius]}
                  onValueChange={([value]) => updateConfig('button', 'borderRadius', value)}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Shadow</Label>
                <Select
                  value={config.button.shadow}
                  onValueChange={(value) => updateConfig('button', 'shadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Alignment</Label>
                <Select
                  value={config.button.alignment}
                  onValueChange={(value) => updateConfig('button', 'alignment', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alignmentOptions.map((alignment) => (
                      <SelectItem key={alignment} value={alignment}>
                        {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                <Input
                  type="color"
                  value={config.button.backgroundColor}
                  onChange={(e) => updateConfig('button', 'backgroundColor', e.target.value)}
                  className="h-10 w-full cursor-pointer"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Text Color</Label>
                <Input
                  type="color"
                  value={config.button.textColor}
                  onChange={(e) => updateConfig('button', 'textColor', e.target.value)}
                  className="h-10 w-full cursor-pointer"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
            <h3 className="font-semibold mb-4">Gallery</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Alignment</Label>
                <Select
                  value={config.gallery.alignment}
                  onValueChange={(value) => updateConfig('gallery', 'alignment', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alignmentOptions.map((alignment) => (
                      <SelectItem key={alignment} value={alignment}>
                        {alignment.charAt(0).toUpperCase() + alignment.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Spacing: {config.gallery.spacing}px
                </Label>
                <Slider
                  value={[config.gallery.spacing]}
                  onValueChange={([value]) => updateConfig('gallery', 'spacing', value)}
                  min={0}
                  max={48}
                  step={4}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Border Radius: {config.gallery.borderRadius}px
                </Label>
                <Slider
                  value={[config.gallery.borderRadius]}
                  onValueChange={([value]) => updateConfig('gallery', 'borderRadius', value)}
                  min={0}
                  max={32}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 mt-4">
          <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Card Border Radius: {config.layout.cardBorderRadius}px
                </Label>
                <Slider
                  value={[config.layout.cardBorderRadius]}
                  onValueChange={([value]) => updateConfig('layout', 'cardBorderRadius', value)}
                  min={0}
                  max={32}
                  step={1}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Container Padding: {config.layout.containerPadding}px
                </Label>
                <Slider
                  value={[config.layout.containerPadding]}
                  onValueChange={([value]) => updateConfig('layout', 'containerPadding', value)}
                  min={0}
                  max={64}
                  step={4}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Section Background</Label>
                <Input
                  type="color"
                  value={config.layout.sectionBackgroundColor}
                  onChange={(e) => updateConfig('layout', 'sectionBackgroundColor', e.target.value)}
                  className="h-10 w-full cursor-pointer"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-[hsl(var(--control-bg))] border-border">
            <h3 className="font-semibold mb-4">Stroke/Border</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Stroke Color</Label>
                <Input
                  type="color"
                  value={config.stroke.color}
                  onChange={(e) => updateConfig('stroke', 'color', e.target.value)}
                  className="h-10 w-full cursor-pointer"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Stroke Weight: {config.stroke.weight}px
                </Label>
                <Slider
                  value={[config.stroke.weight]}
                  onValueChange={([value]) => updateConfig('stroke', 'weight', value)}
                  min={0}
                  max={8}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
