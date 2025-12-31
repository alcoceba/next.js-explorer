import React from 'react';
import { THEME } from '../../helpers/constants';
import { getTheme, setTheme } from '../../helpers/config';
import { SetTheme } from '../context/actions';
import { Context } from '../context/context';

function useTheme() {
  const [isInit, setIsInit] = React.useState(false);
  const [{ theme }, dispatch] = React.useContext(Context);

  const getBrowserTheme = () =>
    window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)')?.matches
      ? THEME.Dark
      : THEME.Light;

  React.useEffect(() => {
    if (isInit) {
      const save = async (theme) => setTheme(theme);
      document.body.dataset.theme = theme;
      save(theme);
    }
  }, [theme, isInit]);

  React.useEffect(() => {
    const load = async () => {
      const themeConfig = await getTheme();
      dispatch(SetTheme(themeConfig?.theme || getBrowserTheme() || THEME.Dark));
      setIsInit(true);
    };

    load();
  }, [dispatch]);

  return theme;
}

export default useTheme;
