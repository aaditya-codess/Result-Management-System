let students = []

const form = document.getElementById("studentForm")
const rollNoInput = document.getElementById("rollNo")
const nameInput = document.getElementById("name")
const dobInput = document.getElementById("dob")
const scoreInput = document.getElementById("score")

const rollNoError = document.getElementById("rollNoError")
const nameError = document.getElementById("nameError")
const dobError = document.getElementById("dobError")
const scoreError = document.getElementById("scoreError")

function clearErrors() {
  rollNoError.classList.remove("show")
  nameError.classList.remove("show")
  dobError.classList.remove("show")
  scoreError.classList.remove("show")

  rollNoInput.classList.remove("is-invalid")
  nameInput.classList.remove("is-invalid")
  dobInput.classList.remove("is-invalid")
  scoreInput.classList.remove("is-invalid")
}

function showError(element, errorElement, message) {
  element.classList.add("is-invalid")
  errorElement.textContent = message
  errorElement.classList.add("show")
}

function validateForm() {
  clearErrors()
  let isValid = true

  const rollNo = rollNoInput.value.trim()
  if (!rollNo) {
    showError(rollNoInput, rollNoError, "Roll No. is required")
    isValid = false
  } else if (Number.parseInt(rollNo) <= 0) {
    showError(rollNoInput, rollNoError, "Roll No. must be a positive number")
    isValid = false
  } else if (students.some((s) => s.rollNo === Number.parseInt(rollNo))) {
    showError(rollNoInput, rollNoError, "Roll No. already exists")
    isValid = false
  }

  const name = nameInput.value.trim()
  if (!name) {
    showError(nameInput, nameError, "Name is required")
    isValid = false
  } else if (name.length < 2) {
    showError(nameInput, nameError, "Name must be at least 2 characters")
    isValid = false
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError(nameInput, nameError, "Name should contain only letters")
    isValid = false
  }

  const dob = dobInput.value
  if (!dob) {
    showError(dobInput, dobError, "Date of Birth is required")
    isValid = false
  } else {
    const dobDate = new Date(dob)
    const today = new Date()
    if (dobDate >= today) {
      showError(dobInput, dobError, "Date of Birth must be in the past")
      isValid = false
    }
  }

  const score = scoreInput.value.trim()
  if (!score) {
    showError(scoreInput, scoreError, "Score is required")
    isValid = false
  } else if (Number.parseInt(score) < 0 || Number.parseInt(score) > 100) {
    showError(scoreInput, scoreError, "Score must be between 0 and 100")
    isValid = false
  }

  return isValid
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function addStudent() {
  const student = {
    rollNo: Number.parseInt(rollNoInput.value),
    name: nameInput.value.trim(),
    dob: dobInput.value,
    score: Number.parseInt(scoreInput.value),
  }

  students.push(student)
  form.reset()
  clearErrors()
  alert("Student result added successfully!")
}

function deleteStudent(rollNo) {
  if (confirm("Are you sure you want to delete this record?")) {
    students = students.filter((s) => s.rollNo !== rollNo)
    renderTable()
  }
}

function renderTable() {
  const tbody = document.getElementById("resultsTable")
  const noRecords = document.getElementById("noRecords")

  tbody.innerHTML = ""

  if (students.length === 0) {
    noRecords.style.display = "block"
    return
  }

  noRecords.style.display = "none"

  students.forEach((student) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${formatDate(student.dob)}</td>
            <td>${student.score}</td>
            <td><button class="btn-delete" onclick="deleteStudent(${student.rollNo})">Delete</button></td>
        `
    tbody.appendChild(row)
  })
}

function showAddForm() {
  document.getElementById("addSection").style.display = "block"
  document.getElementById("viewSection").style.display = "none"
}

function showViewAll() {
  document.getElementById("addSection").style.display = "none"
  document.getElementById("viewSection").style.display = "block"
  renderTable()
}

form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (validateForm()) {
    addStudent()
  }
})

rollNoInput.addEventListener("input", function () {
  if (this.classList.contains("is-invalid")) {
    this.classList.remove("is-invalid")
    rollNoError.classList.remove("show")
  }
})

nameInput.addEventListener("input", function () {
  if (this.classList.contains("is-invalid")) {
    this.classList.remove("is-invalid")
    nameError.classList.remove("show")
  }
})

dobInput.addEventListener("input", function () {
  if (this.classList.contains("is-invalid")) {
    this.classList.remove("is-invalid")
    dobError.classList.remove("show")
  }
})

scoreInput.addEventListener("input", function () {
  if (this.classList.contains("is-invalid")) {
    this.classList.remove("is-invalid")
    scoreError.classList.remove("show")
  }
})
