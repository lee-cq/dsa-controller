(() => {
    var c = class {
        constructor(t, n = 1) {
            this.items = [];
            if (window.PhotoSwipe == null || window.PhotoSwipeUI_Default == null) {
                console.error("PhotoSwipe lib not loaded.");
                return
            }
            this.galleryUID = n, c.createGallery(t), this.loadItems(t), this.bindClick()
        }

        loadItems(t) {
            this.items = [];
            let n = t.querySelectorAll("figure");
            for (let r of n) {
                let o = r.querySelector("figcaption"), i = r.querySelector("img"), m = {
                    w: parseInt(i.getAttribute("width")),
                    h: parseInt(i.getAttribute("height")),
                    src: i.src,
                    msrc: i.getAttribute("data-thumb") || i.src,
                    el: r
                };
                o && (m.title = o.innerHTML), this.items.push(m)
            }
        }

        static createGallery(t) {
            let n = t.querySelectorAll("figure"), r = [];
            for (let o of n) r.length ? o.previousElementSibling === r[r.length - 1] ? r.push(o) : r.length && (c.wrap(r), r = [o]) : r = [o];
            r.length > 0 && c.wrap(r)
        }

        static wrap(t) {
            let n = document.createElement("div");
            n.className = "gallery";
            let r = t[0].parentNode, o = t[0];
            r.insertBefore(n, o);
            for (let i of t) n.appendChild(i)
        }

        open(t) {
            let n = document.querySelector(".pswp");
            new window.PhotoSwipe(n, window.PhotoSwipeUI_Default, this.items, {
                index: t,
                galleryUID: this.galleryUID,
                getThumbBoundsFn: o => {
                    let i = this.items[o].el.getElementsByTagName("img")[0],
                        m = window.pageYOffset || document.documentElement.scrollTop, l = i.getBoundingClientRect();
                    return {x: l.left, y: l.top + m, w: l.width}
                }
            }).init()
        }

        bindClick() {
            for (let [t, n] of this.items.entries()) n.el.querySelector("a").addEventListener("click", o => {
                o.preventDefault(), this.open(t)
            })
        }
    }, h = c;
    var s = {};
    if (localStorage.hasOwnProperty("StackColorsCache")) try {
        s = JSON.parse(localStorage.getItem("StackColorsCache"))
    } catch (e) {
        s = {}
    }

    async function u(e, t, n) {
        if (!e) return await Vibrant.from(n).getPalette();
        if (!s.hasOwnProperty(e) || s[e].hash !== t) {
            let r = await Vibrant.from(n).getPalette();
            s[e] = {
                hash: t,
                Vibrant: {hex: r.Vibrant.hex, rgb: r.Vibrant.rgb, bodyTextColor: r.Vibrant.bodyTextColor},
                DarkMuted: {hex: r.DarkMuted.hex, rgb: r.DarkMuted.rgb, bodyTextColor: r.DarkMuted.bodyTextColor}
            }, localStorage.setItem("StackColorsCache", JSON.stringify(s))
        }
        return s[e]
    }

    var P = (e, t = 500) => {
        e.classList.add("transiting"), e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = e.offsetHeight + "px", e.offsetHeight, e.style.overflow = "hidden", e.style.height = "0", e.style.paddingTop = "0", e.style.paddingBottom = "0", e.style.marginTop = "0", e.style.marginBottom = "0", window.setTimeout(() => {
            e.classList.remove("show"), e.style.removeProperty("height"), e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property"), e.classList.remove("transiting")
        }, t)
    }, T = (e, t = 500) => {
        e.classList.add("transiting"), e.style.removeProperty("display"), e.classList.add("show");
        let n = e.offsetHeight;
        e.style.overflow = "hidden", e.style.height = "0", e.style.paddingTop = "0", e.style.paddingBottom = "0", e.style.marginTop = "0", e.style.marginBottom = "0", e.offsetHeight, e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = n + "px", e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), window.setTimeout(() => {
            e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property"), e.classList.remove("transiting")
        }, t)
    }, k = (e, t = 500) => window.getComputedStyle(e).display === "none" ? T(e, t) : P(e, t);

    function p() {
        let e = document.getElementById("toggle-menu");
        e && e.addEventListener("click", () => {
            document.getElementById("main-menu").classList.contains("transiting") || (document.body.classList.toggle("show-menu"), k(document.getElementById("main-menu"), 300), e.classList.toggle("is-active"))
        })
    }

    function C(e, t, n) {
        var r = document.createElement(e);
        for (let o in t) if (o && t.hasOwnProperty(o)) {
            let i = t[o];
            o == "dangerouslySetInnerHTML" ? r.innerHTML = i.__html : i === !0 ? r.setAttribute(o, o) : i !== !1 && i != null && r.setAttribute(o, i.toString())
        }
        for (let o = 2; o < arguments.length; o++) {
            let i = arguments[o];
            i && r.appendChild(i.nodeType == null ? document.createTextNode(i.toString()) : i)
        }
        return r
    }

    var y = C;
    var g = class {
        constructor(t) {
            this.localStorageKey = "StackColorScheme";
            this.bindMatchMedia(), this.currentScheme = this.getSavedScheme(), this.dispatchEvent(document.documentElement.dataset.scheme), t && this.bindClick(t), document.body.style.transition == "" && document.body.style.setProperty("transition", "background-color .3s ease")
        }

        saveScheme() {
            localStorage.setItem(this.localStorageKey, this.currentScheme)
        }

        bindClick(t) {
            t.addEventListener("click", n => {
                this.isDark() ? this.currentScheme = "light" : this.currentScheme = "dark", this.setBodyClass(), this.currentScheme == this.systemPreferScheme && (this.currentScheme = "auto"), this.saveScheme()
            })
        }

        isDark() {
            return this.currentScheme == "dark" || this.currentScheme == "auto" && this.systemPreferScheme == "dark"
        }

        dispatchEvent(t) {
            let n = new CustomEvent("onColorSchemeChange", {detail: t});
            window.dispatchEvent(n)
        }

        setBodyClass() {
            this.isDark() ? document.documentElement.dataset.scheme = "dark" : document.documentElement.dataset.scheme = "light", this.dispatchEvent(document.documentElement.dataset.scheme)
        }

        getSavedScheme() {
            let t = localStorage.getItem(this.localStorageKey);
            return t == "light" || t == "dark" || t == "auto" ? t : "auto"
        }

        bindMatchMedia() {
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", t => {
                t.matches ? this.systemPreferScheme = "dark" : this.systemPreferScheme = "light", this.setBodyClass()
            })
        }
    }, f = g;
    var S = {
        init: () => {
            p();
            let e = document.querySelector(".article-content");
            e && new h(e);
            let t = document.querySelector(".article-list--tile");
            t && new IntersectionObserver(async (r, o) => {
                r.forEach(i => {
                    if (!i.isIntersecting) return;
                    o.unobserve(i.target), i.target.querySelectorAll("article.has-image").forEach(async l => {
                        let d = l.querySelector("img"), b = d.src, v = d.getAttribute("data-key"),
                            w = d.getAttribute("data-hash"), E = l.querySelector(".article-details"), a = await u(v, w, b);
                        E.style.background = `
                        linear-gradient(0deg,
                            rgba(${a.DarkMuted.rgb[0]}, ${a.DarkMuted.rgb[1]}, ${a.DarkMuted.rgb[2]}, 0.5) 0%,
                            rgba(${a.Vibrant.rgb[0]}, ${a.Vibrant.rgb[1]}, ${a.Vibrant.rgb[2]}, 0.75) 100%)`
                    })
                })
            }).observe(t), new f(document.getElementById("dark-mode-toggle"))
        }
    };
    window.addEventListener("load", () => {
        setTimeout(function () {
            S.init()
        }, 0)
    });
    window.Stack = S;
    window.createElement = y;
})();
/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/
