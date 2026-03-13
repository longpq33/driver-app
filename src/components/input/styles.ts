import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
    height: 48,
    backgroundColor: "#fff",
    color: "#333",
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 4,
  },
});
