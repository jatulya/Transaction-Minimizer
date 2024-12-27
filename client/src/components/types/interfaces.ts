export interface MenuItem {
    name: string;
    price: number;
}

export interface ItemData {
    eatenAt: string;
    item: string;
    sharedWith: number;
}

export interface PersonData {
    id: number;
    name: string;
    amountPaid: number;
    numberOfItemsEaten: number; // New field for number of items eaten
    itemsEaten: ItemData[];
    paidAt: string;
}

export interface CalcPropType {
    peopleData : PersonData[]
}

export interface Transaction {
    debtor: number; // ID of the person who owes money
    creditor: number; // ID of the person who is owed money
    amount: number; // Amount of money involved in the transaction
}



