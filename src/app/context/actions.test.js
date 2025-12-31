import {
  SET_THEME,
  SET_SHOW_SIZES,
  SET_IS_COLLAPSED,
  SetTheme,
  SetShowSizes,
  SetIsCollapsed,
} from './actions';
import { THEME } from '../../helpers/constants';

describe('Context Actions', () => {
  describe('Action type constants', () => {
    it('should have SET_THEME constant', () => {
      expect(SET_THEME).toBe('SET_THEME');
    });

    it('should have SET_SHOW_SIZES constant', () => {
      expect(SET_SHOW_SIZES).toBe('SET_SHOW_SIZES');
    });

    it('should have SET_IS_COLLAPSED constant', () => {
      expect(SET_IS_COLLAPSED).toBe('SET_IS_COLLAPSED');
    });
  });

  describe('SetTheme action creator', () => {
    it('should create SET_THEME action with dark theme', () => {
      const action = SetTheme(THEME.Dark);

      expect(action).toEqual({
        type: SET_THEME,
        data: {
          theme: THEME.Dark,
        },
      });
    });

    it('should create SET_THEME action with light theme', () => {
      const action = SetTheme(THEME.Light);

      expect(action).toEqual({
        type: SET_THEME,
        data: {
          theme: THEME.Light,
        },
      });
    });

    it('should handle custom theme values', () => {
      const customTheme = 'custom-theme';
      const action = SetTheme(customTheme);

      expect(action.data.theme).toBe(customTheme);
    });

    it('should have type SET_THEME', () => {
      const action = SetTheme(THEME.Dark);
      expect(action.type).toBe(SET_THEME);
    });
  });

  describe('SetShowSizes action creator', () => {
    it('should create SET_SHOW_SIZES action with true', () => {
      const action = SetShowSizes(true);

      expect(action).toEqual({
        type: SET_SHOW_SIZES,
        data: {
          showSizes: true,
        },
      });
    });

    it('should create SET_SHOW_SIZES action with false', () => {
      const action = SetShowSizes(false);

      expect(action).toEqual({
        type: SET_SHOW_SIZES,
        data: {
          showSizes: false,
        },
      });
    });

    it('should have type SET_SHOW_SIZES', () => {
      const action = SetShowSizes(true);
      expect(action.type).toBe(SET_SHOW_SIZES);
    });
  });

  describe('SetIsCollapsed action creator', () => {
    it('should create SET_IS_COLLAPSED action with 0', () => {
      const action = SetIsCollapsed(0);

      expect(action).toEqual({
        type: SET_IS_COLLAPSED,
        data: {
          isCollapsed: 0,
        },
      });
    });

    it('should create SET_IS_COLLAPSED action with positive number', () => {
      const action = SetIsCollapsed(2);

      expect(action).toEqual({
        type: SET_IS_COLLAPSED,
        data: {
          isCollapsed: 2,
        },
      });
    });

    it('should create SET_IS_COLLAPSED action with false (expand all)', () => {
      const action = SetIsCollapsed(false);

      expect(action).toEqual({
        type: SET_IS_COLLAPSED,
        data: {
          isCollapsed: false,
        },
      });
    });

    it('should have type SET_IS_COLLAPSED', () => {
      const action = SetIsCollapsed(1);
      expect(action.type).toBe(SET_IS_COLLAPSED);
    });
  });

  describe('Action creator consistency', () => {
    it('should all return objects with type and data properties', () => {
      const themeAction = SetTheme(THEME.Dark);
      const sizesAction = SetShowSizes(true);
      const collapsedAction = SetIsCollapsed(1);

      expect(themeAction).toHaveProperty('type');
      expect(themeAction).toHaveProperty('data');
      expect(sizesAction).toHaveProperty('type');
      expect(sizesAction).toHaveProperty('data');
      expect(collapsedAction).toHaveProperty('type');
      expect(collapsedAction).toHaveProperty('data');
    });

    it('should always have string type property', () => {
      const themeAction = SetTheme(THEME.Dark);
      const sizesAction = SetShowSizes(true);
      const collapsedAction = SetIsCollapsed(1);

      expect(typeof themeAction.type).toBe('string');
      expect(typeof sizesAction.type).toBe('string');
      expect(typeof collapsedAction.type).toBe('string');
    });
  });
});
