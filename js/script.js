
// Creates student element list variable.
const studentList = document.querySelector('ul.student-list').children;
// Creates variable to define number of items to show per page.
const itemPerPage = 10;

// Creates variables for different elements on the page for ease to access them.
const header = document.querySelector('div.page-header');
const mainDiv = document.querySelector('div.page');
const studListParent = document.querySelector('ul.student-list');

// Creates variable to store search results of students, initally sets it to whole
// list of students.
let resultStudList = studentList;

// Creates search box, 'search' button and 'show all' button, adds to the page.
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const showAllButton = document.createElement('button');
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search for students...';
searchInput.type = 'text';
searchButton.textContent = 'Search';
searchButton.type = 'submit';
showAllButton.textContent = 'Show all';
showAllButton.type = 'submit';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
searchDiv.appendChild(showAllButton);
header.insertBefore(searchDiv, header.firstElementChild.nextSibling);

// Creates element that displays 'No matches found.' if no results are found from a 
// search input, adds to page and hides it initially.
const noResultElem = document.createElement('h3');
noResultElem.textContent = 'No matches found.';
noResultElem.id = 'no-match-found';
noResultElem.style.display = 'none';
mainDiv.insertBefore(noResultElem, studListParent);

// Function that takes in as parameters - a list of students and the page number to display,
// displays that page.
const showPage = (studList, page) => {
    const startIndex = (page * itemPerPage) - 10;
    const finishIndex = (page * itemPerPage) - 1;
    for (let i = 0; i < resultStudList.length; i++) {
        if (i < startIndex || i > finishIndex) {
            resultStudList[i].style.display = 'none';
        } else {
            resultStudList[i].style.display = '';
        }
    }
}
// Calls the showPage funtion initally to show all students, displays page 1.
showPage(resultStudList, 1);

// Funcion that takes in a list and adds the correct number of pagination links
// to page.
const appendPageLinks = (studList) => {
    // Removes previous pagination links.
    if (document.querySelector('div.pagination')) {
        let pagNums = document.querySelector('div.pagination');
        let pagNumsParent = pagNums.parentNode;
        pagNumsParent.removeChild(pagNums);
    }
    // Works out how many links to have.
    const numOfPages = Math.ceil(resultStudList.length / itemPerPage);
    // Creates pagination parent element.
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.className = 'pagination';
    div.appendChild(ul);
    mainDiv.appendChild(div);
    // Creates and appends corrent number of links into pagination element, sets the first link element
    // class to 'active', this highlights the first button as you are initially on the first page.
    for (let i = 0; i < numOfPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = i + 1;
        if (i === 0) {
            a.className = 'active';
        }
        li.appendChild(a);
        ul.appendChild(li);
    }
}
// Calls the function initally so pagination links are shown when page is first loaded.
appendPageLinks(resultStudList);


mainDiv.addEventListener('click', (e) => {
    if (event.target.tagName === 'A') {
        let ul = event.target.parentNode.parentNode;
        showPage(resultStudList, parseInt(event.target.textContent));
        for (let i = 0; i < ul.children.length; i++) {
            if (parseInt(event.target.textContent) === (i + 1)) {
                ul.children[i].children[0].className = 'active';
            } else {
                ul.children[i].children[0].className = '';
            }
        }
    }
})

// Adds 'keyup' event listener to searchInput, this is first every time a key is hit
// within the search box, it filters the student list and shows on the student that
// match the search input.
searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    // Sets result student list to empty.
    resultStudList = [];
    // Retrieves search input, checks that the string isn't empty, loops through all original student
    // names, checks if their name includes the search input, if it does then the display style
    // is set to '' and that student element is pushed to the result student list. If the student
    // name doesn't include the search input, that element is hidden from page. showPage and appendPageLinks
    // function are then called to display the new correct page.
    const input = searchInput.value.toLowerCase();
    if (searchInput.value !== '') {
        for (let i = 0; i < studentList.length; i++) {
            const studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase();
            if (studentName.includes(input)) {
                studentList[i].style.display = '';
                resultStudList.push(studentList[i]);
            } else {
                studentList[i].style.display = 'none';
            }
        }
        showPage(resultStudList, 1);
        appendPageLinks(resultStudList);
        // If the search input is '', then all student displays are set to '' in order to show them.
        // All students are pushed to the result list, showPage and appendPageLinks functions are called
        // to display the new correct page. 
    } else {
        for (let i = 0; i < studentList.length; i++) {
            studentList[i].style.display = '';
            resultStudList.push(studentList[i]);
        }
        showPage(studentList, 1);
        appendPageLinks(studentList);
    }
    // If no results are found from the search, this displays the noResultElem element that shows
    // 'No matches found.' on the page.
    if (resultStudList.length < 1) {
        noResultElem.style.display = '';
    } else {
        noResultElem.style.display = 'none';
    }
})

// Adds 'click' event listener to searchInput, this is first every time a key is hit
// within the search box, it filters the student list and shows on the student that
// match the search input.
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Sets result student list to empty.
    resultStudList = [];
    // Retrieves search input, checks that the string isn't empty, loops through all original student
    // names, checks if their name includes the search input, if it does then the display style
    // is set to '' and that student element is pushed to the result student list. If the student
    // name doesn't include the search input, that element is hidden from page. showPage and appendPageLinks
    // function are then called to display the new correct page.
    const input = searchInput.value.toLowerCase();
    if (searchInput.value !== '') {
        for (let i = 0; i < studentList.length; i++) {
            const studentName = studentList[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase();
            if (studentName.includes(input)) {
                studentList[i].style.display = '';
                resultStudList.push(studentList[i]);
            } else {
                studentList[i].style.display = 'none';
            }
        }
        showPage(resultStudList, 1);
        appendPageLinks(resultStudList);
        // If the search input is '', then all student displays are set to '' in order to show them.
        // All students are pushed to the result list, showPage and appendPageLinks functions are called
        // to display the new correct page. 
    } else {
        for (let i = 0; i < studentList.length; i++) {
            studentList[i].style.display = '';
            resultStudList.push(studentList[i]);
        }
        showPage(resultStudList, 1);
        appendPageLinks(resultStudList);
    }
    // When the search button is clicked, this clears the search box.
    searchInput.value = '';
    //If no results are found from the search, this displays the noResultElem element that shows
    // 'No matches found.' on the page.
    if (resultStudList.length < 1) {
        noResultElem.style.display = '';
    } else {
        noResultElem.style.display = 'none';
    }
})

// Adds event listener to the 'Show all' button, when clicked it shows all items on the page
// and hides the 'No matches found' element.
showAllButton.addEventListener('click', (e) => {
    e.preventDefault();
    resultStudList = [];
    for (let i = 0; i < studentList.length; i++) {
        studentList[i].style.display = '';
        resultStudList.push(studentList[i]);
    }
    showPage(resultStudList, 1);
    appendPageLinks(resultStudList);
    noResultElem.style.display = 'none';
    searchInput.value = '';
})