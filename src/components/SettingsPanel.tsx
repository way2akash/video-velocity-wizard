
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { UISettings, ControllerSettings } from '../types';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  uiSettings: UISettings;
  controllerSettings: ControllerSettings;
  onUISettingsChange: (settings: UISettings) => void;
  onControllerSettingsChange: (settings: ControllerSettings) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  uiSettings,
  controllerSettings,
  onUISettingsChange,
  onControllerSettingsChange,
  onClose
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10002]">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Video Speed Controller Settings</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="appearance" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">UI</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="sites">Sites</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visible">Show Controller</Label>
                  <Switch
                    id="visible"
                    checked={uiSettings.visible}
                    onCheckedChange={(checked) =>
                      onUISettingsChange({ ...uiSettings, visible: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={uiSettings.theme}
                    onValueChange={(value: 'light' | 'dark' | 'transparent') =>
                      onUISettingsChange({ ...uiSettings, theme: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="transparent">Transparent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={uiSettings.position}
                    onValueChange={(value: any) =>
                      onUISettingsChange({ ...uiSettings, position: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Mode</Label>
                  <Select
                    value={uiSettings.mode}
                    onValueChange={(value: 'compact' | 'full') =>
                      onUISettingsChange({ ...uiSettings, mode: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="full">Full</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="controls" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mouseWheel">Mouse Wheel Control</Label>
                  <Switch
                    id="mouseWheel"
                    checked={controllerSettings.mouseWheelEnabled}
                    onCheckedChange={(checked) =>
                      onControllerSettingsChange({
                        ...controllerSettings,
                        mouseWheelEnabled: checked
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoApply">Auto-apply Defaults</Label>
                  <Switch
                    id="autoApply"
                    checked={controllerSettings.autoApplyDefaults}
                    onCheckedChange={(checked) =>
                      onControllerSettingsChange({
                        ...controllerSettings,
                        autoApplyDefaults: checked
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rewindInterval">Rewind Interval (seconds)</Label>
                  <Input
                    id="rewindInterval"
                    type="number"
                    min="1"
                    max="60"
                    value={controllerSettings.rewindInterval}
                    onChange={(e) =>
                      onControllerSettingsChange({
                        ...controllerSettings,
                        rewindInterval: parseInt(e.target.value) || 10
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forwardInterval">Forward Interval (seconds)</Label>
                  <Input
                    id="forwardInterval"
                    type="number"
                    min="1"
                    max="60"
                    value={controllerSettings.forwardInterval}
                    onChange={(e) =>
                      onControllerSettingsChange({
                        ...controllerSettings,
                        forwardInterval: parseInt(e.target.value) || 10
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sites" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Whitelisted Sites</Label>
                  <p className="text-sm text-muted-foreground">
                    Sites where the controller should always be active
                  </p>
                  <Input
                    placeholder="Enter domain (e.g., youtube.com)"
                    className="text-sm"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Blacklisted Sites</Label>
                  <p className="text-sm text-muted-foreground">
                    Sites where the controller should be disabled
                  </p>
                  <Input
                    placeholder="Enter domain (e.g., banking-site.com)"
                    className="text-sm"
                  />
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>Keyboard Shortcuts:</strong></p>
                  <p>• Ctrl+Alt+D: Speed up (+0.05×)</p>
                  <p>• Ctrl+Alt+S: Slow down (-0.05×)</p>
                  <p>• Ctrl+Alt+R: Reset to 1×</p>
                  <p>• Shift+D: Turbo mode (10×)</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t">
            <Button onClick={onClose} className="w-full">
              Close Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
