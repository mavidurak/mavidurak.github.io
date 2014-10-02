---
layout: post
title:  "Passport.js ile Node JS'de Yetkilendirme Yönetimi"
date:   2014-10-02 23:12:00
categories: nodejs
---

  Passport.js Node JS için geliştirilmiş authentication(yetkilendirme) modülüdür, bu modülü kullanarak destek veren tüm sosyal ağ hesaplarına erişebilir, web uygulamalarınızda oturum denetimini bu sosyal ağların aracılığıyla yönetebilirsiniz.
  Bu modül tek bir işi yerine getirmek için geliştirilmiştir, yetkilendirme. Yazıda ilerledikçe göreceksiniz ki işinde oldukça iyi ve oldukça kullanışlı özelliklere sahip. Destek veren herhangi bir sosyal ağın API(Application Programming Interface)'nı kullanarak ziyaretçilerin web uygulamanıza giriş yapmanızı sağlamanız Passport.js ile çok kolaydır.
  
  Modern web uygulamalarında yetkilendirme çok farklı şekillerde yapılabilir, geleneksel yöntemde kullanıcılar sisteme kullanıcı adı ve parolalarıyla giriş yaparlar. Ancak sosyal ağların yükselişiyle birlikte artık yetkilendirme işlemleri Facebook Twitter gibi popüler OAuth sağlayıcılarının single sign-in (tek bir oturum açma) trendine doğru kaymaya başladı. Çoğu zaman bu sosyal ağların altyapılarını kullanarak oturum açabilmek ve kullanıcıların bilgilerine erişebilmek için token denilen geçici anahtarlar kullanılır.
  Her web uygulamasının farklı kullanıcı bilgilerine gereksinimi vardır ancak passportJs tüm bu gereksinimleri karşılayabilecek şekilde tasarlanmış oldukça kullanışlı bir modül.
  PassportJs'de yetkilendirme mekanizmaları "Strategy" diye tanımlanır, her sosyal ağın mekanizması farklıdır ancak passportJs bağımlılıkları yok ederek modüler şekilde tasarlandığından tüm "Strategy" modülleri ayrı birer pakettir. Hangi sosyal ağ aracılıyla bilgilere erişmek isterseniz uygulamanıza onu eklersiniz olur biter.
  
  Biraz sonra tek tek açıklamadan önce size ne kadar temiz bir kod yazımı sağladığını göstermek için basit bir örnek vermek istiyorum
  
  {% highlight javascript %}
  app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                      failureRedirect: '/login' }));
  {% endhighlight %}
  
  PassportJS'i node package manager üzerinden tek satırla yükleyebilir, uygulamanıza ekleyebilirsiniz.
  
  {% highlight bash %}
  $ npm install passport
  {% endhighlight %}
  
  ### Yetkilendirme
  
   Server'a gelen bir yetkilendirme yani oturum açma isteğini uygun şekilde karşılamak `passport.authenticate()` yazmak kadar kolaydır. Methodun içine kendiniz için uygun olan "Strategy" i yazarsınız ve sistem tıkır tıkır işler.
   
  {% highlight javascript %}
   app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      // Eğer bu fonksiyon devreye girdiyse, yetkilendirme başarılı demektir
      // `req.user` objesi yetkilendirilmiş kullanıcının bilgilerini içerir
      res.redirect('/users/' + req.user.username);
    });
  {% endhighlight %}
  
  Görüldüğü gibi yukarıdaki kodda stratejimizi `local` olarak belirledik. Yukarıdaki senaryo yetkilendirme sırasında bir hata oluşmaması durumunda olacak güllük gülistanlık durumu gösteriyor, ancak biliyoruz ki hayat bu kadar kolay değil. İşlerin boka sarması durumunda yani diğer tabirle yetkilendirme sırasında bir hata oluştuğunda PassportJS varsayılan olarak `401 Unauthorized` HTTP headerını döndürür. Eğer yetkilendirmede sorun çıkmazsa `req.user` objesi tanımlanır ve işlemlerimizde kolayca kullanabiliriz, bu kısımla ilgili ayrıntıları konfigrasyon kısmında detaylı şekilde beraber görücez.
  
  ## Yönlendirmeler
  
    Her yetkilendirme isteğinden sonra sonuca göre uygun bi yönlendirme mutlaka yapılır, tabi giriş isteği yaptıktan sonra ekrana bakıp bekleyen zombiler yaratmak istemiyorsanız.
  
  {% highlight javascript %}
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login' }));
  {% endhighlight %}  
  
  Bu düzenlemeyle fonksiyonun varsayılan davranışını override ettik, yani ezdik kendi kuralımızı belirledik. Herhangi bir problem olmadan yetkilendirme tamamlanırsa kullanıcıyı anasayfaya yönlendiricez, ancak herhangi bi problem oluşur da yetkilendirme başarısız olursa kullanıcı login sayfasına tekrar geri gelecek.
  
  ## Flash Bildirimler
  
    Yönlendirmelerle birlikte kullanıcılar için işleri anlamlı hale getirecek bildirimler de göndermeliyiz, o da şöyle.
  
  {% highlight javascript %}
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })
  );
  {% endhighlight %}  
  
  Muhtemelen sizin de dikkat ettiğiniz gibi kodumuza yeni bi parametre daha ekledik `failureFlash:true`, bu tanımlamayla PassportJs yetkilendirme sırasında oluşacak hatayı kullanıcıya kendiliğinden gösterecek.
  Bu çoğu zaman tercih edilen bi kullanımdır, çünkü hata doğrudan passportJs'den geldiğinden oluşan hatanın içeriğini kullanıcının da öğrenmesini sağlar.
  
  Ancak alternatif bir yol olarak
  
    {% highlight javascript %}
  passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
  {% endhighlight %}  
  
  şeklinde kendimiz de bir flash mesaj tanımlayabiliriz.
  
  "Araman için illa hata yapmam mı lazım" ilkesinde de yola çıkarak kullanıcıya işlerin sadece kötü gittiğini değil sorunsuz tamamlandığını göstermek için de flash mesaj yollayabiliriz. Şöyle ki:
  
  {% highlight javascript %}
  passport.authenticate('local', { successFlash: 'Welcome!' });
  {% endhighlight %}  
  
  Burada hatırlatmam gereken küçük bi nokta var, flash mesajları kullanabilmek için `req.flash()` methoduna ihtiyaç var, Express framework'ün 2x versiyonları bu methodu destekliyor ancak 3x versiyonlarda kaldırıldı o yüzden şu modülü projenize dahil etmeniz lazım
  https://github.com/jaredhanson/connect-flash
  
  ## Session'ı Devre Dışı Bırakmak
  
   Başarılı bi şekilde yetkilendirme yapıldıktan sonra, sistem kalıcı bir session oluşturacaktır. Bu ziyaretçilerin web tarayıcılarıyla kullandığı web uygulamarında tercih edilen genel bi kullanımdır, ancak bazı özel durumlarda, session gerekli değildir.
   Örnek verecek olursak; API sunucularından her istekte kullanıcı kimliği zaten temin edilir. Bu durumda bizim için session'ı devre dışı bırakmak mantıklı bi seçim olacaktır. Peki nasıl bırakırız, şöyle ki:
   
  {% highlight javascript %}
  app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });
  {% endhighlight %}  
   
  ## Kendi İhtiyacımıza Göre Callback Oluşturma
  
  Yukarıdaki tüm senaryolar failure ya da success durumlarında uygulamanın nasıl davranacağını verdiğimiz parametrelerle yönetiyordu, ancak bazen kuralları bizim koymamız gerekir. Bizim geliştirdiğimiz uygulamada bizim sözümüz geçer hafız.
  
  {% highlight javascript %}
  app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
  {% endhighlight %}
  
  Yukarıdaki kodda `authenticate()` methodunun router'ın altında olduğuna dikkat edin, bu şekilde kullanımamızın nedeni `authenticate()` methodunun içinde `req` ve `res` nesnelerine erişmek istememiz.
  Yetkilendirme işlemi sırasında bir hata oluştuğunda `user` nesnesi `false` 'a eşit olur. Bir hata oluştuğunda `err` nesnesi aracılığıyla otomatik olarak hata fırlatılır, aksi durumlarda `null` a eşittir.
  
  
  ### Konfigrasyon
  
  PassportJS'de yetkilendirme için üç konfigrasyona ihtiyaç duyarız
  
  1- Yetkilendirme Stratejileri
  2- Uygulama Katmanları
  3- Sesssionlar (Bu tercihe bağlı)
  
  ## Stratejiler (Strategies)
  
  PassportJs bağlantıları yetkilendirirken `Strategy` denilen kuralları kullanır. Kullanıcı adı ve parolayı `OAuth` ya da `OpenID` aracılığıyla doğrular ve oturumu yönetir.
  Passport'a bir doğrulama-yetkilendirme isteği yollamadan önce `Strategy` denilen kurallar mutlaka tanımlanmalıdır.
  Stratejiler ve onların konfigrasyonları `use()` fonksiyonunu destekler, Kullanıcı adı ve şifreyle yapılan bir lokal doğrulama için şu koda bi göz atalım
  
  {% highlight javascript %}
  var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
  
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  {% endhighlight %}
  
  ## Doğrulama Yanıtları (Verify Callbacks)
  
  Her ne kadar Türkçe kaynak oluşsun diye uğraşıyor olsak da bazı terimlerin ingilizcelerini duymanız sizin için daha yararlı olcaktır, aksi halde bildiğiniz terimleri duyduğunuz dahi ingilizcesini bilmediğinizden olaya fransız kalmanız kaçınılmaz olacaktır, bu yüzden elimden geldiğince Türkçe'ye çevirmeye çalışsam da özgün tabirleri ingilizce olarak da yazıyorum.
  
  Yukarıdaki örnek kodumuz önemli bi konsepti içeriyor, Stratejilerde durumlara göre geri dönüşleri tanımlamamız gerekir. Flash Bildirimleri başlığını hatırlayın, doğrulamanın amacı gönderilen kimlik bilgilerine sahip kullanıcı bulup yetkilendirmeyi yapmaktır. 
  
  Kimlik bilgileri geçerliyse ve Passport tarafından onaylandıysa (ki belirlediğimiz stratejiye uygunsa passport tarafından valid olarak tanımlanacak yani onaylanacaktır) passportJS kullanıcıyı doğruladığını belirtmek için `done` methodunu çağıracaktır.
  
  {% highlight javascript %}
    return done(null, user);
  {% endhighlight %}
  
  Eğer bilgiler geçerli değilse mesela parola yanlışsa `done` methodu `false` parametresiyle çağrılacaktır.
  
    {% highlight javascript %}
    return done(null, false);
  {% endhighlight %}
  
  Bu gibi durumlarda opsiyonel mesajlar da eklenerek flash bildirimler gösterilebilir ve kullanıcılar yeniden denemeye yönlendirilir
    
  {% highlight javascript %}
    return done(null, false, { message: 'Incorrect password.' });
  {% endhighlight %}
  
  Son olarak eğer daha derin bi hata varsa mesela database bağlantısı yoksa işid Sakarya'ya geldiyse ya da bulunduğunuz konuma yaklaşan devasa bi meteor varsa falan bilindik node tarzı `err` fırlatılır siz de bunu yakalayıp döndürürsünüz.
  
  {% highlight javascript %}
    return done(err);
  {% endhighlight %}
  
  ## Katmanlar
  
  Express framework ile web uygulamaları geliştirirken ki çoğu zaman uygulamalarımızı bu çatı altında geliştiririz, passportJs'in ihtiyaç duyduğu bazı konfigrasyonlar vardır, `passport.initialize()` belirtimi yapılmalıdır, eğer uygulamanızda session kullanıyosanız bunun yanında `passport.session()` da deklare edilmek zorundadır.
  
  {% highlight javascript %}
    app.configure(function() {
      app.use(express.static('public'));
      app.use(express.cookieParser());
      app.use(express.bodyParser());
      app.use(express.session({ secret: 'keyboard cat' }));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(app.router);
    });
  {% endhighlight %}
  
  ### Kullanıcı Adı & Parola Aracılığıyla Giriş 
  
  En çok tercih edilen yöntemle beraber bir örnek yapıp yazımı sonlandırmak istiyorum
  
  Bu uygulama için `passport-local` modülüne ihtiyacımız var, npm denilen canımız ciğerimiz paket yöneticisi aracılığıyla tabi ki çok kolay.
  
  ## Yükleme
  
  {% highlight bash %}
  $ npm install passport-local
  {% endhighlight %}
  
  ## Konfigrasyon
  
  {% highlight javascript %}
  var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
  {% endhighlight %}
  
  Local yetkilendirme için formumuzdan gelecek username ve password verilerine uygun olarak callbacklerimizi tanımladık.
  
  ## Form
  
  Şimdi formu oluşturalım
  
    {% highlight html %}
