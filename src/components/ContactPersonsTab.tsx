// Updated ContactPersonsTab.tsx to reset editingKey on vendor cancel
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Checkbox, message } from 'antd';
import { DeleteOutlined, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  addContactPersonsData,
  deleteContactPersonsData,
  editContactPersonsData
} from '../store/slices/vendorSlice';
import { ContactPerson } from '../interfaces/ContactPerson';
import { v4 as uuidv4 } from 'uuid';
import { Rule } from 'antd/es/form';

const { Option } = Select;

interface EditableCellProps {
  editing: boolean;
  dataIndex: keyof ContactPerson;
  title: string;
  inputType: 'text' | 'select' | 'checkboxGroup';
  record: ContactPerson;
  index: number;
  children: React.ReactNode;
  rules?: Rule[];
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  rules,
  ...restProps
}) => {
  let inputNode: React.ReactNode = <Input size="middle" />;

  if (inputType === 'select') {
    inputNode = (
      <Select size="middle">
        <Option value="Mr.">Mr.</Option>
        <Option value="Ms.">Ms.</Option>
        <Option value="Dr.">Dr.</Option>
      </Select>
    );
  } else if (inputType === 'checkboxGroup') {
    inputNode = (
      <Checkbox.Group>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </Checkbox.Group>
    );
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={
            rules && rules.length > 0
              ? rules
              : [{ required: true, message: `Please input ${title}!` }]
          }
        >
        
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ContactPersonsTab: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const data = useSelector((state: RootState) => state.vendor.contactPersons);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: ContactPerson) => record.key === editingKey;

  const edit = (record: ContactPerson) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    if (data.find(d => d.key === editingKey && d.firstName === '' && d.lastName === '')) {
      const index = data.findIndex(item => item.key === editingKey);
      if (index !== -1) {
        dispatch(deleteContactPersonsData(index));
      }
    }
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const updatedPerson: ContactPerson = { ...row, key };
      dispatch(editContactPersonsData(updatedPerson));
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'SALUTATION',
      dataIndex: 'salutation',
      editable: true,
      inputType: 'select'
    },
    {
      title: 'FIRST NAME',
      dataIndex: 'firstName',
      editable: true,
      inputType: 'text'
    },
    {
      title: 'LAST NAME',
      dataIndex: 'lastName',
      editable: true,
      inputType: 'text'
    },
    {
      title: 'EMAIL ADDRESS',
      dataIndex: 'emailAddress',
      editable: true,
      inputType: 'text',
      rules: [
        { 
          type: 'email', 
          message: 'Please enter a valid EMAIL ADDRESS' 
        }
      ]
   
    },
    {
      title: 'WORK PHONE',
      dataIndex: 'workPhone',
      editable: true,
      inputType: 'text',
      rules: [
        { pattern: /^[0-9]+$/, message: 'Only numbers are allowed' },
      ]
    },
    {
      title: 'MOBILE',
      dataIndex: 'mobile',
      editable: true,
      inputType: 'text',
      rules: [
        { pattern: /^[0-9]+$/, message: 'Only numbers are allowed' },
      ]
    },
    {
      title: 'COMMUNICATION CHANNELS',
      dataIndex: 'communicationChannel',
      editable: true,
      inputType: 'checkboxGroup'
    },
    {
      title: 'Action',
      align: 'center',
      render: (_: any, record: ContactPerson) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button type="primary" onClick={() => save(record.key)} style={{ marginRight: 2 }}>Save</Button>
            <Popconfirm title="Cancel changes?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <span style={{ display: 'flex', gap: 8 }}>
            <Button
              icon={<EditFilled />}
              onClick={() => edit(record)}
              disabled={editingKey !== ''}
              style={{
                border: '1px solid #1890ff',
                color: '#1890ff',
                background: '#e6f7ff',
                padding: '0 12px',
                borderRadius: 4,
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => {
                const index = data.findIndex(item => item.key === record.key);
                if (index !== -1) dispatch(deleteContactPersonsData(index));
              }}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                style={{
                  border: '1px solid #ff4d4f',
                  background: '#fff1f0',
                  padding: '0 12px',
                  borderRadius: 4,
                }}
              >
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: ContactPerson) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        rules: col.rules || [],
      }),
    };
  });

  const handleAdd = () => {
    if (editingKey !== '') {
      return message.warning('Please save or cancel the current edit before adding a new row.');
    }

    const key = uuidv4();
    const newContact: ContactPerson = {
      key,
      salutation: 'Mr.',
      firstName: '',
      lastName: '',
      emailAddress: '',
      workPhone: '',
      mobile: '',
      communicationChannel: []
    };
    dispatch(addContactPersonsData([...data, newContact]));
    form.setFieldsValue(newContact);
    setEditingKey(key);
  };

  useEffect(() => {
    const handler = () => setEditingKey('');
    window.addEventListener('cancelAddPerson', handler);
    return () => window.removeEventListener('cancelAddPerson', handler);
  }, []);

  return (
    <Form form={form} component={false}>
      <div style={{ overflowX: 'auto' }}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={mergedColumns as any}
          rowClassName="editable-row"
          pagination={false}
          size="middle"
        />
      </div>
      <div style={{ textAlign: 'left', marginTop: 16 }}>
        <Button icon={<PlusOutlined />} onClick={handleAdd} disabled={editingKey !== ''}>
          Add Person
        </Button>
      </div>
    </Form>
  );
};

export default ContactPersonsTab;
