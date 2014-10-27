---
layout: post
title:  "Express nedir? Express ile nodejs projesi nasıl oluşturulur?"
date:   2014-10-27 12:50
categories: nodejs
---

Merhabalar, bu yazımda sizlere express.js modulünden bahsedeceğim. Öncelikle
### Express.js nedir?
Express, Nodejs ile hızlı ve düzenli proje gerçekleştirebilmemizi sağlayan web framework’üdür. Kurulumu da oldukça basit.
Express’i npm ile yüklemek için komut satırına aşağıdaki komutu yazmamız yeterlidir. Npm yüklü değilse öncelikle npm kurulumunu gerçekleştirmeniz gerekir.

{% highlight bash %}
$ sudo npm install -g express
{% endhighlight %}

sorunsuz bir şekilde yükleme gerçekleştiyse artık express ile proje oluşturabiliriz demektir.
Komut satırından proje oluşturmak istediğimiz dizine gelelim ve aşağıdaki kodu yazalım.
{% highlight bash %}
$ express -c styl proje_adi
{% endhighlight %}

Proje dosyalarını başka bir yazımda açıklayacağım. Şimdilik sadece projeyi ayağa kaldıracağız. Bunun için package.json dosyasındaki bağımlılıkların yüklenmesi gerekli. Eğer yüklenmesini istediğiniz bir kütüphane varsa bu dosya içerisine yazmanız yeterlidir. Aşağıdaki komutu girerek yüklüyoruz.
{% highlight bash %}
$ sudo npm install
{% endhighlight %}

Son olarak
{% highlight bash %}
$ npm start
{% endhighlight %}
diyerek projeyi çalıştırıyoruz. Tarayıcımızdan http://localhost:3000/’e girerek sonucu görebiliriz.

Okuduğunuz için teşekkür ederim.

Benimle aşağıdaki bağlantılardan iletişime geçebilirsiniz.
Kadir Yaka yakakadir@gmail.com www.kadiryaka.com @kadiryaka
