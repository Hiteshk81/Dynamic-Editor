import { useState } from 'react';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewArea } from '@/components/PreviewArea';
import { UIConfig, defaultConfig } from '@/types/editor';
import { Separator } from '@/components/ui/separator';
import { Palette } from 'lucide-react';

const Index = () => {
  const [config, setConfig] = useState<UIConfig>(defaultConfig);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Dynamic UI Editor</h1>
            <p className="text-xs text-muted-foreground">Create & customize beautiful designs</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Live Preview Mode
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
          <PreviewArea config={config} />
        </div>
      </div>
    </div>
  );
};

export default Index;
