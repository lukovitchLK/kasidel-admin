import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminCouponService from '../../services/admin/coupon';

const initialState = {
  loading: false,
  coupons: [],
  error: '',
  params: {
    page: 1,
    perPage: 10,
  },
  meta: {},
};

export const fetchAdminCoupons = createAsyncThunk(
  'adminCoupons/fetchAdminCoupons',
  (params = {}) => {
    return adminCouponService
      .getAll({ ...initialState.params, ...params })
      .then((res) => {
        console.log('Full API Response:', res);

        // The response interceptor already extracts .data, so res is the full paginated response
        // res = { data: [...coupons], meta: {...}, links: {...} }
        const coupons = Array.isArray(res.data) ? res.data : [];
        const meta = res.meta || {
          current_page: 1,
          per_page: 10,
          total: 0,
        };

        console.log('Extracted coupons:', coupons);
        console.log('Extracted meta:', meta);

        return {
          data: coupons,
          meta: meta,
        };
      })
      .catch((error) => {
        console.error('Error fetching admin coupons:', error);
        throw error;
      });
  },
);

const adminCouponsSlice = createSlice({
  name: 'adminCoupons',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAdminCoupons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdminCoupons.fulfilled, (state, action) => {
      const { payload } = action;
      console.log('Redux fulfilled payload:', payload);
      console.log('Redux setting coupons to:', payload?.data);
      state.loading = false;
      state.coupons = payload?.data || [];
      state.meta = payload?.meta || {};
      state.params.page = payload?.meta?.current_page || 1;
      state.params.perPage = payload?.meta?.per_page || 10;
      state.error = '';
      console.log('Redux state after update - coupons:', state.coupons);
    });
    builder.addCase(fetchAdminCoupons.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.error = action.error.message;
    });
  },
});

export default adminCouponsSlice.reducer;
