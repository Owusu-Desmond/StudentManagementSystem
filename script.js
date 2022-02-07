// store, append student data and clear the form when user submit the form
document.querySelector('#student_form').addEventListener('submit',  (event) => {
            event.preventDefault();
            //capture the student info 
            let student_name = document.querySelector('#name').value
            let student_class = document.querySelector('#class').value 
            let student_age = document.querySelector('#age').value 
            let student_email = document.querySelector('#email').value 

        //store the information 
        let students = localStorage.getItem('students')
            if(students === null){
            students = [];
                }else{
            students = JSON.parse(students);
            }
            students.push({
                name: student_name,
                age:student_age,
                email: student_email,
                class: student_class
            })
            localStorage.setItem('students', JSON.stringify(students))
            const list = document.querySelector('#students_list');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student_name}</td>
                <td>${student_class}</td>
                <td>${student_age}</td>
                <td>${student_email}</td>
                <td><a class="btn btn-danger btn-sm delete" data-email="${student_email}">X</a></td>
                    `;
            list.appendChild(row)

        //clear the form
        document.querySelector('#name').value = ''
        document.querySelector('#class').value = ''
        document.querySelector('#age').value  = ''
        document.querySelector('#email').value = ''
});

document.addEventListener('DOMContentLoaded', (event) => {
    // assigning student list to constant viariable 
    const list = document.querySelector('#students_list');
    // get student item from the localStorage and assign it to a variable
    let students = JSON.parse(localStorage.getItem('students'));
    // loop through the student data
    for(let student of students){
        // create a table row
        const row = document.createElement('tr');
        // store student email on DOM i.e data-email="student.email"
        row.dataset.email = student.email
        // add student_row as a class of tr element
        row.classList.add('student_row')
        // set the innerhtml
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td><a class="btn btn-danger btn-sm delete" data-email="${student.email}">X</a></td>
        `;
        // append the created row to the list
        list.appendChild(row)
    }
})
// delete student when the click a class that contains delete
document.querySelector('#students_list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const email = event.target.dataset.email;
            document.querySelector(`.student_row[data-email="${email}"]`).remove();
            
            let students = JSON.parse(localStorage.getItem('students'));
            students.forEach((student, index) => {
        if(student.email === email){
            students.splice(index, 1)
        }
            });
            localStorage.setItem('students', JSON.stringify(students))
            }
});
