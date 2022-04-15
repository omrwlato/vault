import { createTheme } from '@material-ui/core/styles';

const createThemeMode = isNightMode =>
  createTheme({
    palette: {
      type: isNightMode ? 'dark' : 'light',
      background: {
        default: isNightMode ? '#clear' : '#fcd5ce',
        paper: isNightMode ? '#606077' : '#fff',
        primary: isNightMode ? '#fff' : '#FBF6F0',
        secondary: isNightMode ? '#fff' : '#F8F2EC',
        extra: isNightMode ? '#clear' : '#FBF6F0',
        dark: isNightMode ? '#2B2A3D' : '#ff0093',
        paused: isNightMode ? '#2B2A5A' : '#FCE57E',
        retired: isNightMode ? '#d32f2f' : '#e57373',
        hover: isNightMode ? '#2B2A3D' : '#EFE6DC',
        border: isNightMode ? '#2B2A3D' : '#DED9D5',
        overlay: isNightMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.75)',
      },
      primary: {
        main: isNightMode ? '#fff' : '#000',
      },
      secondary: {
        main: isNightMode ? '#fff' : '#F8F2EC',
      },
      text: {
        primary: isNightMode ? '#000' : '#000',
        secondary: isNightMode ? '#000' : '#000',
      },
    },
    overrides: {
      MuiButton: {
        label: {
          color: isNightMode ? '#000' : '#000',
        },
      },
      // for dropdown menu items
      MuiButtonBase: {
        root: {
          color: isNightMode ? '#000' : '#000',
        },
      },
      MuiCheckbox: {
        colorPrimary: {
          color: isNightMode ? '#000' : '#000',
        },
        colorSecondary: {
          color: isNightMode ? '#000' : '#000',
        },
      },
    },
  });

export default createThemeMode;
