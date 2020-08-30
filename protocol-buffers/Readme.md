### Protocol Buffer


- Steps to generate compile protoc

1) Download protoc compiler for your OS from here https://github.com/protocolbuffers/protobuf/releases

2) Extract the compiler in your project directory for time being

3) Generate the JS file with the following command by compiling the proto file

```
./protoc --js_out=import_style=commonjs,binary:. employees.proto 
```

4) Install Google Protobuf runtime using following command

``` 
npm install google-protobuf
```