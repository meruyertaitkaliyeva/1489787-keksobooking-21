(()=>{"use strict";window.server={load:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.addEventListener("load",(()=>{e(o.response)})),o.addEventListener("load",(()=>{200===o.status?e(o.response):t("Статус ответа: 10000 "+o.statusText)})),o.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),o.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за 10000мс")})),o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()},upload:(e,t,o)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{200===r.status?t(r.response):o("Статус ответа: 10000 "+r.statusText)})),r.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),r.addEventListener("timeout",(()=>{o("Запрос не успел выполниться за 10000мс")})),r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(e)}},(()=>{const e=document.querySelector("#address"),t=document.querySelector(".map__pin--main"),o=document.querySelector(".ad-form"),r=document.querySelector(".map__filters").querySelectorAll("select, fieldset"),n=document.querySelector(".map");window.reset={removePins:()=>{document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},disactivatePage:()=>{o.reset(),t.style.top="375px",t.style.left="570px",e.value=`${t.offsetLeft}, ${t.offsetTop}`,window.reset.removePins(),n.classList.add("map--faded"),o.classList.add("ad-form--disabled"),r.forEach((e=>{e.setAttribute("disabled","disabled")}))}}})(),(()=>{const e=document.querySelector("#housing-type"),t=document.querySelector("#housing-price"),o=document.querySelector("#housing-rooms"),r=document.querySelector("#housing-guests"),n=document.querySelector("#housing-features");window.filter={applyFilter:c=>c.filter((c=>(t=>"any"===e.value||e.value===t.offer.type)(c)&&(e=>{if("any"!==t.value){if("low"===t.value)return e.offer.price<=1e4;if("middle"===t.value)return e.offer.price>=1e4&&e.offer.price<=5e4;if("high"===t.value)return e.offer.price>=5e4}return!0})(c)&&(e=>"any"===o.value||Number(o.value)===e.offer.rooms)(c)&&(e=>"any"===r.value||Number(r.value)===e.offer.guests)(c)&&(e=>[...n.querySelectorAll(".map__checkbox:checked")].every((t=>e.offer.features.includes(t.value))))(c))).slice(0,5)}})(),(()=>{let e;window.debounce=t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pin--main"),o=document.querySelector(".ad-form"),r=document.querySelectorAll("fieldset"),n=document.querySelectorAll(".map__filter"),c=e.querySelector(".map__pins"),d=e=>{e.forEach((e=>{e.setAttribute("disabled","disabled")}))},s=e=>{e.forEach((e=>{e.removeAttribute("disabled","disabled")}))};d(r),d(n);let a=[];const u=e=>{a=e,window.pin.renderPins(c,e)};document.querySelector(".map__filters").addEventListener("change",(()=>{const e=document.querySelector(".map__card");e&&e.remove(),window.reset.removePins(),window.debounce(window.pin.renderPins(c,window.filter.applyFilter(a)))}));const i=e=>{const t=document.querySelector("#error").content.querySelector(".error").cloneNode(!0);t.querySelector(".error__message").value=""+e,document.body.insertAdjacentElement("afterbegin",t)},l=()=>{e.classList.remove("map--faded"),o.classList.remove("ad-form--disabled"),s(r),s(n),window.server.load(u,i)},p=e=>{0===e.button&&l(),t.removeEventListener("mousedown",p)},m=e=>{13===e.keyCode&&l(),t.removeEventListener("keydown",m)};t.addEventListener("mousedown",p),t.addEventListener("keydown",m);const f=document.querySelector("#success").content.querySelector(".success"),y=document.querySelector("#error").content.querySelector(".error"),v=f.cloneNode(!0),_=y.cloneNode(!0),q=_.querySelector(".error__button"),S=()=>{v.remove(),_.remove()},h=e=>{27===e.keyCode&&S()},w=e=>{document.body.insertAdjacentElement("afterbegin",e),document.addEventListener("keydown",h),document.addEventListener("click",S),q.addEventListener("click",S)},E=()=>{w(v),window.reset.disactivatePage()},L=()=>{w(_)};o.addEventListener("submit",(e=>{window.server.upload(new FormData(o),E,L),e.preventDefault()}))})(),function(){const e=document.querySelector("#pin").content.querySelector(".map__pin");window.pin={renderPins:(t,o)=>{o.forEach((o=>{t.appendChild((t=>{const o=e.cloneNode(!0);return o.style.left=t.location.x+"px",o.style.top=t.location.y+"px",o.querySelector("img").src=t.author.avatar,o.querySelector("img").alt=t.offer.title,o.addEventListener("click",(()=>{window.card.renderCard(t)})),o})(o))}))}}}(),function(){const e=document.querySelector(".map"),t=document.querySelector("#card").content.querySelector(".map__card"),o=e=>{e.remove()};window.card={renderCard:r=>{const n=document.querySelector(".map__card");n&&o(n),e.appendChild((r=>{const n=t.cloneNode(!0),c=n.querySelector(".popup__close");return n.querySelector(".popup__title").textContent=r.offer.title,n.querySelector(".popup__text--address").textContent=r.offer.address,n.querySelector(".popup__text--price").textContent=r.offer.price+"P/ночь",n.querySelector(".popup__type").textContent=r.offer.type,n.querySelector(".popup__text--capacity").textContent=`${r.offer.rooms} комнаты для ${r.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${r.offer.checkin}, выезд до ${r.offer.checkout}`,((e,t)=>{e.innerHTML="",t.forEach((t=>{const o=document.createElement("li");o.classList.add("popup__feature"),o.classList.add("popup__feature--"+t),e.appendChild(o)}))})(n.querySelector(".popup__features"),r.offer.features),n.querySelector(".popup__description").textContent=r.offer.description,((e,t)=>{e.innerHTML="",t.forEach((t=>{const o=document.createElement("img");o.classList.add("popup__photo"),o.setAttribute("width","45"),o.setAttribute("height","45"),o.src=t,e.appendChild(o)}))})(n.querySelector(".popup__photos"),r.offer.photos),n.querySelector(".popup__avatar").src=r.author.avatar,c.addEventListener("click",(()=>{o(n)})),e.addEventListener("keydown",(e=>{27===e.keyCode&&o(n)})),n})(r))}}}(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address");t.value=`${e.offsetLeft}, ${e.offsetTop}`;const o=document.querySelector("#room_number");e.addEventListener("click",(o=>{0===o.button&&(t.value=`${Math.floor(e.offsetLeft+e.offsetWidth/2)}, ${e.offsetTop-130+e.offsetHeight}`)}));const r={1:[1],2:[1,2],3:[1,2,3],100:[0]};o.addEventListener("change",(e=>{(e=>{const t=Array.from(document.querySelector("#capacity").options);t.forEach((e=>{e.disabled=!0})),r[e].forEach((e=>{t.forEach((t=>{Number(t.value)===e&&(t.disabled=!1,t.selected=!0)}))}))})(e.target.value)}));const n=document.querySelector("#type"),c=document.querySelector("#price"),d={bungalow:0,flat:1e3,house:5e3,palace:1e4};n.addEventListener("change",(e=>{c.min=d[e.target.value],c.placeholder=d[e.target.value]}));const s=document.querySelector("#timein"),a=document.querySelector("#timeout");s.addEventListener("change",(()=>{a.value=s.value})),a.addEventListener("change",(()=>{s.value=a.value}))})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pin--main"),o=0-t.offsetWidth/2,r=e.clientWidth-t.offsetWidth/2,n=130-t.offsetHeight;t.addEventListener("mousedown",(e=>{e.preventDefault();let c={x:e.clientX,y:e.clientY};const d=e=>{e.preventDefault();let d=c.x-e.clientX,s=c.y-e.clientY;c={x:e.clientX,y:e.clientY};let a={x:t.offsetLeft-d,y:t.offsetTop-s};var u;(u=a).x<=o&&(u.x=o),u.x>=r&&(u.x=r),u.y<=n&&(u.y=n),u.y>=630&&(u.y=630),t.style.top=a.y+"px",t.style.left=a.x+"px"},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",s)}))})()})();