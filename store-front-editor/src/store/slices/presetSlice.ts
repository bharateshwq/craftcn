import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemePreset } from "@/types/theme";
import { defaultPresets } from "@/lib/theme/presets";

interface PresetState {
  presets: Record<string, ThemePreset>;
}

const initialState: PresetState = {
  presets: defaultPresets,
};

const presetSlice = createSlice({
  name: "preset",
  initialState,
  reducers: {
    loadPresets: (state, action: PayloadAction<Record<string, ThemePreset>>) => {
      state.presets = { ...defaultPresets, ...action.payload };
    },
    
    addPreset: (state, action: PayloadAction<{ id: string; preset: ThemePreset }>) => {
      state.presets[action.payload.id] = action.payload.preset;
    },
    
    removePreset: (state, action: PayloadAction<string>) => {
      delete state.presets[action.payload];
    },
    
    updatePreset: (state, action: PayloadAction<{ id: string; preset: ThemePreset }>) => {
      if (state.presets[action.payload.id]) {
        state.presets[action.payload.id] = action.payload.preset;
      }
    },
  },
});

export const { loadPresets, addPreset, removePreset, updatePreset } = presetSlice.actions;

// Selectors
export const selectAllPresets = (state: { preset: PresetState }) => state.preset.presets;
export const selectPreset = (id: string) => (state: { preset: PresetState }) => state.preset.presets[id];
export const selectPresetNames = (state: { preset: PresetState }) => ["default", ...Object.keys(state.preset.presets)];

export default presetSlice.reducer;
