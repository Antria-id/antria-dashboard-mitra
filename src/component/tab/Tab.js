import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Tab({ tabs }) {
  const initialTab = tabs.length > 0 ? tabs[0].label : "";
  const [activeTab, setActiveTab] = useState(initialTab);

  if (tabs.length === 0) {
    return <div>No tabs available</div>;
  }

  return (
    <div>
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex-1 text-center py-2 cursor-pointer ${
              activeTab === tab.label
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
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
              <div
                data-testid="tab-content"
                className="h-[1000px] overflow-y-scroll"
                key={index}
              >
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}

// Add default props
Tab.defaultProps = {
  tabs: [],
};

// Define prop types for better type checking
Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      icon: PropTypes.node,
    })
  ),
};
