import React from 'react';

const Footer = () => {
    const userName = localStorage.getItem("userName");
    return (
        <div>
            Вы авторизованы {userName}
        </div>
    );
};

export default Footer;