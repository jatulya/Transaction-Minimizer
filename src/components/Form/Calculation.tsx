import { CalcPropType, Transaction } from '../types/interfaces'
import { getItemPrice } from '../Static/Menu'
import { MaxHeap, MinHeap } from './Heap'

const Calculation: React.FC<CalcPropType> = ({ peopleData }) => {
  const transactions: Transaction[] = []

  for (const creditor of peopleData) {
    const creditorID = creditor.id
    const paidLoc = creditor.paidAt

    for (const t2 of peopleData) {
      if (t2.id === creditorID) continue

      for (const item of t2.itemsEaten) {
        if (item.eatenAt === paidLoc) {
          let itemPrice = getItemPrice(paidLoc, item.item)
          const sharedWith = item.sharedWith > 0 ? item.sharedWith : 1; // Avoid division by zero

          transactions.push({
            debtor: t2.id,
            creditor: creditorID,
            amount: itemPrice / sharedWith
          })
        }
      }
    }
  }

  console.log("Transactions :", transactions);

  const netAmount: { [key: number]: number } = {};

  for (const t of transactions) {
    netAmount[t.debtor] = (netAmount[t.debtor] || 0) - t.amount; // Debtor owes money
    netAmount[t.creditor] = (netAmount[t.creditor] || 0) + t.amount; // Creditor is owed money
  }

  // Max-heap for creditors (those who are owed money)
  const creditors = new MaxHeap<{ amount: number; id: number }>();
  // Min-heap for debtors (those who owe money)
  const debtors = new MinHeap<{ amount: number; id: number }>();

  // Fill heaps
  for (const [id, amount] of Object.entries(netAmount)) {
    if (amount > 0) {
      creditors.insert({ amount, id: Number(id) }); // Amount owed, Person ID
    } else if (amount < 0) {
      debtors.insert({ amount: -amount, id: Number(id) }); // Amount owed, Person ID
    }
  }

  const transactionsList: string[] = [];

  // Settle transactions
  while (!creditors.isEmpty() && !debtors.isEmpty()) {
    const creditor = creditors.extractMax();
    const debtor = debtors.extractMin();

    const creditAmount = creditor.amount;
    const debitAmount = debtor.amount;
    const creditorID = creditor.id;
    const debtorID = debtor.id;

    // Determine the transaction amount
    const transactionAmount = Math.min(creditAmount, debitAmount);

    transactionsList.push(`Person ${debtorID} pays ${transactionAmount} to Person ${creditorID}`);

    // Update balances
    if (creditAmount > transactionAmount) {
      creditors.insert({ amount: creditAmount - transactionAmount, id: creditorID });
    }

    if (debitAmount > transactionAmount) {
      debtors.insert({ amount: debitAmount - transactionAmount, id: debtorID });
    }
  }


  return (
    <div>
        <h1>Transaction Minimizer</h1>
        <ul>
            {transactionsList.map((result, index) => (
                <li key={index}>{result}</li>
            ))}
        </ul>
    </div>
  );
}

export default Calculation

/*
  for (const person of peopleData) {
    // Check if the person paid at Farha
    if (person.amountPaid > 0 && person.itemsEaten.length > 0) {
        for (const item of person.itemsEaten) {
          if (item.eatenAt === 'Farha') {
            const itemPrice = Farha[item.item];
            const sharedWith = item.sharedWith > 0 ? item.sharedWith : 1; // Avoid division by zero
            const amountOwed = itemPrice / sharedWith;
  
            // Create a transaction for each person who shared the item
            for (const otherPerson of people) {
              if (otherPerson.id !== person.id && otherPerson.itemsEaten.some(i => i.item === item.item && i.eatenAt === 'Farha')) {
                transactions.push({
                  debtor: otherPerson.id, // The person who owes money
                  creditor: person.id, // The person who paid
                  amount: amountOwed, // Amount owed
                });
              }
            }
          }
        }
      }
    }
 */