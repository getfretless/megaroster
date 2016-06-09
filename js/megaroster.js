var Megaroster = {
  students: [],

  init: function() {
    this.load();
  },

  load: function () {
    try {
      JSON.parse(localStorage.students).map(function(student){
        this.students.push(student);
        Student.add(student);
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

  update: function(data) {
    this.students = this.students.map(function(student){
      if (student.id == data.id) {
        var newStudent = {
          id: student.id,
          name: data.name || student.name
        }
        if (data.favorite !== undefined) {
          newStudent.favorite = data.favorite;
        } else {
          newStudent.favorite = student.favorite ? true : false;
        }
        return newStudent;
      }
      return student;
    });
    this.save();
  },

  addStudent: function(student) {
    this.students.push({
      id: student.id,
      name: student.name,
      favorite: false
    })
    this.save();
  },

  removeStudent: function(id) {
    this.students = Megaroster.students.filter(function(student){
      return student.id != id;
    });
    this.save();
  }
}

Megaroster.init();
