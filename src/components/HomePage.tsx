import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const navigate=useNavigate()
  return (
    <>
   <h1>Welcome to vendor management!!!!</h1>
   <Button type='primary' onClick={()=>navigate('/home')}>Go to add vendor</Button>
   </>
   
  )
}

export default HomePage