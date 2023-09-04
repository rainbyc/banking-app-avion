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
let cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", function () {
    closePopup();
});

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

  

