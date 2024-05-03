import { styles } from "./NavigationTabs.style";
import { Text, TouchableOpacity, View } from "react-native";

export function NavigationTabs({ priceTrackingList, activeTab, setActiveTab }) {
  const countByStatus = {
    all: priceTrackingList.length,
    inProgress: priceTrackingList.filter((i) => !i.isComplete).length,
    done: priceTrackingList.filter((i) => i.isComplete).length,
  };

  function getTabTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: activeTab === tabName ? "#2F76E5" : "gray",
    };
  }

  return (
    <View style={styles.tabs}>
      <TouchableOpacity onPress={() => setActiveTab("all")}>
        <Text style={getTabTextStyle("all")}>全部 ({countByStatus.all})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("inProgress")}>
        <Text style={getTabTextStyle("inProgress")}>
          進行中 ({countByStatus.inProgress})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("done")}>
        <Text style={getTabTextStyle("done")}>
          已完成 ({countByStatus.done})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
