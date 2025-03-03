import allureReporter from '@wdio/allure-reporter'
import { ExpenseTracker } from '../pageobjects/expense.Tracker.ts'

const expenseTracker = new ExpenseTracker()

describe('CRUD Functions of TODO', () => {
    
    beforeAll(async () => {
        await browser.url('https://track-expenses-v1.netlify.app/')
    })


    it ('New To Do Added', async () => {
        allureReporter.addStory('New TODO can be added to the list')
        allureReporter.addStep('Add Pencil & 15')
        await expenseTracker.addText('Pencil')
        await expenseTracker.enterAmount('15')
        allureReporter.addStep('Click Add Transaction Button')
        await expenseTracker.clickAddTransactionButton()
        await browser.takeScreenshot()
        //ensure new price updates and item is added
    })

    xit ('Verify item can be updated', async () => {
        //update todo item
        //ensure new price updates and item is updated
    })

    it ('Verify item can be deleted', async () => {
        allureReporter.addStory('New TODO can be deleted from the list')
        allureReporter.addStep('Delete Pencil')
        await expenseTracker.deleteTransactionByText('Pencil')
        //delete todo item
        //ensure new price updates and item is removed from list
    })

})