import React from 'react'
import { Card, Grid } from "antd";
import Header from "./Header";
import AddVendorForm from './AddVendorForm';
import { useNavigate } from 'react-router';

const VendorMagement = () => {
const navigate=useNavigate()
const { useBreakpoint } = Grid;
const screens = useBreakpoint();

  const getCardStyle = () => {
    if (screens.xs || screens.sm) {
      return { marginTop: "20px", padding: "1rem" };
    }
    return { marginTop: "40px", padding: "2rem 3rem" };
  };

  return (
    <div style={{ padding: screens.xs || screens.sm ? '1rem' : '2rem 4rem'}}>
         <Header title="Vendor Management" onBack={() => navigate('/')} />
         <Card style={getCardStyle()}>
        <AddVendorForm />
      </Card>
    </div>
  )
}

export default VendorMagement