function initItems(){function e(e,r){const{clientWidth:a,scrollWidth:n}=r;let s=n-a;if(0===s)return;s+=10;const i=s/90;r.setAttribute("style",[`margin-left: -${s}px`,"opacity: 0",`transition: margin-left ${i}s linear 0.6s, opacity 0.2s linear ${i+1.5}s`].join(";")),e._marquee_done=!1,r.addEventListener("transitionend",t)}function t(t){if("opacity"===t.propertyName){t.currentTarget.setAttribute("style","");const r=t.currentTarget.closest(".header-text");r._marquee&&(r._marquee_done?e(r,t.currentTarget):r._marquee_done=!0)}}function r(t){t.currentTarget._hovering=!0;const r=t.currentTarget.querySelector(".header-text"),a=r.querySelector(".header-text__primary");r._marquee||(r._marquee=!0,r.classList.add("header-text_marquee"),e(r,a))}function a(e){if(!1===e.type.startsWith("touch")&&e.currentTarget!==e.target)return;e.currentTarget._hovering=!1;const t=e.currentTarget.querySelector(".header-text"),r=t.querySelector(".header-text__primary");t._marquee=!1,t.classList.remove("header-text_marquee"),r.setAttribute("style","")}const n=document.getElementById("showcases"),s=n?JSON.parse(n.text):null;document.querySelectorAll(".item-clickable").forEach((e=>{if(e.dataset.clickableModal){const t=document.createElement("div");t.innerHTML=e.innerHTML,t.className=e.className,t.setAttribute("style",e.getAttribute("style")),e.dataset.showcase&&t.setAttribute("data-showcase",e.getAttribute("data-showcase")),e.after(t),e.remove();const r=t.querySelector(".item-description__description");r.innerHTML=r.textContent,e=t}const t=e.dataset.showcase;if(s&&s[t]){let r=0;const a=s[t];setInterval((()=>{if(e._hovering)return;r++,r>=a.length&&(r=0);(new Image).src=a[r].image;const t=Object.assign({},a[0],a[r]),n=e.querySelector(".item__image");n.setAttribute("style",function(e,t){let r="";return e&&(r+=`background-image: url('${e}');`,t&&(r+=`background-position: ${t}`)),r}(t.image,t.imagePos)),n.classList.remove("item_appear"),n.offsetWidth,n.classList.add("item_appear"),t.link&&e.setAttribute("href",t.link),e.querySelector(".header-text__secondary").innerText=t.subtitle,e.querySelector(".header-text__primary").innerText=t.title}),a[0].interval||5e3)}e.removeAttribute("data-showcase"),e.addEventListener("mouseover",r),e.addEventListener("mouseleave",a),e.addEventListener("touchstart",r),e.addEventListener("touchend",a)}))}