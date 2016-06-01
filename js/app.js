var app = {
  init: function() {
    document.querySelector('form').onsubmit = this.handleSubmit;
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var item = app.buildListItem(event.target.name.value);
    app.createOrPrependList(item);
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

  buildListItem: function(name) {
    var item = document.createElement('li');

    item.innerText = name;

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

  addLink: function(data) {
    var link = document.createElement('a');
    link.href = '#'
    link.innerText = data.text;
    link.onclick = data.method;
    return link;
  }
}

app.init();
