# 快速入门

* JavaScript代码可以直接嵌在网页的任何地方，不过通常我们都把JavaScript代码放到\<head>中：
```html
<html>
<head>
  <script>
    alert('Hello, world');
  </script>
</head>
<body>
  ...
</body>
</html>
```
由\<script>...\</script>包含的代码就是JavaScript代码，它将直接被浏览器执行。

* 第二种方法是把JavaScript代码放到一个单独的.js文件，然后在HTML中通过\<script src="...">\</script>引入这个文件：
```html
<html>
<head>
  <script src="/static/js/abc.js"></script>
</head>
<body>
  ...
</body>
</html>
```







### typeof (检测给变量的数据类型)操作符
    * "undefined"