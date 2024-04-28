import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { styles } from "./App.style";
import { Header } from "./components/Header/Header";
import { PriceTrackingCard } from "./components/PriceTrackingCard/PriceTrackingCard";

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
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <View style={styles.header}>
          <Header />
        </View>
        <View style={styles.body}>
          <PriceTrackingCard priceTrackingItem={PRICE_TRACKING_LIST[0]} />
        </View>
        <View style={styles.footer}>
          <Text>Footer</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
