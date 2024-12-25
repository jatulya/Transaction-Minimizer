import React, { useState } from 'react';
import Calculation from './Calculation';
import { PersonData, ItemData } from '../types/interfaces';
import '../../tailwind.css'

const Form: React.FC = () => {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [peopleData, setPeopleData] = useState<PersonData[]>([]);
  const [showCalc, setShowCalc] = useState<boolean>(false);

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setNumberOfPeople(count);
    setPeopleData(Array.from({ length: count }, (_, index) => ({
      id: index, // Assigning incrementing ID based on index
      name: '',
      amountPaid: 0,
      paidAt: '',
      numberOfItemsEaten: 0,
      itemsEaten: []
    })));
  };

  const handlePersonDataChange = (index: number, field: keyof PersonData, value: any) => {
    const updatedPeopleData = [...peopleData];
    updatedPeopleData[index] = {
      ...updatedPeopleData[index],
      [field]: value
    };
    if (field === 'numberOfItemsEaten') {
      const currentItemsCount = updatedPeopleData[index].itemsEaten.length;
      if (value > currentItemsCount) {
        // Add empty items if increasing
        updatedPeopleData[index].itemsEaten = [
          ...updatedPeopleData[index].itemsEaten,
          ...Array(value - currentItemsCount).fill({ eatenAt: '', item: '', sharedWith: 1 })
        ];
      } else {
        // Trim the items if decreasing
        updatedPeopleData[index].itemsEaten = updatedPeopleData[index].itemsEaten.slice(0, value);
      }
    }
    setPeopleData(updatedPeopleData);
  };

  const handleItemChange = (personIndex: number, itemIndex: number, field: keyof ItemData, value: any) => {
    const updatedPeopleData = [...peopleData];
    const updatedItemsEaten = [...updatedPeopleData[personIndex].itemsEaten];
    updatedItemsEaten[itemIndex] = {
      ...updatedItemsEaten[itemIndex],
      [field]: value
    };
    updatedPeopleData[personIndex].itemsEaten = updatedItemsEaten;
    setPeopleData(updatedPeopleData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(peopleData);
    setShowCalc(true);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Bill Splitting App</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of People:</label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className='space-y-4'>
          {peopleData.map((person, personIndex) => (
            <div key={personIndex} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handlePersonDataChange(personIndex, 'name', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder='Enter name'
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount Paid:</label>
                <input
                  type="number"
                  value={person.amountPaid}
                  onChange={(e) => handlePersonDataChange(personIndex, 'amountPaid', Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  min="0"
                  step="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Paid at:</label>
                <select
                  onChange={(e) => handlePersonDataChange(personIndex, 'paidAt', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Canteen">Canteen</option>
                  <option value="Farha">Farha</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Items Eaten:</label>
                <input
                  type="number"
                  min="0"
                  value={person.numberOfItemsEaten}
                  onChange={(e) => handlePersonDataChange(personIndex, 'numberOfItemsEaten', Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Items Eaten:</label>
                {person.itemsEaten.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Eaten at:</label>
                      <select
                        onChange={(e) => handleItemChange(personIndex, itemIndex, 'eatenAt', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Canteen">Canteen</option>
                        <option value="Farha">Farha</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Item:</label>
                      <select
                        onChange={(e) => handleItemChange(personIndex, itemIndex, 'item', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Salad">Salad</option>
                        <option value="Drink">Drink</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">No. of People Shared:</label>
                      <input
                        type="number"
                        min="0"
                        onChange={(e) => handleItemChange(personIndex, itemIndex, 'sharedWith', Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {numberOfPeople > 0 && (
          <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Calculate Bill
          </button>
        )}
      </form>

      {showCalc && <Calculation peopleData={peopleData} />}
    </div>
  );
};

export default Form;