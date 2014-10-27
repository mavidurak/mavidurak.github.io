---
layout: post
title: "Ameleler için Typescript"
date: 2014-10-27 14:31
categories: javascript
---

# Typescript

Merhabalar,

Bu yazımızda javascript'in daha güvenilir hali olan typescript'i inceleyeceğiz. Öncelikle typescript tip desteğini, javascript'e katarak yazılım geliştiricileri için daha güvenli ve anlaşılabilir yazılımlar geliştirmeyi amaçlamıştır. Geliştiricisi Microsoft olan typescript diliyle; sınıflar, arayüzler yapabilir, oluşturacağınız değişkenlerin bu sınıflara kesinlik dahilinde erişilebilmesini sağlayabilirsiniz.

> Yazıya devam etmeden önce mutlaka nodejs ile uğraşmış olmanız, javascripten haberdar olmanız gerekmektedir. Eğer haberdar olmadan gelirseniz bu yazı size giderek ağırlaşarak yük olmaya başlar. Ayrıca ek olarak oop bilgiside extend, implement olsun sınıflar, arayüzler olsun bir takım temellerin olması gerekmektedir. Fazla uzun olmasın diye yazıda bu tür bilgilere yer verilmemiştir. 

## Nasıl yani?
Şöyleki normal javascript kodumuzda bir fonksiyonun bir parametresinin kesinlikle string olmasını sağlamak için ekstra kontroller yapmamız gerekiyordu. Olası bir programlama hatasıyla bu kontrollerin unutulma gibi bir şansı vardır. Bu kontrollerin varlığını denetleyen bir yapı olmadığından hatanın kaynağını çalışma anında çöküş ile anlamaktayız. Bu yazılımcı için berbat bir şey çünkü kodladıktan sonra kendi kendine çökmeler görmeye başlayınca insan yaptığı işten nefret etmeye başlıyor. Bu işin profesyonel boyutuna inersek kodların anlaşılabilir olmasınıda zorlaştırıyor. Projeyi geliştiren birden fazla insan varsa muhtemelen birinin yaptığını diğeri anlamayacaktır.

Typescript ile proje geliştirirseniz statik tipli çalışmaya başlarsınız. Statik tipli çalışmak, popüler diller olan C#, C++ ve Java'daki gibi sınıf oluşturup belirli katmanlar ve kurallar çerçevesinde değişkenleri kontrol etmek demektir. Javascript'teki parametresine string kabul edecek fonksiyonu typescriptte aşağıdaki gibi kolaylıkla tanımlayabiliriz. 

{% highlight javascript %}
function ekranaYaz(yazi : string) {
	console.log(yazi);
}
{% endhighlight %}

Eğer programcı fonksiyonu ekranaYaz(5); şeklinde kullanırsa, typescript'te derleme aşamasında aşağıdaki gibi bir hatayla karşılaşacaktır.

	Could not apply type 'string' to argument 1 which is of type 'number'.
	
Bu şu anlama gelir. Bu fonksiyonda parametre kısmında 1. argüman yazı olmalıydı, oysa verilen sayıdır. Gördüğünüz gibi sadece ": string" yazarak kontrolü yapmış olduk. Umarım typescripte başlarken yeterince bilgiyi size ulaştırdım.

## Başlarken
Typescript ile programlamaya başlarken ortamımızı hazırlamamız gerekmekte. Yukarda farkettiyseniz typescript ile yazılmış bir kodu, derlememiz gerekmektedir. Derleme sonrasında kod javascripte dönüşmekte. Bu işlemi yapmak için npm paket yöneticisinden typescript paketini global olarak kurmamız gerekiyor. Global kurmamızın nedeni; paketin içerisinde çalıştırılabilir dosyaların tanımlandığı ve bu yüzdende paket yöneticisinin bunları proje klasörümüze kurmak yerine daha üst bir klasör konumuna kurarak, çalıştırılabilir dosyalara erişmeyi mümkün kıldırmasıdır. Konsol ekranını açarak aşağıdaki kodu giriyoruz. Tabiki bu işlem öncesinde nodejs ile çalışacağımızı unutmamak gerekiyor. Bu yüzden npm'in çalışabilmesi için nodejs'in kurulu olması gerekmektedir. 

	npm install -g typescript

