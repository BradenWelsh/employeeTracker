INSERT INTO department (name)
VALUES
('Toys'),
('Hardware'),
('Housewares'),
('Grocery'),
('Apperal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Toys Associate', 37000, 2),
('Hardware Associate', 35000, 2),
('Store Manager', 95000, 1),
('Housewares Associate', 35000, 2),
('Grocery Associate', 36000, 2),
('Apperal Associate', 35500, 2),
('Customer Host', 33000, 4),
('Assistant Store Manager', 87500, 3);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
('Rene', 'Jones', NULL, 1),
('Braden', 'Welsh', 1, 2),
('Santiago', 'Sergio', NULL, 3),
('Brandon', 'Alserva', 3, 4),
('Samantha', 'Gibbins', 1, 2),
('Cruz', 'Gonzales', NULL, 3),
('Billy', 'White', 3, 2);
