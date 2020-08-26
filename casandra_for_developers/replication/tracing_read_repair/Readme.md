- Launch 3 node Single DC Cluster "docker-compose up -d"
- Create "pluralsight" keyspace with SimpleStrategy and replication factor of 3
- create "courses" table in "pluralsight" keyspace
- Run the "nodetool pausehandoff" command
- Shutdown one of the nodes with "docker-compose stop n2"
- Run cqlsh and insert one row in courses table
- Bring up the node you just shutdown with "docker-compose start n2"

###### Since hinted handoff were paused this new node will not automatically be brought up to date with the row we just inserted

- Run the cqlsh and set the consistency to "all"
- This will force the read repair to happen as part of your read request
- Set tracing to "on"
- Run a Select statement to retrieve the row you just inserted above
- Look for "DigestMismatchException" in the tracing output.
- This is the sign of that a read repair is necessary.