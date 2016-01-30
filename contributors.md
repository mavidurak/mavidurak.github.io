---
layout: page
title: Katkıda Bulunanlar
permalink: /contributors/
---

Kolektif Mavi'ye katkıda bulunmak çok kolay! Bunu daha önce [şurada](http://mavidurak.github.io/mavidurak/2014/08/19/siz-de-blog-yazisi-yayinlayin.html) anlatmıştık. Aşağıda şimdiye kadar bu kolektif blogu çeşitli katkılarıyla destekleyenlere yer verdik. Umuyoruz ki bu liste uzar gider...

<ul class="post-list">

	{% for authors in site.authors %}

		{% for author in authors %}
            {% if forloop.index == 1 %}
			    {% assign key = author %}
			{% endif %}
		{% endfor %}

        {% assign author = site.authors[key] %}
        <div class="author-box">
            <img class="author-img" src="{{ author.avatar }}"/>
            <div class="author-info">
                <ul style="margin: 0;">
                    <li>
                        <h1>{{ author.display_name }}</h1>
                    </li>
                    <li style="margin-top:5px;"><span>{{ author.bio }}</span></li>
                    <li style="margin-top:10px;">
                        <a class="github" target="_blank" href="http://github.com/{{ author.github }}"></a>
                        <a class="facebook" target="_blank" href="http://facebook.com/{{ author.facebook }}"></a>
                        <a class="twitter" target="_blank" href="http://twitter.com/{{ author.twitter }}"></a>
                        <a class="linkedin" target="_blank" href="{{ author.linkedin }}"></a>
                    </li>
                </ul>
            </div>
        </div>

	{% endfor %}
</ul>
