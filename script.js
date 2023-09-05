// Function to show the popup
function showPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Function to close the popup and clear input fields
function closePopup() {
    let popup = document.getElementById("popup");
    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let initialDepositInput = document.getElementById("initialDeposit");

    // Clear the input fields
    firstNameInput.value = "";
    lastNameInput.value = "";
    initialDepositInput.value = "";

    // Hide the popup
    popup.style.display = "none";
}

// Event listener for the add-icon element
let addIcon = document.getElementById("add-icon");
addIcon.addEventListener("click", showPopup);

// Event listener for the "Cancel" button
// let cancelButton = document.getElementById("cancelButton");
// cancelButton.addEventListener("click", function () {
//     closePopup();
// });

function saveUser() {
    // Get the user input values
    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let initialDepositInput = document.getElementById("initialDeposit");

    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let initialDeposit = parseFloat(initialDepositInput.value); // Convert to a floating-point number

    // Create a user object with the entered information
    let user = {
        firstName: firstName,
        lastName: lastName,
        initialDeposit: initialDeposit
    };

    // Check if there are existing users in local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    users.push(user);

    // Save the updated users array to local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Clear the input fields
    firstNameInput.value = "";
    lastNameInput.value = "";
    initialDepositInput.value = "";

    // Display the user's name in the "account-names" div
    let accountNamesDiv = document.getElementById("account-names");
    let fullName = `${firstName} ${lastName}`;
    let userElement = document.createElement("div");
    userElement.textContent = fullName;
    accountNamesDiv.appendChild(userElement);

    // Update the balance
    let pesoBalanceDiv = document.getElementById("peso-balance");
    let currentBalance = parseFloat(pesoBalanceDiv.textContent) || 0;
    currentBalance += initialDeposit;
    pesoBalanceDiv.textContent = currentBalance.toFixed(2); // Display the balance with 2 decimal places

    // Close the popup
    closePopup();
}

function deposit() {
    let depositAmountInput = document.getElementById("depositAmount");
    let depositAmount = parseFloat(depositAmountInput.value);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid positive amount for deposit.");
        return;
    }

    // Update the balance
    let pesoBalanceDiv = document.getElementById("peso-balance");
    let currentBalance = parseFloat(pesoBalanceDiv.textContent) || 0;
    currentBalance += depositAmount;
    pesoBalanceDiv.textContent = currentBalance.toFixed(2);

    // Clear the input field
    depositAmountInput.value = "";
}

function withdraw() {
    let withdrawAmountInput = document.getElementById("withdrawAmount");
    let withdrawAmount = parseFloat(withdrawAmountInput.value);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Please enter a valid positive amount for withdrawal.");
        return;
    }

    // Update the balance
    let pesoBalanceDiv = document.getElementById("peso-balance");
    let currentBalance = parseFloat(pesoBalanceDiv.textContent) || 0;

    if (withdrawAmount > currentBalance) {
        alert("Insufficient balance for withdrawal.");
        return;
    }

    currentBalance -= withdrawAmount;
    pesoBalanceDiv.textContent = currentBalance.toFixed(2);

    // Clear the input field
    withdrawAmountInput.value = "";
}

  

// Budget
let totalAmount = document.getElementById("total-amount");
let expenseAmount = document.getElementById("expense-cost");
const addExpenseButton = document.getElementById("add-expense");
const totalAmountButton = document.getElementById("total-amount-button");
const expenseTitle = document.getElementById("expense-title");
const errorMessage = document.getElementById("budget-error");
const expenseNameError = document.getElementById("expense-name-error");
const expenseCostError = document.getElementById("expense-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//Set Budget Part

totalAmountButton.addEventListener("click", () => {
    console.log("Good");
    tempAmount = totalAmount.value;
    //empty or negative input
    if (tempAmount === "" || tempAmount <= 0) {
    errorMessage.classList.remove("hide");
    } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach(element=> {
        element.disabled = bool;
    });
};

//Function to Modify List Elements

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".expense").innerText;
        expenseTitle.value = parentText;
        expenseAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
}

//Function to Create Expense List

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
        sublistContent.innerHTML = `<p class="expense">${expenseName}</p><p class="amount">${expenseValue}</p>`;
        let editButton = document.createElement("button");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
        editButton.style.fontSize = "24px";
        editButton.addEventListener("click", () => {
            modifyElement(editButton, true);
        });
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("fa-solid", "fa-trash", "delete");
        deleteButton.style.fontSize = "24px";
        deleteButton.addEventListener("click", () => {
            modifyElement(deleteButton);
        });
        sublistContent.appendChild(editButton);
        sublistContent.appendChild(deleteButton);
        document.getElementById("list").appendChild(sublistContent);
};

//Function to Add Expenses
addExpenseButton.addEventListener("click", () => {
    //empty checks
    if(!expenseAmount.value || !expenseTitle.value){
        expenseNameError.classList.remove("hide");
        expenseCostError.classList.remove("hide");
        return false;
    }

    //Enable button
    disableButtons(false);
    //Expense
    let expenditure = parseInt(expenseAmount.value);
    //Total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Create list
    listCreator(expenseTitle.value, expenseAmount.value);
    //Empty inputs
    expenseTitle.value = "";
    expenseAmount.value = "";
})