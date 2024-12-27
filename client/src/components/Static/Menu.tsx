import { MenuItem } from '../types/interfaces';
import '../../tailwind.css'

// Initialize the menu items array
// Define the Canteen menu as an object
export const canteen: { [key: string]: number } = {
    Idli: 20,
    Idiyappam: 25,
    Salad: 5,
    Chai: 12,
    Drink: 10,
    Pups: 15,
  };
  
  // Define the Farha menu as an object
  export const farha: { [key: string]: number } = {
    Idli: 20,
    Idiyappam: 25,
    Egg: 7,
    Chai: 12,
    Pizza: 15,
    Pups: 15,
  };

// Function to get item price from the specified menu
export function getItemPrice(menuName: string, itemName: string): number {
    // Normalize inputs to handle case insensitivity
    const normalizedMenuName = menuName.toLowerCase();
    const normalizedItemName = itemName.toLowerCase();

    // Select the appropriate menu based on user input
    let selectedMenu = canteen;
    
    if (normalizedMenuName === 'canteen') {
        selectedMenu = canteen;
    } else if (normalizedMenuName === 'farha') {
        selectedMenu = farha;
    } 
    // Get the price of the item, normalize the key for case insensitivity
    const key = Object.keys(selectedMenu).find(key => key.toLowerCase() === normalizedItemName)
    let price = 0
    if (key)
      price = selectedMenu[key];

    // Return the price or undefined if not found
    return price ;
}

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
                  

              </tbody>
          </table>
      </div>
  );
};

export default MenuTable;