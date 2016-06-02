var App = {
  init: function() {
    $('form').on('submit', this.handleSubmit);
  },

  handleSubmit: function(event) {
    var item = App.buildListItem(event.target.name.value);
    App.createOrPrependList(item);

    event.target.reset();
    event.preventDefault();
  },

  createOrPrependList: function(item) {
    if ($('ul').length) {
      $('ul').prepend(item);
    } else {
      $('section').append($('<ul/>').prepend(item));
    }
  },

  buildListItem: function(name) {
    var $promote = App.addLink({ text: 'promote', method: student.promote });
    var $destroy = App.addLink({ text: 'destroy', method: student.destroy });

    return $('<li>'+name+'</li>').append($promote).append($destroy);
  },

  addLink: function(data) {
    return $('<a href="#"/>').text(data.text).on('click', data.method);
  }
}

App.init();
