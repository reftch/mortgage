import { useEffect, useState } from "react";
import { Card, FormGroup } from "@blueprintjs/core";
import { IDetailsData, IInputData } from "./Home";
import { v4 as uuidv4 } from 'uuid';
import DetailsData from "./DetailsData";

type Row = { cells: Array<{ value: number; width: number }> };

const headers = [
  { title: "Jahr", width: 60 },
  { title: "Monat", width: 80 },
  { title: "Schulden", width: 120 },
  { title: "Zahlung", width: 100 },
  { title: "Zinsen", width: 100 },
  { title: "Kapitalbetrag", width: 100 },
  { title: "Neue Schulden", width: 120 },
  { title: "Einmalige Überzahlung", width: 200 },
];

const TableData = ({ amount, rate, years, overpayment }: IInputData) => {
  const [data, setData] = useState<Array<Row>>();
  const [overall, setOverall] = useState(0.0);
  const [notaryFees, setNotaryFees] = useState(1.5);
  const [landRegister, setLandRegister] = useState(5.0);
  const [landEntry, setLandEntry] = useState(0.5);
  const [maklerProvision, setMaklerProvision] = useState(0.0);

  useEffect(() => {
    const data = [];

    const months = years * 12;

    let balance = amount;
    const payment = getMonthlyPayment(amount, rate, months);
    let irPaid, amountPaid, newBalance;
    let overall = 0.0;

    for (let month = 1; month <= months; month++) {
      irPaid = balance * rate;
      amountPaid = payment - irPaid;
      newBalance = balance - amountPaid;

      if (balance - payment <= 0) {
        break;
      }

      let addPayment = 0.0;

      const year = month % 12;
      if (year == 0) {
        addPayment = balance * overpayment;
        overall += addPayment;
      }

      const row: Row = {
        cells: [
          { value: Math.floor(month / 12) + 1, width: 60 },
          { value: month, width: 80 },
          { value: Number(balance.toFixed(0)), width: 120 },
          { value: Number(payment.toFixed(2)), width: 100 },
          { value: Number(irPaid.toFixed(2)), width: 100 },
          { value: Number(amountPaid.toFixed(2)), width: 100 },
          { value: Number(newBalance.toFixed(0)), width: 120 },
          { value: Number(addPayment.toFixed(0)), width: 200 },
        ],
      };
      data.push(row);

      // update balance
      balance = newBalance - addPayment;
      // calculate overall payment
      overall += payment;
    }

    setOverall(overall);
    setData(data);
  }, [amount, years, rate, overpayment]);

  const getMonthlyPayment = (amount: number, rate: number, months: number) => {
    return (rate * amount) / (1 - Math.pow(1 + rate, -months));
  };

  const detailsChange = (data: IDetailsData) => {
    // console.log(data.name);
    switch (data.name) {
      case 'landRegister': 
        setLandRegister(Number(data.value));
        break;
      case 'landEntry': 
        setLandEntry(Number(data.value));
        break;
      case 'notaryFees': 
        setNotaryFees(Number(data.value));
        break;
      case 'maklerProvision': 
        setMaklerProvision(Number(data.value));
        break;
      default:
        break;  
    }
    
    // setNotaryFees(data.notaryFees);
  }

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              className="header"
              key={h.title}
              style={{ width: `${h.width}px` }}
            >
              {h.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderRow = (row: Row) => {
    return (
      <tr key={uuidv4()} className={row.cells[7].value > 0 ? "selected" : ""}>
        {row.cells.map((cell) => (
          <td
            key={uuidv4()}
            style={{ width: `${cell.width}px` }}
          >
            {cell.value}
          </td>
        ))}
      </tr>
    );
  };

  const renderBody = () => {
    return (
      <tbody className="body-scroll">
        {data?.map((row) => renderRow(row))}
      </tbody>
    );
  };

  return (
    <>
      <FormGroup>
        <DetailsData 
          overall={overall} 
          amount={amount} 
          notaryFees={notaryFees} 
          landRegister={landRegister}
          landEntry={landEntry}
          maklerProvision={maklerProvision}
          onChange={detailsChange}
        ></DetailsData>
        <Card interactive={false}>
          <table>
            {renderHeader()}
            {renderBody()}
          </table>
        </Card>
      </FormGroup>
    </>
  );
};

export default TableData;