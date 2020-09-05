## Introduction to CQL
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

# Insert
INSERT INTO pluralsight.courses (id, author) VALUES ( 'cassandra-developers', 'neeraj jain');

# Update
UPDATE pluralsight.courses SET author='neeraj' WHERE id = 'cassandra-developers';

# Deleting a Row
DELETE from courses where id='cassandra-developers';

# Deleting a Column
DELETE author FROM  courses where id='cassandra-developers';

# Expiring a Data with TTLs (Time to Live in Seconds)
## Set a TTL for a single column value;
 UPDATE pluralsight.courses USING TTL 32400 SET duration = 120 WHERE id = 'cassandra-developers';

## Retrieving a TTL for a Single column value
 SELECT TTL(duration) from pluralsight.courses where id = 'cassandra-developers';

## Expiring Data with TTLs
### Set the TTL for an entire row
 INSERT INTO pluralsight.courses (id, author) VALUES ( 'The complete javascript course', 'jonna') USING TTL 10800;

### Set a table wide ttl
CREATE TABLE reset_tokens (
    id varchar PRIMARY KEY,
    reset_token varchar
) WITH default_time_to_live = 10800;
``` 



## Restoring data from CQL file.
```
cat scripts/courses.cql | docker-compose exec -T n1 cqlsh

Select * from pluralsight.courses;

### Now Expanded output is enabled

Select id, token(id) from courses; // Returns the token value associated with the partition key

cat scripts/users.cql | docker-compose exec -T n1 cqlsh

## There is always an upsert going on if update statement doesn't match with anything else it will create the record else update it.

Assume we want to implement a functionality on our website for resetting a lost password, As a part of this process we likely want to generate a token to send as part of password reset URL.

UPDATE users USING TTL 120 SET reset_token = 'abc12kye' where id = 'jane-doe'; // Token will automatically expire(set to null) after 2 minutes.

```

### Deletes in Cassandra (Tombstone under the hood)

```
CREATE KEYSPACE tlp_lab WITH replication = {'class': 'NetworkTopologyStrategy', 'datacenter1' : 3};
CREATE TABLE tlp_lab.tombstones (fruit text, date text, crates set<int>, PRIMARY KEY (fruit, date));

## Let's insert some data
INSERT INTO tlp_lab.tombstones (fruit, date, crates) VALUES ('apple', '20160616', {1,2,3,4,5});
INSERT INTO tlp_lab.tombstones (fruit, date, crates) VALUES ('apple', '20160617', {1,2,3});
INSERT INTO tlp_lab.tombstones (fruit, date, crates) VALUES ('pickles', '20160616', {6,7,8}) USING TTL 2592000;
```

### Counters Demo
- Creating a table that includes a counter.
```
CREATE TABLE ratings (
    course_id varchar PRIMARY KEY,
    ratings_count counter,
    ratings_total counter
) with comment = 'A table of course ratings';
```
- Incrementing the counter
```
UPDATE ratings set ratings_count = ratings_count +1, ratings_total = ratings_total + 4 WHERE course_id = 'advanced-python';  -- As we know this will perform upsert.
```

### Aggregation in Cassandra.
```
CREATE TABLE ratings (
    course_id varchar,
    user_id varchar,
    rating float,
    primary key(course_id, user_id)
) with comment = 'A table of course ratings';

INSERT INTO ratings (course_id , user_id , rating ) VALUES ( 'cassandra_developers', 'user1', 4);
INSERT INTO ratings (course_id , user_id , rating ) VALUES ( 'cassandra_developers', 'user2', 5);
INSERT INTO ratings (course_id , user_id , rating ) VALUES ( 'cassandra_developers', 'user3', 2);
INSERT INTO ratings (course_id , user_id , rating ) VALUES ( 'advanced-python', 'user3', 2);

### Average rating for Course.
SELECT course_id, avg(rating) from ratings where course_id = 'cassandra_developers';

### Aggregate function behave weirdly when used without partition key.
SELECT course_id, avg(rating) from ratings ;
Warnings :
Aggregation query used without partition key
```