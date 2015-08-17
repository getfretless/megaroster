var Megatask = {
  author: "Davey",
  hisDeal: "Who the heck knows?",
  newStudentForm: $('#new_student_form'),
  submitHandler: function(ev) {
    alert('Whaaaaat?');
  },
  start: function() {
    this.newStudentForm.submit(this.submitHandler);
  }
};

Megatask.start();
