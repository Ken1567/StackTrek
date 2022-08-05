CREATE DATABASE express;

CREATE TABLE users(
    users_id serial PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    pen_name VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date VARCHAR(50) NOT NULL,
    email_address VARCHAR(50) NOT NULL,
    bio VARCHAR(50) NOT NULL,
    link VARCHAR(50) NOT NULL,
    following INT,
    followers INT
);

INSERT INTO users(users_id, username, password, pen_name, first_name, last_name, birth_date, email_address, bio, link, following, followers)
VALUES (1, '@shinmentakezo12', 'Password123', 'Bard of Sorrows', 'John', 'Smith', 'July 1995', 'johnsmith@gmail.com', 'Male. Programmer. Edgy.', 'github/Ken1567', 1256, 1234);

CREATE TABLE post(
    post_id serial PRIMARY KEY NOT NULL,
    pen_name VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    time_stamp DATE NOT NULL,
    post_message TEXT NOT NULL,
    privacy BOOLEAN NOT NULL
);

INSERT INTO post(post_id, pen_name, username, time_stamp, post_message, privacy)
VALUES (1, 'Bard of Sorrows', '@shinmentakezo12', '1997-12-01', 'To love and to be loved is to feel the sun from both sides', 'Public');

CREATE TABLE comment(
    comment_id serial PRIMARY KEY NOT NULL,
    pen_name VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    comment_message TEXT NOT NULL
);

INSERT INTO comment(comment_id, pen_name, username, comment_message)
VALUES (1, 'Merchant of Venice', '@sasakikojiro15', 'But burns twice as much.')

SELECT post.*, comment.*
FROM post
INNER JOIN comment
ON post.post_id = comment.comment_id