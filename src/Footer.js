import React from 'react';

const Footer = () => {
    const userName = localStorage.getItem("userName");
    return (
        <div className="mt-4">
            Вы авторизованы {userName} сегодня
        </div>
    );
};

export default Footer;