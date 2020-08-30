- Commands

```
CREATE KEYSPACE pluralsight WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}
CREATE TABLE courses (id varchar primary key);
ALTER TABLE courses ADD duration int;
ALTER TABLE courses ADD released timestamp;
ALTER TABLE courses add author varchar;
ALTER TABLE courses WITH comment = 'A table with courses';
DESC courses ; // Describe table 
DESC pluralsight; // Describe name-space

CREATE TABLE courses (
    id varchar primary key,
    name varchar,
    author varchar, 
    audience int,
    duration int,
    cc boolean,
    released timestamp
) with comment = 'A table of courses';

# Select 
SELECT id, duration as length from pluralsight.courses WHERE id = 'cassandra-developers'  LIMIT 100;

#Insert
INSERT INTO pluralsight.courses (id, author) VALUES ( 'cassandra-developers', 'neeraj jain');

#Update
UPDATE pluralsight.courses SET author='neeraj' WHERE id = 'cassandra-developers';
``` 