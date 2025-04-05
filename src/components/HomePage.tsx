import { Button } from 'antd'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const navigate=useNavigate()
  return (
    <div style={{  display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      textAlign: "center", }}>
   <h1>Welcome to vendor management </h1>
   <Button type='primary' onClick={()=>navigate('/home')}>Go to add vendor</Button>
   </div>
   
  )
}

export default HomePage