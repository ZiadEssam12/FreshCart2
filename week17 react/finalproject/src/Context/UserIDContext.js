import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const userId = createContext();

export default function UserIdContextProvider({ children }) {
  let [userid, setUserID] = useState([]);
  let [cart, setCart] = useState([]);
  async function getUserID() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: Cookies.get("userToken"),
        },
      })
      .then((res) => {
        setCart(res.data.data.products);
        setUserID(res.data.data.cartOwner);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getUserID();
  }, []);
  return (
    <userId.Provider value={{ userid, cart, setCart }}>
      {children}
    </userId.Provider>
  );
}