Derleme, test ve çalıştırma gibi faktörleri projemizde güzelce sıraya bağlamamız gerektiğinden typescript yanında build-chain adındaki paketide global olarak kuruyoruz.

	npm install -g build-chain
	
Build-chain tarafımdan yazılmış bir process executor'dur. GNU derleyicisiyle (Windows'ta MinGW) uğraştıysanız makefile'i bilirsiniz. Bu ufak yazılım tıpkı makefile gibi projemizi hazırlamaya yarar..

Temel gereksinimler tamamlandıktan sonra üzerinde çalışacağımız proje için bir klasör açıyoruz, klasör içerisinde standart çalışma yapımızı yerleştiriyoruz bunlar;

* src klasörü: Derlenecek dosyaların bulunduğu klasör
* build klasörü: Derleme sonrasında dosyaların aktarılacağı klasör
* build.json dosyası: Build-chain yazılımının okuyacağı derleme şematiklerinin bulunduğu dosya

yapımızı oluşturduktan sonra, build.json'a derleme aşamalarını göstermemiz gerekmektedir. Build-chain'in nasıl çalıştığını burada anlatmayacağım, npm'nin sitesine build-chain yazarak gerekli dökümanı bulabilirsiniz. build.json'u aşağıdaki gibi dolduruyoruz.

{% endhighlight %}json
{
	"default": [
		"build-chain clear compile execute"	
	],
	"clear": [
		"del build\\app.js"	
	],
	"compile": [
		"node compile src .ts",
		"tsc temp/src/App.ts --module commonjs --target ES5 --out build/app.js --removeComments",
		"echo App.main(process.argv.slice(2)); >> build/app.js",
		"rmdir temp /s /q"
	],
	"execute" : [
		"node build/app.js"
	]
}
{% endhighlight %}

Doldurma işlemini tamamladıktan sonra, proje klasörüne komut satırında ulaşıyoruz ve build-chain yazıyoruz. Bu build.json'da belirttiğimiz default derleme processini çalıştıracaktır. Default process'tede compile ve execute'i çağırdık. Önce Programımızı derleyecek ve daha sonrada derleme başarılıysa çalıştıracak. 

>`Not:` Derleme mekanizmasını ilerki zamanlarda değiştirdim. Değiştirdiğim şekilde bu yazıyıda güncelledim. App.ts dosyasını yaratmadan önce şu linkten http://google.com compile.js'i yükleyip build.json'un bulunduğu dizine atmanız gerekmektedir. Bu compile.js kodunuzdaki referansların daha güzel bir biçimde yazılmasına olanak sağlar. Sınıfları yazarken göreceksiniz.

Şimdi yazdıysanız muhtemelen aşağıdaki gibi bir hata alırsınız.

{% endhighlight %}
------------------------------------------------------
build-chain-error  'tsc temp/src/App.ts --module commonjs --target ES5 --out build/app.js --removeComments'
------------------------------------------------------
 error TS5007: Cannot resolve referenced file: 'temp/src/App.ts'.
------------------------------------------------------
{% endhighlight %}
	
src klasörünün içerisinde herhangi bir derlenecek dosya yok bu yüzden böyle bir hata vermekte. src içerisine "App.ts" adında bir dosya oluşturuyoruz. Dosyayı oluşturduktan sonra artık bu bölümü bitirmiş bulunacağız.

