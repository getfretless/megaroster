var app = {
  students: [],

  init: function() {
    this.load();
    document.querySelector('form').onsubmit = this.handleSubmit;
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
      id: app.students.length + 1,
      name: event.target.name.value,
      promoted: false
    }
    var item = app.buildListItem(studentData);

    app.createOrPrependList(item);
    app.students.push(studentData)
    app.save();

    event.target.reset();
  },

  createOrPrependList: function(item) {
    if (document.querySelector('ul') !== null) {
      var list = document.querySelector('ul');
      list.insertBefore(item, list.firstChild);
    } else {
      var list = document.createElement('ul');
      list.insertBefore(item, list.firstChild);
      document.querySelector('section').appendChild(list);
    }
  },

  buildListItem: function(data) {
    var item = document.createElement('li');
    var name = document.createElement('span');

    name.innerText = data.name;

    if (data.id) {
      item.dataset.id = data.id;
    } else {
      item.dataset.id = this.students.length + 1;
    }

    if (data.promoted) {
      item.className = 'promoted';
    }

    item.appendChild(name);

    item.appendChild(app.addLink({
      text: 'promote',
      method: student.promote
    }));

    item.appendChild(app.addLink({
      text: 'destroy',
      method: student.destroy
    }));

    return item;
  },

  updateList: function() {
    var studentList = document.querySelectorAll('li');
    var students = []
    for (i = 0; i < studentList.length; i++) {
      var student = studentList[i];
      var promoted = student.className === 'promoted' ? true : false
      students.push({
        id: student.dataset.id,
        name: student.querySelector('span').innerText,
        promoted: promoted
      });
    }

    this.students = students;
    this.save();
  },

  addLink: function(data) {
    var link = document.createElement('a');
    link.href = '#'
    link.innerText = data.text;
    link.onclick = data.method;
    return link;
  }
}

app.init();
