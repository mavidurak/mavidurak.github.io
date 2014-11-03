---
layout: post
title:  "Swift - Optionals Kavramı"
date:   2014-10-20 10:10
categories: Swift
author: gormelof
---
Merhaba bugün 2014 model bir dil (Swift) ile gelen, çokta aşina olmadığımız bir kavrama değineceğim.

Apple' ın desteği ile çıkan Swift yeni olmasının getirdiği bir çok avantaja sahip. Bunlardan bir tanesi, programlamada eksikliği hissedilen durumlara çözüm üreterek gelmesidir. Lafı daha fazla uzatmadan Optional kavramına giriş yapalım, buyrun.

Optional, türkçede ki karşılığı opsiyonel, isteğe bağlı, standart olmayan anlamına gelmektedir. Ben yine burada yazarken Optional olarak kullanacağım.

##Problem?
    
Düşünün bir fonksiyonunuz var, sonucu ise gelen değere göre değişecek (bazen bir değer verip, bazende bir değer vermeme durumu var). Apple' ın daha önce uygulama geliştirmek için kullandığı Objective - C dilinde bu durum obje veya nil (boş değer) döndürerek çözülür. Ancak bu durum sadece objeler için geçerlidir. Obje dışında ki veri türleri için `NSNotFound` gibi özel bir değer döndürülür. Bu gibi durumlarda geriye dönecek değer bilinmelidir, yoksa çok ciddi güvenlik problemleri oluşabilir veya Runtime (Çalışma zamanı) hatası alabiliriz.  
    
##Optional Kavramı
    
Yukarıda da bahsettik bu dilin yeni olmasının avantajı daha önce eksikliği hissedilmiş konulara çözüm getirmesiydi, Optional da bunlardan biri. Program yazarken sonucu net olmayan durumlarla karşılaşabiliriz, ailenin yeni üyesi (Swift), belirsizlikleri ortadan kaldırmak için tüm veri türlerini kapsayan, `Optional`' ı beraberinde getirdi.

Hemen bir tane Optional tanımlayalım.
  
{% highlight swift %}
var optionalValue : Int?
{% endhighlight %}

`optionalValue` adında Integer bir Optional tanımladık, dikkat ederseniz normal bir değişken tanımlamadan farkı, veri tipinin sonuna `?` gelmesidir.

Optional olarak bir değişken tanımladınız ve program öyle bir yere geldi ki sonucun ne olacağı belli, `?` işareti ile sonuca ulaşabilirsin.

Madem o kadar eminsin buyur.

{% highlight swift %}
var possibleString : String? = "Merhaba"

println(possibleString!) // Ünlem işarei ile sonuca direkt ulaştık ve yazdırdık.
{% endhighlight %}

Swift bize her ne kadar doğrudan erişim sunsa da uzmanlar böyle bir kullanıma sıcak bakmıyorlar. Peki önerilen ne? Şöyle ki; biz bu Optional değişkenimizi if - else yapısıyla entegre bir şekilde kullanabiliyoruz ve tavsiye edilende bu şekilde.

{% highlight swift %}
if possibleString {

println("possibleString değeri : \(possibleString!)")

} else {

println("possibleString değeri nil")

}
{% endhighlight %}

`possibleString` değeri varsa ekrana yazacaktır, eğer yoksa da `nil`' dir. Sağlıklı olan budur.

Biz bunu neden yaptık? Belirsizlikleri ortadan kaldırmış olduk, burada çok fark etmeyebilir ancak büyük çaplı projelerde fark eder, kod satırlarımız kısalır ve dökümantasyonu yazarken ciddi anlamda işimizi kolaylaştırır, standartlar bellidir.

Son olarak küçük bir uygulama yapıp bitirelim.

Bir metin için aradığımız karakterin yerini gösteren bir uygulama olsun.

Harfin yerini döndüren bir fonksiyon yazalım.

{% highlight swift %}
func positionFinding (letter: Character, str: String) -> Int? {

    var location = 0
    for l in str {
        var location++
        if l == letter {
            return location
        }
    }
    return nil
}
{% endhighlight %}

Fonksiyonumuz bu kadar, harfi ve metni parametre olarak alıyoruz, konumumu tutacak `location` adında bir değişken tanımladık ve çok aşina olmadığımız for döngüsüyle metnin harflerini tek tek kontrol kontrol ediyoruz.

Dikkat ederseniz fonksiyon dönüş tipini Optional Integer olarak belirledik, yani bu fonksiyon bize Integer bir değerde döndürebilir veya hiç bir şey döndürmez (nil), bu fonksiyon bize ya harfin yerini verecek ya da boş bir değer verecek.

Optional olarak tanımlanmayan bir değişkeni nil olarak tanımlayamayız, biz fonksiyonumuzun Optional bir değer döndüreceğini belirtmeseydik nil olarak döndüremezdik, hata alırdık.

{% highlight swift %}
if let location = positionFinding ("d", "test-mavidurak") {
    println("Aranan Harf \(location). karakterde.")
} else {
    println("Harf yok kardeşim (nil).")
}
{% endhighlight %}

Burada da fonksiyonumuzu if - else yapısıyla kullanarak, fonksiyondan gelecek veriye göre çözüm üretiyoruz.

Uygulama geliştirirken çok yerde kullanacağınız bir kavram. Umarım faydalı olmuştur.

Görüşmek üzere.
