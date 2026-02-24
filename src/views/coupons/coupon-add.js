import React, { useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Button,
  Row,
  Col,
  InputNumber,
} from 'antd';
import LanguageList from '../../components/language-list';
import { useNavigate } from 'react-router-dom';
import couponService from '../../services/coupon';
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeFromMenu } from '../../redux/slices/menu';
import { useTranslation } from 'react-i18next';
import { fetchCoupon } from '../../redux/slices/coupons';

const CouponAdd = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { defaultLang, languages } = useSelector(
    (state) => state.formLang,
    shallowEqual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);
  const { myShop } = useSelector((state) => state.myShop, shallowEqual);

  const onFinish = (values) => {
    setLoadingBtn(true);
    const params = {
      ...values,
      shop_id: myShop?.id,
      expired_at: moment(values.expired_at).format('YYYY-MM-DD'),
      qty: Number(values.qty),
      price: Number(values.price),
    };
    const nextUrl = 'coupons';
    couponService
      .create(params)
      .then((res) => {
        dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
        navigate(`/${nextUrl}`);
        dispatch(fetchCoupon());
      })
      .finally(() => setLoadingBtn(false));
  };

  return (
    <Card title={t('add.coupon')} extra={<LanguageList />}>
      <Form form={form} name='basic' layout='vertical' onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={12}>
            {languages.map((item) => (
              <Form.Item
                key={'title' + item.id}
                label={t('title')}
                name={`title[${item.locale}]`}
                rules={[
                  {
                    required: item.locale === defaultLang,
                    message: t('required'),
                  },
                ]}
                hidden={item.locale !== defaultLang}
              >
                <Input />
              </Form.Item>
            ))}
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('name')}
              name='name'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('type')}
              name='type'
              rules={[{ required: true, message: t('required') }]}
              tooltip='Fix = Fixed amount discount | Percent = Percentage discount'
            >
              <Select>
                <Select.Option value='fix'>Fix (Fixed Amount)</Select.Option>
                <Select.Option value='percent'>Percent (%)</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Apply Coupon To'
              name='for'
              rules={[{ required: true, message: t('required') }]}
              initialValue='total_price'
              tooltip='Order Total = Discount on entire order | Delivery Fee = Discount on delivery only'
            >
              <Select>
                <Select.Option value='total_price'>Order Total (Full Order Discount)</Select.Option>
                <Select.Option value='delivery_fee'>Delivery Fee (Free Delivery)</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name='expired_at'
              label={t('expired.at')}
              rules={[{ required: true, message: t('required') }]}
            >
              <DatePicker
                className='w-100'
                placeholder=''
                disabledDate={(current) => moment().add(-1, 'days') >= current}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('quantity')}
              name='qty'
              rules={[{ required: true, message: t('required') }]}
            >
              <InputNumber min={0} className='w-100' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('price')}
              tooltip='Fix: Enter amount (e.g., 50 for R50 off) | Percent: Enter 0-100 (e.g., 100 for 100% discount = Free)'
              name='price'
              rules={[{ required: true, message: t('required') }]}
            >
              <InputNumber min={0} className='w-100' />
            </Form.Item>
          </Col>
        </Row>
        <Button type='primary' htmlType='submit' loading={loadingBtn}>
          {t('submit')}
        </Button>
      </Form>
    </Card>
  );
};

export default CouponAdd;
