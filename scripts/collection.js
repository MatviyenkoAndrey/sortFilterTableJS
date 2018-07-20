function Collection(list) {
  this.list = list;
  
  if (list instanceof Array == false) {
  	throw "You should pass an array";
  }

  this.getList = function () {
  	return list;
  }

}

Collection.prototype.getLength = function () {
  return this.getList().length;
};

Collection.prototype.getElementById = function (id) {
  for (let i = 0; i < this.getList().length; i++) {
  	if (this.list[i].id == id) {
      return this.list[i];
    }
  }
};

Collection.prototype.sortBy = function (key) {
  
  return this.getList().slice().sort(function (prev, next) {
    if (prev[key] < next[key]) {return -1;}
    if (prev[key] > next[key]) {return 1;}
  });
};

Collection.prototype.filterBy = function (field, value, sort) {
  if (typeof field === 'string') {
    return this.getList().filter(function(user) {
      return user[field] === value;
    });
  }
  
  if (sort) {
    filteredUsers.sort((prev, next) => {
      if (prev[sort] > next[sort]) {
        return 1;
      }
      if (prev[sort] < next[sort]) {
        return -1;
      }
    });
  }

  if (Array.isArray(field)) {
    let filteredUsers = this.getList();
    for (let i = 0; i < field.length; i++) {
      const option = field[i],
        fieldName = Object.keys(option)[0],
        fieldValue = option[fieldName];

      filteredUsers = filteredUsers.filter(function(user) {
      return user[fieldName] === fieldValue;
    });

      if (value) {
        filteredUsers.sort((prev, next) => {
          if (prev[value] > next[value]) {
            return 1;
          }
          if (prev[value] < next[value]) {
            return -1;
          }
        });
      }
    }
    
    return filteredUsers;
  }
};

Collection.prototype.findByValue = function (field, value) {
  if (value.match(/\w{2,}/g)) {
    return this.getList().filter(function(user) {
      var fieldValue = new RegExp(value, 'gi')
      return fieldValue.test(user[field]);
    });
  } else {
    console.log('The search string should have at least two characters');
  };




};

Collection.prototype.createNewList = function () {
  return this.getList().map(function(user) {
     return user;
  });
};







