import React from 'react'
import { Card } from "antd";
import Header from "./Header";
import AddVendorForm from './AddVendorForm';
import { useNavigate } from 'react-router';

const VendorMagement = () => {
const navigate=useNavigate()
  return (
    <div>
         <Header title="Vendor Management" onBack={() => navigate('/')} />
      <Card style={{ marginTop: "44px" }}>
        <AddVendorForm/>
      </Card>
    </div>
  )
}

export default VendorMagement