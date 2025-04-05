// Final AddVendorForm.tsx with validation for companyName and email before Save/Exit
import React from "react";
import { Form, Input, Select, Checkbox, Button, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import TabsComponent from "./TabsComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addVendorData, resetVendor } from "../store/slices/vendorSlice";
import { useNavigate } from "react-router";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 14 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 10 },
  },
};

const AddVendorForm: React.FC = () => {
  const vendor = useSelector((state: RootState) => state.vendor);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();

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

  const handleCancel = () => {

    dispatch(resetVendor());
    
    const event = new CustomEvent('cancelAddPerson');

    window.dispatchEvent(event);

    form.resetFields();

  };

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        labelAlign="left"
        form={form}
        onFinish={(values) => onFinish(values)}
        layout="horizontal"
        style={{ margin: "0 auto", padding: "1.5rem" }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Add Vendor
        </h2>

        <Form.Item label="Primary Contact" colon={false}>
          <Form.Item name="salutation" noStyle>
            <Select
              placeholder="Select"
              defaultValue="Mr."
              style={{
                display: "inline-block",
                width: "calc(20% - 2px)",
              }}
            >
              <Option value="Mr.">Mr.</Option>
              <Option value="Ms.">Ms.</Option>
              <Option value="Dr.">Dr.</Option>
            </Select>
          </Form.Item>

          <Form.Item name="firstName" noStyle>
            <Input
              placeholder="First Name"
              style={{
                display: "inline-block",
                width: "calc(40% - 8px)",
                margin: "0 8px",
              }}
            />
          </Form.Item>

          <Form.Item name="lastName" noStyle>
            <Input
              placeholder="Last Name"
              style={{ display: "inline-block", width: "calc(40% - 8px)" }}
            />
          </Form.Item>
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
          <Checkbox.Group style={{ marginRight: "20rem" }}>
            <Checkbox value="Email">Email</Checkbox>
            <Checkbox value="SMS">SMS</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <TabsComponent />

        <Form.Item
          style={{
            textAlign: "right",
            width: "100%",
          }}
          wrapperCol={{ offset: 6, span: 18 }}
        >
          <Button type="primary" onClick={() => onFinish(undefined, true)}>
            Save and Exit
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 10 }}
            onClick={() => onFinish(undefined, false)}
          >
            Save
          </Button>
          <Button
            onClick={handleCancel}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <pre>{JSON.stringify(vendor, null, 2)}</pre>
    </>
  );
};

export default AddVendorForm;
