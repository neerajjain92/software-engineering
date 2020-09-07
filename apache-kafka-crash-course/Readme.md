# Apache Kafka

Table of Contents :
- Kafka Components
- Example:
    - Spin up Kafka Cluster
    - Spin up Zookeeper
    - Write nodeJs Producer/Consumer
- Pros and Cons of Kafka
- Summary

### Hands On

1. Create Isolated network where both container can run
```
docker network create --driver bridge isolated_network
```

2. Spin up zookeeper
```
docker run --name zookeeper -p 2181:2181 --net isolated_network zookeeper
```

3. Inspect Zookeeper container and get the IP Address to be used 
```
docker inspect {CONTAINER_ID}
```

3. Spin up Kafka
```
docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=172.25.0.2:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 --net isolated_network confluentinc/cp-kafka
```