import { styles } from "./NavigationTabs.style";
import { Text, TouchableOpacity, View } from "react-native";

export function NavigationTabs({ activeTab, setActiveTab }) {
  function getTabTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: activeTab === tabName ? "#2F76E5" : "gray",
    };
  }

  return (
    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => setActiveTab("all")}>
        <Text style={getTabTextStyle("all")}>全部</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("inProgress")}>
        <Text style={getTabTextStyle("inProgress")}>進行中</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("done")}>
        <Text style={getTabTextStyle("done")}>已完成</Text>
      </TouchableOpacity>
    </View>
  );
}