<form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>
{% endhighlight %}
  
  ## Yönlendirme (Routing)
  
  formdan gelen post isteğini yakalayıp passport ile konuşturmak için gerekli kodlarımızı yazıyoruz
  
{% highlight javascript %}
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
{% endhighlight %}

`failureFlash` parametresinin true olmasına dikkat etmişsinizdir, kullanıcılar için Flash Bildirimler gönderiyoruz. 

## Parametreler

Varsayılan olarak `LocalStrategy` de formdan gelen kullanıcı adı `username` ve `password` olarak tanımlıdır, ben değişiklik yapmak istiyorum dersen şu şekilde yapabilirsin diyerek bu gereksiz bilgiyle yazıma son veriyorum.

{% highlight javascript %}
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));
{% endhighlight %}

 Oldukça kullanışlı bi modül olan PassportJS'i her geliştiriciye tavsiye ederim, eski projelerimde kullanmamış olsam da bundan sonraki her projemde kesinlikle tercih edeceğim bir modül. 
 Okuduysanız yazının linkini paylaşmanız teşekkür yerine geçecektir. Ayrıca sizler de blogda kendi yazılarınızı yayınlayabilirsiniz. Şimdiden teşekkürler.
 
 Furkan BAŞARAN <frknbasaran@gmail.com>
 @frknbasaran
 
  
