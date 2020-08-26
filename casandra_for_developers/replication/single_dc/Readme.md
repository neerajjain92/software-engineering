### Run all 3 nodes
```
docker-compose up -d
```

#### Run CQLSH tool on node n1

```
docker-compose exec n1 cqlsh
```

## CQLSH

```
create KEYSPACE pluralsight with replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
```

- Describe Ring for keyspace

```
docker-compose exec n1 nodetool describering pluralsight
```

- NodeTool status for keyspace.

```
docker-compose exec n3 nodetool status pluralsight
```

- Drop Keyspace

```
drop KEYSPACE pluralsight;
```

- Now create the keyspace with less replication

```
SELECT keyspace_name from system_schema.keyspaces;
create KEYSPACE pluralsight with replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
```

- Create table

```
CREATE TABLE courses (id varchar primary key);
consistency quorum
INSERT INTO courses(id) values ('react-big-picture');
```