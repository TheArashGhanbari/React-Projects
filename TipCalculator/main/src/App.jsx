/* eslint-disable react/prop-types */
import { useState } from "react";

function App() {
  return <TipCalculator />;
}

const rateOptions = [
  { title: "Bad (0%)", value: 0 },
  { title: "Okay (5%)", value: 5 },
  { title: "Good (10%)", value: 10 },
  { title: "Amazing (20%)", value: 20 },
];

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [tipPercentage2, setTipPercentage2] = useState(0);

  function handleReset() {
    setBill(0);
    setTipPercentage(0);
    setTipPercentage2(0);
  }

  return (
    <div>
      <TipMessage>
        <p>How much was the bill?</p>
        <TipInput
          placeholder="Bill value"
          inputState={bill}
          inputSetState={setBill}
        />
      </TipMessage>
      <TipMessage>
        <p>How did you like the services?</p>
        <TipSelectBox
          data={rateOptions}
          tipPercentage={tipPercentage}
          setTipPercentage={setTipPercentage}
        ></TipSelectBox>
      </TipMessage>
      <TipMessage>
        <p>How did your friend like the services?</p>
        <TipSelectBox
          data={rateOptions}
          tipPercentage={tipPercentage2}
          setTipPercentage={setTipPercentage2}
        ></TipSelectBox>
      </TipMessage>
      <TipOutput
        tipPercentage={tipPercentage}
        tipPercentage2={tipPercentage2}
        bill={bill}
      ></TipOutput>
      <Button text={"Reset"} onClick={handleReset}></Button>
    </div>
  );
}

function TipMessage({ children }) {
  return <div>{children}</div>;
}

function TipSelectBox({ data, tipPercentage, setTipPercentage }) {
  return (
    <select
      value={tipPercentage}
      onChange={(e) => setTipPercentage(+e.target.value)}
    >
      {data.map((el, i) => (
        <option key={i} value={el.value}>
          {el.title}
        </option>
      ))}
    </select>
  );
}

function TipInput({ placeholder, inputState, inputSetState }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputState}
      onChange={(e) => inputSetState(+e.target.value)}
    />
  );
}

function TipOutput({ bill, tipPercentage, tipPercentage2 }) {
  const tip = (bill * ((tipPercentage + tipPercentage2) / 2)) / 100;

  return (
    <h2>
      You pay {bill + tip} (${bill} + ${tip})
    </h2>
  );
}

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

export default App;
