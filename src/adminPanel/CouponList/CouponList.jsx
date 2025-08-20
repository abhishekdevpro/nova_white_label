import React, { useEffect, useState } from "react";
import { deleteCoupon, getCoupons } from "../Coupon/couponService";

const CouponList = ({ onEdit }) => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    const data = await getCoupons();
    setCoupons(data || []);
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

  return (
    <div className="p-4">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Coupon Code</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Discount Percentage</th>
            <th className="border p-2">Max User</th>
            <th className="border p-2">Coupon By</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? 
          coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="border p-2">{coupon.code}</td>
              <td className="border p-2">{coupon.duration}</td>
              <td className="border p-2">{coupon.percent_off}</td>
              <td className="border p-2">{coupon.max_redemptions}</td>
              <td className="border p-2">{coupon.sponsored_by}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => onEdit(coupon)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(coupon.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
         : (
           <tr>
             <td colSpan="5" className="border p-2 text-center">
               No coupons available
             </td>
           </tr>
         )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponList;
