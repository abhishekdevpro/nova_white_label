import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCoupon, updateCoupon, getCoupons } from "./couponService";

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // duration: "once",
    redeem_by: 1756070400,
    code: "",
    percent_off: "",
    max_redemptions: "",
    applicable_to:"",
    sponsored_by :""
  });

  // Load coupon data if editing
  useEffect(() => {
    if (id) {
      (async () => {
        const coupons = await getCoupons();
        const coupon = coupons.find((c) => String(c.id) === id);
        if (coupon) setFormData(coupon);
      })();
    }
  }, [id]);

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "percent_off") {
      // allow float
      value = value === "" ? "" : parseFloat(value);
    }
    if (name === "max_redemptions") {
      // allow integer
      value = value === "" ? "" : parseInt(value, 10);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCoupon(formData);
    } else {
      await createCoupon(formData);
    }
    // navigate("/coupon"); // go back to list
  };

  return (
    <div className="container mt-4">
      <h1 className="h4 mb-4">{id ? "Edit Coupon" : "Add Coupon"}</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 w-100 p-4 shadow-sm"
      >
        <div className="mb-3">
          <label className="form-label">Coupon Sponsored By</label>
          <input
            name="sponsored_by"
            value={formData.sponsored_by}
            onChange={handleChange}
            placeholder="Enter Coupon Sponsored By"
            className="form-control"
          />
        </div>
         <div className="mb-3">
          <label className="form-label">Coupon Applicable To (WhiteLabel Site name)</label>
          <input
            name="applicable_to"
            value={formData.applicable_to}
            onChange={handleChange}
            placeholder="Coupon Applicable To (WhiteLabel Site name)"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Coupon Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter Coupon Code"
            className="form-control"
          />
        </div>

        {/* <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter Duration"
            className="form-control"
          />
        </div> */}
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="datetime-local"
            name="redeem_by"
            value={formData.redeem_by}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Discount Percentage</label>
          <input
            name="percent_off"
            type="number"
            step="0.01"
            value={formData.percent_off}
            onChange={handleChange}
            placeholder="Enter Discount %"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Max Users</label>
          <input
            name="max_redemptions"
            type="number"
            step="1"
            value={formData.max_redemptions}
            onChange={handleChange}
            placeholder="Enter Max Users"
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="site-button">
            {id ? "Update Coupon" : "Add Coupon"}
          </button>
          {/* <button
            type="button"
            onClick={() => navigate("/coupon")}
            className="btn btn-secondary"
          >
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default CouponForm;
