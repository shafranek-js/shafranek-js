// SVG rendering without external fonts, images, dependencies or scripts.
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]));}
function wrap(s,n=48,max=2){let out=[],line="";for(const w of String(s).split(/\s+/)){if((line+" "+w).trim().length>n&&line){out.push(line);line=w}else line+=(line?" ":"")+w;}if(line)out.push(line);if(out.length>max){out=out.slice(0,max);out[max-1]=out[max-1].replace(/[ ,.]+$/,"")+"…";}return out;}
export const renderCard = function renderCard(p,lang,stat){
 const ru=lang==="ru", cat=ru?p.catRu:p.catEn, desc=ru?p.ru:p.en;
 const lines=wrap(desc,ru?48:50,2);
 const statsLine=stat?`<text x="24" y="151" font-family="Arial, sans-serif" font-size="12" fill="#bbc8d4">★ ${esc(stat.stars)}   ·   ${ru?"Форки":"Forks"} ${esc(stat.forks)}</text>`:`<text x="24" y="151" font-family="Arial, sans-serif" font-size="11" fill="#92a6b7">${ru?"ОТКРЫТЫЙ ИСХОДНЫЙ КОД":"OPEN SOURCE / GITHUB"}</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="168" viewBox="0 0 460 168" role="img" aria-label="${esc(p.name)}">
 <rect width="460" height="168" rx="15" fill="#111b25"/>
 <rect x="1" y="1" width="458" height="166" rx="14" fill="none" stroke="#314254"/>
 <rect x="1" y="1" width="5" height="166" rx="3" fill="${esc(p.color)}"/>
 <circle cx="429" cy="30" r="37" fill="${esc(p.color)}" opacity=".06"/>
 <circle cx="429" cy="30" r="22" fill="none" stroke="${esc(p.color)}" stroke-opacity=".22"/>
 <text x="24" y="28" font-family="Arial, sans-serif" font-size="10.5" font-weight="700" letter-spacing="1.15" fill="${esc(p.color)}">${esc(cat)}</text>
 <text x="24" y="61" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="#f2f5fa">${esc(p.name)}</text>
 ${lines.map((s,i)=>`<text x="24" y="${91+i*20}" font-family="Arial, sans-serif" font-size="13.4" fill="#adbecc">${esc(s)}</text>`).join("\n ")}
 <path d="M24 129 H436" stroke="#304352" stroke-width="1"/>
 ${statsLine}
 <text x="436" y="151" font-family="Arial, sans-serif" font-size="11.5" text-anchor="end" font-weight="700" fill="${esc(p.color)}">${ru?"ПРОЕКТ →":"VIEW CODE →"}</text>
</svg>\n`;
};
export const renderHero = function renderHero(lang){
 const ru=lang==="ru", a=ru?"СОЗДАЮ ИНСТРУМЕНТЫ":"BUILDING PRACTICAL TOOLS", b=ru?"ДЛЯ РАБОТЫ И ОБУЧЕНИЯ":"FOR WORK AND LEARNING",small=ru?"Музыка · Дизайн · Автоматизация":"Music · Design · Automation";
 return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="254" viewBox="0 0 960 254" role="img" aria-label="Shafranek JS portfolio">
 <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#141f2e"/><stop offset="1" stop-color="#0b1422"/></linearGradient><linearGradient id="gl" x1="0" x2="1"><stop stop-color="#66aef5"/><stop offset="1" stop-color="#f0b86a"/></linearGradient></defs>
 <rect width="960" height="254" rx="18" fill="url(#g)"/>
 <rect x="1" y="1" width="958" height="252" rx="17" fill="none" stroke="#35495e"/>
 <path d="M44 45 H170" stroke="url(#gl)" stroke-width="3.5" stroke-linecap="round"/>
 <text x="44" y="75" fill="#a5c5df" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3">SHAFRANEK / JS</text>
 <text x="44" y="121" fill="#f1f6ff" font-family="Arial, sans-serif" font-size="${ru?31:34}" font-weight="700" letter-spacing=".4">${esc(a)}</text>
 <text x="44" y="162" fill="#f1f6ff" font-family="Arial, sans-serif" font-size="${ru?31:34}" font-weight="700" letter-spacing=".4">${esc(b)}</text>
 <text x="44" y="203" fill="#adbfce" font-family="Arial, sans-serif" font-size="17">${esc(small)}</text>
 <g opacity=".5" stroke="#345875" fill="none">
 <path d="M673 42 H915 M673 64 H915 M673 86 H915 M673 108 H915 M673 130 H915" stroke-width="2"/>
 <path d="M690 40 V132 M722 40 V132 M754 40 V132 M786 40 V132 M818 40 V132 M850 40 V132 M882 40 V132"/>
 </g>
 <g fill="#e5b86d" opacity=".9"><ellipse cx="715" cy="87" rx="12" ry="8" transform="rotate(-19 715 87)"/><ellipse cx="788" cy="64" rx="12" ry="8" transform="rotate(-19 788 64)"/><ellipse cx="848" cy="109" rx="12" ry="8" transform="rotate(-19 848 109)"/></g>
 <g stroke="#e5b86d" stroke-width="3.5"><path d="M726 84 V39 M799 61 V18 M859 106 V61"/></g>
 <g transform="translate(688 162)" opacity=".85"><rect width="209" height="61" rx="5" fill="#dce9f5"/>${Array.from({length:10},(_,i)=>`<path d="M${i*21} 0 V61" stroke="#5c7289" stroke-width="1"/>`).join("")}${[0,1,3,4,5,7,8].map(i=>`<rect x="${i*21+14}" y="0" width="14" height="36" rx="2" fill="#1e344a"/>`).join("")}</g>
</svg>\n`;
};
export const renderOverview = function renderOverview(lang,stats,featuredCount){
 const ru=lang==="ru";
 const metrics=stats?[
  [String(stats.publicRepositoryCount),ru?"ПУБЛИЧНЫХ РЕПОЗИТОРИЕВ":"PUBLIC REPOSITORIES"],
  [String(featuredCount),ru?"ИЗБРАННЫХ ПРОЕКТОВ":"CURATED PROJECTS"],
  [String(stats.totalStars),ru?"ЗВЁЗД НА GITHUB":"GITHUB STARS"]
 ]:[
  [String(featuredCount),ru?"ИЗБРАННЫХ ПРОЕКТОВ":"CURATED PROJECTS"],
  [ru?"ЕЖЕДНЕВНО":"DAILY",ru?"ОБНОВЛЕНИЕ СТАТИСТИКИ":"STATS REFRESH"],
  ["GITHUB",ru?"ОТКРЫТЫЕ РЕПОЗИТОРИИ":"OPEN REPOSITORIES"]
 ];
 return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="108" viewBox="0 0 960 108" role="img" aria-label="Portfolio overview">
 <rect width="960" height="108" rx="13" fill="#111b25" stroke="#304153"/>
 ${metrics.map(([value,label],i)=>`<g transform="translate(${i*320+29} 0)"><text x="0" y="48" font-family="Arial, sans-serif" font-size="${value.length>7?23:32}" font-weight="700" fill="${["#75b6f2","#ecc07c","#8ed1c2"][i]}">${esc(value)}</text><text x="0" y="78" font-family="Arial, sans-serif" font-size="${ru?10.7:11}" font-weight="700" letter-spacing=".75" fill="#b2c0cd">${esc(label)}</text></g>`).join("")}
 <path d="M320 20 V88 M640 20 V88" stroke="#304153"/>
 </svg>\n`;
};
