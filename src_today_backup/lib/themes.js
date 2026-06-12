export const applyTheme = (theme = 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
};

export const themes = {
  dark: { background: '#0a0a1a', primary: '#f59e0b', text: '#ffffff' },
  light: { background: '#ffffff', primary: '#1d4ed8', text: '#000000' },
};

export default { applyTheme, themes };
