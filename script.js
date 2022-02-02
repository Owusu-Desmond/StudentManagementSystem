document.querySelector('#student_form').addEventListener('submit',  (event) => {
    event.preventDefault();
    //capture student info 
    let student_name = document.querySelector('#name').value 
    let student_class = document.querySelector('#class').value 
    let student_age = document.querySelector('#age').value 
    let student_email = document.querySelector('#email').value 

   //store the the data to localstorage 
   let students = localStorage.getItem('students')
    if(students === null){
        students = [];
    }else{
        students = JSON.parse(students);
    }
    // class to manage student data
    class manageStudentDataInUI {
        constructor(students){
            this.students = students
        }
        addStudentToData(){
            this.students.push({
                name: student_name,
                age:student_age,
                email: student_email,
                class: student_class
        })
        }

        
    };
    let addStudent = new manageStudentDataInUI(students);
    addStudent.addStudentToData();

    localStorage.setItem('students', JSON.stringify(students));
    //clear the form
    document.querySelector('#name').value = '';
    document.querySelector('#class').value = '';
    document.querySelector('#age').value = '';
    document.querySelector('#email').value = '';

});