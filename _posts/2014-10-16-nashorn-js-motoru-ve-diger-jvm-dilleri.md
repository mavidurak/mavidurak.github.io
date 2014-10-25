---
layout: post
title:  "Nashorn JS  Motoru ve Diğer JVM Dilleri"
date:   2014-10-24 00:59
categories: java
---

JVM içerisinde statik tipli dilleri çalıştırabilmenin birden fazla amacı bulunmaktadır. Bunlar;

* JIT (Just in Time) Compiler ile yüksek performans sunmak
* Birçok dilin çalıştırılmasıyla JVM’i Polyglot bir ortam haline getirmek
* Farklı dil ve ekosistemleri Java ekosistemine yakınlaştırmak
* Farklı dil ekosistemlerinin gücünü JVM’de birleştirmek

Java Sanal Makinesi üzerinde birçok programlama dili çalıştırılabilmektedir. Bu diller   ve   uygulayıcı kütüphaneler aşşağıdadır (dil= uygulayıcı  kütüphane şeklinde yazılmıştır. [*Kaynak](http://en.wikipedia.org/wiki/List_of_JVM_languages))

* `Ada`: JGNAT
* `BBx`: BBj is a superset of BBx, PRO/5, and Visual PRO/5.
* `C`: C to Java Virtual Machine compilers
* `CFML`: Adobe ColdFusion,Railo,Open BlueDragon
* `Common :Lisp` Armed Bear Common Lisp,CLforJava
* `JavaScript`: Rhino,Nashorn
* `Pascal`: Free Pascal,MIDletPascal
* `Perl :6` Rakudo Perl 6
* `Prolog`: JIProlog,TuProlog
* `Python`: Jython
* `REXX`: NetRexx
* `Ruby`: JRuby
* `Scheme`: Bigloo,Kawa,SISC,JScheme
* `Tcl`: Jacl


Yukarıda  listelenen programlama dilleri JVM bünyesinde koşturulabilmektedir.jsr 223( javax.scipt  paketi )  sayesinde jvm ortamında farklı  script dilleri koşturulabiliyor. Bazı diller yorumlama usülüyle koşturulurken, bazıları ise bayt koda dönüştürüldükten sonra koşturulmaktadır. Fakat, JavaScript haricindeki dillere karşılık bir uygulayıcı kütüphaneyi projenize eklemeniz gerekmektedir.

Örneğin JVM üzerinde Ruby dili ile uygulama geliştirmek istiyoranız, JRuby bağımlılığını Java projenize eklemelisiniz.

JRuby Maven Dependency
{% highlight xml %} 
<dependency>
<groupId>org.jruby</groupId>
<artifactId>jruby</artifactId>
<version>1.7.16</version>
</dependency> 
{% endhighlight %}

Diğer  diller için de benzer biçimde gereken bağımlılık Java projenize eklenmelidir.
Fakat, JavaScript programlama dili için olay biraz farklı bir durumda. Çünkü, Java 7 Rhino, Java 8 ise Nashorn isimli JavaScript motorlarını gömülü olarak JVM içerisinde bulundurmaktadır. Bu Java ekosisteminin JavaScript diline ne kadar önem verdiğini ayrıca göstermektedir.

##Java Scripting API
Java programlama dili, tüm bu listeli dilleri koşturabilmek için ortak arayüzlerin bulunduğu bir API sunmaktadır. Java Scripting API bileşenleri javax.script paketi içerisinde bulunmaktadır.
javax.script paketi oldukça basit arayüz ve sınıflar içermektedir.Bunlardan en önemlisi ScriptEngine arayüzüdür.

##ScriptEngine
ScriptEngine türünden nesneler, ScriptEngineFactory#getEngine metodu üzerinden eşsiz bir takma isim ile elde edilmektedir. Bu nesneler ile, String türünden kod blokları koşturulabilmekte, ayrıca Java ile iletişim kurulabilmektedir. Örneğin, Nashorn JavaScript motoru için "nashorn" veya "rhino" takma adları, Ruby için ise "jruby" takma adı kullanılmaktadır.

###Örneğin;
{% highlight java %} 
// Java 8 için JavaScript motoru
ScriptEngine engine = ScriptEngineFactory.getEngine("nashorn");
//Java 7 için JavaScript motor
ScriptEngine engine = ScriptEngineFactory.getEngine("rhino"); 
//Ruby için JRuby motoru
ScriptEngine engine = ScriptEngineFactory.getEngine("jruby"); 
//Python için Jython motoru
ScriptEngine engine = ScriptEngineFactory.getEngine("jython");
{% endhighlight %}

## Nashorn

Nashorn, Java 8 için özel olarak sıfırdan geliştirilen bir JavaScript motorudur.En buyuk avantajı jvm  ortamında  javascript dilini kullanmaya  olanak tanır.Aslında JVM içinde javascript çalışması okadar da yeni değil 1998 yılında  çıkarılan Rhino motoru  kullanılıyordu fakat  diğer js mootorlarına  göreçok yavaştı. Nashorn, Rhino JavaScript motoruna göre 5 kat daha fazla performans sunmaktadır.

Nashorn JavaScript motoru ecmascript 5.1 i destekler ecmascript  js dilinin standardize edilmiş halidir.Nashorn  bir browser  ortamı  değildir

JVM dillerinden Java Scripting API destekleyenler, ScriptEngine eval metodu ile kod bloklarını koşturma imkanı elde etmektedir. Bu sayede ortak arayüz bileşenleri üzerinden Java harici diller JVM üzerinde koşturulabilmektedir.

js de diziler dinemiktir  eleman eklendiğinde  devamlı  elaman eklenebilir. nashorn tip dönüşümü açısından  sadece  dizilere  izin veriyor.
## Kullanım Alanları
-konsolda(jjs)
-masaüstü ve  javascript
-java fx projelerinde
-sunucu taraflı  javaascipt
kullanılabilir

### Nashorn Engine Örneği
{% highlight javascript %}
//Nashorn Engine elde ediliyor.
ScriptEngine engine = ScriptEngineFactory.getEngine("nashorn");
engine.eval("function topla(a,b){ return a + b; }");
String sonuc=(String)engine.eval(topla(3,5);); //topla isimli JavaScript fonksiyonu tanımlanıyor.
System.out.println(sonuc); // topla fonksiyonu Nashorn ile koşturuluyor, ve sonucu elde ediliyor.sonuc=8
{% endhighlight %}

## JJS(Java Javascript Shell)
nashornun  bir komut aracı ( shell)i var . java8 bilgisayarınızda yüklü ise hemen cmd yi açıp JJS yazıp  javascript kodlarınızı  yazıp çalıştıabilir veya cmd den  dosyanızın oldugu bölüme kadar  gelin ve  jjs yi çalıştırın daha sonra load("dosyanızın_adı.js"); komutuu girersk çalıştırın. jjs  de  console.log  diye ekrana  çıktı veremeyiz tabiki  onun  yerine  print(); kullanacağız

## Avatar.JS

Oracle  tarafından geliştirilen javascript dilidir .Nashorn js motoru içinde çalıştırılabilir.avatar js yi kullanabilmek için minimum java 8  gerekir
open jdk  sitesinden bulunabilir.avatarjs  nodejs ye benzetilebilir. nashorn ile  avatar.js ile  kullanabiliriz
js ile yazılmış kompanentleri bileşenleri kullanabiliyoruz.
Bir node.js  geliştiricisi avatar.js ile javanın framework'üne , teknolojisine erişmek  isterse  avatar.js kullanabilir ve  REST kullanmaya ,websocket uygulamaarı geliştirebilir
https://avatar.java.net avatar js ye burdan ulaşabilirsiniz.

###  Engine Versiyonları ve Nashorn Takma Adları
{% highlight java %}
public  static  void main(String  args[])throws FileNotFoundException,ScriptException{
ScriptEngineManager  mgr= new ScriptEngineManager();
for(ScriptEngineFactory  factory : mgr.getEngineFactories()) {
  System.out.println("scrip tengine factory info");
  System.out.printf("\t script engine %s(%s)\n",factory.getEngineName(),factory.getEngineVersion());
  System.out.printf("\t language ::%s (%s)\n",factory.getLanguageName(),factory.getLanguageVersion());
  for(String na : factory.getNames()) {
      System.out.printf("\t engine  alias ::::::: %s\n",na);
  }
}
}
{% endhighlight  %}

## Invocable Arayüzü
{% highlight java %}
public  static  void  main(String [] args )throws ScriptException,NoSuchMethodException{
// invocable arayüzü java tarafından  javascript fonksiyonarını koşturmak için  bulunan  opsiyonel  bir arayüzdürs
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
engine.eval("var  person={};");
engine.eval("person.name='onur';");
engine.eval("person.surname='altunsoy';");
engine.eval("person.calculate=function(age){return  this.name+'::: '+this.surname+'::: '+age};");
engine.eval("calculate=function(one,two){return (one*two);}");
Invocable inv =(Invocable)engine;
Object person = engine.get("person");
Object  calculate =  inv.invokeMethod(person ,"calculate", 24);
System.out.println(calculate);
System.out.println(inv.invokeFunction("calculate",5,4));
}
{% endhighlight  %}

sonuç:
{% highlight html %}
onur::: altunsoy::: 24
20.0
{% endhighlight  %}

## Eval Metodu Örneği
{% highlight java %}
public  static  void  main(String [] args )throws ScriptException{
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
engine.eval("var person= new  Object();");
engine .eval("person.name='onur';");
engine.eval("person.surname='altunsoy';");
engine.eval("print(JSON.stringify(person));");
engine.eval("person.age=24;");
engine.eval("print(JSON.stringify(person));");
}
{% endhighlight %}

## Java Arraylist Sınıfını Kullanma

{% highlight javascript %}
var  arrayList= java.util.ArrayList;
var  arrayListType= new  arrayList;
arrayListType.add('onur');
print(arrayListType.size());
{% endhighlight %}

### JS Nesnelerini JSON Olarak Yazma
{% highlight javascript %}
var  person ={};
person.name="onur";
person.surname="altunsoy";
person.fullName=fullName=function() {
return this.name +"  "+this.surname;
}
print (JSON.stringify(person));
print(person.fullName());
{% endhighlight %}

### Java'nın Thread Sınıfını JavaScript İçinde Kullanma
{% highlight javascript %}
var Thread = Java.type("java.lang.Thread");
var MyThread = Java.extend(Thread, {
run : function() {
print("thread calisiyor");
}
});
var th = new MyThread();
th.start();
th.join();
{% endhighlight %}

### Java'nın Hashmap Sınıfını Kullanma

{% highlight javascript %}
var HashMap = java.util.HashMap;
var map = new HashMap();
map.put("apple","red");
map.put("car","black");
map.put("phone","grey");
print("phone " + map.get("phone"));
for (var  key  in map) print("key  "+key);
for each(var value in map) print("value  "+value);
{% endhighlight  %}

Sonuç:
{% highlight html %}
phone  grey
key  apple
key  car
key  phone
value  red
value  black
value  grey
{% endhighlight %}

## String Sınıfını Kullanma

{% highlight javascript %}
var StrArray = Java.type("java.lang.String");
print(StrArray);
var  StrArray  =new  StrArray(3);
print(StrArray);
StrArray[0]="onur";
StrArray[0]="furkan";
StrArray[0]="ömer";
{% endhighlight  %}
