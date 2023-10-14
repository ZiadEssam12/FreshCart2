import React, { useContext, useEffect, useState } from "react";
import { userId } from "../../Context/UserIDContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function AllOrders() {
  let [orders, setOrders] = useState([]);
  let { userid, getUserID } = useContext(userId);
  let [loading, setLoading] = useState(false);
  // let userToken = Cookies.get("userToken");
  useEffect(() => {
    setLoading(true);
    getUserID();
    getAllOrders();
  }, []);

  async function getAllOrders() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}/`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-main" role="status">
            <span className="visually-hidden">
              <i className="fas fa-spinner fa-spin position-absolute"></i>
            </span>
          </div>
        </div>
      ) : (
        <div className="my-5">
          <h1>Orders:</h1>

          <div className="row justify-content-center align-items-center row-gap-2 mt-3">
            {orders.map((order) => (
              <div className="my-3 bg-main-light shadow-sm p-4" key={order.id}>
                <h2 className="h5 d-flex justify-content-between font-16">
                  <span className="text-main">
                    Total Order Price {order?.totalOrderPrice} EGP
                  </span>
                  <span>Payment Method Type {order?.paymentMethodType}</span>
                </h2>
                {order.cartItems.map((item) => (
                  <div
                    className="col-12 my-2 boder py-4 border-bottom border-1"
                    key={item.product._id}
                  >
                    <Link
                      className="order text-decoration-none text-dark"
                      to={`/DisplayProduct/${item.product._id}`}
                    >
                      <div className="row justify-content-center align-items-center">
                        <div className="col-6 col-md-2">
                          <img
                            src={item?.product.imageCover}
                            height={250}
                            className="w-100"
                            alt="Woman Shawl"
                          />
                        </div>
                        <div className="col-6 col-md-10">
                          <div>
                            <h3>{item?.product.title}</h3>
                            <h4 className="text-main font-sm">
                              {item?.category?.name}
                            </h4>
                            <h5 className="d-flex flex-column flex-md-row justify-content-between py-2">
                              <span>count: {item?.count}</span>
                              <span className="text-main mt-3 mt-md-0">
                                Price: {item?.price * item?.count} EGP
                              </span>
                            </h5>

                            <h6 className="h5 mt-3">
                              {item?.product?.ratingsAverage}
                              <i className="fa-solid fa-star rating-color"></i>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
