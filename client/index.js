document.addEventListener('DOMContentLoaded', function()
{
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event)
{
    if(event.target.className === "delete-row-btn")
    {
        deleteRowbyID(event.target.dataset.id);
    }

    if (event.target.className === "edit-row-btn") 
    {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const srchBtn = document.querySelector('#search-btn');

srchBtn.onclick = function()
{
    const searchValue = document.querySelector('#search').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowbyID(id)
{
    fetch('http://localhost:5000/delete/' + id, 
    {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => 
        {
            if(data.success)
            {
                location.reload();
            }
        });
}

function handleEditRow(id) 
{
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() 
{
    const updateNameInput = document.querySelector('#update-name-input');

    console.log(updateNameInput);

    fetch('http://localhost:5000/update', 
    {
        method: 'PATCH',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify(
            {
                id: updateNameInput.dataset.id,
                name: updateNameInput.value
            })
    })
    .then(response => response.json())
    .then(data => 
        {
            if (data.success) 
            {
                location.reload();
            }
        })
}

const addBtn = document.querySelector('#add-name-btn');

addBtn.onclick = function()
{
    const nameInput = document.querySelector('#name');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', 
    {
        headers: {'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({name: name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data)
{
    const table = document.querySelector('table tbody');
    const isTableData = document.querySelector('.no-data');

    let tableHTML = "<tr>";

    for (var key in data)
    {
        if(data.hasOwnProperty(key))
        {
            if(key === "dateAdded")
            {
                data[key] = new Date(data[key]).toLocaleString();
            }

            tableHTML += `<td>${data[key]}</td>`;
        }
    }
    
    tableHTML += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHTML += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;


    tableHTML += "</tr>";

    if(isTableData)
    {
        table.innerHTML = tableHTML;
    }
    else
    {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
}

function loadHTMLTable(data)
{
    const table = document.querySelector('table tbody');
    
    if (data.length === 0)
    {
        table.innerHTML = "<tr><td class = 'no-data' colspan = '5'>NO DATA</td></tr>";
        return;
    }

    let tableHTML = "";

    data.forEach(function({ID, Name, Date_Added})
    {
        tableHTML += "<tr>";
        tableHTML += `<td>${ID}</td>`;
        tableHTML += `<td>${Name}</td>`;
        tableHTML += `<td>${new Date(Date_Added).toLocaleString()}</td>`;
        tableHTML += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        tableHTML += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
} 