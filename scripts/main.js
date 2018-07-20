(function () {
  const headers = ['first_name', 'last_name', 'age', 'email', 'skill', 'city'],
  userList = new Collection(users),
  items = userList.getList(),
  table = document.getElementById('table'),
  tHead = table.querySelector('thead'),
  tBody = table.querySelector('tbody'),
  select = document.getElementById('field'),
  filter = document.getElementById('filter'),
  tHeadHTML = '<tr><th>'+ headers.join('</th><th>') +'</th></tr>',
  options = '<option>'+ headers.join('</option><option>') +'</option>';
  
  const sortedClass = 'sorted';
  
  tHead.innerHTML = tHeadHTML.replace(/_/g, ' ');
  select.innerHTML = options.replace(/_/g, ' ');
  createTBody(items);

  tHead.addEventListener('click', headerClickHandler);
  filter.addEventListener('input', filterChangeHandler);
  select.addEventListener('change', selectHandler);

  function selectHandler () {
  	filter.value = '';
  	createTBody(items);
  }

  function filterChangeHandler (e) {
    const text = e.target.value;
    if (text.length < 2) return;

    const filteredList = userList.findByValue(select.value.replace(/\s/g, '_'), text);

    createTBody(filteredList);
  }

  function headerClickHandler (e) {
  	const target = e.target;
    if (target.tagName === 'TH') {
    	if (target.classList.contains(sortedClass)) {
          //target.classList.remove(sortedClass);
          createTBody(items);
    	} else {

       	  const sortedList = userList.sortBy(target.textContent.replace(/\s/g, '_')),
       	  anotherSorted = table.querySelector('.' + sortedClass);

       	  if (anotherSorted) {
       	  	anotherSorted.classList.remove(sortedClass);
       	  }

    	  createTBody(sortedList);
    	  //target.classList.add(sortedClass);
    	}
    	target.classList.toggle(sortedClass);
    }
  }
  
  function createTR(user) {
  	return '<tr>' + headers.map(el => '<td>'+ user[el] +'</td>').join('') + '</tr>';
  }

  function createTBody(array) {
    const tBodyHTML = array.slice(1)
                   .reduce((prev, next) => prev + createTR(next), createTR(array[0]));
    tBody.innerHTML = tBodyHTML;
  }

})();