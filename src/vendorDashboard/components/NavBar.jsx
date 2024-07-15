import React from 'react'

export const NavBar = ({ showLoginHandler, showRegisterHandler, showLogout,logOutHandler}) => {
    return (
        <nav className="navbar navb ar-expand  navbar-dark">
            <a className="navbar-brand" href="#">Vendor Dashboard</a>
            <div className="collapse navbar-collapse" id="navbarsExample02">

                <ul className="navbar-nav navbar-right ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/"> <span className="sr-only">(current)</span></a>
                    </li>
                    {
                        !showLogout ? <>
                            <li className="nav-item">
                                <button className="btn btn-outline-light btn-sm" onClick={showLoginHandler}>Login</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-info btn-sm" onClick={showRegisterHandler}>Register</button>
                            </li>
                        </> :
                            <><li className="nav-item">
                                <button className="btn btn-outline-info btn-sm" onClick={logOutHandler}>Logout</button>
                            </li>
                            </>
                    }

                </ul>

            </div>
        </nav>
    )
}