CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id)
);