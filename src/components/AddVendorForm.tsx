import React from "react";
import { Form, Input, Select, Checkbox, Button, message, Grid } from "antd";
import { PhoneOutlined, PrinterOutlined } from "@ant-design/icons";
import TabsComponent from "./TabsComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addVendorData, resetVendor } from "../store/slices/vendorSlice";
import { useNavigate } from "react-router";

const { Option } = Select;
const { useBreakpoint } = Grid;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const AddVendorForm: React.FC = () => {
  const vendor = useSelector((state: RootState) => state.vendor);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const onFinish = async (values?: any, shouldNavigate = false) => {
    try {
      const formValues = values || (await form.validateFields());

      if (!formValues.companyName || !formValues.email) {
        messageApi.open({
          type: "error",
          content: "Company Name and Email are required.",
        });
        return;
      }

      if (vendor.contactPersons.length === 0) {
        messageApi.open({
          type: "error",
          content: "Please add at least one contact person.",
        });
        return;
      }

      dispatch(
        addVendorData({
          primaryContact: {
            salutation: formValues.salutation,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
          },
          companyName: formValues.companyName,
          email: formValues.email,
          gstNumber: formValues.gstNo,
          cinNumber: formValues.cinNo,
          workPhone: formValues.workPhone,
          mobile: formValues.mobile,
          communicationChannel: formValues.communicationChannels || [],
        })
      );

      messageApi.open({
        type: "success",
        content: "Vendor data saved successfully.",
      });

      if (shouldNavigate) navigate("/");
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Please fill all required fields correctly.",
      });
    }
  };

  const onFinishFailed = () => {
    messageApi.error("Please fill all required fields correctly.");
  };

  const handlePrint = () => {
    window.print();
  }

  const handleCancel = () => {
    dispatch(resetVendor());
    const event = new CustomEvent("cancelAddPerson");
    window.dispatchEvent(event);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '2rem', marginBottom: '1.5rem' }}>
        <Button icon={<PrinterOutlined />} color="cyan" variant="solid" onClick={handlePrint}>Print</Button>
      </div>
      <Form
        {...formItemLayout}
        labelAlign="left"
        form={form}
        onFinish={(values) => onFinish(values)}
        onFinishFailed={onFinishFailed}
        layout="horizontal"
        style={{
          maxWidth: 1000,

          padding: screens.xs ? "1rem" : "1rem",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            textAlign: screens.xs ? "center" : "left",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Add Vendor
        </h2>

        <Form.Item label="Primary Contact" colon={false}>
          <div
            style={{
              display: "flex",
              flexDirection: screens.xs ? "column" : "row",
              gap: 8,
            }}
          >
            <Form.Item name="salutation" noStyle>
              <Select
                placeholder="Select"
                defaultValue="Mr."
                style={{ width: screens.xs ? "100%" : "20%" }}
              >
                <Option value="Mr.">Mr.</Option>
                <Option value="Ms.">Ms.</Option>
                <Option value="Dr.">Dr.</Option>
              </Select>
            </Form.Item>

            <Form.Item name="firstName" noStyle>
              <Input
                placeholder="First Name"
                style={{ width: screens.xs ? "100%" : "40%" }}
              />
            </Form.Item>

            <Form.Item name="lastName" noStyle>
              <Input
                placeholder="Last Name"
                style={{ width: screens.xs ? "100%" : "40%" }}
              />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="companyName"
          label={
            <>
              Company Name
              <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
            </>
          }
          rules={[{ required: true, message: "Company Name is required" }]}
          required={false}
          colon={false}
        >
          <Input placeholder="Company Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <>
              Email Address
              <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>
            </>
          }
          rules={[
            {
              required: true,
              type: "email",
              message: "Valid email is required",
            },
          ]}
          required={false}
          colon={false}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item name="gstNo" label="GST No" colon={false}>
          <Input placeholder="GST No" />
        </Form.Item>

        <Form.Item name="cinNo" label="CIN No" colon={false}>
          <Input placeholder="CIN No" />
        </Form.Item>

        <Form.Item
          name="workPhone"
          label="Work Phone"
          rules={[{ pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
          colon={false}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Work Phone" />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[{ pattern: /^[0-9]+$/, message: "Only numbers are allowed" }]}
          colon={false}
        >
          <Input placeholder="Mobile" />
        </Form.Item>

        <Form.Item
          name="communicationChannels"
          label="Communication Channels"
          colon={false}
        >
          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: screens.xs ? "column" : "row",
              gap: "1rem",
            }}
          >
            <Checkbox value="Email">Email</Checkbox>
            <Checkbox value="SMS">SMS</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <TabsComponent />

        <Form.Item
          style={{
            textAlign: screens.xs ? "center" : "right",
            width: "100%",
            marginTop: "2rem",
          }}
          wrapperCol={{
            offset: screens.xs ? 0 : 6,
            span: screens.xs ? 24 : 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: screens.xs ? "column" : "row",
              gap: "1rem",
              justifyContent: screens.xs ? "center" : "flex-end",
            }}
          >
            <Button type="primary" onClick={() => onFinish(undefined, true)}>
              Save and Exit
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
      <div style={{textAlign:"left"}}>
        <h1>Redux state</h1>
        <pre>{JSON.stringify(vendor, null, 2)}</pre>
      </div>
    </>
  );
};

export default AddVendorForm;
