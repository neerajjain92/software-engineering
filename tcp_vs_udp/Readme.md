# TCP (Transmission Control Protocol)

Pros | Cons
--   | -- 
Acknowledgement | Larger Packets
Guaranteed Delivery | Larger Packets |
Connection Based | More Bandwidth |
Congestion Control | Slower than UDP |
Ordered Packets | Stateful |

Run the tcp.js 
```
(base) neeraj:tcp_vs_udp neeraj$ telnet 127.0.0.1 8080
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
Hello.hi
okay
```

----
# UDP (User Datagram Protocol)
Pros | Cons
--   | -- 
Smaller packets(No need for extra headers) | No Acknowledgements
Less Bandwidth required | No Guaranteed Delivery
Faster than TCP(Since not waiting for acknowledgement) | Connection-less
Stateless(Since no previous state is being maintained ) | No Connection Control
Ordered Packets not required | No Ordered Packets
No security overhead | No Security

Run the udp.js
```
echo "hello-world" | nc -w1 -u 127.0.0.1 8081

echo "hi" | nc -w1 -u 127.0.0.1 8081
```

---