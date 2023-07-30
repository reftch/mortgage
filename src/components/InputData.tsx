import { useEffect, useState } from "react";
import { Button, Card, FormGroup, NumericInput } from "@blueprintjs/core";
import "./InputData.css";

const InputData = ({ ...props }) => {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("4.1");
  const [years, setYears] = useState("20");
  const [overpayment, setOverpayment] = useState("5.0");

  useEffect(() => {
    props.onSubmit({
      amount: Number(amount),
      rate: Number(rate),
      years: Number(years),
      overpayment: Number(overpayment),
    });
  }, [amount, rate, years, overpayment]);

  const handleAmountChange = (valueAsNumber: number, valueAsString: string) => {
    setAmount(valueAsString);
  };

  const handleRateChange = (valueAsNumber: number, valueAsString: string) => {
    setRate(valueAsString);
  };

  const handleYearsChange = (valueAsNumber: number, valueAsString: string) => {
    setYears(valueAsString);
  };

  const handleOverpaymentChange = (
    valueAsNumber: number,
    valueAsString: string
  ) => {
    setOverpayment(valueAsString);
  };

  const calculateSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit({
      amount: Number(amount),
      rate: Number(rate),
      years: Number(years),
      overpayment: Number(overpayment),
    });
  };

  // const resetSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   props.onSubmit({
  //     amount: 0,
  //     rate: 0,
  //     years: 0,
  //     overpayment: 0
  //   });
  // }

  const printSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.print();
  };

  return (
    <>
      <Card className="input-data-area1" interactive={false}>
        <div className="wrapper">
          <FormGroup
            className="input-card"
            helperText="Enter the principal amount"
            label="Mortgage debt"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <NumericInput
              intent="primary"
              onValueChange={handleAmountChange}
              leftIcon="euro"
              min={100000}
              majorStepSize={10000}
              stepSize={1000}
              value={amount}
            />
          </FormGroup>
          <FormGroup
            className="input-card"
            helperText="Enter the principal interest rate"
            label="Rate, %"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <NumericInput
              allowNumericCharactersOnly={true}
              onValueChange={handleRateChange}
              // leftIcon="percentage"
              minorStepSize={0.1}
              stepSize={0.1}
              min={1}
              value={rate}
            />
          </FormGroup>

          <FormGroup
            className="input-card"
            helperText="Enter the term in years"
            label="Years"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <NumericInput
              allowNumericCharactersOnly={false}
              onValueChange={handleYearsChange}
              min={1}
              value={years}
            />
          </FormGroup>
          <FormGroup
            className="input-card"
            helperText="Enter the year's overpayment rate"
            label="One-off overpayment, %"
            labelFor="text-input"
          >
            <NumericInput
              // allowNumericCharactersOnly={true}
              onValueChange={handleOverpaymentChange}
              minorStepSize={0.1}
              stepSize={0.1}
              min={0}
              value={overpayment}
            />
          </FormGroup>
        </div>

        {/* <FormGroup className="input-card input-data-area" labelFor="text-input">
          <Button
            icon="calculator"
            text="Recalculate"
            onClick={calculateSubmit}
          />
          <Button icon="print" text="Print" onClick={printSubmit} />
        </FormGroup> */}
      </Card>
    </>
  );
};

export default InputData;
