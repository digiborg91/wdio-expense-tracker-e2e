import allureReporter from '@wdio/allure-reporter'
import { ExpenseTracker } from '../pageobjects/expense.Tracker.ts'

const expenseTracker = new ExpenseTracker()

describe('The Expense Tracker UAT Tests', () => {
    
    beforeAll(async () => {
        await browser.url('https://track-expenses-v1.netlify.app/')
    })

    it ('Add New Income & Confirm Balance Updates', async () => {
        allureReporter.addStory('Add a New Income & Ensure Balance Updates')

        allureReporter.addStep('Add Employment & Price of £800')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Employment", amount: 800 }]);

        allureReporter.addStep('Add Investment & Price of 150')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Investment", amount: 150 }]);

        allureReporter.addStep('Add Petrol & Price of 100')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Petrol", amount: 100 }]);
    })

    it ('Add New Expense & Confirm Balance Decreases', async () => {
        allureReporter.addStory('Add Expenses & Ensure the Balance Reflects This for the User')
        
        allureReporter.addStep('Add Mortgage Expense of £500')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Mortgage", amount: -500 }]);

        allureReporter.addStep('Add Children Expense of 250')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Children", amount: -250 }]);

        allureReporter.addStep('Add Petrol Expense of 125')
        await expenseTracker.addIncomeExpenseAndCheck([{ text: "Petrol", amount: -125 }]);
    })

    it ('Verify Income can be Deleted', async () => {
        allureReporter.addStory('Remove the Investment Income Item & Ensure the Item is Removed From List & Price Decreases')

        allureReporter.addStep('Delete Investment')
        await expenseTracker.deleteTransactionByText('Investment')
    })

    it ('Verify Expense can be Deleted', async () => {
        allureReporter.addStory('Remove the Children Expense Item & Ensure the Item is Removed From List & Price Decreases')

        allureReporter.addStep('Delete Children')
        await expenseTracker.deleteTransactionByText('Children')
    })
})