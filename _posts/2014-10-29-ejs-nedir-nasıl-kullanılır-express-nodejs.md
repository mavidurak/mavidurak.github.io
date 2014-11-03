---
layout: post
title:  "EJS nedir? Nasıl kullanılır? Express & Node.js"
date:   2014-10-27 14:30
categories: nodejs
author: ozziest
---
 
Merhaba arkadaşlar. Bu yazımda sizlere Node.js'in Express modulüyle ejs’in nasıl kullanılacağından kısaca bahsedeceğim. Express ile default olarak gelen .jade’e ısınamayanlar için oldukça işe yarar olduğunu düşünüyorum.
 
### EJS nedir?
 
Ejs, html şablonlarıyla, servis tarafımızdan gelen verileri birleştirebilmemizi sağlayan javascript kütüphanesidir. Php’de olduğu gibi html içerisine veri yollayıp bunu görüntüleyebilmemizi sağlar.

İlk olarak express ile yeni bir proje oluşturuyoruz. Express ile nasıl proje oluşturulacağını bilmiyorsanız ilgili [blog yazıma](http://mavidurak.github.io/nodejs/2014/10/27/Express-nedir-Express-ile-nodejs-projesi-nas%C4%B1l-olusturulur%3F.html) gözatabilirsiniz. Proje dosyalarımız içerisindeki package.json dosyasını açıp “dependencies” içerisindeki verilerin sonuna

{% highlight bash %}
"ejs": "*"
{% endhighlight %}

ekliyoruz.
app.js dosyasındaki

{% highlight bash %}
app.set('view engine', 'jade');
{% endhighlight %}

"jade" ifadesini "ejs" olarak değiştiriyoruz.

{% highlight bash %}
app.set('view engine', 'ejs');
{% endhighlight %}

/views klasörü içerisindeki .jade uzantılı index.jade dosyasının adını index.ejs olarak değiştiriyoruz.
Bu işlemi kullanacağımız bütün view dosyaları için yapmamız gerekir. Tabi içerisine de ejs modulüne uygun olarak değiştirmemiz gerekecek. Şuan için basit bir html yapısı ve “title” verisiyle değiştirebiliriz.

{% highlight bash %}
<html>
<head>
	<title>Nodejs title with ejs </title>
</head>
<body>	
<%- title %>
</body>
</html>
{% endhighlight %}

bu title verisini servisten yollamamız lazım. Hali hazırda express modulünde default olarak gelen kod işimizi görür. Gene de index.js içerisini buraya yazıyorum.

{% highlight bash %}
var express = require('express');
var router = express.Router();</code>
 
/* GET home page. */
router.get('/', function(req, res) {
res.render('index', { title: 'Express' });
});
module.exports = router;
{% endhighlight %}

Değişiklikleri kaydetmeyi unutmayalım.
Terminal’den komut satırına projemizin bulunduğu klasöre gidiyoruz ve

{% highlight bash %}
sudo npm install
npm start
{% endhighlight %}

komutlarını uygulayarak projeyi ayağa kaldırıyoruz. 
Herşey yolunda gittiyse tarayıcımızdan http://localhost:3000/ diyerek girdiğimizde karşımıza title verisinde belirttiğimiz “Express” yazısı gelecektir.

Okuduğunuz için teşekkür ederim.

Benimle aşağıdaki bağlantılardan iletişime geçebilirsiniz.

[GitHub Account](www.github.com/kadiryaka)
[Web Site](www.kadiryaka.com) 
[Mail](yakakadir@gmail.com) 
[Linkedin](https://www.linkedin.com/pub/kadir-yaka/7a/ba1/39) 
