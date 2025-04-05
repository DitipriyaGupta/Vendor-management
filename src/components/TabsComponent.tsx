import React from 'react';
import { Tabs } from 'antd';
import BillingAddressForm from './BillingAddressForm';
import ContactPersonsTab from './ContactPersonsTab';
// import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Contact Persons',
    children: <ContactPersonsTab/>,
  },
  {
    key: '2',
    label: 'Address',
    children: 'Address',
  },
  {
    key: '3',
    label: 'Other Details',
    children: 'Other Details',
  },
    {
      key: '4',
      label: 'Bank Details',
      children: 'Bank Details',
    },
  
];

const TabsComponent: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{width:"100%"}} />;

export default TabsComponent;