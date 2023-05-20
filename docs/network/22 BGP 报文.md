
## BGP报文
	主要有两部分组成，分别是BGP报文头和具体报文内容：

### 1. BGP 报文头：
marker： 占用16个字节，默认为全F，用于检查BGP邻居头部的消息是否完整。
length：占用2个字节，用于描述BGP报文的总长度。包括报文头+具体报文内容
type：用于描述当前BGP报文类型，分为12345

### 2. Open 报文：
version：BGP 版本，默认都是4
my as：用于描述发出该open报文的路由器所述AS号，同时校验对端的AS号和本地配置的AS号是否一致。
hold time：描述路由器邻居失效时间，默认情况为keepalive时间的3倍，当两端holdtime时间不一致时，需要协商为数值低的执行。
BGP ID：用来描述发出该open报文的路由器BGP router-iid
Optional Parmeters Length: BGP协商参数字段长度
Optional Parmeters: BGP协商参数


> [!note]
> 查看该邻居的具体信息
> ```
> \<AR1>display bgp peer 12.1.1.2 verbose 
> ```
> 


## BGP 的路由是如何产生

1.  network 宣告路由表中已存在的路由条目。
2.  import-route引入路由（被引入的路由需要全局路由表加表）。
3.  自动聚合产生的路由条目（只能聚合import-route进来的路由条目，进行主类聚合）
   命令：\[AR1-bgp\] summary automatic
   被聚合的明细路由会被抑制，无法进行传递，只会传输聚合后的主类路由。
4.  手动聚合产生：aggregate 172.16.2.0 255.255.254.0 (detail-suppressed 手动抑制明细)

## 报文
1. Open 报文
   用于建立BGP邻居的连接，协商BGP参数的报文。
2. update 报文
   用于BGP邻居之间交互路由信息及路由属性的报文。
3. notification 报文
   差错报文，用于报错信息的传递，并且中断邻居关系的报文。
4. keepalive 报文
   用于保持邻居连接的报文，用于保活。
5. route-refresh报文
   用于在改变策略之后，请求邻居重新发送路由信息，并且只有支持刷新能力的设备才能响应报文。


## BGP邻居状态机

### 1. Idle
	BGP初始状态，一旦在BGP中配置了peer以后，或者重置了已存在的peer，就会进入这个idle状态，在这个状态下BGP不会向这个peer发送tcp三次握手，同时也会拒绝这个peer发来的TCP三次握手。
	在进入这个IDLE状态时，会触发华为的start事件，这个事件时间为32秒。在这个事件之后才开始建立该peer的三次握手，建立TCP连接，在发送了SYN以后进入到connect状态。
	常见的几种IDLE状态的原因：
	a、如果没有去往该peer的路由，那么就无法发送SYN，此时该peer会一直卡在idle状态。
	b、收到了notification报文之后会回退到IDLE状态。
	c、手动挂起邻居。  
```
	[AR7-bgp]peer 78.1.1.8 ignore  //手动挂起邻居   在邻居表中表现为：Idle(Admin)
```

### 2. connect（连接状态）
	在这个状态下，BGP会启动连接重传定时器（connect retry 默认为32秒），用于等待tcp完成3次握手。
	2.1 向邻居发起SYN后就会进入到这个状态，在这个状态完成TCP3次握手。
	2.2 如果TCP3次握手成功，则向该邻居发送open报文，然后转到opensent状态。
	2.3 如果TCP3次握手失败，将会把这个peer状态改为active。
	2.4 如果重传定时器超时，BGP没有收到邻居的响应，那么会卡在connect状态。
	常见的几种connect状态愿意：
	a、邻居没有给我响应。
	b、我的SYN在沿途中遇到了阻碍，没有到达对方（沿途路由不可达）
	c、EBGP邻居没有配置TTL多跳
	总结：卡在connect状态其实就是邻居没有给我响应。

### 3. active状态（活跃的）
	当TCP三次握手失败，才会进入这个状态。在这个状态下，BGP总是试图去建立TCP三次握手。
	3.1 如果在多次尝试下，TCP三次握手成功了，那么BGP会向该peer发送open报文，关闭重传定时器，装至opensent状态。
	3.2 如果在多次尝试下，TCP三次握手仍然失败，那么BGP会将该peer停留在active状态。
	3.3 如果冲床定时器32s超时，且没有得到该peer的响应，那么会转至connect状态。

### 4. opensent状态（open报文已发送状态）
	在这个状态下，BGP已经向该peer发送了OPEN报文，在等待对方给我发送OPEN报文。
	4.1 如果收到了对方发来的OPEN报文，参数协商成功，则会向该peer发送keepalive报文，然后转到openconfirm状态。
	4.2 如果收到了对方发来的OPEN报文，参数协商失败，则会向该peer发送notification报文，然后转至IDLE状态。


### 5. Openconfirm状态（open协商成功状态）
	5.1 在这个状态下，BGP等待对方的keepalive报文，如果收到了对方发来的keepalive报文则转换为established状态。
	5.2 在这个状态下，BGP如果收到了notification报文，则转换为idle状态。

### 6. Established （连接已建立）
	在这个状态下说明邻居已经建立完毕，这个状态下可以交互的报文：update, notification, keepalive, route-refrsh
	6.1 如果在这个状态下，收到正确的update和keepalive报文，那么BGP会认为邻居处于正常状态，继续保持。
	6.2 如果在这个状态下， 收到错误的update和keepalive报文，那么BGP会认为邻居处于异常状态，会发送notification报文，转到Idle状态。
	6.3 route-refresh报文的发送不影响邻居关系。