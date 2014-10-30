---
layout: post
title:  "Siz de Blog Yazısı Yayınlayın"
date:   2014-08-19 13:09:27
categories: mavidurak
keywords: mavidurakio kolektif blog
---

Mavidurak-IO'nun hedeflerinden biri de kollektif bir blog oluşturmaktır. Bu nedenle sizin de Mavidurak-IO üzerinde blog yazısı oluşturarak paylaşmanızı destekler. Sizin seçeceğiniz ana dalı bilişim olan bir konu üzerinde blog yazısı hazırlayarak, Mavidurak-IO blogunda yayınlayabilirsiniz.

### Nasıl Birlikte Çalışılır?

Yayınlama işlemi blogumuz GitHub üzerinde konuşlandığından, GitHub kullanılarak yapılmaktadır. Bunun için öncelikle bir [GitHub Hesabı](http://github.com)'nız olmalıdır. 

GitHub hesabınızla oturum açtıktan sonra, blogumuzun bulunduğu repoyu **fork**lamanız gerekmektedir. Bunun için [repomuza](https://github.com/mavidurak/mavidurak.github.io) giderek, sağ tarafta bulunan **Fork** butonuna basmanız gerekmektedir. Bu işlemden sonra sizin hesabınız üzerinde blogumuzun bir kopyası oluşacaktır. 

Daha sonra GitHub üzerinde oluşturduğunuz bu yeni depoyu makinenize almalısınız:

{% highlight bash %}
git clone git@github.com:kullanici_adiniz/mavidurak.github.io.git
{% endhighlight %}

Kendi kopyanız üzerinde çalıştığınız esnada, diğer değişiklikleri de takip etmek için deposunuzda uzak başvuru oluşturmanız gerekmektedir;

{% highlight bash %}
git remote add mavidurak git://github.com/mavidurak/mavidurak.github.io.git
git fetch mavidurak
{% endhighlight %}

Bu işlemden sonra birlikte çalışmaya hazırız demektir. 

### Blog Yazısı Oluşturma

Blog sistemimiz `Jenkyll` temeli üzerine inşaa edilmiştir. Kurulum aşamalarını [bu makaleyi](http://aristona.github.io/jekyll-ve-github-pages-kullanarak-kendi-blogumuzu-olusturmak/) okuyarak öğrenebilirsiniz.

Blog yazılarınız depo içerisindeki `_posts` klasörü altında listelenmektedir. Daha önce yazılmış blog yazılarını inceleyerek isimlendirme hakkında bilgi sahibi olabilirsiniz. 

Yeni bir blog yazısı oluşturduğunuzda, aşağıdaki gibi temel bilgilerin dosyasınız başında olması gerekmektedir.

{% highlight text %}
---
layout: post
title:  "Blog Yazınızın Başlığı"
date:   2014-08-19 13:09:27
categories: php
keywords: php class oop
---
{% endhighlight %}

Yazınızı test etmek için aşağıdaki komutu kullanabilirsiniz. Komutu uyguladıktan sonra `http://localhost:4000` adresinden blogu görüntüleyebilirsiniz.

{% highlight bash %}
$ jenkyll serve
{% endhighlight %}

Yazınızı oluştururken [Markdown](https://help.github.com/articles/markdown-basics) formatını kullanmanız gerekmektedir. 

### Yazınızı Yayınlamak

Yazınızı tamamladıktan sonra aşağıdaki gibi değişiklikleri kendi reponuza gönderebilirsiniz.

{% highlight bash %}
$ git add .
$ git commit -m "Örnek blog yazısı eklendi."
$ git push origin master
{% endhighlight %}

Bu işlemden sonra depoları birleştirmek için kendi proje sayfasınıza girerek `Pull Request` butonuna tıklamanız yeterlidir. 
