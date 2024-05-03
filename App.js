import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, View, ScrollView } from "react-native";
import { styles } from "./App.style";
import { Header } from "./components/Header/Header";
import { PriceTrackingCard } from "./components/PriceTrackingCard/PriceTrackingCard";
import { NavigationTabs } from "./components/NavigationTabs/NavigationTabs";
import { useState } from "react";

const PRICE_TRACKING_LIST = [
  {
    id: 1,
    title: "2454 聯發科",
    ceilingPrice: 1000,
    floorPrice: 800,
    currentPrice: 900,
    notificationMode: "ONCE",
    isComplete: false,
  },
  {
    id: 2,
    title: "2330 台積電",
    ceilingPrice: 600,
    floorPrice: 500,
    currentPrice: 550,
    notificationMode: "ALWAYS",
    isComplete: true,
  },
  {
    id: 3,
    title: "2317 鴻海",
    ceilingPrice: 100,
    floorPrice: 80,
    currentPrice: 90,
    notificationMode: "ONCE",
    isComplete: true,
  },
  {
    id: 4,
    title: "2603 長榮",
    ceilingPrice: 50,
    floorPrice: 40,
    currentPrice: 45,
    notificationMode: "ALWAYS",
    isComplete: false,
  },
  {
    id: 5,
    title: "2337 旺宏",
    ceilingPrice: 20,
    floorPrice: 15,
    currentPrice: 18,
    notificationMode: "ONCE",
    isComplete: true,
  },
  {
    id: 6,
    title: "2451 創見",
    ceilingPrice: 80,
    floorPrice: 60,
    currentPrice: 70,
    notificationMode: "ALWAYS",
    isComplete: false,
  },
  {
    id: 7,
    title: "2379 瑞昱",
    ceilingPrice: 100,
    floorPrice: 80,
    currentPrice: 90,
    notificationMode: "ONCE",
    isComplete: true,
  },
  {
    id: 8,
    title: "3045 台灣大",
    ceilingPrice: 200,
    floorPrice: 150,
    currentPrice: 180,
    notificationMode: "ALWAYS",
    isComplete: false,
  },
  {
    id: 9,
    title: "6415 矽力-KY",
    ceilingPrice: 1000,
    floorPrice: 800,
    currentPrice: 900,
    notificationMode: "ONCE",
    isComplete: false,
  },
  {
    id: 10,
    title: "4968 立積",
    ceilingPrice: 600,
    floorPrice: 500,
    currentPrice: 550,
    notificationMode: "ALWAYS",
    isComplete: false,
  },
  {
    id: 11,
    title: "2458 義隆",
    ceilingPrice: 100,
    floorPrice: 80,
    currentPrice: 90,
    notificationMode: "ONCE",
    isComplete: true,
  },
  {
    id: 12,
    title: "2331 精英",
    ceilingPrice: 50,
    floorPrice: 40,
    currentPrice: 45,
    notificationMode: "ALWAYS",
    isComplete: false,
  },
];

export default function App() {
  const [priceTrackingList, setPriceTrackingList] =
    useState(PRICE_TRACKING_LIST);
  const [activeTab, setActiveTab] = useState("inProgress");

  function getFilteredPriceTrackingList() {
    switch (activeTab) {
      case "all":
        return priceTrackingList;
      case "inProgress":
        return priceTrackingList.filter((i) => !i.isComplete);
      case "done":
        return priceTrackingList.filter((i) => i.isComplete);
      default:
        return priceTrackingList;
    }
  }

  function renderPriceTrackingList() {
    return getFilteredPriceTrackingList().map((priceTrackingItem) => (
      <View key={priceTrackingItem.id} style={styles.cardItem}>
        <PriceTrackingCard
          priceTrackingItem={priceTrackingItem}
          onPress={updatePriceTrackingItem}
          onLongPress={deletePriceTrackingItem}
        />
      </View>
    ));
  }

  function deletePriceTrackingItem(item) {
    Alert.alert(
      "刪除觸價條件",
      `確定要刪除 ${item.title} 嗎？`,
      [
        {
          text: "取消",
          style: "cancel",
        },
        {
          text: "確定",
          style: "destructive",
          onPress: () => {
            const updatedList = priceTrackingList.filter(
              (i) => i.id !== item.id
            );
            setPriceTrackingList(updatedList);
          },
        },
      ],
      { cancelable: true }
    );
  }

  function updatePriceTrackingItem(item) {
    const updatedItem = {
      ...item,
      isComplete: !item.isComplete,
    };

    const updatedList = [...priceTrackingList];
    const index = updatedList.findIndex((i) => i.id === item.id);
    updatedList[index] = updatedItem;
    setPriceTrackingList(updatedList);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <ScrollView>{renderPriceTrackingList()}</ScrollView>
        </View>
        <View style={styles.footer}>
          <NavigationTabs
            priceTrackingList={priceTrackingList}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
