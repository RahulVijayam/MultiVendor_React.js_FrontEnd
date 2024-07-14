import {React,useState} from 'react';
import { API_URL } from '../../../data/apiPath';
export const Register = ({showLoginHandler}) => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState("");

    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try {
            //fetch is inbuild method in javascript for calling API's
            const response  = await fetch(`${API_URL}/vendor/register`,{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({username,email,password})
            }) 
            const data=await response.json()
            //console.log(data)
            if(response.ok)
            {
                setUsername("");
                setEmail("");
                setPassword("");
                window.alert(data.success);
                showLoginHandler();
            }
            else{
                setError(data.error)
            }
            
            
            
        } catch (error) {
            console.log("Registration Failed",error);
            window.alert(error);
        }
    }
    return (
        <div className='registerSection'>
            <form  align="center" className="authForm" onSubmit={HandleSubmit}>
                <h3>Vendor Register </h3>

                <div className="form-group"> 
                    <input type="text" required className="form-control" name="username"  value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Name" />

                </div>
                <div className="form-group"> 
                    <input type="email" required className="form-control" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter email" />
                </div>
                <div className="form-group"> 
                    <input type="password" required className="form-control" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-outline-primary">Register</button>
            </form>
        </div>
    )
 }
