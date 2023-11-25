let expenseAmount = document.getElementById("expenseAmount");
let expenseDescription = document.getElementById("expenseDescription");
let expenseCategory = document.getElementById("expenseCategory");
let ul = document.getElementById("ulList");

document.getElementById("btnSubmit").addEventListener('click', function(e) {
    e.preventDefault();
    if (expenseAmount.value === "" || expenseDescription.value === "" || expenseCategory.value === "") {
        alert("Please enter details before submitting.");
        return;
    }else{
        const storedData  = JSON.parse(localStorage.getItem('userData')) || [];
        const id = Date.now();
        const entry = {
            id,
            amount: expenseAmount.value,
            description: expenseDescription.value,
            category: expenseCategory.value
        }
        storedData.push(entry);
        axios.post("https://crudcrud.com/Dashboard/9b64deadbe5144dbb8589b22eb70ad3f", storedData)
        .then((response) => {
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //localStorage.setItem('userData', JSON.stringify(storedData));
        expenseAmount.value = "";
        expenseCategory.value = "";
        expenseDescription.value = "";
        //displayStoredData();
    }
});

function displayStoredData() {
    ul.innerHTML = "";
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    storedData.forEach(element => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(`Amount: ${element.amount} - Description: ${element.description} - Category: ${element.category}`));
        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.className = 'btn btn-xs btn-danger float-end'
        deleteBtn.addEventListener('click', function() {
            const updatedData = storedData.filter((item) => item.id !== element.id);
            localStorage.setItem('userData', JSON.stringify(updatedData));
            displayStoredData();
        })
        const editBtn = document.createElement('button');
        editBtn.appendChild(document.createTextNode('Edit'));
        editBtn.className = 'btn btn-xs btn-info float-end mx-1'
        editBtn.addEventListener('click', function() {
            const editedData = storedData.filter((item) => item.id !== element.id);
            expenseAmount.value = element.amount;
            expenseDescription.value = element.description;
            expenseCategory.value = element.category;
            storedData.amount = expenseAmount.value;
            storedData.description = expenseDescription.value;
            storedData.category = expenseCategory.value;
            localStorage.setItem('userData', JSON.stringify(editedData));
            displayStoredData();
        })
        li.appendChild(p);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        ul.appendChild(li);
    });
}

displayStoredData();
