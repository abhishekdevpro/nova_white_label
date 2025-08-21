import React, { useEffect, useState } from "react";
import { deleteCoupon, getCoupons, updateStatus } from "../Coupon/couponService";
import { getValidDays } from "../utils/DateUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const fetchCoupons = async () => {
    const data = await getCoupons();
    setCoupons(data.data || []);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      await deleteCoupon(id);
      fetchCoupons();
    }
  };

  const OnEdit = async (coupon) => {
    
   const res = await updateStatus(coupon.id, { active: !coupon.active })
   console.log(res)
   if(res.code === 200 || res.status === "success"){
     toast.success(res.message || "Coupon status updated successfully");
     fetchCoupons()
   }
    // navigate(`/admin/add-coupon/${id}`);
  };

  return (
    <div className="p-4">
      <div className="job-bx-title clearfix ">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <h5 className="font-weight-700 pull-left text-uppercase ">
           Coupon List 
        </h5>
        <button
          className="site-button btn-md-sm"
          onClick={() => navigate("/admin/add-coupon")}
        >
          Add Coupon
        </button>
      </div>
      </div>
     <div style={{ overflowX: "auto" }}>
       <table className="table table-bordered table-hover">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">S.no</th>
            <th className="border p-2">Coupon Code</th>
            <th className="border p-2">Duration (valid For)</th>
            <th className="border p-2">Discount Percentage</th>
            <th className="border p-2">Max User</th>
            <th className="border p-2">Coupon By</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon, index) => (
              <tr key={coupon.id}>
                <td className="border p-2">{index + 1}.</td>
                <td className="border p-2">{coupon.code}</td>

                <td className="border p-2">
                  {getValidDays(coupon.created_at, coupon.redeem_by)} days
                </td>
                <td className="border p-2">{coupon.percent_off}</td>
                <td className="border p-2">{coupon.max_redemptions}</td>
                <td className="border p-2">{coupon.sponsored_by}</td>
                <td className="border p-2">
                  {coupon.active ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge  badge-danger">Inactive</span>
                  )}
                </td>
                <td className="border p-2 d-flex gap-2">
                  <button
                    className="site-button btn-sm "
                    onClick={() => OnEdit(coupon)}
                  >
                   { coupon.active ? "Activate" : "Deactivate"}
                  </button>
                  <button
                    className="site-button btn-sm bg-danger"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                No coupons available
              </td>
            </tr>
          )}
        </tbody>
      </table>
     </div>
    </div>
  );
};

export default CouponList;
