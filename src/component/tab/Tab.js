import React, { useState } from 'react';

export default function Tab({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);
  return (
    <div>
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeTab === tab.label ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <span className="flex items-center justify-center">
              {tab.label}
              {tab.icon && <span className="ml-2">{tab.icon}</span>}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4">
        {tabs.map(
          (tab, index) =>
            activeTab === tab.label && (
              <div className="h-[1000px] overflow-y-scroll" key={index}>
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

