import React from 'react'

export const Welcome = ({showLogout }) => {
  return (

    <div align="center" class="container-fluid py-5 my-5">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title">Welcome to MultiVendor Dash</h1>
            <p class="card-text">
              {showLogout ? "Good Morning!!": "Register/Login to experience the app."}
              </p>
             
          </div>
        </div>
      </div>
     
    </div>
  )
}

/*

    <div align="center">
      <h1>Welcome to Admin Home Page</h1>
      <p>My Email : {email}</p>
    </div>
*/