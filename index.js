
const addIncomeInput = document.getElementById('balance')
const addIncomeButton = document.querySelector('.addIncome')
const addExpenseTypeInput = document.getElementById('type')
const addExpenseAmountInput = document.getElementById('amount')
const addExpenseButton = document.querySelector('.addExpense')
const clearExpenses = document.querySelector('.clearAll')
const listExpenses = document.querySelector('.listAllExpenses')
const totalAmount = document.querySelector('.budget')
const expenses = document.querySelector('.expenses')
const budget = document.querySelector('.balance')
let items = [];
let income = [];
let expense = [];

function addIncome() {
    let incomeItem = addIncomeInput.value
    totalAmount.innerHTML = incomeItem
    budget.innerHTML = incomeItem
    income.push(incomeItem)
    localStorage.setItem('Income', JSON.stringify(income))
}

function trackBalance() {
    const balance = JSON.parse(localStorage.getItem('Income'))
    let result = 0;
    balance.forEach((item) => {
       result = item; 
    })
    return result;
}

function trackExpense() {
    let result = 0;
    const expenses = JSON.parse(localStorage.getItem('ExpensesList'))
    expenses.forEach((expense) => {
      result += Number(expense.amount)
    })
    return result;
}

function clearAllExpenses() {
    localStorage.clear()
}

function addExpense() {
    const expenseList = document.querySelector('.expensesList')
    let title = addExpenseTypeInput.value
    let amount = addExpenseAmountInput.value
    const expenseItems = 
        {
            title: title,
            amount: amount,
            modify: true,
            deleteItem: false
        }
    items.push(expenseItems)
    localStorage.setItem('ExpensesList', JSON.stringify(items))
    expenses.innerHTML = trackExpense()
    budget.innerHTML = trackBalance() - trackExpense()
    showExpenses()
}

function listAllExpenses() {
    const data = JSON.parse(localStorage.getItem('ExpensesList'));
    const expenseList = document.querySelector('.expensesList')
    let outPut = ''
    data.forEach((data,index) => {
        outPut = 
        `<div class="grid grid-cols-3 bg-gray-800 rounded-md p-5">
        <span class="text-white font-bold">${data.title}</span>
        <span class="text-white font-bold">${data.amount}</span>
        <div class="flex gap-5">
            <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer" onclick="modifyExpense(${index})"></i>
            <i class="fa-solid fa-trash text-red-700 cursor-pointer" onclick="deleteExpense(${index})"></i>
        </div>
    </div>`
    expenseList.innerHTML += outPut
    });
}

function deleteExpense(index) {
    const data = JSON.parse(localStorage.getItem('ExpensesList'));
    const expenseList = document.querySelector('.expensesList')
    data.splice(index,1)
    localStorage.setItem('ExpensesList',JSON.stringify(data))
    expenseList.innerHTML = ' ';
    expenses.innerHTML = trackExpense()
    budget.innerHTML = trackBalance() - trackExpense()
    listAllExpenses();
}

function modifyExpense(index) {
    const data = JSON.parse(localStorage.getItem('ExpensesList'));
    let filter = data.at(index)
    addExpenseTypeInput.value = filter.title
    addExpenseAmountInput.value = filter.amount
    deleteExpense(index)
}

function showExpenses() {
    const data = JSON.parse(localStorage.getItem('ExpensesList'));
    const expenseList = document.querySelector('.expensesList')
    let outPut = ''
    data.forEach((data,index) => {
         outPut = 
        `<div class="grid grid-cols-3 bg-gray-800 rounded-md p-5">
        <span class="text-white font-bold">${data.title}</span>
        <span class="text-white font-bold">${data.amount}</span>
        <div class="flex gap-5">
            <i class="fa-solid fa-pen-to-square text-blue-500 cursor-pointer" onclick="modifyExpense(${index})"></i>
            <i class="fa-solid fa-trash text-red-700 cursor-pointer" onclick="deleteExpense(${index})"></i>
        </div>
    </div>`
    });
    expenseList.innerHTML += outPut
}

addIncomeButton.addEventListener('click', () =>{
    addIncome()
    addIncomeInput.value = ' ';
})

addExpenseButton.addEventListener('click', () => {
    if( !localStorage.getItem('Income') ) {
        alert('Add some income first!')
        addExpenseTypeInput.value = ' ';
        addExpenseAmountInput.value = ' ';
    } else if(addExpenseTypeInput.value === ' ' || addExpenseAmountInput.value === ' ') {
        alert('Please fill the inputs!')
    } else {
        addExpense()
        addExpenseTypeInput.value = ' ';
        addExpenseAmountInput.value = ' ';
    }
})

clearExpenses.addEventListener('click', clearAllExpenses)
listExpenses.addEventListener('click', listAllExpenses)
