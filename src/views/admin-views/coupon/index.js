import React, { useEffect, useState } from 'react';
import { Table, Card, Space, Button, Popconfirm, Switch, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchAdminCoupons } from '../../../redux/slices/adminCoupons';
import adminCouponService from '../../../services/admin/coupon';
import { useTranslation } from 'react-i18next';
import { addMenu, removeFromMenu } from '../../../redux/slices/menu';

const AdminCoupons = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { coupons, loading, params, meta } = useSelector(
    (state) => state.adminCoupons,
    shallowEqual,
  );
  const { activeMenu } = useSelector((state) => state.menu, shallowEqual);

  useEffect(() => {
    dispatch(fetchAdminCoupons(params));
  }, [params, dispatch]);

  const onDeleteCoupon = (id) => {
    adminCouponService.delete({ ids: [id] }).then(() => {
      dispatch(fetchAdminCoupons());
    });
  };

  const handleEditCoupon = (record) => {
    dispatch(
      addMenu({
        url: `admin-coupon/${record.id}`,
        name: t('edit.coupon'),
        icon: 'shopping',
        parentUrl: 'admin-coupons',
      }),
    );
    navigate(`/admin-coupon/${record.id}`);
  };

  const columns = [
    {
      title: 'Coupon Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: ['translation', 'title'],
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'fix' ? 'blue' : 'green'}>
          {type === 'fix' ? 'Fixed' : 'Percent'}
        </Tag>
      ),
    },
    {
      title: 'Discount',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) =>
        `${price}${record.type === 'percent' ? '%' : ''}`,
    },
    {
      title: 'Min Amount',
      dataIndex: 'min_amount',
      key: 'min_amount',
      render: (amount) => (amount ? `${amount}` : '-'),
    },
    {
      title: 'First Order',
      dataIndex: 'for_first_order',
      key: 'for_first_order',
      render: (value) => (
        <Tag color={value ? 'green' : 'default'}>{value ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Expires',
      dataIndex: 'expired_at',
      key: 'expired_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditCoupon(record)}
            size='small'
          />
          <Popconfirm
            title={t('delete.coupon')}
            description={t('are_you_sure')}
            onConfirm={() => onDeleteCoupon(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button icon={<DeleteOutlined />} danger size='small' />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title='Sitewide Coupons'
      extra={
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            dispatch(
              addMenu({
                url: 'admin-coupon/add',
                name: t('add.coupon'),
                icon: 'shopping',
                parentUrl: 'admin-coupons',
              }),
            );
            navigate('/admin-coupon/add');
          }}
        >
          {t('add.coupon')}
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={coupons}
        loading={loading}
        rowKey='id'
        pagination={{
          current: meta.current_page,
          pageSize: meta.per_page,
          total: meta.total,
          onChange: (page, pageSize) => {
            dispatch(fetchAdminCoupons({ page, perPage: pageSize }));
          },
        }}
      />
    </Card>
  );
};

export default AdminCoupons;
