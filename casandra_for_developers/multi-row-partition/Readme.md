### Composite Key (Primary Key, Clustering key)

- Creating Courses now with Modules (Like you can have a Cassandra Udemy course and then that course can have multiple modules,
how do we handle such scenarios, Since cassandra doesn't support joins we have different strategies to store course and modules
information together.)

```
CREATE KEYSPACE pluralsight WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
CREATE TABLE courses (
    id varchar,
    name varchar,
    module_id int,
    module_name varchar,
    PRIMARY KEY (id, module_id)
);

INSERT INTO courses (id, name, module_id, module_name ) VALUES ( 'advanced-python', 'Advance Python', 1, 'Course Overview');
INSERT INTO courses (id, name, module_id, module_name ) VALUES ( 'advanced-python', 'Advance Python', 2, 'Advance Flow Control');

```

- Selecting 
```
SELECT * from courses where id = 'advanced-python';
SELECT distinct id from courses ;
```

- Filtering and Ordering By Clustering key
```
SELECT * from courses where id = 'advanced-python' and module_id = 1;
- In Clause
SELECT * from courses where id = 'advanced-python' and module_id in (1,2,3,4);
SELECT * from courses where id = 'advanced-python' ORDER BY module_id desc;
```


### Static Columns (A special column that is shared by all rows of a partition.)
- In our use case we can keep id and name as the static column.

   - Convert course schema to static columns
   - Select course and module-level data
```
CREATE TABLE courses (
    id varchar,
    name varchar static,
    author varchar static,
    audience int static, 
    cc boolean static,
    module_id int,
    module_name varchar,
    module_duration int,
    PRIMARY KEY (id, module_id)
) with comment = 'A table of course and modules with Static Columns';

INSERT INTO courses (id, name) VALUES ( 'cassandra-for-developers', 'Cassandra For Developers'); // This will be re-used/shared
INSERT INTO courses (id, module_id, module_name) VALUES ('cassandra-for-developers',  1, 'Course Overview');
INSERT INTO courses (id, module_id, module_name) VALUES ('cassandra-for-developers',  2, 'What is Cassandra');
```

### Time Series Data 
 - Imagine a feature where we need to show the popularity of a Course on plural-sight/udemy over a period of time so we need to use TimeUUID

 ```
 CREATE TABLE course_page_views (
     course_id text,
     view_id timeuuid,
     PRIMARY KEY(course_id, view_id)
 ) WITH CLUSTERING ORDER BY (view_id desc);
 ```

 - now()
 ```
 INSERT INTO course_page_views (course_id , view_id ) VALUES ( 'advanced-python', now());
 ```
 - dateOf / unixTimestampOf()
 ```
 SELECT course_id, dateOf(view_id) from course_page_views;
 SELECT course_id, unixTimestampOf(view_id) from course_page_views;
 ```