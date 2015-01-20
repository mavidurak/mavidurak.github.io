---
layout: post
title:  "Stack Overflow Zafiyeti ve Exploit Yöntemi"
author: ferdogan
date:   2015-01-20 16:25:20
categories: security
keywords: bufferoverflow exploiting stackbasedoverflow
---

Merhabalar,
Vizelerin, finallerin vs. araya girmesiyle neredeyse iki aydır yazmaya vakit bulamamıştım.
Bugün elimden geldiğince stack tabanlı zafiyetlerden ve ne şekilde exploit edilebileceğinden bahsetmeye çalışacağım.Sonraki yazılarda stack tabanlı zafiyetlerin windows ve linux üzerinde exploit edilmesini anlatarak exploit geliştirme konularına girmeyi düşünüyorum.Bu yazı daha çok stack overflow zafiyetinin mantığını anlamaya yönelik olacaktır.
Her neyse fazla uzatmadan başlayalım.<!--more-->

## Buffer Overflow (Arabellek Taşması) Nedir? ##

Buffer, hafızada ard arda dizili türde veri tipi(int,char gibi) depolayan hafıza bloğudur.C’de bunlar array olarak geçer.

Buffer Overflow ise, hatalı bir şekilde kullanılan fonksiyonlardan oluşan(strcpy,strcmp vs.) bir programda yer alan değişkenlere, saklama kapasitelerinden daha fazla veri yüklenmesi ile programın crash olması durumuna denir.E tamam sonra ne olacak? Kapasite aşıldığından dolayı programın akışı, normal akışta olmayan kodlarla yani shellcode olarak tabir edilen kodlar ile değiştirilebilir.

Yukarıdaki tanımı daha anlaşılır bir şekilde açıklarsak eğer; buffer overflow, programda ayrılmış olan tampon bellek bölgesine kapasitesinden daha fazla veri yüklenerek ve bunun sonucunda belleğin taşması ile ortaya çıkmış bir zafiyettir.


## Güzel Diyorsun da "Stack" Nedir?? ##
RAM’in düşük adresten başlayıp yüksek adrese giden bir yapısı vardır.İşletim sisteminde yeni bir thread oluşturulduğunda bellekte; fonksiyon parametrelerini, lokal değişkenleri ve fonksiyonların çalışması sonlandıktan sonra devam edeceği yeri saklamak için, yığın(stack) denilen alanlar oluşturulur. Her thread için iki yığın oluşturulur.Stack ya da diğer ismiyle Yığın, kısaca anlatmak gerekirse programlardaki değişkenlerin geçici olarak hafızada bulunduğu bölgedir.Bu bölgede dinamik değişkenler, fonksiyon çağrıları(jmp, call vs.), return değerleri gibi kısımlar saklanır.
Stack, LIFO(Last-In-First-Out) mantığıyla yani son giren ilk çıkar mantığıyla çalışır.
PUSH işlemi ile stack’e yeni bir eleman eklenirken, POP işlemi ile stack’in en üstündeki eleman stack’ten çıkarılır.
İşletim sistemi, her thread(process) için yeni bir stack alanı ayırır. Stack yeni oluşturulduğunda EBP ve ESP register’ları aynı yeri gösterir. Stack’e eleman PUSH edildikçe EBP register’i sabit kalırken, ESP register’ının değeri gittikçe azalır.

