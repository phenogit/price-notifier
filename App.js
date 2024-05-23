import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./App.style";

import { Home } from "./pages/Home/Home";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <Home />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
