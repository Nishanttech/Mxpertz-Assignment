import React, { useState } from 'react';
import './Css/Tabs.css';

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tabs-container">
            <div className="tabs">
                {children.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children[activeTab]}
            </div>
        </div>
    );
};

export default Tabs;
