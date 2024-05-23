import { Alert, View, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";

import { styles } from "./Home.style";
import { PriceTrackingCard } from "../../components/PriceTrackingCard/PriceTrackingCard";
import { Header } from "../../components/Header/Header";
import { AddButton } from "../../components/AddButton/AddButton";
import { getFilteredPriceTrackingList } from "../../utils/priceTracking";
import { NavigationTabs } from "../../components/NavigationTabs/NavigationTabs";

let isInitialLoad = false;

export function Home() {
  const [priceTrackingList, setPriceTrackingList] = useState([]);
  const [activeTab, setActiveTab] = useState("inProgress");
  const [isAddPriceTrackingDialogVisible, setIsAddPriceTrackingDialogVisible] =
    useState(false);
  const [stockId, setStockId] = useState("");
  const [ceilingPrice, setCeilingPrice] = useState("");
  const [floorPrice, setFloorPrice] = useState("");

  useEffect(() => {
    isInitialLoad = true;
    loadInitialPriceTrackingList();
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    } else {
      savePriceTrackingList();
    }
  }, [priceTrackingList]);

  const scrollViewRef = useRef();

  async function savePriceTrackingList() {
    try {
      await AsyncStorage.setItem(
        "priceTrackingList",
        JSON.stringify(priceTrackingList)
      );
    } catch (error) {
      alert(error);
    }
  }

  async function loadInitialPriceTrackingList() {
    try {
      const priceTrackingList = await AsyncStorage.getItem("priceTrackingList");
      const parsedPriceTrackingList = JSON.parse(priceTrackingList);
      isInitialLoad = true;
      setPriceTrackingList(parsedPriceTrackingList || []);
    } catch (error) {
      alert(error);
    }
  }

  function updatePriceTrackingItem(item) {
    const updatedItemInfo = {
      ...item,
      isComplete: !item.isComplete,
    };

    const updatedList = [...priceTrackingList];
    const indexToUpdate = updatedList.findIndex((i) => i.id === item.id);
    updatedList[indexToUpdate] = updatedItemInfo;
    setPriceTrackingList(updatedList);
  }

  function deletePriceTrackingItem(item) {
    Alert.alert("刪除觸價追蹤", "確定要刪除 ${item.title} 嗎？", [
      {
        text: "取消",
        style: "cancel",
      },
      {
        text: "確定",
        style: "destructive",
        onPress: () => {
          const updatedList = priceTrackingList.filter((i) => i.id !== item.id);
          setPriceTrackingList(updatedList);
        },
      },
    ]);
  }

  function renderPriceTrackingList() {
    return getFilteredPriceTrackingList(priceTrackingList, activeTab).map(
      (priceTrackingItem) => (
        <View key={priceTrackingItem.id} style={styles.cardItem}>
          <PriceTrackingCard
            priceTrackingItem={priceTrackingItem}
            onPress={updatePriceTrackingItem}
            onLongPress={deletePriceTrackingItem}
          />
        </View>
      )
    );
  }

  function renderAddPriceTrackingDialog() {
    return (
      <Dialog.Container
        visible={isAddPriceTrackingDialogVisible}
        onBackdropPress={() => setIsAddPriceTrackingDialogVisible(false)}
      >
        <Dialog.Title>新增觸價追蹤</Dialog.Title>
        <Dialog.Input
          label="股票代號"
          placeholder="請輸入股票代號"
          onChangeText={setStockId}
        />
        <Dialog.Input
          label="上限價"
          placeholder="請輸入上限價"
          onChangeText={setCeilingPrice}
        />
        <Dialog.Input
          label="下限價"
          placeholder="請輸入下限價"
          onChangeText={setFloorPrice}
        />
        <Dialog.Button
          label="取消"
          onPress={() => setIsAddPriceTrackingDialogVisible(false)}
        />
        <Dialog.Button
          label="新增"
          onPress={addPriceTrackingItem}
          disabled={!isValidTrackingItem()}
        />
      </Dialog.Container>
    );
  }

  function addPriceTrackingItem() {
    const newPriceTrackingItem = {
      id: uuid.v4(),
      title: `${stockId} {stockName todo}`, // TODO: get stock name from API
      ceilingPrice,
      floorPrice,
      currentPrice: `0`, // TODO: get current price from API
      isComplete: false,
    };

    setPriceTrackingList([...priceTrackingList, newPriceTrackingItem]);
    setStockId("");
    setCeilingPrice("");
    setFloorPrice("");
    setIsAddPriceTrackingDialogVisible(false);
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 300);
  }

  function isValidTrackingItem() {
    return stockId && ceilingPrice && floorPrice;
  }

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <ScrollView ref={scrollViewRef}>{renderPriceTrackingList()}</ScrollView>
      </View>
      <AddButton onPress={() => setIsAddPriceTrackingDialogVisible(true)} />
      {renderAddPriceTrackingDialog()}
      <View style={styles.footer}>
        <NavigationTabs
          priceTrackingList={priceTrackingList}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
    </>
  );
}
