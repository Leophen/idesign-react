import { render } from '@testing-library/react';
import Table from '../index';

const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Salary',
    key: 'salary'
  },
  {
    title: 'Address',
    key: 'address'
  },
  {
    title: 'Email',
    key: 'email'
  }
];

const data = [
  {
    key: '1',
    id: 103761657,
    name: 'Jane Doe',
    age: 21,
    salary: 23000,
    address: '11 Park Road, Guangzhou',
    email: 'jane.doe@idesign.com'
  },
  {
    key: '2',
    id: 761651037,
    name: 'Alisa Ross',
    age: 22,
    salary: 25000,
    address: '22 Park Road, Guangzhou',
    email: 'alisa.ross@idesign.com'
  },
  {
    key: '3',
    id: 373567616,
    name: 'Kevin Sandra',
    age: 23,
    salary: 22000,
    address: '33 Park Road, Guangzhou',
    email: 'kevin.sandra@idesign.com'
  },
  {
    key: '4',
    id: 735646761,
    name: 'Ed Hellen',
    age: 24,
    salary: 17000,
    address: '44 Park Road, Guangzhou',
    email: 'ed.hellen@idesign.com'
  },
  {
    key: '5',
    id: 647616735,
    name: 'William Smith',
    age: 25,
    salary: 27000,
    address: '55 Park Road, Guangzhou',
    email: 'william.smith@idesign.com'
  },
  {
    key: '6',
    id: 616736475,
    name: 'Tim Cook',
    age: 26,
    salary: 36000,
    address: '66 Park Road, Guangzhou',
    email: 'tim.cook@idesign.com'
  },
  {
    key: '7',
    id: 475761636,
    name: 'Bill Gates',
    age: 27,
    salary: 12000,
    address: '77 Park Road, Guangzhou',
    email: 'bill.gates@idesign.com'
  },
  {
    key: '8',
    id: 364616775,
    name: 'Steve Jobs',
    age: 28,
    salary: 66000,
    address: '88 Park Road, Guangzhou',
    email: 'steve.jobs@idesign.com'
  }
];

describe('Table 组件测试', () => {
  it('create', () => {
    const { asFragment } = render(<Table columns={columns} data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

