export class ExpenseTracker {

    get enterTextField() { return $('#transaction-text'); }
    get enterAmountField() { return $('#transaction-amount'); }
    get addTransactionButton() { return $('#add-transaction-btn'); }
    //get deleteButton() { return $('.delete-btn'); }
    get balanceAmount() { return $('#balance-amount'); }
    get incomeAmount() { return $('#income-amount'); }
    get expenseAmount() { return $('#expense-amount'); }
    get transactionList() { return $('#transaction-list'); }


    public async addText(textValue:string) : Promise<ExpenseTracker> {
        await this.enterTextField.setValue(textValue);
        return this; 
    }

    public async enterAmount(amountValue:string) : Promise<ExpenseTracker> {
        await this.enterAmountField.setValue(amountValue);
        return this; 
    }

    public async addNewExpense(text: string, amount: string): Promise<ExpenseTracker> {
        await this.enterTextField.setValue(text);
        await this.enterAmountField.setValue(amount);
        return this; 
    }

    public async clickAddTransactionButton() : Promise<ExpenseTracker> {
        await this.addTransactionButton.click();
        return this; 
    }

    public async getBalance(): Promise<string> {
        return this.balanceAmount.getText();
    }
    
    public async getTransactionCount(): Promise<number> {
        return (await this.transactionList.$$('li')).length;
    }

    public async deleteTransactionByText(transactionText: string): Promise<ExpenseTracker> {
        const transactions = await this.transactionList.$$('li');
        for (const transaction of transactions) {
          const text = await transaction.getText();
          if (text.includes(transactionText)) {
            const deleteButton = await transaction.$('.delete-btn');
            await deleteButton.click();
            break;
          }
        }
        return this;
    }

    public async addIncomeExpenseAndCheck(transactions: { text: string, amount: number }[]): Promise<ExpenseTracker> {
        // Get initial balance
        const initialBalanceText = await this.balanceAmount.getText();
        let currentBalance = parseFloat(initialBalanceText.replace("£", "").trim());
    
        // Get initial expense amount
        const initialExpenseText = await this.expenseAmount.getText();
        let currentExpense = parseFloat(initialExpenseText.replace("£", "").trim());
    
        for (const { text, amount } of transactions) {
            await this.enterTextField.setValue(text);
            await this.enterAmountField.setValue(amount.toString());
            await this.addTransactionButton.click();
    
            // Update expected values based on income/expense
            if (amount > 0) {
                currentBalance += amount; // Adding income increases balance
            } else {
                currentExpense += Math.abs(amount); // Expense increases total expense
                currentBalance += amount; // Subtracting expense reduces balance
            }
    
            const updatedBalanceText = await this.balanceAmount.getText();
            const updatedBalance = parseFloat(updatedBalanceText.replace("£", "").trim());
    
            const updatedExpenseText = await this.expenseAmount.getText();
            const updatedExpense = parseFloat(updatedExpenseText.replace("£", "").trim());
    
            await expect(updatedBalance).toEqual(currentBalance);
            await expect(updatedExpense).toEqual(currentExpense);

            await browser.takeScreenshot();
        }
        return this;
    }
}