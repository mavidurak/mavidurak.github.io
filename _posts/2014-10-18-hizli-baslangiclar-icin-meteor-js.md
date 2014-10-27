---
layout: post
title:  "Hızlı Başlangıçlar İçin Meteor.JS"
date:   2014-10-18 13:00
categories: javascript meteorjs nodejs 
keywords: meteorjs javascript js nodejs single-page application meteor
---

JavaScript'in son dönemde artan popülerliğinin de etkisiyle gün geçmiyor ki yeni bir JavaScript kütüphanesi/paketi ortaya çıkmasın. Her ne kadar JS back-end tarafında kendisini yeterince ispat etmiş sayılmasa da (henüz bunun için çok erken olduğunu düşünüyorum, şahsi görüşüm), **Node.JS** ve Node.JS altyapısını kullanan sistemler yazılım dünyasında büyük değişiklikler yaratacak gibi gözüküyor. Ben de elimden geldiğince bu furyaya katılıp son gelişmeleri takip etmeye çalışıyorum. Bu bağlamda temel Node.JS'e ek olarak, [Express.JS](http://expressjs.com) ve [Sails.JS](http://sailsjs.org) framework'lerini de inceleme fırsatım olmuştu. Ancak beni bu tarafta asıl cezbeden [Meteor.JS](http://www.meteor.com) adındaki platform oldu.

Meteor.JS'yi incelediğimizde, bana göre en önemli özelliği *back-end* ve *front-end* tarafına aynı anda kod yazılabiliyor olmasıdır. Bu nedenle **Full-Stack JavaScript Framework** olarak da anılıyor. İlk başta bu karışık gelse de, oldukça farklı bir çalışma yapısı var. Ama siz herşeyi kendiniz yapmayı seven bir geliştiriciyseniz muhtemelen kendisini pek sevmeyeceksiniz. Çünkü amacı; geliştiriciyi çok fazla uğraştırmadan, kısa sürede uygulama oluşturulabilmesi. Dilerseniz bundan sonraki bölümlerde biraz pratikte nasıl kullanılıyor bunu irdeleyelim.

### Kurulum

Çok basit bir kuluma sahip. Tek yapmanız gereken aşağıdaki kodu konsol üzerinde çalıştırmak ve Meteor'unuz kullanıma hazır.

{% highlight bash %}
$ curl https://install.meteor.com/ | sh 
{% endhighlight %}

Bundan sonra hemen aşağıdaki komutla yeni bir proje oluşturabilirsiniz;

{% highlight bash %}
$ meteor create myapp
{% endhighlight %}

Uygulamanızı çalıştırmak için tek yapmanız gereken uygulama klasörünüz içine girerek meteor ile uygulamanızı başlatmanız;

{% highlight bash %}
$ cd myapp
$ meteor
=> Meteor server running on: http://localhost:3000/
{% endhighlight %}

Hepsi bu kadar! Artık uygulamanız [http://localhost:3000](http://localhost:3000) adresi üzerinden çalışıyor. Yukarıdaki komutlardan başka hiçbir şeye ihtiyacınız yok. 

> Meteor'u çalıştırmak için ayrıca web sunucusuna ya da veritabanı kurulumuna ihtiyacınız bulunmuyor.
> Tek yapmanız gereken tek bir komutla Meteor'u bilgisayarınıza kurmak. Meteor.JS kendi içinde 
> [minimongo](https://github.com/slacy/minimongo) adında bir veritabanı ile birlikte geliyor. 


### Meteor'un 7 Prensibi

Meteor.JS geliştiricileri bize 7 tane olmazsa olmaz prensip sunuyorlar;

* `Data on the Wire`: Asla ve asla isteklerde HTML döndermeyin. Siz sadece veri yollayın ve bırakın client bu verinin nasıl işlenileceğine (render) karar versin. 
* `One Language`: Hem client hem de server tarafında tek dil olarak JavaScript kullanın.
* `Database Everywhere`: Veritabanına ulaşmak için hem server hem de client tarafında aynı API'yi kullanın.
* `Latency Compensation`: İstemci tarafında sıfır gecikmeyi sağlamak için önyükleme ve model simülasyonu kullanın.
* `Full Stack Reactivity`: Sürekli gerçek zamanlı kalın. Veritabanından şablonlara kadar olan tüm katmanlarda olay güdümlü olarak çalışın.
* `Embrace the Ecosystem`: Meteor açık kaynaklı ve entegre olmasından ziyade, bugünkü araçları ve frameworkleri kullanır.
* `Simplicity Equals Productivity`: Basit bir şay üretebilmenin en kolay yolu onun gerçekten basit olmasıdır. Bu temiz ve klasik API'ler ile başarılabilir.

> Bu prensipler içerisinde özellikle `Database Everywhere` ve `Latency Compensation` oldukça önemlidir. 
> Çünkü bu iki prensip nedeniyle gerçek zamanlı uygulamalar web üzerinden yapılabilmektedir. 
> Bir kullanıcı uygulamaya bağlandığında kendi tarayıcısı üzerinde de veritabanının bir simülasyonu oluşturulmaktadır.


### Klasör Yapısı

Yeni bir Meteor uygulaması oluşturduğunuzda **html**, **js** ve **css** olmak üzere 3 farklı dosya ile çalışmaya başlarsınız. Tüm html tasarımlarınızı Template adı verdiğimiz .html dosyalarında tutarsınız. Aşağıda bir template örneği görülmektedir;

{% highlight html %}
<!-- in myapp.html -->
<body>
  <h1>Today's weather!</h1>
  {% assign special = '{{> forecast}}' %}
  {{ special }}
</body>
<template name="forecast">
  {% assign special = '{{prediction}}' %}
  <div>It'll be {{ special }} tonight</div>
</template>
{% endhighlight %}

JavaScript dosyalarının içerisine de ilgili template'e özel olarak olaylar yazılmaktadır. 

{% highlight js %}
// in client/myapp.js: reactive helper function
if (Meteor.isClient) 
{
    Template.forecast.helpers({
        prediction: function () {
            return Session.get("weather");
        }
    });
} elseif (Meteor.isServer) {
    // server code
}
{% endhighlight %}

Şimdi yukarıdaki örneği inceleyelim. (CSS dosyalarına şuan ihtiyacımız yok.) `myapp.html` içerisinde body etiketleri arasında kalan bölümde **forecast** şablonunun nerede görüntüleneceği belirleniyor. Yine aynı dosya içerisinde template etiketiyle başlayan bölümlerde **forecast** şablonu tanımlanmış durumda. Uygulama başladığında **forecast** şabonu içerisinde bulunan **prediction** değeri javascript dosyası içerisinden dinamik olarak alınıyor. 

> Meteor bize dosya konumlandırmada sınırsız özgürlük sunmaktadır. `forecast` isimli şablonu aynı dosyaya koymak zorunda değiliz. 
> Adı başka bir şey olan ve belkide başka bir dizinde bulunan bir dosya olabilirdi. 
> Meteor uygulamayı başlatırken tüm klasörlerdeki tüm dosyaları tarar ve hangi şablonun nerede olduğunu belirler. 
> Uygulama başladıktan sonra siz dilediğiniz dosyası dilediğiniz yere kaydedebilirsiniz. Yeterki şablon isimleri birbirleri ile tutarlı olsun.

JavaScript dosyasını incelediğimizde **isClient** ve **isServer** kontrolleri dikkatinizi çekmiştir. Bu kontrollere göre hangi kodun sunucuda, hangi kodun istemcide çalıştığını belirtebiliyorsunuz. Neticede istemci tarafından e-posta gönderimi gerçekleştiremezsiniz ve bu tip kodları sunucu tarafında yazıyorsunuz. İstemci tarafındaki kodlara bakarsak, ilgili templatin **helpers** olarak adlandırılan fonksiyonlarının tanımlandığını görmekteyiz. Buradaki **prediction** şablon içerisinden çağırılır ve sonuç şablona aktarılır.

### Herşey Mi Güzel?

Meteor yukarıdaki basit örnekte anlatıldığından çok daha fazlasını yapabiliyor elbette. Siz de internette çeşitli kaynaklarda gösterilen örnekleri inceleyebilirsiniz. Ancak ne yazık ki Meteor'un henüz bir **stabil** sürümü bulunmuyor. Bu da yola çıkarken mutlaka düşünmeniz gereken bir durum. Henüz stabil olmadığı için de sürekli değişen bir yapısı bulunuyor. Dün yazdığınız kodların yarın çıkacak yeni sürümde çalışmayabilir. 

Meteor ile çok geniş çaplı (birçok ekran ve tablodan oluşan) uygulamalar yapılabileceği bana pek mantıklı gelmiyor. Ancak basit bir startup fikriniz varsa ve bir an önce yayınlayıp kullanıcıların tepkilerini görmek istiyorsanız Meteor tam size göre. Sadece aşağıdaki iki komutla *Facebook'la Oturum Açma* işlemini sisteminize entegre edebildiğinizi düşünen yeterli. :)

{% highlight bash %}
$ meteor add accounts-ui
$ meteor add accounts-facebook
{% endhighlight %}

{% highlight bash %}
<!-- in login.html -->
<template name="login">
  {% assign special = '{{> loginButtons}}' %}
  {{ special }}
</template>
{% endhighlight %}




[Özgür Adem Işıklı](http://ozziest.github.io) ([@iozguradem](https://twitter.com/iozguradem))












