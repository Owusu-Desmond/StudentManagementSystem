function validation(student_name,student_age,student_email){       
    let error = document.querySelector('#error-container');
    // if student is too young to be a student
    if(student_age < 1){
        error.innerHTML = "Student age is not valid"
        return true;
    }
    // if student name length is too small
    if(student_name.length < 4){
        error.innerHTML = "Student name is too short"
        return true;
    }
    // if email already exit
    let students = fetchStudentsFromStore();
    let foundStudent = false;
    students.forEach((student) => {
        if(student_email === student.email){
            error.innerHTML = 'Student email aready exit'
            foundStudent = true;
           
        }
    }); 
    return foundStudent;     
}

function addStudent(){
    //capture the student info 
    let student_name = document.querySelector('#name').value 
    let student_class = document.querySelector('#class').value 
    let student_age = parseInt(document.querySelector('#age').value) 
    let student_email = document.querySelector('#email').value 
    // form validation
    if(validation(student_name,student_age,student_email)){
        return;
    }
   //store the information 
   let students = fetchStudentsFromStore();
    if(students === null){
        students = [];
    }
    students.push({
        name: student_name,
        age:student_age,
        email: student_email,
        class: student_class
    })
    addStudentsToStore(students);
    listStudent(student_name, student_class, student_age, student_email)
    //clear the form
    clearForm();

}

function listStudent(student_name, student_class, student_age, student_email){
    const list = document.querySelector('#students_list');
    const row = document.createElement('tr');
    row.dataset.email = student_email;
    row.dataset.name = student_name;
    row.classList.add('student_row');
    row.innerHTML = `
        <td>${student_name}</td>
        <td>${student_class}</td>
        <td>${student_age}</td>
        <td>${student_email}</td>
        <td><a class="btn btn-danger btn-sm">
        <i class="bi bi-pencil-square edit" data-name="${student_name}" data-age="${student_age}" data-email="${student_email}" data-class="${student_class}">
        </i></a></td>
        <td><a class="btn btn-danger btn-sm delete" data-email="${student_email}">X</a></td>
    `;
    list.appendChild(row)
}

function clearForm(){
    document.querySelector('#name').value = '';
    document.querySelector('#class').value = '';
    document.querySelector('#age').value  = '';
    document.querySelector('#email').value = '';
    document.querySelector('#error-container').innerHTML = '';
}
        // fetch students and remove student from store
function deleteStudentFromStore(email){
    let students = fetchStudentsFromStore();
        students.forEach((student, index) => {
           if(student.email === email){
               students.splice(index, 1)
           }
        });
        addStudentsToStore(students);
}
function deleteStudent(event){
    if (event.target.classList.contains('delete')) {
        const email = event.target.dataset.email;
        document.querySelector(`.student_row[data-email="${email}"]`).remove();
        // fetch students and remove student from store
        deleteStudentFromStore(email);
        
    }
}
// edit student data
function editStudent(event){
    if(event.target.classList.contains('edit')){
        const email = event.target.dataset.email;
        const name = event.target.dataset.name;
        const age = event.target.dataset.age;
        const level = event.target.dataset.class;
        // collect data from list
        document.querySelector('#name').value = name;
        document.querySelector('#class').value = level;
        document.querySelector('#age').value  = age;
        document.querySelector('#email').value = email;

        document.querySelector(`.student_row[data-email="${email}"]`).remove();

        deleteStudentFromStore(email);
        
    }
}
function fetchStudentsFromStore(){
    let students = JSON.parse(localStorage.getItem('students'));
    if(!students){
        students = [];
        return students;
    }
    return students;
}
function addStudentsToStore(students){
    localStorage.setItem('students', JSON.stringify(students))
}
// search by student name
function searchStudent(){
    let input_value , filter, table , tr;
    input_value = document.querySelector('#search').value;
    filter = input_value.toUpperCase();
    table = document.querySelector('#students_list');
    tr = table.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for(let i = 1; i < tr.length; i++){
        names = tr[i].dataset.name;
        if(names.toUpperCase().indexOf(filter) > -1){
            tr[i].style.display = '';
        }else{
            tr[i].style.display = "none";
        }
    }
}
document.querySelector('#student_form').addEventListener('submit',  (event) => {
    event.preventDefault();
    addStudent();
});
document.addEventListener('DOMContentLoaded', () => {
    let students = fetchStudentsFromStore();
    for(let student of students){
        listStudent(student.name, student.class, student.age, student.email)
    }
})
// delete a student
document.querySelector('#students_list').addEventListener('click', (event) => {
    deleteStudent(event)
});
// edit student data 
document.querySelector('#students_list').addEventListener('click', (event) =>{
    editStudent(event);
})