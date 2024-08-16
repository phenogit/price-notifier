import { Alert, View, ScrollView, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";

import { styles } from "./Home.style";
import { Header } from "../../components/Header/Header";
import { AddButton } from "../../components/AddButton/AddButton";
import { NavigationTabs } from "../../components/NavigationTabs/NavigationTabs";
import { StockInfoAPI } from "../../api/stockInfo";
import { PriceTrackingList } from "../../components/PriceTrackingList/PriceTrackingList";
import { AddPriceTrackingDialog } from "../../components/AddPriceTrackingDialog/AddPriceTrackingDialog";

let isInitialLoad = false;

export function Home() {
  const [priceTrackingList, setPriceTrackingList] = useState([]);
  const [activeTab, setActiveTab] = useState("inProgress");
  const [isAddPriceTrackingDialogVisible, setIsAddPriceTrackingDialogVisible] =
    useState(false);
  const [stockId, setStockId] = useState("");
  const [stockName, setStockName] = useState("");
  const [currentHighPrice, setCurrentHighPrice] = useState("");
  const [currentLowPrice, setCurrentLowPrice] = useState("");
  const [currentAvgPrice, setCurrentAvgPrice] = useState("");
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

  useEffect(() => {
    // disallow useless API calls
    if (stockId === "" || stockId.length < 4) {
      return;
    }
    getStockInfo(stockId);
  }, [stockId]);

  async function getStockInfo(stockId) {
    try {
      console.log(stockId);
      const stockInfo = await StockInfoAPI.getStockInfo(stockId);
      setStockName(stockInfo.name);
      setCurrentHighPrice(stockInfo.highPrice);
      setCurrentLowPrice(stockInfo.lowPrice);
      setCurrentAvgPrice(stockInfo.avgPrice);
      console.log(stockInfo);
    } catch (error) {
      alert(error);
    }
  }

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
    Alert.alert("刪除觸價追蹤", `確定要刪除 ${item.title} 嗎？`, [
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

  function addPriceTrackingItem() {
    const newPriceTrackingItem = {
      id: uuid.v4(),
      title: `${stockId} ${stockName}`,
      ceilingPrice,
      floorPrice,
      currentPrice: `${currentAvgPrice}`,
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

  return (
    <>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.body}>
        <ScrollView ref={scrollViewRef}>
          <PriceTrackingList
            priceTrackingList={priceTrackingList}
            activeTab={activeTab}
            updatePriceTrackingItem={updatePriceTrackingItem}
            deletePriceTrackingItem={deletePriceTrackingItem}
          />
        </ScrollView>
      </View>
      <AddButton onPress={() => setIsAddPriceTrackingDialogVisible(true)} />
      <AddPriceTrackingDialog
        isAddPriceTrackingDialogVisible={isAddPriceTrackingDialogVisible}
        setIsAddPriceTrackingDialogVisible={setIsAddPriceTrackingDialogVisible}
        setStockId={setStockId}
        stockId={stockId}
        stockName={stockName}
        currentLowPrice={currentLowPrice}
        currentHighPrice={currentHighPrice}
        setCeilingPrice={setCeilingPrice}
        ceilingPrice={ceilingPrice}
        setFloorPrice={setFloorPrice}
        floorPrice={floorPrice}
        addPriceTrackingItem={addPriceTrackingItem}
      />
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
