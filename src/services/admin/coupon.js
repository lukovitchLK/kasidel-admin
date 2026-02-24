import request from '../request';

const adminCouponService = {
  getAll: (params) =>
    request.get('dashboard/admin/coupons/paginate', { params }),
  getById: (id) => request.get(`dashboard/admin/coupons/${id}`),
  create: (data) => request.post('dashboard/admin/coupons', data),
  update: (id, data) => request.put(`dashboard/admin/coupons/${id}`, data),
  delete: (params) =>
    request.delete(`dashboard/admin/coupons/delete`, { params }),
};

export default adminCouponService;
