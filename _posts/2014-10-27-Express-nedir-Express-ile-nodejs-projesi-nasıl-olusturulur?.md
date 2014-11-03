---
layout: post
title:  "Express nedir? Express ile Node.js projesi nasıl oluşturulur?"
date:   2014-10-27 12:50
categories: nodejs
author: ozziest
---

Merhabalar, bu yazımda sizlere express.js modulünden bahsedeceğim. 

### Express.js nedir?

Express, Nodejs ile hızlı ve düzenli proje gerçekleştirebilmemizi sağlayan web framework’üdür. Kurulumu da oldukça basittir.

Express’i [NPM](https://www.npmjs.org/) ile yüklemek için komut satırına aşağıdaki komutu yazmamız yeterlidir. NPM yüklü değilse, öncelikle NPM'nin kurulumunu gerçekleştirmeniz gerekir.

{% highlight bash %}
$ sudo npm install -g express
{% endhighlight %}

Sorunsuz bir şekilde yükleme gerçekleştiyse, artık Express ile proje oluşturabiliriz.
Komut satırından proje oluşturmak istediğimiz dizine gelelim ve aşağıdaki kodu yazalım.

{% highlight bash %}
$ express -c styl proje_adi
{% endhighlight %}

Proje dosyalarını başka bir yazımda açıklayacağım. Şimdilik sadece projeyi ayağa kaldıracağız. Bunun için package.json dosyasındaki bağımlılıkların yüklenmesi gerekmektedir. Eğer yüklenmesini istediğiniz bir kütüphane varsa bu dosya içerisine yazmanız yeterlidir. Aşağıdaki komutu girerek yüklüyoruz.

{% highlight bash %}
$ sudo npm install
{% endhighlight %}

Son olarak aşağıdaki komutla projeyi çalıştırıyoruz;

{% highlight bash %}
$ npm start
{% endhighlight %}

Tarayıcımızdan http://localhost:3000’e girerek sonucu görebiliriz.

Okuduğunuz için teşekkür ederim.

Benimle aşağıdaki bağlantılardan iletişime geçebilirsiniz.

Kadir Yaka yakakadir@gmail.com www.kadiryaka.com @kadiryaka
