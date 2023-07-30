import { useEffect, useState } from "react";
import { Card, FormGroup } from "@blueprintjs/core";
import { v4 as uuidv4 } from 'uuid';
import { IInputData } from "../App";
import "./Table.css";

type Row = { cells: Array<{ value: number; width: number }> };

const headers = [
  { title: "Year", width: 60 },
  { title: "Month", width: 80 },
  { title: "Balance", width: 120 },
  { title: "Payment", width: 100 },
  { title: "Interest", width: 100 },
  { title: "Principal", width: 100 },
  { title: "New Balance", width: 120 },
  { title: "One-off Overpayment", width: 200 },
];

const TableData = ({ amount, rate, years, overpayment }: IInputData) => {
  const [data, setData] = useState<Array<Row>>();
  const [overall, setOverall] = useState(0.0);

  useEffect(() => {
    const data = [];

    const months = years * 12;

    let balance = amount;
    let payment = getMonthlyPayment(amount, rate, months);
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

      let year = month % 12;
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

  const renderOverall = () => {
    return (
      <Card interactive={false}>
        <span className="title">Total to payment: </span>
        <span className="value">{overall.toFixed(0)}€</span>
        <span className="title">, Over payment: </span>
        <span className="value">{(overall - amount).toFixed(0)}€</span>
        <span className="title">, First payment: </span>
        <span className="value">{(amount * 0.07).toFixed(0)}€</span>
      </Card>
    );
  };

  return (
    <>
      <FormGroup>
        {renderOverall()}
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
