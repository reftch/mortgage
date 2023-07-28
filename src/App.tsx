import { useState } from "react";

import InputData from "./components/InputData";
import TableData from "./components/TableData";

export type IInputData = {
  amount: number;
  rate: number;
  years: number;
  overpayment: number;
};

function App() {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState<IInputData>({amount: 0, years: 0, rate: 0, overpayment: 0});
  
  const handleSubmit = (data: IInputData) => {
    setData(data);
    setShowTable(data.years !== 0); 
  };

  return (
    <>
      <div className="card">
        {/* <h2>Mortgage Calculator</h2> */}
        <InputData onSubmit={handleSubmit}></InputData>
        {showTable && <TableData amount={data.amount} years={data.years} rate={data.rate / 100.0 / 12} overpayment={data.overpayment / 100.0}></TableData>}
      </div>
    </>
  );
}

export default App;
