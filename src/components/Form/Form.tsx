import React, { useState } from 'react';
import './Form.css';
import { PersonData } from '../types/interfaces';

const Form: React.FC = () => {
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [peopleData, setPeopleData] = useState<PersonData[]>([]);

  const handleNumberOfPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setNumberOfPeople(count);
    
    // Initialize people data array
    setPeopleData(
      Array(count).fill(null).map(() => ({
        name: '',
        amountPaid: 0,
        itemsEaten: ''
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
      [field]: field === 'amountPaid' ? parseFloat(value) : value
    };
    setPeopleData(updatedPeopleData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(peopleData);
    // Additional logic for processing data
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Bill Splitting App</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Number of People:</label>
          <input
            type="number"
            min="1"
            value={numberOfPeople}
            onChange={handleNumberOfPeopleChange}
            className="input-field"
            required
          />
        </div>

        <div className='people-grid'>
          {peopleData.map((person, index) => (
            <div key={index} className="person-row">
              <div className="person-input">
                <label>Name:</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handlePersonDataChange(index, 'name', e.target.value)}
                  className="input-field"
                  placeholder='Enter name'
                  required
                />
              </div>
              <div className="person-input">
                <label>Amount Paid:</label>
                <input
                  type="number"
                  value={person.amountPaid}
                  onChange={(e) => handlePersonDataChange(index, 'amountPaid', e.target.value)}
                  className="input-field"
                  min="0"
                  step="1"
                  required
                />
              </div>
              <div className="person-input">
                <label>Items Eaten (comma-separated):</label>
                <input
                  type="text"
                  value={person.itemsEaten}
                  onChange={(e) => handlePersonDataChange(index, 'itemsEaten', e.target.value)}
                  className="input-field"
                  placeholder="e.g., pizza, salad, drink"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {numberOfPeople > 0 && (
          <button type="submit" className="submit-button">
            Calculate Bill
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;