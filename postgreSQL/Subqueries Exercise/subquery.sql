CREATE TABLE employees(
    employee_id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    salary int
);

INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (1, 'Lebron', 'James', 500000);
INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (2, 'Kobe', 'Bryant', 750000);
INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (3, 'Jake', 'Human', 600000);
INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (4, 'Jake', 'Human 2', 1000000);
INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (5, 'Kevin', 'Garnett', 9000000);
INSERT INTO employees(employee_id, first_name, last_name, salary)
VALUES (6, 'Jake', 'Dog', 100000);

SELECT first_name, last_name, salary
FROM employees
WHERE salary < (SELECT salary FROM employees WHERE employee_id = 4);