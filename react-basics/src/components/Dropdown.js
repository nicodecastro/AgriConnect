import React, { useState } from 'react';
import './Dropdown.css';


export default function Dropdown({sortMenus, sortFunction, fetchProductsFunction}) {
  const handleSortFunction = (sortByValue, orderByValue) => {
    sortFunction(sortByValue, orderByValue)
  }

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const showDropdown = () => {
      setDropdownVisible(true);
  };

  const hideDropdown = () => {
      setDropdownVisible(false);
  };

  return (
      <>
      <div
      className="dropdown"
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
      >
      <button className="dropdown-button">{sortMenus.title}</button>
      {isDropdownVisible && (
          <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => handleSortFunction(sortMenus.sortByValue, 'asc')}>{sortMenus.menus[0]}</button>
          <button className="dropdown-item" onClick={() => handleSortFunction(sortMenus.sortByValue,'desc')}>{sortMenus.menus[1]}</button>
          </div>
      )}
      </div>
      </>
  );
};