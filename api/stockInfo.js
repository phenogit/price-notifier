import axios from "axios";

const FUGLE_API_URL =
  "https://price-provider-fdfhe0dudscuejhm.eastasia-01.azurewebsites.net/";

export class StockInfoAPI {
  static async getStockInfo(stockId) {
    return (await axios.get(`${FUGLE_API_URL}?stockId=${stockId}`)).data;
  }
}
