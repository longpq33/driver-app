import { StyleSheet } from "react-native";
import { COLORS } from "@/themes/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 60,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 32,
  },
  contentContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
  },
  loader: {
    marginTop: 10,
  },
  linkContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  linkText: {
    fontSize: 14,
    color: '#fff',
  },
  linkTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
