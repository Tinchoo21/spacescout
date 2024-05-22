import React, { useState } from 'react';
import { TbMenu2, TbMenuDeep } from 'react-icons/tb';

const NavbarAdmin = ({ toggleSidebar }) => {

    const [isMenu2Active, setIsMenu2Active] = useState(true);


    const toggleIcon = () => {
        setIsMenu2Active(!isMenu2Active);
    };

    return (
        <nav>
            <div className="sidebar-button" onClick={() => { toggleSidebar(); toggleIcon(); }} >
                {isMenu2Active ? <TbMenu2 /> : <TbMenuDeep />}
            </div>
        </nav>
    );
};

export default NavbarAdmin;