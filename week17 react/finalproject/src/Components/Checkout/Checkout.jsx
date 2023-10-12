import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../../Context/UserContaxt";

export default function Checkout() {
  const location = useLocation();
  let [loading, setLoading] = useState(false);
  let { totalCartPrice, cartOwner } = location.state;
  let validationSchema = yup.object({
    details: yup.string().required("Details is required"),
    phone: yup
      .string()
      .matches(/^01[015][0-9]{8}$/, "Enter a valid Phone")
      .required("Phone is required"),
    city: yup.string().required("City is required"),
  });
  const { userToken } = useContext(userContext);
  async function handleSubmit(values) {
    setLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartOwner}?url=http://localhost:3000`,
        values,
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => {
        window.location.href = res.data.session.url;
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="w-75 mx-auto my-5 py-5">
        <h1>Checkout:</h1>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            name="details"
            id="details"
            className="form-control mb-2"
            placeholder="Enter Your Details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details ? (
            <div className="text-danger mb-4">{formik.errors.details}</div>
          ) : null}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control mb-2"
            placeholder="Enter Your Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-danger mb-4">{formik.errors.phone}</div>
          ) : null}

          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control mb-2"
            placeholder="Enter Your City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-danger mb-4">{formik.errors.city}</div>
          ) : null}

          <div className="d-flex justify-content-between">
            <h2 className="h6 text-main">Total Price: {totalCartPrice}</h2>

            {loading ? (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="button"
                className="btn bg-main text-white mt-2"
              >
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Send Code
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
