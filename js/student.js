var student = {
  promote: function(event) {
    event.preventDefault();
    var parent = event.target.parentNode
    if (parent.className === 'promoted') {
      parent.className = '';
    } else {
      parent.className = 'promoted';
    }
  },

  destroy: function(event) {
    event.preventDefault();
    item = event.target.parentNode
    item.parentNode.removeChild(item);
  }
}
