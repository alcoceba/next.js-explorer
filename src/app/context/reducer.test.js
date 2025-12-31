import reducer from './reducer';
import { SetTheme, SetShowSizes, SetIsCollapsed } from './actions';
import { THEME } from '../../helpers/constants';

describe('Context Reducer', () => {
  const initialState = {
    theme: THEME.Dark,
    showSizes: false,
    isCollapsed: false,
  };

  it('should throw error for unknown action', () => {
    const invalidAction = { type: 'UNKNOWN' };
    expect(() => {
      reducer(initialState, invalidAction);
    }).toThrow('Invalid action');
  });

  it('should handle SET_THEME action', () => {
    const action = SetTheme(THEME.Light);
    const newState = reducer(initialState, action);

    expect(newState.theme).toBe(THEME.Light);
    expect(newState.showSizes).toBe(false);
    expect(newState.isCollapsed).toBe(false);
  });

  it('should handle SET_SHOW_SIZES action with true', () => {
    const action = SetShowSizes(true);
    const newState = reducer(initialState, action);

    expect(newState.showSizes).toBe(true);
    expect(newState.theme).toBe(THEME.Dark);
    expect(newState.isCollapsed).toBe(false);
  });

  it('should handle SET_SHOW_SIZES action with false', () => {
    const state = { ...initialState, showSizes: true };
    const action = SetShowSizes(false);
    const newState = reducer(state, action);

    expect(newState.showSizes).toBe(false);
  });

  it('should handle SET_IS_COLLAPSED action', () => {
    const action = SetIsCollapsed(1);
    const newState = reducer(initialState, action);

    expect(newState.isCollapsed).toBe(1);
    expect(newState.theme).toBe(THEME.Dark);
    expect(newState.showSizes).toBe(false);
  });

  it('should handle SET_IS_COLLAPSED with false (expand all)', () => {
    const state = { ...initialState, isCollapsed: 2 };
    const action = SetIsCollapsed(false);
    const newState = reducer(state, action);

    expect(newState.isCollapsed).toBe(false);
  });

  it('should preserve other state properties on theme change', () => {
    const state = {
      theme: THEME.Dark,
      showSizes: true,
      isCollapsed: 2,
    };
    const action = SetTheme(THEME.Light);
    const newState = reducer(state, action);

    expect(newState.theme).toBe(THEME.Light);
    expect(newState.showSizes).toBe(true);
    expect(newState.isCollapsed).toBe(2);
  });

  it('should preserve other state properties on showSizes change', () => {
    const state = {
      theme: THEME.Light,
      showSizes: false,
      isCollapsed: 1,
    };
    const action = SetShowSizes(true);
    const newState = reducer(state, action);

    expect(newState.showSizes).toBe(true);
    expect(newState.theme).toBe(THEME.Light);
    expect(newState.isCollapsed).toBe(1);
  });

  it('should not mutate original state on theme change', () => {
    const originalState = { ...initialState };
    const action = SetTheme(THEME.Light);
    reducer(initialState, action);

    expect(initialState).toEqual(originalState);
  });

  it('should handle multiple sequential actions', () => {
    let state = initialState;

    state = reducer(state, SetTheme(THEME.Light));
    expect(state.theme).toBe(THEME.Light);

    state = reducer(state, SetShowSizes(true));
    expect(state.showSizes).toBe(true);

    state = reducer(state, SetIsCollapsed(1));
    expect(state.isCollapsed).toBe(1);

    expect(state).toEqual({
      theme: THEME.Light,
      showSizes: true,
      isCollapsed: 1,
    });
  });

  it('should throw error for invalid action type', () => {
    const invalidAction = { type: 'INVALID_ACTION' };
    expect(() => {
      reducer(initialState, invalidAction);
    }).toThrow('Invalid action');
  });
});
