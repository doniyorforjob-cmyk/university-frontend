import React, { useState } from 'react';
import { HomeSectionConfig, LayoutVariant, BackgroundType } from '../../types';

interface HeroBuilderProps {
  config: HomeSectionConfig;
  onUpdate: (updates: Partial<HomeSectionConfig>) => void;
  previewData?: any;
}

const layoutOptions: { value: LayoutVariant; label: string; description: string }[] = [
  {
    value: 'centered-hero',
    label: 'Markazlashtirilgan Hero',
    description: 'To\'liq kenglikda, markazlashtirilgan kontent'
  },
  {
    value: 'left-aligned',
    label: 'Chapga tekislash',
    description: 'Kontent chap tomonda'
  },
  {
    value: 'full-width',
    label: 'To\'liq kenglik',
    description: 'Kontent to\'liq kenglikda'
  }
];

const backgroundOptions: { value: BackgroundType; label: string }[] = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'color', label: 'Rang' },
  { value: 'image', label: 'Rasm' },
  { value: 'none', label: 'Yo\'q' }
];

const gradientPresets = [
  'from-blue-600 to-purple-600',
  'from-green-500 to-teal-500',
  'from-red-500 to-pink-500',
  'from-indigo-600 to-blue-500',
  'from-purple-500 to-indigo-500',
];

export const HeroBuilder: React.FC<HeroBuilderProps> = ({
  config,
  onUpdate,
  previewData
}) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'background' | 'content' | 'styling'>('layout');

  const updateConfig = (updates: Partial<HomeSectionConfig>) => {
    onUpdate(updates);
  };

  const updateBackground = (background: Partial<typeof config.background>) => {
    updateConfig({
      background: { ...config.background, ...background }
    });
  };

  const updateStyling = (styling: Partial<typeof config.styling>) => {
    updateConfig({
      styling: { ...config.styling, ...styling }
    });
  };

  return (
    <div className="hero-builder bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Section Builder</h3>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          {[
            { id: 'layout', label: 'Layout' },
            { id: 'background', label: 'Fon' },
            { id: 'content', label: 'Kontent' },
            { id: 'styling', label: 'Stil' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Layout Variant</h4>
            <div className="grid grid-cols-1 gap-3">
              {layoutOptions.map(option => (
                <label key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="layout"
                    value={option.value}
                    checked={config.layout === option.value}
                    onChange={(e) => updateConfig({ layout: e.target.value as LayoutVariant })}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Fon Turi</h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {backgroundOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="backgroundType"
                    value={option.value}
                    checked={config.background.type === option.value}
                    onChange={(e) => updateBackground({ type: option.value as BackgroundType })}
                    className="text-blue-600"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            {config.background.type === 'gradient' && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Gradient Preset</h5>
                <div className="grid grid-cols-3 gap-2">
                  {gradientPresets.map(preset => (
                    <button
                      key={preset}
                      onClick={() => updateBackground({ value: preset })}
                      className={`h-12 rounded-lg border-2 transition-all ${config.background.value === preset
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                        } bg-gradient-to-r ${preset}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {config.background.type === 'color' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rang
                </label>
                <input
                  type="color"
                  value={config.background.value}
                  onChange={(e) => updateBackground({ value: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {config.background.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rasm URL
                </label>
                <input
                  type="url"
                  value={config.background.value}
                  onChange={(e) => updateBackground({ value: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {(config.background.type === 'gradient' || config.background.type === 'image') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shaffoflik (0-1)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={config.background.opacity || 1}
                  onChange={(e) => updateBackground({ opacity: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Qiymat: {config.background.opacity || 1}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Kontent Sozlamalari</h4>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.showTitle !== false}
                  onChange={(e) => updateConfig({ showTitle: e.target.checked })}
                  className="text-blue-600"
                />
                <span className="text-sm">Sarlavhani ko&apos;rsatish</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={config.showSubtitle !== false}
                  onChange={(e) => updateConfig({ showSubtitle: e.target.checked })}
                  className="text-blue-600"
                />
                <span className="text-sm">Tavsifni ko&apos;rsatish</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sarlavha
              </label>
              <input
                type="text"
                value={config.title || ''}
                onChange={(e) => updateConfig({ title: e.target.value })}
                placeholder="Hero sarlavhasi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tavsif
              </label>
              <textarea
                value={config.subtitle || ''}
                onChange={(e) => updateConfig({ subtitle: e.target.value })}
                placeholder="Qisqacha tavsif"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {activeTab === 'styling' && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Stil Sozlamalari</h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Padding
                </label>
                <select
                  value={config.styling.padding}
                  onChange={(e) => updateStyling({ padding: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="py-8">Kichik (py-8)</option>
                  <option value="py-12">O&apos;rtacha (py-12)</option>
                  <option value="py-16">Katta (py-16)</option>
                  <option value="py-20">Juda katta (py-20)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Width
                </label>
                <select
                  value={config.styling.maxWidth}
                  onChange={(e) => updateStyling({ maxWidth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="max-w-4xl">Kichik (max-w-4xl)</option>
                  <option value="max-w-6xl">O&apos;rtacha (max-w-6xl)</option>
                  <option value="max-w-7xl">Katta (max-w-7xl)</option>
                  <option value="max-w-full">To&apos;liq (max-w-full)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matn tekislashi
              </label>
              <select
                value={config.styling.textAlign}
                onChange={(e) => updateStyling({ textAlign: e.target.value as 'left' | 'center' | 'right' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="left">Chapga</option>
                <option value="center">Markazga</option>
                <option value="right">O&apos;ngga</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shrift o&apos;lchami
              </label>
              <select
                value={config.styling.fontSize}
                onChange={(e) => updateStyling({ fontSize: e.target.value as 'sm' | 'base' | 'lg' | 'xl' | '2xl' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="sm">Kichik</option>
                <option value="base">O&apos;rtacha</option>
                <option value="lg">Katta</option>
                <option value="xl">Juda katta</option>
                <option value="2xl">Ultra katta</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};