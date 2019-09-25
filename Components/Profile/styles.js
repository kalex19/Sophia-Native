import { StyleSheet } from "react-native";
import theme from '../../theme';

 export const styles = StyleSheet.create({
  profileContainer: {
    margin: 30,
  },
  headerContainer: {
    borderBottomColor:theme.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: theme.textMain,
    margin: 10,
  },
  userInfo: {
    fontSize: 20,
    fontFamily: theme.textTwo,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:theme.primary,
    color: theme.accentOne,
    padding: 20
  },
  infoCntainer: {
    backgroundColor: theme.primary,
    marginTop: 10,
    marginBottom: 10,
    padding: 10
  },
  userInfoList: {
    fontSize: 20,
    fontFamily: theme.textTwo,
    color: theme.accentOne,
  },
  touchExpander: {
    height: "100%",
    borderRadius: 50,
    width: "100%"
  },
  logOutButton: {
    color: theme.accentOne,
    fontSize: 30,
    fontFamily: theme.textTwo,
    textAlign: "center",
    paddingTop: 15,
  },
  routes: {
		flexDirection: "column",
    backgroundColor: theme.primary,
    width: "90%",
    height: "10%",
    justifyContent: "center",
    margin: 15,
    borderRadius: 50,
	}
});