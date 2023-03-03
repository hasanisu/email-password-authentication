import React from 'react';
import {Outlet, Link} from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <nav className='text-center fs-4 mt-3'>
                <Link to='/login' className='mx-4 text-decoration-none border rounded bg-success text-white p-2 hover:bg-danger'>Login</Link>
                <Link to='/register' className='text-decoration-none border rounded bg-warning text-white p-2 hover:bg-danger'>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;