var Student = {
  promote: function(event) {
    event.preventDefault();
    $(event.target).parent().toggleClass('promoted');
  },

  destroy: function(event) {
    event.preventDefault();
    $(event.target).parent().remove();
  }
}
