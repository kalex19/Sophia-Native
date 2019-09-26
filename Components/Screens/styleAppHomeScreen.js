import { StyleSheet } from "react-native";
import theme from '../../theme';

export const styles = StyleSheet.create({
  greeting: {
    fontSize: 30,
    fontFamily: theme.textMain,
    margin: 10,
    marginBottom: 30
  },
  button: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 25,
  },
  container: {
    backgroundColor: theme.accentOne,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  routes: {
    flexDirection: "column",
    backgroundColor: theme.primary,
    width: "80%",
    height: "12%",
    justifyContent: "space-around",
    margin: 10,
    borderRadius: 50,
    textAlign: "center",
  },
  touchExpander: {
		height: '100%',
		borderRadius: 50,
		width: '100%'
	}
});