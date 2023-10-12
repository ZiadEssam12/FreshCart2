import React, { useContext, useEffect, useState } from "react";
import { userId } from "../../Context/UserIDContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllOrders() {
  let [orders, setOrders] = useState([]);
  let { userid } = useContext(userId);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllOrders();
  }, []);
  async function getAllOrders() {
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/65204f7fd9b88f4e3d784178/`
      )
      .then((res) => {
        setOrders(res.data[0]);
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
        <div className="py-5 my-5">
          <h1>Orders:</h1>
          <h2 className="h5 d-flex justify-content-between">
            <span className="text-main">
              Total Order Price {orders?.totalOrderPrice} EGP
            </span>
            <span>Payment Method Type {orders?.paymentMethodType}</span>
          </h2>

          <div className="row justify-content-center align-items-center row-gap-2 mt-3">
            {orders?.cartItems?.map((order) => {
              return (
                <div className="col-12 shadow-sm" key={order._id}>
                  <Link
                    className="order text-decoration-none text-dark"
                    to={`/DisplayProduct/${order.product._id}`}
                  >
                    <div className="row justify-content-center align-items-center">
                      <div className="col-2">
                        <img
                          src={order?.product.imageCover}
                          height={250}
                          className="w-100"
                          alt="Woman Shawl"
                        />
                      </div>
                      <div className="col-10">
                        <div>
                          <h3>{order?.product.title}</h3>
                          <h4 className="text-main font-sm">
                            {order?.category?.name}
                          </h4>
                          <h5 className="d-flex justify-content-between py-2">
                            <span>count: {order?.count}</span>
                            <span className="text-main">
                              Price: {order?.price * order?.count} EGP
                            </span>
                          </h5>

                          <h6 className="h5 mt-3">
                            4.8
                            <i className="fa-solid fa-star rating-color"></i>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
