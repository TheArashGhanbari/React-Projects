/* eslint-disable react/prop-types */
import { useState } from "react";
import "./bmiCalculator.css";

export default function BmiCalculator({ title }) {
  return (
    <div className="calculator">
      <div className="title">
        <h2>{title}</h2>
        <BMICalculatorForm />
      </div>
    </div>
  );
}

function BMICalculatorForm() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [name, setName] = useState("");

  const bmi =
    !height || !weight
      ? 0
      : (weight / ((height / 100) * (height / 100))).toFixed(2);

  function handleHeightChange(value) {
    if (Number(value) || value == "") {
      setHeight(Number(value) === 0 ? "" : Number(value));
    }
  }

  function handleWeightChange(value) {
    if (Number(value) || value == "") {
      setWeight(Number(value) === 0 ? "" : Number(value));
    }
  }

  function handleSignUp() {
    const namePrompt = prompt("Enter your name");
    if (namePrompt.length <= 20) {
      setName(namePrompt);
    }
  }

  function handleReload() {
    setHeight("");
    setWeight("");
  }

  return (
    <form className="bmi-calculator-form" onSubmit={(e) => e.preventDefault()}>
      <Input
        label={"Height (cm)"}
        placeHolder={"Enter Height"}
        value={height}
        onChange={handleHeightChange}
      />
      <Input
        label={"Weight (kg)"}
        placeHolder={"Enter Weight"}
        value={weight}
        onChange={handleWeightChange}
      />
      <Button
        bgColor={"blue"}
        color={"white"}
        marginTop={50}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
      <Button bgColor={"gray"} color={"white"} onClick={handleReload}>
        Reload
      </Button>
      <BmiOutput bmi={bmi} name={name} />
    </form>
  );
}

function Input({ label, placeHolder, value, onChange }) {
  return (
    <div className="input-label-con">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Button({ children, bgColor, color, marginTop = 20, onClick }) {
  return (
    <button
      onClick={onClick}
      className="button"
      style={{ backgroundColor: bgColor, color: color, marginTop: marginTop }}
    >
      {children}
    </button>
  );
}

function BmiOutput({ bmi, name }) {
  if (!bmi) return;

  let category;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";

  return (
    <>
      <p style={{ textAlign: "left", marginTop: 25 }}>
        {name ? `${name} your bmi is: ${bmi}` : `your bmi is: ${bmi}`}
      </p>
      <p style={{ textAlign: "center", marginTop: 15 }}>{category}</p>
    </>
  );
}
