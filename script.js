
  // Function to show the popup
function showPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "block";
}

  // Function to close the popup
function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}

  // Event listener for the add-icon element
let addIcon = document.getElementById("add-icon");
addIcon.addEventListener("click", showPopup);



function saveUser() {
    // Get the user input values
    let firstNameInput = document.getElementById("firstName");
    let lastNameInput = document.getElementById("lastName");
    let initialDepositInput = document.getElementById("initialDeposit");
  
    let firstName = firstNameInput.value;
    let lastName = lastNameInput.value;
    let initialDeposit = initialDepositInput.value;
  
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
  
    // Close the popup
    closePopup();
}

// Event listener for the "Cancel" button
let cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", function() {
  closePopup();
});

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

  

