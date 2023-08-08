"use client";

import { useState } from "react";
import InputData from "./components/InputData";
import TableData from "./components/TableData";

export type IInputData = {
  amount: number;
  rate: number;
  years: number;
  overpayment: number;
};

export type IDetailsData = {
  name: string;
  value: string;
}

export default function Page() {
  const [data, setData] = useState<IInputData>({amount: 50000, years: 20, rate: 4.1, overpayment: 5.0});
  
  return (
    <div className="card">
      <InputData onSubmit={(data: IInputData) => setData(data)}></InputData>
      <TableData amount={data.amount} years={data.years} rate={data.rate / 100.0 / 12} overpayment={data.overpayment / 100.0}></TableData>
    </div>
  );
}
