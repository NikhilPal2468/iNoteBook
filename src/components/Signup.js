import React, {useState} from 'react'
import { useHistory } from 'react-router';

const Signup = () => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials
        if(password === cpassword){
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
          //save the auth token and redirect
          localStorage.setItem('token', json.token);
          history.push("/");
        }
        else {
          alert("Invalid credentials");
        }
      }
      else{
        alert("Password and confirm passwords don't match");
      }
      };
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"> Name</label>
                    <input type="text" className="form-control" required id="name" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"> Email address</label>
                    <input type="email" className="form-control" required id="email" name="email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"> Password </label>
                    <input type="password" className="form-control" id="password" required minLength={5} value={credentials.password} name="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password </label>
                    <input type="password" className="form-control" id="cpassword" required minLength={5} value={credentials.cpassword} name="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Signup
