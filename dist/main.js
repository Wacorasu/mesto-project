(()=>{const e=document.querySelector(".main"),t=e.querySelector(".button-edit"),n=e.querySelector(".button-add"),r=e.querySelectorAll(".button-exit"),o=e.querySelector("#pop-up-edit"),c=e.querySelector("#pop-up-add"),a=e.querySelector("#pop-up-image"),i=o.querySelector("#edit-form"),l=e.querySelector("#add-form"),u=o.querySelector("#edit-name"),d=o.querySelector("#edit-subname"),p=e.querySelector("#add-name"),s=e.querySelector("#add-image"),m=e.querySelector(".photo-panel"),q=e.querySelector(".template-photo-card").content,y=e.querySelector(".profile__title-name"),S=e.querySelector(".profile__subtitle-description"),f=e.querySelector(".form-image__image"),g=e.querySelector(".form-image__title"),v=q.querySelector(".photo-card");function k(e){e.classList.remove("pop-up_opened")}function _(e){e.classList.add("pop-up_opened")}function b(e){e.target.closest(".photo-card").remove()}function h(e){e.target.classList.toggle("button-like_active")}function L(e,t){const n=function(e,t){const n=v.cloneNode(!0),r=n.querySelector(".photo-card__photo"),o=n.querySelector(".photo-card__title"),c=n.querySelector(".button-like"),i=n.querySelector(".button-delete");return o.textContent=e,r.setAttribute("src",t),r.alt=e,c.addEventListener("click",h),i.addEventListener("click",b),r.addEventListener("click",(()=>function(e,t){_(a),f.setAttribute("src",t),f.alt=e,g.textContent=e}(e,t))),n}(e,t);m.prepend(n)}[{name:"Калифорния",link:"../images/card-california.jpg"},{name:"Финляндия",link:"../images/card-finland.jpg"},{name:"Марке Италия",link:"../images/card-italia-marche.jpg"},{name:"Кижи Карелия",link:"../images/card-kizhi.jpg"},{name:"Швейцария",link:"../images/card-schweiz.jpg"},{name:"Окинава Япония",link:"../images/card_okinawa.jpg"}].forEach((function(e){L(e.name,e.link)})),r.forEach((e=>{const t=e.closest(".pop-up");e.addEventListener("click",(()=>k(t)))})),i.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=u.value,S.textContent=d.value,k(o)})),l.addEventListener("submit",(function(e){e.preventDefault(),L(p.value,s.value),e.target.reset(),k(c)})),t.addEventListener("click",(()=>{u.value=y.textContent,d.value=S.textContent,_(o)})),n.addEventListener("click",(()=>_(c)))})();