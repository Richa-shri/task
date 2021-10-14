import { colors, createTheme } from "@material-ui/core";
import { blue,   pink } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[300],
    },
}
  
});

export default theme;
