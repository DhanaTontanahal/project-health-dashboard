import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  max-width: 500px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
  background-color: ${(props) => (props.disabled ? '#f9f9f9' : '#fff')};

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  box-sizing: border-box;
  background-color: #fff;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const BudgetStatus = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [spentToDate, setSpentToDate] = useState(0);
  const [budgetRemaining, setBudgetRemaining] = useState(0);
  const [costVariance, setCostVariance] = useState('');
  const [budgetAlert, setBudgetAlert] = useState('none');

  useEffect(() => {
    setBudgetRemaining(totalBudget - spentToDate);
  }, [totalBudget, spentToDate]);

  return (
    <Container>
      <Title>Budget Status</Title>

      {/* Total Budget */}
      <FormField>
        <Label>Total Budget:</Label>
        <Input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
          placeholder="Enter total budget"
        />
      </FormField>

      {/* Spent to Date */}
      <FormField>
        <Label>Spent to Date:</Label>
        <Input
          type="number"
          value={spentToDate}
          onChange={(e) => setSpentToDate(parseFloat(e.target.value) || 0)}
          placeholder="Enter amount spent"
        />
      </FormField>

      {/* Budget Remaining */}
      <FormField>
        <Label>Budget Remaining (Auto-calculated):</Label>
        <Input type="number" value={budgetRemaining} disabled />
      </FormField>

      {/* Cost Variance */}
      <FormField>
        <Label>Cost Variance:</Label>
        <Input
          type="number"
          value={costVariance}
          onChange={(e) => setCostVariance(e.target.value)}
          placeholder="Enter cost variance"
        />
      </FormField>

      {/* Budget Alerts */}
      <FormField>
        <Label>Budget Alerts:</Label>
        <Dropdown value={budgetAlert} onChange={(e) => setBudgetAlert(e.target.value)}>
          <option value="none">None</option>
          <option value="email">Email Alert</option>
          <option value="sms">SMS Alert</option>
        </Dropdown>
      </FormField>

      {/* Submit Button */}
      <Button>Save</Button>
    </Container>
  );
};

export default BudgetStatus;
