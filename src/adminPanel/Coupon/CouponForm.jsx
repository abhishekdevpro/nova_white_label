import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCoupon,
  updateCoupon,
  getCoupons,
  getCouponsById,
} from "./couponService";
import { toast } from "react-toastify";

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // duration: "once",
    redeem_by: 1756070400,
    code: "",
    percent_off: "",
    max_redemptions: "",
    applicable_to: "",
    sponsored_by: "",
  });

  // Load coupon data if editing
  useEffect(() => {
    if (id) {
      (async () => {
        const coupon = await getCouponsById(id);
        if (coupon) setFormData(coupon.data);
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

    try {
      const res = await createCoupon(formData);
      if (res.code === 200 || res.status === "status") {
        toast.success(res.message || "Coupon created successfully");
        setFormData({
          redeem_by: "",
          code: "",
          percent_off: "",
          max_redemptions: "",
          applicable_to: "",
          sponsored_by: "",
        });
      } else {
        toast.error(res.message || "Failed to create coupon");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }

    // if (id) {
    //   await updateCoupon(formData);
    // } else {
    //   const res = await createCoupon(formData);
    //   if(res.code===200 || res.status==="status"){
    //      toast.success(res.message || "Coupon created successfully");
    //      setFormData({
    //       redeem_by: "",
    //       code: "",
    //       percent_off: "",
    //       max_redemptions: "",
    //       applicable_to:"",
    //       sponsored_by :""
    //     });
    //   }
    //   else{
    //     toast.error(res.message || "Failed to create coupon");
    //   }
    // }
    // navigate("/coupon"); // go back to list
  };

  const handleCouponChange = (e) => {
    let value = e.target.value;

    // 1. Force uppercase
    value = value.toUpperCase();

    // 2. Remove spaces
    value = value.replace(/\s+/g, "");

    // 3. Limit max length to 8
    // value = value.slice(0, 8);

    setFormData({ ...formData, code: value });
  };

  return (
    <div className="container mt-4">
      <div className="job-bx-title clearfix ">
        <div className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center mb-3">
          <h5 className="font-weight-700 pull-left text-uppercase ">
            Add Coupon
          </h5>
          <button
            className="site-button btn-md-sm"
            onClick={() => navigate("/admin/coupon-list")}
          >
            Coupon List
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 w-100 p-4 shadow-sm"
      >
        <div className="mb-3">
          <label className="form-label">Coupon Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleCouponChange}
            placeholder="Enter Coupon Code"
            className="form-control"
            maxLength={8}
          />
        </div>
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
            min="0"
            max="100"
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
            min="0"
            max="100"
            value={formData.max_redemptions}
            onChange={handleChange}
            placeholder="Enter Max Users"
            className="form-control"
          />
        </div>
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
          <label className="form-label">
            Coupon Applicable To (WhiteLabel Site name)
          </label>
          <input
            name="applicable_to"
            value={formData.applicable_to}
            onChange={handleChange}
            placeholder="Coupon Applicable To (WhiteLabel Site name)"
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="site-button w-100">
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
