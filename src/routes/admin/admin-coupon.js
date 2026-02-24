// ** React Imports
import { lazy } from 'react';

const AdminCouponRoutes = [
  {
    path: 'admin-coupons',
    component: lazy(() => import('views/admin-views/coupon')),
  },
  {
    path: 'admin-coupon/add',
    component: lazy(() => import('views/admin-views/coupon/coupon-add')),
  },
  {
    path: 'admin-coupon/:id',
    component: lazy(() => import('views/admin-views/coupon/coupon-edit')),
  },
];

export default AdminCouponRoutes;
