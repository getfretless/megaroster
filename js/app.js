var App = {
  students: [],

  init: function() {
    this.load();
    $('form').on('submit', this.handleSubmit);
  },

  load: function() {
    try {
      JSON.parse(localStorage.students).map(function(student){
        this.students.push(student);
        var item = this.buildListItem(student);
        this.createOrPrependList(item);
      }.bind(this));
    }
    catch(err) {
      return false;
    }
  },

  save: function() {
    try {
      return (localStorage.students = JSON.stringify(this.students));
    }
    catch(err) {
      return false;
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var studentData = {
      id: App.students.length + 1,
      name: event.target.name.value,
      promoted: false
    }
    var item = App.buildListItem(studentData);

    App.createOrPrependList(item);
    App.students.push(studentData);
    App.save();

    event.target.reset();
  },

  createOrPrependList: function(item) {
    if ($('ul').length) {
      $('ul').prepend(item);
    } else {
      $('section').append($('<ul/>').prepend(item));
    }
  },

  buildListItem: function(data) {
    var id = data.id || (this.students.length + 1)
    var $promote = App.addLink({ text: 'promote', method: Student.promote });
    var $destroy = App.addLink({ text: 'destroy', method: Student.destroy });
    var $item = $('<li><span>'+data.name+'</span></li>').data('id', id);

    if (data.promoted) {
      $item.addClass('promoted');
    }

    return $item.append($promote).append($destroy);
  },

  updateList: function() {
    students = [];
    $('li').map(function(index, item) {
      students.push({
        id: $(item).data('id'),
        name: $(item).find('span').text(),
        promoted: $(item).hasClass('promoted')
      });
    });
    this.students = students;

    this.save();
  },

  addLink: function(data) {
    return $('<a href="#"/>').text(data.text).on('click', data.method);
  }
}

App.init();
