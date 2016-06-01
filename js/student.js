var student = {
  promote: function(event) {
    event.preventDefault();
    event.target.parentNode.classList.add('promoted');
  },

  destroy: function(event) {
    event.preventDefault();
    item = event.target.parentNode
    item.parentNode.removeChild(item);
  }
}
