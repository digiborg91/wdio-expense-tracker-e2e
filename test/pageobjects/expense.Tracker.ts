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

    public async clickAddTransactionButton() : Promise<ExpenseTracker> {
        await this.addTransactionButton.click();
        return this; 
    }

    public async getBalance(): Promise<string> {
            return this.balanceAmount.getText();
    }
    public async verifyBalance(expectedBalance: string): Promise<void> {
        await expect(this.balanceAmount).toContain(expectedBalance);
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
}