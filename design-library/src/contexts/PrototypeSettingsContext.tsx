import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Prototype Settings Interface
 * Used to toggle experimental features and integrations during demos and development
 */
export interface PrototypeSettings {
  // App Integration Category
  appIntegration: {
    showExtraCardButtons: boolean;
    enableAdvancedFilters: boolean;
    showIntegrationBadges: boolean;
    useEnhancedNavigation: boolean;
  };

  // UI Experiments Category
  uiExperiments: {
    sidenavTest: boolean;
    transactionsView: boolean;
  };
}

/**
 * Default settings - AltNav is now the default
 */
const defaultSettings: PrototypeSettings = {
  appIntegration: {
    showExtraCardButtons: false,
    enableAdvancedFilters: false,
    showIntegrationBadges: false,
    useEnhancedNavigation: false,
  },
  uiExperiments: {
    sidenavTest: true, // True = AltNav (default), False = Navigation v1 (legacy)
    transactionsView: false, // True = Transaction-centric view, False = App-based view (default)
  },
};

/**
 * Context interface
 */
interface PrototypeSettingsContextType {
  settings: PrototypeSettings;
  updateSetting: (category: keyof PrototypeSettings, key: string, value: boolean) => void;
  resetSettings: () => void;
}

/**
 * Create context
 */
const PrototypeSettingsContext = createContext<PrototypeSettingsContextType | undefined>(undefined);

/**
 * Settings Provider Component
 */
interface PrototypeSettingsProviderProps {
  children: ReactNode;
}

export const PrototypeSettingsProvider: React.FC<PrototypeSettingsProviderProps> = ({ children }) => {
  // Initialize settings from localStorage or use defaults
  const [settings, setSettings] = useState<PrototypeSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('prototypeSettings');
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch (e) {
          console.warn('Failed to parse saved prototype settings:', e);
        }
      }
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prototypeSettings', JSON.stringify(settings));
    }
  }, [settings]);

  // Update a specific setting
  const updateSetting = (category: keyof PrototypeSettings, key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  // Reset all settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('prototypeSettings');
    }
  };

  return (
    <PrototypeSettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </PrototypeSettingsContext.Provider>
  );
};

/**
 * Hook to use prototype settings
 */
export const usePrototypeSettings = (): PrototypeSettingsContextType => {
  const context = useContext(PrototypeSettingsContext);
  if (context === undefined) {
    throw new Error('usePrototypeSettings must be used within a PrototypeSettingsProvider');
  }
  return context;
};

/**
 * Hook to get just the settings values (convenience hook)
 */
export const useSettings = (): PrototypeSettings => {
  const { settings } = usePrototypeSettings();
  return settings;
};

export default PrototypeSettingsContext;