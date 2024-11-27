import React, { useState } from 'react';
import Calculation from './Calculation';

interface PersonData {
  name: string;
  amountPaid: number;
  itemsEaten: string[];
}

const Form: React.FC = () => {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [peopleData, setPeopleData] = useState<PersonData[]>([]);
  const [showCalc, setShowCalc] = useState<boolean>(false)

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setNumberOfPeople(count);

    // Initialize people data array
    setPeopleData(
      Array(count).fill(null).map(() => ({
        name: '',
        amountPaid: 0,
        itemsEaten: []
      }))
    );
  };

  const handlePersonDataChange = (
    index: number,
    field: keyof PersonData,
    value: string 
  ) => {
    const updatedPeopleData = [...peopleData];
    updatedPeopleData[index] = {
      ...updatedPeopleData[index],
      [field]: field === 'amountPaid' ? Number(value) : field === 'itemsEaten' ? value.split(',') : value
    };
    setPeopleData(updatedPeopleData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(peopleData);
    setShowCalc(true)
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
          {peopleData.map((person, index) => (
            <div key={index} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handlePersonDataChange(index, 'name', e.target.value)}
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
                  onChange={(e) => handlePersonDataChange(index, 'amountPaid', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  min="0"
                  step="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Items Eaten (comma-separated):</label>
                <input
                  type="text"
                  value={person.itemsEaten.join(', ')} // Join array for display
                  onChange={(e) => handlePersonDataChange(index, 'itemsEaten', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="e.g., pizza, salad, drink"
                  required
                />
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

      { showCalc && <Calculation people={peopleData} /> }
    </div>
  );
};

export default Form;