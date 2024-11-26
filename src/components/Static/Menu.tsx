import React from 'react';
import { MenuItem } from '../types/interfaces';
import '../../tailwind.css'

// Initialize the menu items array
const menuItems: MenuItem[] = [
    { name: "Idli", price: 20 },
    { name: "Idiyappam", price: 25 },
    { name: "Egg", price: 7 },
    { name: "Chai", price: 12 },
    { name: "Coffee", price: 15 },
    { name: "Pups", price: 15 }
];

const MenuTable = () => {
  return (
      <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-500 text-white">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems.map((item) => (
                      <tr key={item.name}>
                          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default MenuTable;