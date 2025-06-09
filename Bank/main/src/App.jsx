/* eslint-disable react/prop-types */
import { useReducer } from "react";

// Constants
const BANK_LOGO_URL =
  "https://th.bing.com/th/id/R.8a40162c07e9dbb4cb44afab83fce41e?rik=qmbzd7WQfnCZZg&pid=ImgRaw&r=0";

// Initial States
const initialUserInfo = {
  isRegistered: false,
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  repassword: "",
};

const initialBankState = {
  balance: 500,
  loan: 0,
};

// Reducers
function userInfoReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "REGISTER":
      return {
        ...state,
        isRegistered: state.password === state.repassword,
      };
    case "LOGOUT":
      return { ...initialUserInfo };
    default:
      return state;
  }
}

function bankReducer(state, action) {
  switch (action.type) {
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      return {
        ...state,
        balance:
          state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    case "REQ_LOAN":
      return {
        ...state,
        loan: state.loan === 0 ? action.payload : state.loan,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
      };
    case "PAY_LOAN":
      return { ...state, loan: 0, balance: state.balance - state.loan };
    case "LOG_OUT":
      return { ...initialBankState };
    default:
      return state;
  }
}

// Action Creators
const updateField = (field, value) => ({
  type: "UPDATE_FIELD",
  field,
  value,
});

// Main Component
export default function App() {
  const [userState, userDispatch] = useReducer(
    userInfoReducer,
    initialUserInfo
  );

  return userState.isRegistered ? (
    <Main userState={userState} userDispatch={userDispatch} />
  ) : (
    <RegisterForm userState={userState} dispatch={userDispatch} />
  );
}

// Subcomponents
function Main({ userState, userDispatch }) {
  const [bankState, bankDispatch] = useReducer(bankReducer, initialBankState);

  function handleLogOut() {
    if (bankState.balance === 0) {
      bankDispatch({ type: "LOG_OUT" });
      userDispatch({ type: "LOGOUT" });
    }
  }

  return (
    <main className="main">
      <BankLogo />
      <p>Welcome to Digi Bank ({userState.username})</p>
      <h2>Your balance: {bankState.balance} $</h2>
      <h2>Loan: {bankState.loan} $</h2>
      <Button
        className="btn"
        onClick={() => bankDispatch({ type: "DEPOSIT", payload: 50 })}
      >
        Deposit (50 $)
      </Button>
      <Button
        className="btn"
        onClick={() => bankDispatch({ type: "WITHDRAW", payload: 150 })}
      >
        Withdraw (150 $)
      </Button>
      <Button
        className="btn"
        onClick={() => bankDispatch({ type: "REQ_LOAN", payload: 5000 })}
      >
        Request a loan of 5000
      </Button>
      <Button
        className="btn"
        onClick={() => bankDispatch({ type: "PAY_LOAN" })}
      >
        Pay loan
      </Button>
      <Button className="btn" onClick={handleLogOut}>
        Log out
      </Button>
    </main>
  );
}

function RegisterForm({ userState, dispatch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER" });
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <BankLogo />
      <p>Welcome to Digi Bank</p>
      <h2>Create Account</h2>

      <FormInput
        value={userState.username}
        onChange={(e) => dispatch(updateField("username", e.target.value))}
      >
        Username
      </FormInput>

      <FormInput
        value={userState.firstname}
        onChange={(e) => dispatch(updateField("firstname", e.target.value))}
      >
        First Name
      </FormInput>

      <FormInput
        value={userState.lastname}
        onChange={(e) => dispatch(updateField("lastname", e.target.value))}
      >
        Last Name
      </FormInput>

      <FormInput
        type="password"
        value={userState.password}
        onChange={(e) => dispatch(updateField("password", e.target.value))}
      >
        Password
      </FormInput>

      <FormInput
        type="password"
        value={userState.repassword}
        onChange={(e) => dispatch(updateField("repassword", e.target.value))}
      >
        Re-enter Password
      </FormInput>

      <Button className="btn">Register</Button>
    </form>
  );
}

// UI Components
function BankLogo() {
  return <img src={BANK_LOGO_URL} alt="Digi Bank logo" className="bank-logo" />;
}

function FormInput({ children, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={children.toLowerCase()}
      required
    />
  );
}

function Button({ children, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
