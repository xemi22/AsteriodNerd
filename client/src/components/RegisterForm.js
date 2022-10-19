import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "./api/posts";
function RegisterForm() {
  const [response,setResponse]=useState("");
  const [error,setError]=useState("");
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const registerUser=async(details)=>{
    api.post('/register',{
      email:details.email,
      user:details.userName,
      pwd:details.password,
      name:details.firstName,
      lastname:details.lastName,
      
    }).then(function (response) {
        setResponse("User has been created");
    })
    .catch(function (error) {
      console.log(error);
      setError("User Already exists in our database");
    });
  }
  const registerHandler = (e) => {
    e.preventDefault();
    if(details.password===details.confirmPassword){
      registerUser(details);
    }
    else setError("Passwords do not Match");
  };
  return (
    <form onSubmit={registerHandler}>
      <div className="form-inner">
        {error !== "" ? <div className="error">{error}</div> : ""}
        {response !== "" ? <div className="response">{response}</div> : ""}
        <div className="form-group">
          <label htmlFor="firstName">First Name </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            onChange={(e) =>
              setDetails({ ...details, firstName: e.target.value })
            }
            value={details.firstName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="LastName"
            onChange={(e) =>
              setDetails({ ...details, lastName: e.target.value })
            }
            value={details.lastName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username </label>
          <input
            type="text"
            id="userName"
            placeholder="UserName"
            onChange={(e) =>
              setDetails({ ...details, userName: e.target.value })
            }
            value={details.userName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) =>
              setDetails({ ...details, confirmPassword: e.target.value })
            }
            value={details.confirmPassword}
          />
        </div>
        <button type="submit" value="Register" className="styled-btn">
          Register
        </button>
        <button
          type="button"
          className="styled-btn"
        >
           <Link to="/auth" style={{textDecoration:"none",color:"white"}}>Back to Login</Link> 
        </button>
      </div>
    </form>
  );
}
export default RegisterForm;
