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
  Checkbox,
} from 'antd';
import LanguageList from '../../../components/language-list';
import { useNavigate } from 'react-router-dom';
import adminCouponService from '../../../services/admin/coupon';
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { removeFromMenu } from '../../../redux/slices/menu';
import { useTranslation } from 'react-i18next';
import { fetchAdminCoupons } from '../../../redux/slices/adminCoupons';

const AdminCouponAdd = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { defaultLang, languages } = useSelector(
    (state) => state.formLang,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);

  const onFinish = (values) => {
    setLoadingBtn(true);

    // Extract title fields from bracket notation to object format
    const titleFields = {};
    Object.keys(values).forEach((key) => {
      if (key.startsWith('title[')) {
        const locale = key.match(/\[(.*?)\]/)[1];
        if (!titleFields['title']) {
          titleFields['title'] = {};
        }
        titleFields['title'][locale] = values[key];
      }
    });

    const params = {
      ...values,
      ...titleFields,
      expired_at: moment(values.expired_at).format('YYYY-MM-DD'),
      qty: Number(values.qty),
      price: Number(values.price),
      for: values.for || 'total_price',
      for_first_order: values.for_first_order ? 1 : 0,
      min_amount: Number(values.min_amount || 0),
    };

    // Remove bracket notation keys
    Object.keys(params).forEach((key) => {
      if (key.startsWith('title[')) {
        delete params[key];
      }
    });

    const nextUrl = 'admin-coupons';
    adminCouponService
      .create(params)
      .then((res) => {
        dispatch(removeFromMenu({ ...activeMenu, nextUrl }));
        navigate(`/${nextUrl}`);
        dispatch(fetchAdminCoupons());
      })
      .catch((error) => {
        console.error('Error creating coupon:', error);
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
                label={`${t('title')} (${item.locale.toUpperCase()})`}
                name={`title[${item.locale}]`}
                rules={[
                  {
                    required: item.locale === defaultLang,
                    message: t('required'),
                  },
                ]}
              >
                <Input placeholder={`Enter title in ${item.locale}`} />
              </Form.Item>
            ))}
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('name')}
              name='name'
              rules={[{ required: true, message: t('required') }]}
            >
              <Input placeholder='e.g., FIRST30' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('type')}
              name='type'
              rules={[{ required: true, message: t('required') }]}
            >
              <Select>
                <Select.Option value='fix'>Fixed Amount</Select.Option>
                <Select.Option value='percent'>Percentage</Select.Option>
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
              <InputNumber
                min={0}
                className='w-100'
                placeholder='No limit: 0'
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('price')}
              name='price'
              rules={[{ required: true, message: t('required') }]}
            >
              <InputNumber min={0} className='w-100' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('for')}
              name='for'
              rules={[{ required: true, message: t('required') }]}
            >
              <Select>
                <Select.Option value='total_price'>Total Price</Select.Option>
                <Select.Option value='delivery_fee'>Delivery Fee</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('for')}
              name='for'
              rules={[{ required: true, message: t('required') }]}
            >
              <Select>
                <Select.Option value='total_price'>Total Price</Select.Option>
                <Select.Option value='delivery_fee'>Delivery Fee</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label='Minimum Order Amount'
              name='min_amount'
              rules={[{ required: false }]}
            >
              <InputNumber
                min={0}
                className='w-100'
                placeholder='Min amount for this coupon'
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name='for_first_order'
              valuePropName='checked'
              rules={[{ required: false }]}
            >
              <Checkbox>For First Order Only</Checkbox>
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

export default AdminCouponAdd;
