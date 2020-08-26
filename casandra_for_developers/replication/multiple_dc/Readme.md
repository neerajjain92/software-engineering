- Create Keyspace with Network Topology Strategy

```
create KEYSPACE pluralsight with replication = {'class': 'NetworkTopologyStrategy', 'DC1':3, 'DC2': 1};
```

- Create Table

```
CREATE TABLE courses (id varchar primary key);
INSERT INTO courses(id) values ('react-big-picture');

CONSISTENCY EACH_QUORUM ;
NoHostAvailable: Error will come if DC2 is down/stopped
```