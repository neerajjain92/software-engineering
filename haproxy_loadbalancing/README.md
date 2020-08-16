## HA PROXY

- Install HA Proxy
- Simple Frontend :80 backend with many servers load balance
- ACL
    - Conditional app1 app2
    - Prevent admin access
- Enable HTTPS on HA Proxy
- Enable HTTP/2 on HA Proxy 

## Build image using Dockerfile
docker build -t nodeapp .

## Run instance of this app.

- docker run -p 2222:8888 -d -e APPID=2222 nodeapp

#### Run different instance of multiple app.

- docker run -p 2222:8888 -d -e APPID=2222 nodeapp
- docker run -p 3333:8888 -d -e APPID=3333 nodeapp
- docker run -p 4444:8888 -d -e APPID=4444 nodeapp
- docker run -p 5555:8888 -d -e APPID=5555 nodeapp


### Configure HA Proxy in front of our running servers

```
haproxy -f test.cfg
```