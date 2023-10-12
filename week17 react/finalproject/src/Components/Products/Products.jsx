import React, { useEffect, useRef, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import DisplayProducts from "../DisplayProducts/DisplayProducts";

export default function Products() {
  let inputRef = useRef();
  let [Products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let Products = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/Products"
    );
    setProducts(Products.data.data);
    setLoading(false);
  }

  function search() {
    let filteredProducts = Products.filter((Product) =>
      Product.title.toLowerCase().includes(inputRef.current.value.toLowerCase())
    );

    document.querySelector(".row").innerHTML = `
      ${filteredProducts
        .map((Product) => {
          return `
          <div class="col" key=${Product._id}>
            <div class="card h-100">
              <img
                src=${Product.imageCover}
                class="card-img-top w-100"
                alt=${Product.title}
              />
              <div class="card-body">
                <h5 class="text-main fw-bolder text-center display-one-line">
                  ${Product.title}
                </h5>
              </div>
            </div>
          </div>
        `;
        })
        .join("")}
    `;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="mt-5">
        <DisplayProducts />
      </div>
    </>
  );
}
