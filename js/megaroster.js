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
        var student = new Student();
        student.init(student_data);
        student.appendToList();
        self.students.push(student);
      });
    }
    catch(err) {
      return false;
    }
  };

  this.appendToList = function(student_name) {
    var li = $('#list_item_template').clone();
    li.removeAttr('id')
      .addClass('student')
      .prepend(student_name)
      .removeClass('invisible');

    $('#students').append(li);
  };

  this.addStudent = function(student_name) {
    var student = new Student();
    student.init({
      name: student_name
    });

    self.students.push(student);
    student.appendToList();

    self.save();
  };

  this.createEditForm = function(ev) {
    var li, edit_form, label;
    li = $(this).closest('li');
    $name = li.find('span');

    // append a clone of the edit_form_template to the <li>
    edit_form = $('#edit_form_template')
      .clone()
      .removeAttr('id')
      .removeClass('invisible');

    $name.addClass('invisible');
    li.find('.btn-group').addClass('invisible');
    li.append(edit_form);

    edit_form.find('input[name=student_name]')
      .val($name.text())
      .focus()
      .select();
  };

  this.removeEditForm = function(ev) {
    var li, edit_form, label;
    li = $(this).closest('li');
    label = li.find('span');

    edit_form = $(this).closest('form');
    edit_form.remove();

    label.removeClass('invisible');
    li.find('.btn-group').removeClass('invisible');
  };

  this.updateStudent = function(ev) {
    ev.preventDefault();
    var form = this;

    var id = $(this).closest('li').attr('data-id');
    var student = Student.getStudentById(id);
    student.name = this.student_name.value;

    $(form).siblings('span').text(student.name);

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
