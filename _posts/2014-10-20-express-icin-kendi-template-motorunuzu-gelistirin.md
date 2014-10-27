---
layout: post
title:  "Express İçin Kendi Template Motorunuzu Geliştirin"
date:   2014-10-20 00:50
categories: nodejs
keywords: javascript expressjs nodejs template ejs jade
---
Merhabalar

Bu yazımda express uygulamalarımızda kullanmak üzere kendi template motorlarımızı nasıl yaratabileceğimizi anlatmaya çalışıyorum.

 Node JS'in en popüler uygulama geliştirme çatısı olan express'de server-side render yani sunucu taraflı çıktı hazırlama işlemleri için template engine adı verilen şablon motorlarını kullanırız, örneğin en popülerleri <b>jade</b> ve <b>ejs</b> dir.

Peki eğer istersek bizim belirlediğimiz kurallarla çalışan kendi template motorlarımızı yaratmamız mümkün mü?

<b>Tabi ki mümkün</b>

 Express'de kullanmak üzere kendi template motorunu yaratmak için <code>app.engine(ext, callback)</code> metodunu kullanabilirsin, bu metodun aldığı birinci parametre <code>ext</code> <b>extension</b> yani dosya uzantısını temsil eder, ikinci parametre de template motorunun dosyayı kabul ettikten sonra yapacağı işlemler için bir asenkron fonksiyondur, bu fonksiyona girilecek objeler <b>filePath</b> adındaki dosya adresi ve  şablona basılacak dinamik değerleri içerecek olan <b>options</b> objesidir.

 Şimdi aşağıdaki kodla çok basit bi template motoru geliştirelim, dosya uzantımız ".ebe" olsun.

{% highlight javascript %}
var fs = require('fs'); // dosya işlemleri yapacağımız için fs modülünü çağırmak zorundayız
app.engine('ebe', function (filePath, options, callback) { // burada template incaynımızı tanımlıyoruz ^^
  fs.readFile(filePath, function (err, content) {
    if (err) throw new Error(err);
    // burada çok basit bi render işlemi yapıyoruz ancak mantığı anlamana yetecektir
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});
app.set('views', './views'); // burada views klasörümüzü kendimiz belirleyebiliriz
app.set('view engine', 'ebe'); // dosya uzantımızı belirterek template motorumuzu express'e tanımlıyoruz
{% endhighlight %}



 Express uygulamamız artık <b>.ebe</b> uzantılı dosyaları render edebilecek, hemen index.ebe adında bir dosya oluşturup <b>view</b> klasörünün içine atalım ve içine şunları yazalım.

{% highlight javascript %}
#title#
#message#
{% endhighlight %}

Daha sonra express uygulamamızda şu rotayı tanımlıyoruz.


{% highlight javascript %}
app.get('/', function (req, res) {
  res.render('index', { title: 'Ebe Template Engine', message: 'Web artık ebelere emanet!'});
})
{% endhighlight %}

Uygulamayı ayağa kaldırdıktan sonra "/" adresini ziyaret edip sonucun html'e render edilmiş halini görebilirsin.

Furkan BAŞARAN <frknbasaran@gmail.com>
@frknbasaran


