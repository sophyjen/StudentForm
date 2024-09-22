const form = document.getElementById("userform")
const table = document.getElementById("userTable").getElementsByTagName("tbody")[0]
let editIdx = null
let gender1 =""


// Deleting a row in a table 
const deleteRow = (index) => {
    table.deleteRow(index)
    resetRow()
    document.getElementById("btn").textContent="Save"
}

// Reset a row in a table 
const resetRow = () => {   

    document.getElementById("name").value=""
    document.getElementById("age").value=""
    document.getElementById("course").value=""
    document.getElementById("email").value=""
    const gender = document.getElementsByName("gender")

    for(count = 0; count<gender.length; count++)
    {
    if(gender[count].checked)
        {
            gender[count].checked = false
        }           
    }
}

// Modifying a row in a table 
const editRow = (index) =>{
    document.getElementById("btn").textContent="Modify"
    const gender = document.getElementsByName("gender")
    const selectedCell =table.rows[index]
    
    document.getElementById("name").value=selectedCell.cells[0].textContent 
    document.getElementById("age").value=selectedCell.cells[1].textContent    
    document.getElementById("course").value=selectedCell.cells[3].textContent 
    document.getElementById("email").value=selectedCell.cells[4].textContent
    
    
    if(selectedCell.cells[2].textContent=="Male")
    {            
        gender[0].checked=true
    }
    else
    {
        gender[1].checked=true
    }

    editIdx=index        
}

// Adding a row in a table  
const addRow = (name, age, gender, course, email) =>{
    const newRow = table.insertRow()
    newRow.insertCell(0).textContent = name
    newRow.insertCell(1).textContent = age
    newRow.insertCell(2).textContent = gender
    newRow.insertCell(3).textContent = course
    newRow.insertCell(4).textContent = email

    const actioncells = newRow.insertCell(5)

    const deletBtn = document.createElement("button")
    //<button></button>
    deletBtn.textContent="Delete"
    //<button>Delete</button>
    deletBtn.onclick = () => deleteRow(newRow.rowIndex-1)
    //<button onclick="deleteRow()">Delete</button>

    const editBtn = document.createElement("button")
    //<button></button>
    editBtn.textContent="Edit"
    //<button>Edit</button>
    editBtn.onclick = () => editRow(newRow.rowIndex-1)
    //<button onclick="editRow()">Edit</button>

    actioncells.appendChild(editBtn)
    actioncells.appendChild(deletBtn)
}

// Updating a row in a table 
const updateRow = (name, age, gender, course, email) =>{
    document.getElementById("btn").textContent="Save"

    const editCell = table.rows[editIdx]
    editCell.cells[0].textContent = name
    editCell.cells[1].textContent = age
    
    editCell.cells[3].textContent = course
    editCell.cells[4].textContent = email

    for(count = 0; count<gender.length; count++)
        {
            if(gender[count].checked)
                {
                    editCell.cells[2].textContent = gender[count].value                    
                }           
        }
    editCell = null
}

// Validating & inserting a row in a table 
form.addEventListener("submit", (e) => {
    e.preventDefault()    

    const name = document.getElementById("name").value
    const age = document.getElementById("age").value    
    const course = document.getElementById("course").value
    const email = document.getElementById("email").value
    
    const gender = document.getElementsByName("gender")
    var radiocount = 0 

    for(count = 0; count<gender.length; count++)
        {
            if(gender[count].checked)
                {
                    gender1 = gender[count].value
                    radiocount +=1
                }     
        }

    // Validating the Form
    var nameRegex = /^[a-zA-Z]+$/
    var emailRegex = /^[a-zA-Z0-9]+@gmail\.com/
    var ageRegex = /^\d+$/

    var validate = true

    if(nameRegex.test(name) == false)
    {
        document.querySelector(".nameError").style.display="inline"
        validate = false
    }
    else
    {
        document.querySelector(".nameError").style.display="none"
    }

    if(emailRegex.test(email) == false)
    {
        document.querySelector(".emailError").style.display="inline"
        validate = false
    }
    else
    {
        document.querySelector(".emailError").style.display="none"
    }

    if(ageRegex.test(age) == false)
    {
        document.querySelector(".ageError").style.display="inline"
        validate = false
    }
    else
    {
        document.querySelector(".ageError").style.display="none"
    }

    if(radiocount == 0)
    {
        document.querySelector(".genderError").style.display="inline"
        validate = false
    }
    else
    {
        document.querySelector(".genderError").style.display="none"
    }

    if(course == "")
    {
        document.querySelector(".courseError").style.display="inline"
        validate = false
    }
    else
    {
        document.querySelector(".courseError").style.display="none"
    }
    
    // Inserting a row in a table 
    if(validate == true)
    {
        if(editIdx==null)
        {
            addRow(name, age, gender1, course, email)
        }
        else
        {               
            updateRow(name, age, gender1, course, email)     
        }
        
        resetRow()
    
        //alert("Form Submitted Successfully")
    }

})



