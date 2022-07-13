import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: `${process.env.APP_COLOR}`,
    },
    // secondary: {

    // }
  },
})

export default darkTheme
