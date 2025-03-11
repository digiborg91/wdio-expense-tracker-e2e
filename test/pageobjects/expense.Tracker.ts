import allureReporter from '@wdio/allure-reporter'
export class ExpenseTracker {

    get enterTextField() { return $('#transaction-text'); }
    get enterAmountField() { return $('#transaction-amount'); }
    get addTransactionButton() { return $('#add-transaction-btn'); }
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
        return (this.transactionList.$$('li')).length;
    }

    public async deleteTransactionByText(transactionText: string): Promise<ExpenseTracker> {
        // Locate the transaction item based on text
        const transactionItem = await $(`//li[contains(text(), '${transactionText}')]`);
    
        // Wait for the transaction to appear before deleting
        await transactionItem.waitForDisplayed({ timeout: 5000 });
    
        // Get the transaction amount (positive = income, negative = expense)
        const transactionAmountText = await transactionItem.$('span').getText();
        const transactionAmount = parseFloat(transactionAmountText.replace(/[^\d.-]/g, '')); // Extract numeric value
    
        // Identify if it's an income or expense
        const isExpense = transactionAmount < 0;
    
        // Store previous values for validation
        const balanceBefore = parseFloat(await this.balanceAmount.getText());
        const incomeBefore = parseFloat(await this.incomeAmount.getText());
        const expenseBefore = parseFloat(await this.expenseAmount.getText());
    
        // Click the delete button
        const deleteButton = await transactionItem.$('.delete-btn');
        await deleteButton.click();
    
        // Wait for transaction to be removed
        await transactionItem.waitForExist({ reverse: true, timeout: 5000 });
    
        // Verify balance and income/expense updates
        const balanceAfter = parseFloat(await this.balanceAmount.getText());
        const incomeAfter = parseFloat(await this.incomeAmount.getText());
        const expenseAfter = parseFloat(await this.expenseAmount.getText());
    
        if (isExpense) {
            expect(expenseAfter).toEqual(expenseBefore - Math.abs(transactionAmount));
            expect(balanceAfter).toEqual(balanceBefore + Math.abs(transactionAmount));
        } else {
            expect(incomeAfter).toEqual(incomeBefore - transactionAmount);
            expect(balanceAfter).toEqual(balanceBefore - transactionAmount);
        }

        await browser.takeScreenshot();
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