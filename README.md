## AngularJS part 1

### How to run app:
1) npm install;
2) npm run server;
3) npm run dev;

### Rate Criterias:

Task 1 

1)	Add AngularJS 1.#.# to a project
2)	Add minimum functionality:
    - Add status(is it done or not) and date creation to todo model;
    - Create a view displaying two lists of  todos: “Done todos” and “New todos”;
    - Add filtering for todo list on base how old is the todo in days;
3)	Add more functionality: 
    - Add validation to the form:
         1) Fields "Text" should be mandatory;
         2) Create a custom validator that check the minimum length of a todo text: 20 symbols;
    - Reuse the form above to edit an article by clicking on article title;
    - Add filtering by first letter and by date;
4)	Add routes and resource:
    - "Add todo"/"Edit todo" forms should be opened inside different views.;
    - Make sure that "Add todo"/"Edit todo" views have different routes, i.e.:
        1) /admin/article/<todoId>/edit;
        2) /admin/article/add;
5)	Load todos from external resource:
    - Use Resource to make requests to a server;
    - Make todo.json load first todos from the file;
