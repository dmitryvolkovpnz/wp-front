import React from 'react';

const Header = () => {
    const handleLogout = async () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.reload();
    }
    return (
        <div>
            <button onClick={handleLogout}> Выйти </button>
        </div>
    );
};

export default Header;