## İlk sınıfım
Gerekli olan tüm adımları tamamladınız ve artık typescript kodlamaya hazırsınız. Kodlamaya app.ts dosyasını açarak başlıyoruz. Sınıflar üzerinde çalışmadan önce typescript'teki var olan tiplerden bahsedeceğiz. Tahmin edersenizki bunlara primitive types deniyor. Kodları denemeden önce mutlaka aşağıdaki yapıyı oluşturun. Build.json içerisinde otomatik olarak derlenecek dosyaları listeleyen ve bunları tsc'e derleten bir sistem var. Derleme sonrasında App.main() fonksiyonu çağırılmakta. Eğer App sınıfında static bir main fonksiyonu/methodu oluşturmazsanız hata ile karşılaşırsınız.

{% highlight javascript %}
class App {
	static main(args : string[]) {
		console.log("Selam canlar");
		// Derlenecek kodu buraya yazın
	}
}
{% endhighlight %}

##### Boolean
Tıpkı C#'daki bool ve Java'daki Boolean gibi çalışıyor. true veya false değerini alabiliyor. Örnek değişkeni aşağıda bulabilirsiniz.

{% highlight javascript %}
var esyaGeldimi : boolean = true;
{% endhighlight %}
	
##### Number
Bildiğiniz gibi javascript'te sayılar kendiliğinden hem double hemde int gibi davranıyor. Bu yüzden sayıyı ifade ederken ikisinden karma olan numberi kullanıyoruz. Örnek değişkeni aşağıda bulabilirsiniz.

{% highlight javascript %}
var esyaSayisi : number = 23;
var esyaBoyutu : number = 2.3;
{% endhighlight %}

