var Student = {
  init: function() {
    $(document).on('submit', 'form.edit', this.update);
    $(document).on('click', 'button.delete', this.delete);
  },

  add: function(id, name) {
    var $li = $('#list_item_template').clone();
    $li.removeAttr('id')
      .addClass('student')
      .attr('data-id', id)
      .removeClass('invisible')
      .find('span')
        .text(name);

    $('#students').append($li);
  },

  delete: function(event) {
    var $li = $(event.target).closest('li');
    var id = $li.attr('data-id');

    Megaroster.removeStudent(id);
    $li.remove();
  },

  update: function(event) {
    event.preventDefault();
    var form = event.target;
    var id = $(form).closest('li').attr('data-id');
    Megaroster.update({
      id: id,
      name: form.student_name.value
    });

    $(form).siblings('span').text(form.student_name.value);

    App.toggleForm.apply(this);
  }
}

Student.init();
