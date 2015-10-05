---
layout: post
title:  "GulpJS İle İş Yükünüzü Hafifletin"
date:   2015-10-04 22:40
categories: nodejs
author: emrekose26
---
Gulpjs front-end’de iş akışınızı otomatikleştirmeye yarayan Nodejs tabanlı bir Javascript aracıdır.Bazen manuel olarak yapılan ve gereksiz yere vakit kaybedilen işlerde Gulpjs yardımınıza hızır gibi yetişmektedir.Alternatif olarak Grunt aracıda kullanılmaktadır ancak Grunt’u,Gulp’a göre kod bakımından okuması daha zordur ve Gulp üzerindeki konfigrasyonları nodejs kodu gibi çalıştırdığından Grunt’a göre daha hızlı çalışmaktadır.(Gulp ile yaptığınız tüm işleri Grunt ile de yapabilirsiniz)<!--more-->

###Gulp ile neler yapılabilir ?
- Javascript dosyalarınızı sıkıştırabilirsiniz [(gulp-uglify)](https://github.com/terinjokes/gulp-uglify)
- CSS dosyalarınızı sıkıştırabilirsiniz [(gulp-minify-css)](https://www.npmjs.com/package/gulp-minify-css)
- CSS ve JS dosyalarınızı tek bir dosyada toplayabilirsiniz [(gulp-concat)](https://github.com/contra/gulp-concat)
- Resimlerinizi sıkıştırabilir [(gulp-imagemin)](https://www.npmjs.com/package/gulp-imagemin/) ve optimize edebilirsiniz [(gulp-image-optimization)](https://www.npmjs.com/package/gulp-image-optimization)
- Javascript hata kontrolü yapabilirsiniz [(gulp-jslint)](https://www.npmjs.com/package/gulp-jslint/)
- CSS hata kontrolü yapabilirsiniz [(gulp-csslint)](https://www.npmjs.com/package/gulp-csslint/)
- SASS [(gulp-ruby-sass)](https://www.npmjs.com/package/gulp-ruby-sass/),LESS [(gulp-less)](https://www.npmjs.com/package/gulp-less/) ve Stylus [(gulp-stylus)](https://www.npmjs.com/package/gulp-stylus/) dosyalarınızı CSS çevirebilirsiniz
- Değişiklik yaptığınız dosya üzerinde watcher oluşturabilirsiniz [(gulp-watch)](https://www.npmjs.com/package/gulp-watch/)
- CoffeeScript dosyalarınızı JS olarak derleyebilirsiniz [(gulp-coffee)](https://www.npmjs.com/package/gulp-coffee/)

Daha fazla eklenti için [http://gulpjs.com/plugins/](http://gulpjs.com/plugins/) adresini ziyaret edebilirsiniz.

###Kurulum

Gulp yükleyebilmek için makinanızda nodejs yüklü olması gerekmektedir.Nodejs kendi sitesinden edinebilirsiniz.

Nodejs kurulumunu tamamladıktan sonra Gulp kurulumuna başlayabiliriz

{% highlight bash %}
npm install -g gulp
{% endhighlight %}

Gulp global olarak kuruldu ancak yapacağımız her projeye gulpjs tekrardan indirmek zorundayız.Bunun için terminalden proje dizinine giderek gulpjs projeye dahil ediyoruz.

{% highlight bash %}
npm install --save-dev gulp
{% endhighlight %}

Daha sonra projenin ana dizinine `gulpfile.js` adında bir js dosyası oluşturuyoruz.Bu dosya içerisine aşağıdaki kodları yazarak ilk taskımızı oluşturabiliriz.

{% highlight javascript %}
var gulp = require('gulp');
 
gulp.task('default',function(){
	console.log('Default task running');
});
{% endhighlight %}

Dosyayı kaydedip terminale **gulp** yazdığımızda karşımıza şöyle bir ekran gelecektir


![](http://emre-kose.net/wp-content/uploads/2015/09/Screenshot-from-2015-09-18-173540.png)

Burada **default** task adıdır.Default task dışında bir task yazmışsanız, terminale çalıştırmak için **gulp task_adı** komutunu yazmanız gerekmektedir.

Şimdide üstte bahsettiğim gulp-pluginlerden birkaçını deneyelim

Örneğin js dosyalarımızı sıkıştırıp tek bir dosyada toplamak istiyoruz.Bunun için gerekli pluginler : gulp-uglify ve gulp-concat

Hemen bu pluginleri projemize dahil edelim

{% highlight bash %}
npm install --save-dev gulp-uglify gulp-concat
{% endhighlight %}

`node_modules` klasörüne baktığınızda gulp-uglify ve gulp-concat klasörlerini gördüyseniz pluginler sorunsuz yüklendi demektir.

Şimdi `gulpfile.js` dosyamızın içeriğini güncelleyelim


{% highlight javascript %}
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');
 
 
gulp.task('scripts',function(){
	gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist/js'))
});
{% endhighlight %}

Daha sonra terminale gidip **gulp scripts** yazdığımızda app/js klasörü içerisindeki tüm js dosyalarını sıkıştırıp scripts.js klasöründe birleştirecek ve dist/js klasörüne atacaktır.

Aynı şekilde CSS dosyalarını sıkıştırıp,birleştirmek için önce gulp-minify-css plugini indirdikten sonra `gulpfile.js` içerisindeki kodları güncelleyelim.

{% highlight bash %}
npm install --save-dev gulp-minify-css
{% endhighlight %}

{% highlight javascript %}
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat');
 
 
gulp.task('scripts',function(){
	gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist'))
});
 
gulp.task('styles',function(){
	gulp.src('app/css/*.css')
		.pipe(minifyCSS({keepBreaks : true}))
		.pipe(gulp.dest('dist/css'))
});
{% endhighlight %}

Bu iki taskı çalıştırmak içinde terminale çalıştırmak istediğimiz taskın adını önüne gulp yazarak çalıştırıyoruz.
“Hepsini tek tek mi yazacağız? Nerde vakitten kazanç ?” dediğinizi duyar gibiyim.Sakin olun hemen onuda tek satır kodla halledelim.`gulpfile.js` dosyasını tekrar güncelleyelim.

{% highlight javascript %}
var gulp = require('gulp')
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat');
 
 
gulp.task('scripts',function(){
	gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist'))
});
 
gulp.task('styles',function(){
	gulp.src('app/css/*.css')
		.pipe(minifyCSS({keepBreaks : true}))
		.pipe(gulp.dest('dist/css'))
});
 
gulp.task('default', ['scripts', 'styles']);
{% endhighlight %}

Son satıra dikkat ederseniz **default** task yazdık ve bu task çalıştırıldığı anda ‘scripts’ ve ‘styles’ tasklarımızında çalışmasını sağladık.Artık terminale gidip **gulp** yazmanız yeterli olacaktır.

Aslında problemler bitmedi.Hala vakitten kaybımız var.Şimdide şöyle bir senaryomuz olsun.Css kodluyorsunuz ve her kaydettiğinizde sıkıştırma ve birleştirme işlemini terminale giderek **gulp styles** mi yazacaksınız ? Tabikide hayır.Bu oldukça zahmetli bir iş.Bunun için watcher oluşturacağız ve her kaydettiğimizde otomatik olarak tasklar çalışacak.

Önce gulp-watch plugini indirelim

{% highlight bash %}
npm install –save-dev gulp-watch
{% endhighlight %}

Daha sonra `gulpfile.js` dosyamızdaki kodları güncelleyelim.

{% highlight javascript %}
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat');
 
 
gulp.task('scripts',function(){
	gulp.src('app/js/*.js')
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('dist'))
});
 
gulp.task('styles',function(){
	gulp.src('app/css/*.css')
		.pipe(minifyCSS({keepBreaks : true}))
		.pipe(gulp.dest('dist/css'))
});
 
 
gulp.task('watch',function(){
	gulp.watch('app/js/*.js',['scripts']);
        gulp.watch('app/css/*.css',['styles']);
});
 
 
gulp.task('default', ['scripts', 'styles','watch']);
{% endhighlight %}

Eklediğimiz watch taskınıda default taska depend ettik.Artık terminale gidip **gulp** yazmanız yeterli olacaktır.

Umarım faydalı olmuştur.Bir başka yazıda görüşmek dileğiyle.
Kalın sağlıcakla...

















