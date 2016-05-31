var Megaroster = function() {
  var self = this;

  this.save = function() {
    try {
      return (localStorage.students = JSON.stringify(self.students));
    }
    catch(err) {
      return false;
    }
  };

  this.load = function() {
    try {
      var student_data_objects = JSON.parse(localStorage.students);
      $.each(student_data_objects, function(index, student_data) {
        Student.init(student_data);
        Student.appendToList();
        self.students.push(student);
      });
    }
    catch(err) {
      return false;
    }
  };

  // this.appendToList = function(student_name) {
  //   var li = $('#list_item_template').clone();
  //   li.removeAttr('id')
  //     .addClass('student')
  //     .prepend(student_name)
  //     .removeClass('hidden');
  //
  //   $('#students').append(li);
  // };

  this.addStudent = function(student_name) {
    Student.init({
      name: student_name
    });
    debugger;
    self.students.push(Student);
    Student.appendToList();

    self.save();
  };

  this.createEditForm = function(ev) {
    var li, edit_form, label;
    li = $(this).closest('li');
    label = li.find('label');

    // append a clone of the edit_form_template to the <li>
    edit_form = $('#edit_form_template')
      .clone()
      .removeAttr('id')
      .removeClass('invisible');

    label.addClass('hidden');
    li.find('.btn-group').addClass('invisible');
    li.append(edit_form);

    edit_form.find('input[name=student_name]')
      .val(label.text())
      .focus()
      .select();
  };

  this.removeEditForm = function(ev) {
    var li, edit_form, label;
    li = $(this).closest('li');
    label = li.find('label');

    edit_form = $(this).closest('form');
    edit_form.remove();

    label.removeClass('hidden');
    li.find('.btn-group').removeClass('hidden');
  };

  this.updateStudent = function(ev) {
    ev.preventDefault();
    var form = this;

    var id = $(this).closest('li').attr('data-id');
    var student = Student.getStudentById(id);
    student.name = this.student_name.value;

    $(form).siblings('label').text(student.name);

    self.removeEditForm.apply(form);
    self.save();
  };

  this.init = function() {
    self.students = [];
    Student.counter = 0;
    self.load();

    $(document).on('click', 'button.edit', self.createEditForm);
    $(document).on('click', 'button.cancel', self.removeEditForm);
    $(document).on('submit', 'form.edit', self.updateStudent);

    $(document).on('click', 'button.delete', function(ev) {
      var li = $(this).closest('li');

      // Remove it from the array
      var id = li.attr('data-id');

      $.each(self.students, function(index, current_student) {
        if (current_student.id.toString() === id.toString()) {
          self.students.splice(index, 1);
          return false;
        }
      });

      li.remove();
      self.save();

    });

    $('#new_student_form').on('submit', function (ev) {
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      self.addStudent(student_name);

      $(this.student_name)
        .val('')
        .focus();
    });
  };
};

var roster = new Megaroster();
roster.init();
