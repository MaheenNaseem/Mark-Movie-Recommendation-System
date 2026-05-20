const darkTheme = {
  background: "#26355D",
  primary: "#AF47D2",
  secondary: "#FF8F00",
  highlight: "#FFDB00",
  white: "#FFFFFF",
  textLight: "#EAEAEA",
  card: "#324376",
  border: "#1a2a4a",
  header: "#1a2a4a",
};

const lightTheme = {
  background: "#F5F5F5",
  primary: "#AF47D2",
  secondary: "#FF8F00",
  highlight: "#26355D",
  white: "#000000",
  textLight: "#555555",
  card: "#d0cece",
  border: "#E0E0E0",
  header: "#FFFFFF",
};

export const getTheme = (isDark) => {
  return isDark ? darkTheme : lightTheme;
};

const colors = darkTheme;
export default colors;
