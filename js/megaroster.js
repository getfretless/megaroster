var Megaroster = function() {
  this.veggies = ['cabbage', 'lettuce'];


  this.init = function() {
    var self = this;
    this.students = [];


    $('#new_student_form').on('submit', function (ev) {
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      // Push the student name onto the students array
      self.students.push(student_name);

      // Use console.log to prove that the array has a new student
      console.log(self.students.length);

      // Add the student to a new list item in the <ol>
      $('#students').append('<li class="list-group-item">' + student_name + '</li>');
    });
  };

};

var roster = new Megaroster();
roster.init();