##### String
Yazıları ifade ederken kullanacağımız primitive tip ise String olacaktır. Değişkenin değerini ayarlarken ister tek tırnak ('), ister çift tırnak (") kullanın derleyici bunu sorun etmeyecektir.

{% highlight javascript %}
var esyaAdi : string = "Karyola";
esyaAdi = 'Yatak';
{% endhighlight %}
	
##### Diziler
Dizileri ifade ederken tipin yanına [] koyuyoruz yada Array&lt;tip&gt; şeklinde de tanımlayabiliriz. Eğer dizinin eklenen elemanı belirlenen tipte değilse tsc derleme hatası verecektir.

{% highlight javascript %}
var esyaListesi : string[] = ["Yatak", "Televizyon", "Kumanda"];
var esyaSayisi : Array<number> = [1, 2, 2];

console.log(esyaListesi[1]); // "Televizyon"
console.log(esyaSayisi[1]); // "2"
{% endhighlight %}

##### Enum
Enum, tıpkı C deki gibi bir ifadeyi sayısal olarak tutmaya yarar. Enum'u bir sınıfın dışında tanımlamayı unutmamalısınız. Kullanımını aşağıda görebilirsiniz.

{% highlight javascript %}
enum ParaBirimi {
	TL,
	EURO,
	DOLLAR,
	YEN
}

var para : ParaBirimi = ParaBirimi.TL;
console.log(para); // 0
console.log(ParaBirimi[0]); // TL
if(para == ParaBirimi.EURO) {
	console.log("avrocu seni");
}
{% endhighlight %}

{% highlight javascript %}
enum Bilgi {
	Hizli = 1,
	Agir = 2,
	Buyuk = 4,
	Tatli = 8
}

var araba : Bilgi = Bilgi.Hizli | Bilgi.Agir;

if(araba & Bilgi.Buyuk) {
	console.log("Araba buyuk");
} else {
	console.log("Araba kucuk");
}
{% endhighlight %}

##### Any
Bir tipe bağlı olmadan süper türde bir değişken oluştururken kullanıyoruz.. Typescript'e statik tiplerle çalışmak için geçtik. O yüzden any gibi dinamik tip'i önermiyoruz. Mümkün oldukça kullanmayın..

{% highlight javascript %}
var mesaj : any;
mesaj = 1; // sorun yok
mesaj = true; // sorun yok
mesaj = "selam"; // sorun yok
mesaj = new Sinif(); // sorun yok

var superDizi : any[] = [1, 2, true, "Super"]; // gene sorun yok vay be
{% endhighlight %}

##### Void
Any'in tersi gibidir. Hiçbir tipi kabul etmez. Fonksiyonlarda return döndürülmeyecekse kullanılabilir.
{% highlight javascript %}
function mesajYaz(mesaj : string) : void {
	console.log(mesaj);
}

mesajYaz("Selam");
{% endhighlight %}

### Sınıflar
Primitive tipleri tamamladıktan sonra ilk sınıfımızı yazalım ve bunu main methodu içerisinde kullanalım;

##### Renk.ts
{% highlight javascript %}
enum Renk {
	Mavi,
	Kirmizi,
	Yesil,
	Beyaz,
	Siyah
}
{% endhighlight %}

##### Araba.ts
{% highlight javascript %}
ref "Renk";

class Araba {
	marka : string;
	model : string;
	uretim : number; 
	renk : Renk;
	
	constructor(marka:string, model:string, uretim:number, renk:Renk) {
		this.marka = marka;
		this.model = model;
		this.uretim = uretim;
		this.renk = renk;
		
		console.log("Araç üretildi!, Üretilen araç: ", this);
	}
}
{% endhighlight %}

##### Toyota.ts
{% highlight javascript %}
ref "Araba";

class Toyota extends Araba {
	constructor(model:string, uretim:number, renk:Renk) {
		super("Toyota", model, uretim, renk);
	}
}
{% endhighlight %}

##### App.ts
{% highlight javascript %}
ref "Araba";
ref "Toyota";

class App {
	static main(args:string[]) {
		var toyota = new Toyota("Corolla", 2014, Renk.Siyah);
		var ford = new Araba("Ford", "Focus", 2009, Renk.Mavi);
	}
}
{% endhighlight %}

Kodlarımızı çalıştırırsak konsolda alacağımız sonuç;

	Araç üretildi!, Üretilen araç:  { marka: 'Toyota', model: 'Corolla', uretim: 2014, renk: 4 }
	Araç üretildi!, Üretilen araç:  { marka: 'Ford', model: 'Focus', uretim: 2009, renk: 0 }
	
Sonuçları değerlendirdikten sonra kodumuzu incelemeye başlayalım. Sınıfları oluştururken `class [sınıf adı]` şeklinde oluşturuyoruz. Her sınıf için ayrı dosya oluşturmamız gerektiğini unutmayalım. Mümkün oldukça alışkanlık yaparsanız iyi olur.

Kodların en başlarında `ref "****"` şeklinde yapılar var. Bu yapılar başka bir dosyayı yüklemenize olanak sağlıyor. Örneğin Araba.ts içerisindeki Araba sınıfında Renk tipi kullanılmakta. Renk tipide Renk.ts içerisinde enum Renk şeklinde tanımlanmış. Bunu Araba.ts içerisinde kullanabilmemiz için ref "Renk"; yazmamız gerekiyor. build.json içerisinde çağırdığımız compile.js bunu typescriptin anlayabileceği hale getiriyor. Typescript'te kodunuzu derlerken Araba içerisinde Renk çağrıldığını anlıyor ve önce Renk'i derliyor. 

> İsterseniz ref yerine reference veya include kullanabilirsiniz. Ayrıca " yerine &lt; ve &gt; kullanabilirsiniz; reference&lt;Araba&gt;; veya include "Toyota";

Sınıfları oluşturduktan sonra `marka : string;` gibi ifadeler yazdık. Bu ifadeler sınıfın marka adında bir değişkene sahip olacağını gösterir. Bu değişkene sınıflar içerisinde this.marka şeklinde ulaşabiliriz. Ayrıca App.main'de var toyota'da oluşturduğumuz Toyota nesnesinin marka değişkenine; `toyota.marka` şeklinde erişebiliriz. Diğer popüler dillerden farklı olarak eğer başına erişim belirleyici(public, private..) yazmazsak default olarak public değer alacaktır.

Eğer markayı private yapmak istersek aşağıdaki gibi bir yol izleyebiliriz;

	private marka : string;

> Typescript'e protected desteği gelmiştir. Ancak halen development aşamasında olduğundan aktif olarak kullanmamaktayız.

Devam edersek geleceğimiz yer constructor adında bir yapı olacaktır. Bir sınıfın yapıcı fonksiyonunu constructor ile yaparız. Yukardaki Araba.ts'teki gibi constructorun parametre kısmına marka, model, uretim ve renk bilgilerini yazdık. Bunları `new Araba("Ford", "Focus", 2009, Renk.Mavi);` dediğimizde kullanmaktayız. Aynı C++'daki gibi.. Sınıflarda fonksiyon tanımlarken;

{% endhighlight %}
fonksiyon_adi(parametre : tip) : tip {
	içerik
}
{% endhighlight %}

şeklinde tanımlamaktayız. tıpkı değişkenlerdeki gibi erişim belirleyicilerini fonksiyon_adindan önce yazabiliriz. 

Toyota sınıfına bakarsak `class Toyota extends Araba` şeklinde bir ifade görürüz. Burada Toyota sınıfının Araba sınıfından kalıtılarak oluşturulduğunu belirtiyoruz. OOP Bilgilerimizi hatırlarsak Araba sınıfından Toyota sınıfına kalıtım aldığımızda, Araba sınıfının tüm üye değişkenlerini Toyota sınıfınada aktarmış olmaktayız. Şuanda Protected tagı bulunmadığından Araba sınıfının üye değişkenine, Toyota sınıfından erişmek istiyorsak public erişim belirleyicinin üye değişkeninde kullanılması gerekmektedir. İlerki sürümlerde protected geleceği için böyle bir zorunluluğa ihtiyaç olmayacaktır.

App.ts'e gelirsek App sınıfını görüyoruz ve bunun içinde static olan main methodu var. Main methodunu static yapmamızın nedeni App.main şeklinde erişebilmek içindir. Derleme sistemimiz tamamlandıktan sonra derlenen dosyanın sonuna otomatik olarak App.main'i çağıran bir kod ekledik. static nedir bilmiyorsanız oop bilgilerinizi tazelemenizi öneririm.

## Interface

Sınıfları öğrendik, peki oop'un diğer bir parçası olan interface'leri typescript üzerinde nasıl yapacağız. Bildiğiniz üzere interfaceler dışarıdan erişilebilir elemanların olması gerektiğini sınıfa belirten kod parçacıklarıdır. Örneğin insan interfacesi'nden bir sınıf tanımlarsak, bu sınıfta insana ait özelliklerin mutlaka `dışarıdan erişilebilir` bir biçimde tanımlanması gerekmektedir. Buradaki dışarıdan erişilebilme zorunluluğunuda örneklerle açıklayacağız..

##### IHayvan.ts
{% highlight javascript %}
interface IHayvan {
	isim:string;
	yuru():void;
	yemekye():void;
}
{% endhighlight %}


##### Hayvan.ts
{% highlight javascript %}
ref "IHayvan";

class Hayvan implements IHayvan {
	isim:string;
	
	constructor(isim:string) {
		this.isim = isim;
	}
	
	yemekye():void {
		console.log(this.isim + " yemek yedi");
	}
	
	yuru():void {
		console.log(this.isim + " azcik yurudu");
	}
}
{% endhighlight %}


##### App.ts
{% highlight javascript %}
ref "IHayvan";
ref "Hayvan";
	
class App {
	static main(args:string[]) {
		var at:IHayvan = new Hayvan("At");
		at.yuru();
		at.yemekye();
	}
}
{% endhighlight %}

Kodlarımızı çalıştırırsak konsolda alacağımız sonuç;

	At azcik yurudu
	At yemek yedi

Hadi kodlarımızı inceleyelim. Öncelikle `IHayvan.ts` teki gibi interface oluşturduk. Interface oluştururken `interface [interface adı]` yazıyoruz. Oluşturulan interface'e isim adında ve string tipinde bir değişken koyduk ayrıca 2 tane yemekye ve yuru adinda void döndüren fonksiyon tanımladık.

IHayvan'ı kullanmak için `Hayvan.ts` adında bir dosya oluşturup Hayvan sınıfını burada tanımladık. Tanımlarken `class Hayvan implements IHayvan` şeklinde bir ifade kullandık. Implements tahmin ettiğiniz gibi bir sınıfa, bir interface'i göstermeye yarar tıpkı javadaki gibi. Hayvan içerisine interface'deki gereklilikleri koymadan derleseydik derleme aşamasında aşağıdaki gibi bir hata alırdık. 

{% endhighlight %}
------------------------------------------------------
build-chain-error  'tsc temp/src/App.ts --module commonjs --target ES5 --out build/app.js --removeComments'
------------------------------------------------------
src/Hayvan.ts(3,7): error TS2137: Class Hayvan declares interface IHayvan but does not implement it:

Type 'Hayvan' is missing property 'isim' from type 'IHayvan'.
------------------------------------------------------
{% endhighlight %}

Türkçe karşılığı: "Ayvan tipinde IAyvandan gelen 'isim' özelliği yok". Yani Hayvan sınıfına isim adında bir değişken koymadığımız için hata verdi. isimi yuru'u ve yemekye'i tanımladıktan sonrada hata vermeyecektir. 

App sınıfında da Hayvan sınıfından bir değişken ürettik ve parametresine "At" verdik. `at.yuru()` dediğimizde sınıfa gitti ve yuru fonksiyonunu çalıştırdı. Burada değişkenin tipine IHayvan verdik. Hayvan sınıfı IHayvan sınıfından türetildiğinden IHayvan tipindeki bir değişkene Hayvan sınıfını gönderebiliriz.

Ek olarak daha önce bahsetmediğim bir özelliği fark ettim. Eğer değişkenlerin sağına "?" eklerseniz nullable özellik alır. Bu sayede interface'lerde olması zorunlu olmayan, ama istendiğinde konulabilen değişkenleri tanımlayabiliriz.


##### IKutu.ts
{% highlight javascript %}
interface IKutu {
	hacim:number;
	icerik?:any;
}
{% endhighlight %}

##### App.ts
{% highlight javascript %}
ref "IKutu";
	
class App {
	static main(args:string[]) {
		var bosKutu : IKutu = {
			hacim: 50
		};
		
		var doluKutu : IKutu = {
			hacim: 50,
			icerik: {
				Top:1	
			}
		};
		console.log(bosKutu.icerik);
		console.log(doluKutu.icerik);
	}
}
{% endhighlight %}

Kodların çıktısı 

{% endhighlight %}
undefined
{ Top: 1 }
{% endhighlight %}

bosKutu'yu tanımlarken javascript'teki obje oluşturmayı kullandık. Typescript buna izin vermekte. Eğer ?'i içeriğe koymasaydık derleme aşamasında bosKutu için icerik girilmesini isteyecekti. Derleme hatayla sonuçlanacaktı..

Interface'leri kullanarak daha fantazik şeyler yapabiliriz. Örneğin fonksiyon yapısını tutmasını sağlayarak Filtre gibi işlerde fonksiyonların parametrelerine başka fonksiyonları gönderebiliriz. Javascript'te olmasına rağmen bunu typescript'te yapmaya kalktığımızda farklı yapılar kullanmamız gerekiyor. Örneğin C#'ta delegate kullanıyorduk..

##### IVoid.ts
{% highlight javascript %}
interface IVoid {
	():void;
}
{% endhighlight %}

##### Test.ts
{% highlight javascript %}
ref "IVoid";

class Test {
	sayHello(callback:IVoid) {
		setTimeout(() => {
			console.log("HELLOO!");
			callback();
		}, 1000);
	}
}
{% endhighlight %}

##### App.ts
{% highlight javascript %}
ref "IVoid";
ref "Test";

var selamCak:IVoid = function() {
	console.log("Selam Cak");
}

function eskiTarz():IVoid {
	console.log("Eski Tarz");
	return;
}

class App {
	static staticFonk():IVoid {
		console.log("Static Fonk");
		return;
	}

	static main(args:string[]) {
		var test = new Test();
		test.sayHello(() => {
			console.log("Lambda expression panpa");			  
		});

		test.sayHello(App.staticFonk);
		test.sayHello(eskiTarz);
		test.sayHello(selamCak);
	}
}
{% endhighlight %}

Şimdi arkadaşlar şu IVoid diye birşey yaptık. Aslında bunu yapmaya gerek yoktu yani tip olarak IVoid yazmak yerine `()=>void` de yazabilirdik ama bu gerçekçi olursak pek okunabilir bir halde değil. O yüzden böyle yapmak yerine interface yaptık. 

IVoid.ts'teki Inteface'ye bakarsak `():void;` diye birşey yazdık. Burada sanki ismi yazılmamış fonksiyon yazdık ve dönüş tipine void verdik. Typescript otomatik olarak bunu anlıyor ve IVoid'in bir fonksiyon olması gerektiğini kurguluyor. Sanırım bu şerefsizin daha çok özelliği var ilerki zamanlarda hepsini deneriz. Mesela içeri number parametresi alan ve boolean döndüren bir fonksiyon yapalım. Amacımız filtrelemek olsun.

{% highlight javascript %}
interface IFiltre {
	(x:number):boolean;
}

function KontrolEt(callback:IFiltre) {
	var result = callback(2);
	if(result) {
		console.log("kanka bu sayı bize uyar");
	} else {
		console.log("Valla hafız uza buradan");
	}
}

KontrolEt((x:number) => {
	if(x>5) return true;
	return false;
});
{% endhighlight %}

Bu şekilde bir sistemin, belirli bir kontrol mekanizmasını sistem dışarısından yapabilirsiniz. Açıkçası C#'da Multi-Threading'te olsada, Javada hiç kullanmadım bunu. Javascript async işleri çok başarılı yaptığından dolayı buradada kullanma gereği görüyoruz.

Şimdi IVoidli olana geri dönersek naptık orada Test.ts diye bir dosya oluşturduk. Onun içindede sayHello diye bir üye fonksiyonu yaptık. Parametresine IVoid tipinde bir fonksiyon alacağını söyledik. setTimeout ilede 1 saniye gecikmeyle fonksiyonumuzu çağırmadan önce Ekrana "Hello" yazdırdık. 

App.ts içerisindede Test sınıfımızın üretip, sayHello üye fonksiyonunu çağırdık. Çağırabileceğiniz tüm yolları belirttimki nasıl yapacağınız konusunda bir fikir sahibi olasınız.

## Modules

Farklı işler yapan ama aynı isimde sınıflar oluşturmanız gerektiğini düşünün. C# olsaydı şipşak namespaceyle hallederdiniz, yada javayla package oluşturarak işi bitirirdiniz. Ancak şuan typescriptteyiz napcaz !!!

Çözüm tabiki başlık! "modules".. Modules diyip jeneriği anlatmayacaz demi akü. Neyse arkadaşlar devam edersek. Tıpkı C#'daki isim uzayı gibi typescript'tede uzaylar vardır. Bu uzaylar module olarak adlandırılıyor. Moduleleri tanımlarken aşağıdaki gibi bir yol izliyoruz.

##### Siniflarim.ts
{% highlight javascript %}
module Siniflarim {
	var mesaj:string = "kanka su mesaj varya kanka";
	
	export class A {
		constructor() {
			console.log(mesaj);	
		}
	}
}
{% endhighlight %}

##### App.ts
{% highlight javascript %}
ref "Siniflarim"

class App {
	static main(args:string[]) {
		var a = new Siniflarim.A();
	}
}
{% endhighlight %}

Ekrana yazılan değer;

{% endhighlight %}
kanka su mesaj varya kanka
{% endhighlight %}

Siniflarim.ts içerisinde module tanımlasını `module [module adı]` şeklinde yaptık. daha sonra içerisine var mesaj diyerek bir string tanımladık. Sınıfta farklı olarak başına `export` ekledik. Export ekleyerek sınıfları, arayüzleri dışardan erişilebilir kılabilirsiniz. Aksi halde erişim mümkün olmayacaktır.

App.ts'tede A'sınıfından nesne üretirken `Siniflarim.A()` yazdık. Modül içerisinde tanımlanan sınıflara interface'lere erişirken modül adını yazmayı unutmuyoruz. Tabiki dışarıdan erişirken..

Ayrıca arkadaşlar sınıflarım modülü genişletmek isterseniz tıpkı C#'taki gibi gene module Siniflarim yazıp kodlarınızı yazmak ve onları yüklemek. Örneğin SiniflarimExtra.ts diye dosya açıp içine bunları yazın

{% highlight javascript %}
module Siniflarim {
	var mesaj:string = "Bir elin sesi var, iki elin nesi var? Yoksa böyle değil miydi?";
	export class B {
		constructor() {
			console.log(mesaj);	
		}
	}
}
{% endhighlight %}

App.ts'e SiniflarimExtra referansını ekleyip new Siniflarim.B() şeklinde nesneyi değiştirin. Sonuçları incelerseniz mesaj'ın 2 farklı yerde olduğunu ve her modulu acıp kapattığımda private etkiyi yaşayacağınızı söyleyebilirim. Çok terim konuştum ben bile anlamadım yav :D Kısacası modülü ayırırsanız sadece exportlara erişebilirsiniz okey...

Modulesle ilgili son bilgi olarak şunu vereyim. nodejs ile çalıştığımızdan express gibi kütüphaneleri kullanmak isteyeceğiz bunları

	import express = require('express');

diyip alabiliyoruz ancak şöyle bir durum var; typescript bunu tanımıyor. Tanıması için declare dosyası diye özel bir dosya yazıyoruz. Sanırım express için hazır vardı bu.. Bu declare dosyaları sınıfları baştan oluşturmuyor sadece expressi kullanarak proje geliştirirken typescript derleyicisinin sistemi tanımasını sağlıyor. Bu sayede daha güvenli bir şekilde kütüphaneleri kullanıyorsunuz...

## Generics
Arkadaşlar Jeneriğe bu yazıda sadece örnek vereceğim. Diğer devam yazımızda jenerikle ilgili daha detaylı bir inceleme yapacağız..

##### Jenerik.ts
{% highlight javascript %}
class Jenerik<T> {
	private value:T;
	
	constructor(value:T) {
		this.setValue(value);
	}

	getValue() : T {
		return this.value;	
	}

	setValue(value:T) {
		this.value = value;	
	}

}
{% endhighlight %}

##### App.ts
{% highlight javascript %}
ref "Jenerik";

class App {
	static main(args:string[]) {
		var jenerik : Jenerik<number> = new Jenerik<number>(5);
		console.log(jenerik.getValue());
		
		jenerik.setValue(123);
		console.log(jenerik.getValue());
		
		var jenerik2 : Jenerik<string> = new Jenerik<string>("selam");
		console.log(jenerik2.getValue());
		
		jenerik2.setValue("yeah");
		console.log(jenerik2.getValue());	
	}
}
{% endhighlight %}

## Bölüm sonu
Evet arkadaşlar bu bölümün sonuna geldik. Bir sonraki typescript ile ilgili yazımızı en kısa sürede sahnelerde göreceksiniz. Takip etmeye devam edin. kib bay sg kardeşler

Doğan Derya @co3moz <doganderya59@gmail.com>

