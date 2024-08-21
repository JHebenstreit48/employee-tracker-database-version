INSERT INTO department (name)
VALUES ('Marketing'),
       ('Human Resources'),
       ('IT'),
       ('Finance'),
       ('Research and Development'),
       ('Customer Service');


INSERT INTO role (department_id, title, salary)
VALUES (1, 'Marketing Manager', 155700),
       (1, 'Marketing Assistant', 46000 ),
       (2, 'HR Manager', 155700 ),
       (2, 'HR Assistant', 50000 ),
       (3, 'IT Manager', 155700 ),
       (3, 'Web Developer', 80000 ),
       (3, 'Database Administrator', 101500 ),
       (3, 'Network Administrator', 77000 ),
       (4, 'Director of Accounting', 177000 ),
       (4, 'Treasurer', 99000 ),
       (5, 'Software Engineer', 147000 ),
       (5, 'Reagents Technician', 52000 ),
       (6, 'Call Center Manager', 65800 ),
       (6, 'Customer Service Representative', 39000 ),
       (6, 'Customer Service Associate', 42000 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Doe', 2, 1),
       ('Jeremy', 'Wade', 3, NULL),
       ('Jack', 'Black', 4, 3),
       ('Jean', 'Gray', 5, NULL),
       ('Danica', 'Patrick', 6, 5),
       ('Taylor', 'Swift', 7, 5),
       ('Katie', 'Armiger', 8, 5),
       ('Stephanie', 'White', 9, NULL),
       ('Wesley', 'Snipes', 10, 9),
       ('Julie', 'Andrews', 11, 5),
       ('Chris', 'Hemsworth', 12, NULL),
       ('Chris', 'Pratt', 13, NULL),
       ('Maya', 'Angelou', 14, 13),
       ('Scott', 'Summers', 15, 13);