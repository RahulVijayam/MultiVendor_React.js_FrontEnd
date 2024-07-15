import { React, useState } from 'react'
import { API_URL } from '../../../data/apiPath';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const HandleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            //console.log(data)
            if (response.ok) { 

                /*Getting FirmId if exists for storing it in local storage*/
                const vendorId = data.vendorId
                //console.log("Checing for VID",vendorId)


                const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
                const vendorData = await vendorResponse.json();
                if (vendorResponse.ok) {
                    const vendorFirmId = vendorData.vendorFirmById;
                    console.log(vendorFirmId)
                    localStorage.setItem('firmId', vendorFirmId)
                    localStorage.setItem('loginToken', data.token)
                    window.alert(data.success)
                    window.location.reload();
                    
                   
                }
                else {
                    //setEmail("");
                    setPassword("");
                    window.alert(data.success)
                    localStorage.setItem('loginToken', data.token)
                    window.location.reload();
                }



            }
            else {
                setError(data.error)
            }




        } catch (error) {
            console.log("Login Failed", error);
            window.alert(error);
        }


    }
    return (
        <div className='loginSection'>
            <form align="center" className="authForm" onSubmit={HandleLogin}>
                <h3>Login </h3>
                <div className="form-group">

                    <input type="email" required className="form-control" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="form-group">

                    <input type="password" required className="form-control" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-outline-primary">Login</button>
            </form>
        </div>
    )
}
