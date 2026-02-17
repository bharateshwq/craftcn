import type { ThemeStyles, ThemeStyleProps } from "@/types/theme";
import { defaultPresets } from "./presets";
import { defaultLightThemeStyles, defaultDarkThemeStyles } from "./defaults";

/**
 * Get theme styles for a given preset name
 */
export function getPresetThemeStyles(presetName: string): ThemeStyles {
  if (presetName === "default" || !presetName) {
    return {
      light: { ...defaultLightThemeStyles },
      dark: { ...defaultDarkThemeStyles },
    };
  }

  const preset = defaultPresets[presetName];
  if (!preset) {
    console.warn(`Preset "${presetName}" not found, using default`);
    return {
      light: { ...defaultLightThemeStyles },
      dark: { ...defaultDarkThemeStyles },
    };
  }

  return {
    light: { ...defaultLightThemeStyles, ...preset.styles.light },
    dark: { ...defaultDarkThemeStyles, ...preset.styles.dark },
  };
}

/**
 * Apply theme styles to a DOM element (usually document.documentElement)
 */
export function applyThemeToElement(
  styles: ThemeStyleProps,
  element: HTMLElement = document.documentElement
): void {
  Object.entries(styles).forEach(([key, value]) => {
    element.style.setProperty(`--${key}`, value);
  });
}

/**
 * Convert hex color to oklch format (simplified version)
 * Note: This is a placeholder. For production, use a proper color conversion library
 */
export function hexToOklch(hex: string): string {
  // This is a simplified placeholder
  // In production, you'd use a library like culori for accurate conversion
  return hex;
}

/**
 * Get color value from theme styles
 */
export function getColorValue(styles: ThemeStyleProps, colorKey: keyof ThemeStyleProps): string {
  return styles[colorKey] || "";
}

/**
 * Check if two theme styles are equal
 */
export function areStylesEqual(styles1: ThemeStyles, styles2: ThemeStyles): boolean {
  return JSON.stringify(styles1) === JSON.stringify(styles2);
}
