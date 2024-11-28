// Sidebar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Sidebar = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.products);

  const filterByPrice = (priceRange) => {
    const filtered = list.filter((product) => product.price <= priceRange);
    console.log('Filtered products:', filtered);
  };

  return (
    <div>
      <h3>Filters</h3>
      <button onClick={() => filterByPrice(100)}>Below $100</button>
      <button onClick={() => filterByPrice(500)}>Below $500</button>
    </div>
  );
};

export default Sidebar;
