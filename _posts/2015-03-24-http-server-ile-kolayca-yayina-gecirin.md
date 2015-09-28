---
layout: post
title:  "'http-server' ile Kolayca Yayına Geçirin"
date:   2015-03-25 22:00
categories: javascript
keywords: http-server local server
author: okanvurdu
---
Merhaba, bu yazıda geçtiğimiz günlerde keşfettiğim bir npm paketinden bahsedeceğim.

Web üzerine çalışmalar yapıyorsanız, çeşitli sitelerden indirdiğiniz HTML üzerine inşa edilmiş basit uygulamalar, temalar vb. içerikleri kişisel bilgisayarınızda açıp incelerken bazı fonksiyonel bileşenlerin düzgün çalışmadığını, hatta hiç çalışmadığını görebilirsiniz.<!--more-->

Buna en basit örnek **doğru bir biçimde yüklenmeyen sayfa ögeleri (javascript betikleri, stil dosyaları vb.)** gösterilebilir. Bu durumun sebepleri arasında gösterebileceğimiz ilk şey; indirdiğiniz çalışmanın yerel dosya sisteminize uygun olarak düzenlenmemiş olmasıdır. Daha net ifade edecek olursak indirdiğiniz çalışma bir web sunucusunda çalışacakmış gibi tasarlanmış olabilir.

Sadece bu iş için sunucu kiralamak, satın almak ya da varolan sunucunuza bunun için sürekli dosya yüklemek bir hayli zahmetli ve optimize olmayan bir çözümdür.

`http-server` kod adlı npm paketi bu işi kolay bir biçimde halletmek için ideal. Elbette çok daha farklı yolları seçerek daha optimize çözümler üretilebilir fakat, kısa sürede hızlıca çözüme ulaşmak için henüz daha iyi bir çözüm göremedim.

######Kurulum:
```
npm install http-server -g
```

Evet, hepsi bu kadar. Artık komut istemcinizi açıp herhangi bir dizine gittikten sonra `http-server` komutunu verirseniz http://localhost:8080 üzerinde aktif klasörünüz serve edilecektir.

> **Dipnot:** npm node.js için paket yöneticisidir. Bir npm paketi kurmak için sisteminize node.js yüklemiş olmalısınız. Kurulum bir blog yazısıyla anlatılmayacak kadar kolay: https://nodejs.org/

Görüşmek üzere!
