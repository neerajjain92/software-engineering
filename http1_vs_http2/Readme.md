## Http 1.1

Install HttpServer globally
```
npm install --global http-server
```

Then boot the server up
```
http-server .

and go to localhost:8080 to see the magic where images will load based on http1.1
```


## Http 2

Since http2 is secure by design choice so we can't run it on http we have to run it on https, so we will use

Caddy the HTTPS Web Server from scratch
```
brew install caddy
```

