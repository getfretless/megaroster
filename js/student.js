var Student = {
  promote: function(event) {
    event.preventDefault();
    $(event.target).parent().toggleClass('promoted');
    App.updateList();
  },

  destroy: function(event) {
    event.preventDefault();
    $(event.target).parent().remove();
    App.updateList();
  }
}
