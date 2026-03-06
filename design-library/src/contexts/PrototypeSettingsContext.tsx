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
  getShareableUrl: () => string;
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
  // Initialize settings from URL params first, then localStorage, or use defaults
  const [settings, setSettings] = useState<PrototypeSettings>(() => {
    if (typeof window !== 'undefined') {
      // Start with defaults
      let initialSettings = { ...defaultSettings };

      // Try to load from localStorage
      const saved = localStorage.getItem('prototypeSettings');
      if (saved) {
        try {
          initialSettings = { ...defaultSettings, ...JSON.parse(saved) };
        } catch (e) {
          console.warn('Failed to parse saved prototype settings:', e);
        }
      }

      // Check for URL parameters and override localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const urlSettingsApplied: string[] = [];

      // Parse each URL parameter and apply to settings
      urlParams.forEach((value, key) => {
        // Convert string value to boolean
        const boolValue = value === 'true' || value === '1';

        // Check if this setting exists in appIntegration category
        if (key in initialSettings.appIntegration) {
          initialSettings.appIntegration[key as keyof typeof initialSettings.appIntegration] = boolValue;
          urlSettingsApplied.push(`${key}=${boolValue}`);
        }

        // Check if this setting exists in uiExperiments category
        if (key in initialSettings.uiExperiments) {
          initialSettings.uiExperiments[key as keyof typeof initialSettings.uiExperiments] = boolValue;
          urlSettingsApplied.push(`${key}=${boolValue}`);
        }
      });

      // Log applied URL settings for debugging
      if (urlSettingsApplied.length > 0) {
        console.log('Applied settings from URL:', urlSettingsApplied.join(', '));
      }

      return initialSettings;
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

  // Generate shareable URL with current settings
  const getShareableUrl = (): string => {
    if (typeof window === 'undefined') return '';

    const params = new URLSearchParams();

    // Add all non-default settings to URL
    Object.entries(settings.appIntegration).forEach(([key, value]) => {
      if (value !== defaultSettings.appIntegration[key as keyof typeof defaultSettings.appIntegration]) {
        params.set(key, value.toString());
      }
    });

    Object.entries(settings.uiExperiments).forEach(([key, value]) => {
      if (value !== defaultSettings.uiExperiments[key as keyof typeof defaultSettings.uiExperiments]) {
        params.set(key, value.toString());
      }
    });

    // Build full URL with current hash and params
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const hash = window.location.hash;
    const queryString = params.toString();

    return queryString ? `${baseUrl}?${queryString}${hash}` : `${baseUrl}${hash}`;
  };

  return (
    <PrototypeSettingsContext.Provider value={{ settings, updateSetting, resetSettings, getShareableUrl }}>
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