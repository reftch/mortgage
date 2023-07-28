import { Button, Card, ControlGroup, FormGroup, NumericInput } from "@blueprintjs/core";
import { useState } from "react";
import "./InputData.css";

const InputData = ({ ...props }) => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(4.1);
  const [years, setYears] = useState(20);
  const [overpayment, setOverpayment] = useState(5.0);

  const handleAmountChange = (_valueAsNumber: number) => {
    setAmount(_valueAsNumber);
  };

  const handleRateChange = (_valueAsNumber: number) => {
    setRate(_valueAsNumber);
  };

  const handleYearsChange = (_valueAsNumber: number) => {
    setYears(_valueAsNumber);
  };

  const handleOverpaymentChange = (_valueAsNumber: number) => {
    setOverpayment(_valueAsNumber);
  };

  const calculateSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit({
      amount: amount,
      rate: rate,
      years: years,
      overpayment: overpayment
    });
  }

  const resetSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit({
      amount: 0,
      rate: 0,
      years: 0,
      overpayment: 0
    });
  }

  return (
    <>
    <Card className="input-data-area1" interactive={false}>
      {/* <ControlGroup fill={false} vertical={false}> */}
      <div className="wrapper">
          <FormGroup
            className="input-card"
            helperText="Enter the principal amount"
            label="Mortgage debt"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <NumericInput
              allowNumericCharactersOnly={false}
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
              // leftIcon="percent"
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
            allowNumericCharactersOnly={true}
            onValueChange={handleOverpaymentChange}
            minorStepSize={0.1}
            stepSize={0.1}
            min={0}
            value={overpayment}
          />
        </FormGroup>
      {/* </ControlGroup> */}
      </div>

      <FormGroup
          className="input-card input-data-area"
          labelFor="text-input"
        >
        <Button icon="calculator"  text="Calculate" onClick={calculateSubmit}/>
        <Button icon="reset" text="Reset" onClick={resetSubmit}/>
      </FormGroup>
      </Card>

    </>
  );
};

export default InputData;
