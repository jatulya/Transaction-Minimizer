import { useState } from 'react';

interface Member {
  name: string;
  amount: number;
}

const SplitBillForm = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAmount, setNewMemberAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleAddMember = () => {
    if (newMemberName) {
      setMembers([...members, { name: newMemberName, amount: newMemberAmount }]);
      setNewMemberName('');
      setNewMemberAmount(0);
    }
  };

  const handleCalculateSplit = () => {
    const total = members.reduce((acc, member) => acc + member.amount, 0);
    setTotalAmount(total);
  };

  const handleSplitBill = () => {
    if (totalAmount) {
      const splitAmount = totalAmount / members.length;
      const result = members.map((member) => ({
        name: member.name,
        amount: member.amount,
        split: splitAmount,
      }));
      console.log(result);
    }
  };

  return (
    <div>
      <h1>Split Bill Form</h1>
      <form>
        <label>
          Member Name:
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={newMemberAmount}
            onChange={(e) => setNewMemberAmount(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={handleAddMember}>
          Add Member
        </button>
      </form>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member.name} - ${member.amount}
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleCalculateSplit}>
        Calculate Total
      </button>
      <p>Total Amount: ${totalAmount}</p>
      <button type="button" onClick={handleSplitBill}>
        Split Bill
      </button>
    </div>
  );
};

export default SplitBillForm;