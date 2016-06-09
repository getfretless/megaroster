var Student = {
  init: function() {
    $(document).on('submit', 'form.edit', this.update);
    $(document).on('click', 'button.delete', this.delete);
    $(document).on('click', 'button.favorite', this.favorite);
  },

  add: function(student) {
    var $li = $('#list_item_template').clone();
    $li.removeAttr('id')
      .data('id', student.id)
      .removeClass('invisible')
      .find('span')
        .text(student.name);

    if (student.favorite) {
      $li.addClass('favorite');
    }

    $('#students').prepend($li);
  },

  delete: function(event) {
    var $li = $(event.target).closest('li');
    var id = $li.data('id');

    Megaroster.removeStudent(id);
    $li.remove();
  },

  update: function(event) {
    event.preventDefault();
    var form = event.target;
    var id = $(form).closest('li').data('id');

    Megaroster.update({
      id: id,
      name: form.student_name.value
    });

    $(form).siblings('span').text(form.student_name.value);
    App.toggleForm.apply(this);
  },

  favorite: function(event) {
    var $li = $(event.target).closest('li');
    var favorite = $li.hasClass('favorite') ? false : true;
    Megaroster.update({
      id: $li.data('id'),
      favorite: favorite
    });
    $li.toggleClass('favorite');
  }
}

Student.init();
