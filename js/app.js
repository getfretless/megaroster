var App = {
  init: function() {
    $(document).on('click', 'button.edit', this.toggleForm);
    $(document).on('click', 'button.cancel', this.toggleForm);
    $('#new_student_form').on('submit', this.handleNewStudent);
  },

  toggleForm: function() {
    var $li = $(this).closest('li');

    if($li.find('form').length > 0) {
      $(this).closest('form').remove();
    } else {
      var $editClone = $('#edit_form_template').clone().removeAttr('id').removeClass('invisible');
      $li.append($editClone);
      $editClone.find('input[name=student_name]').val($li.find('span').text()).focus().select();
    }
  },

  handleNewStudent: function(event) {
    event.preventDefault();
    var name = event.target.student_name.value;
    var studentId = Megaroster.students.length + 1;
    Student.add(studentId, name);
    Megaroster.addStudent({
      id: studentId,
      name: name
    })
    $(event.target.student_name).val('').focus();
  }
}

$(function(){
  App.init();
});
