import { useEffect, useState } from "react";
import { Card, FormGroup, NumericInput } from "@blueprintjs/core";

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
    console.debug(valueAsNumber);
    setAmount(valueAsString);
  };

  const handleRateChange = (valueAsNumber: number, valueAsString: string) => {
    console.debug(valueAsNumber);
    setRate(valueAsString);
  };

  const handleYearsChange = (valueAsNumber: number, valueAsString: string) => {
    console.debug(valueAsNumber);
    setYears(valueAsString);
  };

  const handleOverpaymentChange = (valueAsNumber: number, valueAsString: string) => {
    console.debug(valueAsNumber);
    setOverpayment(valueAsString);
  };

  return (
    <>
      <Card>
        <div className="input-data-wrapper">
          <FormGroup
            className="input-card"
            helperText="Enter the principal amount"
            label="Mortgage debt, €"
            labelInfo="(required)"
          >
            <NumericInput
              intent="primary"
              onValueChange={handleAmountChange}
              min={100000}
              majorStepSize={10000}
              stepSize={1000}
              fill={true}
              value={amount}
            />
          </FormGroup>
          <FormGroup
            className="input-card"
            helperText="Enter the principal interest rate"
            label="Rate, %"
            labelInfo="(required)"
          >
            <NumericInput
              allowNumericCharactersOnly={true}
              onValueChange={handleRateChange}
              // leftIcon="percentage"
              minorStepSize={0.1}
              stepSize={0.1}
              fill={true}
              min={1}
              value={rate}
            />
          </FormGroup>

          <FormGroup
            className="input-card"
            helperText="Enter the term in years"
            label="Years"
            labelInfo="(required)"
          >
            <NumericInput
              allowNumericCharactersOnly={false}
              onValueChange={handleYearsChange}
              min={1}
              value={years}
              fill={true}
            />
          </FormGroup>
          <FormGroup
            className="input-card"
            helperText="Enter the year's overpayment rate"
            label="One-off overpayment, %"
          >
            <NumericInput
              onValueChange={handleOverpaymentChange}
              minorStepSize={0.1}
              stepSize={0.1}
              min={0}
              value={overpayment}
              fill={true}
            />
          </FormGroup>
        </div>
      </Card>
    </>
  );
};

export default InputData;
