import React, { useState } from 'react';

const NightModeToggle = ({ children }) => {
    const [isNightMode, setIsNightMode] = useState(false);

    const toggleNightMode = () => {
        setIsNightMode((prevMode) => !prevMode);
    };

    return (
        <div className={isNightMode ? 'night-mode' : 'day-mode'}>
            <button onClick={toggleNightMode}>
                {isNightMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            </button>
            {children}
        </div>
    );
};

export default NightModeToggle;