Stack yapısını şu şekilde çizmeye çalıştım:
![Stack Yapısı](http://ferdogan.net/assets/stack.png)


## Fonksiyonların Çağırılması Olayı##

Fonksiyon çağırılmadan önce, fonksiyon içindeki parametrelerin saklandığı EIP(Instruction Pointer) ve EBP(Base Pointer) registerları stack üzerine kopyalanır.Fonksiyon işlemleri tamamlandıktan sonra saklanan EIP register’ı stack’ten alınarak EIP register’ına kopyalanır ve program akışı kaldığı yerden devam eder.Sanırım bunu örnekle açıklamaya çalışsak daha iyi olacak.

Şimdi bir fonksiyonunuz olduğunu ve program içinde onu çağırdığınızı düşünün.Çağırdınız fonksiyon çalıştı bir şeyler yaptı sonra görevi bitti ve program kaldığı yerden çalışmaya devam etti.Tamam ama bu işlemler nasıl oldu? İnceleyelim efendim…

Bu kısmı anlatmak için arkadaşım Bekir Karul’un konuyla ilgili örneğinden yararlanmayı uygun gördüm.

{% highlight python %}
sayi = 5;
biseylerYap(5,3,5);
sayi = 10;
{% endhighlight %}

Yukarıdaki kodlar ne yaptı?
Önce sayi değişkeninin değeri 5 oldu, sonra program biseylerYap fonksiyonunu çağırdı, fonksiyon görevini yaptı sonra bir alt satıra geçti ve sayi değişkenini değeri 10 oldu.Bunun olabilmesi için o fonksiyonun çağırıldığında gerçekleşen “Function Prologue” denilen bir olay var orada, şimdi onu inceleyelim.

Function Prologue özetle 3 ana işlemden oluşuyor:

1. ESP’nin değeri, EBP olarak kopyalanıp, stack’e push edilir.
2. Bir sonraki instruction’ın adresi stack’e push edilir.
3. Ardından fonksiyon call edilir.

Function Prologue olayını anlamak için aşağıdaki kodu inceleyelim.

{%highlight python %}
gcc ferdogan.c -S -o ferdogan.S 
{% endhighlight %}
komutuyla kodu derleyin.

![kod](http://ferdogan.net/assets/kod.png)

ferdogan.S dosyasının içinde programın assembly halini inceleyebilirsiniz.


{%highlight nasm %}
pushl %ebp
movl  %esp, %ebp
call  _patlayici 
{% endhighlight %}

Yukarıdaki işlemleri sırasıyla açıklamak gerekirse:

1. Base pointer değeri stack’e gönderiliyor.
2. Yeni base pointer değeri, stack pointer’ın değeri ile değiştiriliyor.
3. Ardından call komutu ile fonksiyon çağırılıyor.


Bu anlattığımız fonksiyona girerken olan işlemler.Bir de bunun tersi var: “Function Epilogue”
Tahmin ettiğiniz üzere epilogue bu işlemlerin tam tersi.

![prologue](http://ferdogan.net/assets/prologue.png)

Evet masaüstü arkaplan büyüklüğündeki bir resimden sonra kaldığımız yerden devam edelim :)

>- Bir Programda fonksiyon çağırılmadan önce fonksiyon parametreleri yığına yazılır. Ardından fonksiyona girilmeden önce dönüş adres değeri stack’e atılır ve dönüş adres değeri fonksiyon sonlanırken tekrar çağırılarak program icrasına devam eder. Son olarak fonksiyondaki lokal değişkenleri tutmak için bir buffer alanı oluşturulur. Klasik arabellek taşması bu alanın taşırılarak EIP(İnstruction Pointer)’ye istenen bir değerin yazılması ve böylece program akışının değiştirilmesi durumudur.

## Tamam peki "Stack Overflow" Nasıl Oluşuyor? ##

Fazla detaya girmeden mantığını açıklamaya çalışırsam şu şekilde oluşuyor:

Bir programda genellikle sabit uzunlukta tampon belirlenir, bu tampon bölgesine gereğinden fazla veri yazılarak, yığın taşması oluşur.Bu durum hataya yol açar(crash durumu).Bu, genellikle yığın bitişik veri bozulması ile sonuçlanır(access violation) ve taşma yanlışlıkla tetiklenmiş ve programın çökmesine neden olur. 
Stack'in aşırı doldurulması stack öbeği üzerinde programın yönünün değiştirilmesine neden olur.

Biraz daha ayrıntılı ele alalım: 

Stack alanı dolup taştıktan sonra, EIP register'ının değeri değiştirilerek programın akış yönü değiştirilir.EIP yani instruction pointer, programda çalıştırılacak bir sonraki kodun adresini tutar.Bu adresi degiştirirsek programın akış yönünü istedigimiz şekilde değiştirebiliriz.EBP(Base Pointer) stack'in başlangıcını gösterir. ESP(Stack Pointer) ise yapılan push pop işlemlerine göre değişir(stack'in büyümesi-küçülmesi).

### Uygulama Zamanı! ###

Aşağıda oldukça masum görünen bir programımız var.

![overflow](http://ferdogan.net/assets/kod2.png)

Argüman olarak bir değer alınıyor, ardından bu değer fonksiyon içerisinde tanımlanan degisken isimli 120 baytlık alana kopyalaniyor.Peki 120 bayttan fazla veri girilince ne olacak?İşte o zaman stack overflow denilen zafiyet oluşuyor!

![overflow1](http://ferdogan.net/assets/overflow.png)

Belleğe 120 bayttan daha fazla veri yazıldığında bu veriler stack üzerine kopyalanmaya devam edecektir. Bu durumda programa girdi olarak çalıştırılmasını istediğimiz kodu belirtebilir ve EIP'ı bu koda yönlendirerek (JMP ESP) exploit edebiliriz.

![overflow2](http://ferdogan.net/assets/overflow2.png)

Stack tabanlı buffer overflow mantığı bu şekilde.Umarım anlaşılmıştır.

### Dikkat Patlayıcı! ###
Şimdi bu zararsız görünen ufak uygulamayı overflow edelim. 

* Aşağıda programın disassembly edilmiş halini inceleyebilirsiniz.Function prologue olaylarını vs. görebilirsiniz:

 ![overflow3](http://ferdogan.net/assets/overflow3.png)

* ![overflow4](http://ferdogan.net/assets/overflow4.png)

* Patlayıcı'yı ImmunityDebugger ile açtım.Ardından Debug > Arguments menüsünden programa argüman olarak 200 tane D harfi verdim. 

 ![D](http://ferdogan.net/assets/D.png)

 
 ![overflow5](http://ferdogan.net/assets/overflow5.png)

* Ardından programı çalıştırıyorum ve sonuç: BOM! 
 ![overflow6](http://ferdogan.net/assets/overflow6.png)
 Programımız çöküyor.

Registerların son halini ve alt tarafta stack'in durumunu görüyorsunuz. EBP ve EIP registerlarının değeri  44444444, bunun anlamı hexdecimal olarak 44'ün ASCII tablosunda D harfini işaret etmesi. 

Sonuç olarak stack doldu taştı ve programa girdiğimiz argüman, programın akışını değiştirebilecek olan EIP registerının değerini etkiledi. 

>- Bu tarz bir durumdan kurtulmak için strcpy fonksiyonunu kullanmak yerine strncpy fonksiyonunu kullanabilirsiniz.Bu tarz korunma yöntemlerine ilerleyen yazılarda değinmeyi düşündüğüm için şimdilik bahsetmiyorum.

Uzun zaman sonra biraz uzun bir yazı oldu, sıkılmadan okuduğunuz için teşekkür ederim.Yazının başında da bahsetmiştim.Bir sonraki yazılarda konuyla ilgili windows ve linux üzerinden uygulama yapmayı planladığım için konuyu burada bitiriyorum.
Bir sonraki yazıda görüşmek üzere.

[Kaynak](http://ferdogan.net/security/2015/01/07/Stack-Overflow-Zafiyetleri-Exploiting/)












