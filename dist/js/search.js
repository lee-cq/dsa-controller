(() => {
    var g = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "\u2026": "&hellip;"};

    function m(n) {
        return g[n] || n
    }

    function w(n) {
        return n.replace(/[&<>"]/g, m)
    }

    function T(n) {
        return n.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")
    }

    var s = class {
        constructor({form: e, input: r, list: i, resultTitle: a, resultTitleTemplate: t}) {
            this.form = e, this.input = r, this.list = i, this.resultTitle = a, this.resultTitleTemplate = t, this.handleQueryString(), this.bindQueryStringChange(), this.bindSearchForm()
        }

        async searchKeywords(e) {
            let r = await this.getData(), i = [];
            e.sort((a, t) => t.length - a.length);
            for (let a of r) {
                let t = {...a, preview: "", matchCount: 0}, p = !1;
                for (let u of e) {
                    if (u === "") continue;
                    let l = new RegExp(T(w(u)), "gi"), o = l.exec(t.content);
                    l.lastIndex = 0;
                    let h = l.exec(t.title);
                    if (l.lastIndex = 0, h && (t.title = t.title.replace(l, s.marker)), h || o) {
                        p = !0, ++t.matchCount;
                        let c = 0, d = 100;
                        o && (c = o.index - 20, d = o.index + 80, c < 0 && (c = 0)), t.preview.indexOf(u) !== -1 ? t.preview = t.preview.replace(l, s.marker) : (c !== 0 && (t.preview += "[...] "), t.preview += `${t.content.slice(c, d).replace(l, s.marker)} `)
                    }
                }
                p && (t.preview += "[...]", i.push(t))
            }
            return i.sort((a, t) => t.matchCount - a.matchCount)
        }

        static marker(e) {
            return "<mark>" + e + "</mark>"
        }

        async doSearch(e) {
            let r = performance.now(), i = await this.searchKeywords(e);
            this.clear();
            for (let t of i) this.list.append(s.render(t));
            let a = performance.now();
            this.resultTitle.innerText = this.generateResultTitle(i.length, ((a - r) / 1e3).toPrecision(1))
        }

        generateResultTitle(e, r) {
            return this.resultTitleTemplate.replace("#PAGES_COUNT", e).replace("#TIME_SECONDS", r)
        }

        async getData() {
            if (!this.data) {
                let e = this.form.dataset.json;
                this.data = await fetch(e).then(r => r.json())
            }
            return this.data
        }

        bindSearchForm() {
            let e = "", r = i => {
                i.preventDefault();
                let a = this.input.value;
                if (s.updateQueryString(a, !0), a === "") return this.clear();
                e !== a && (e = a, this.doSearch(a.split(" ")))
            };
            this.input.addEventListener("input", r), this.input.addEventListener("compositionend", r)
        }

        clear() {
            this.list.innerHTML = "", this.resultTitle.innerText = ""
        }

        bindQueryStringChange() {
            window.addEventListener("popstate", e => {
                this.handleQueryString()
            })
        }

        handleQueryString() {
            let r = new URL(window.location.toString()).searchParams.get("keyword");
            this.input.value = r, r ? this.doSearch(r.split(" ")) : this.clear()
        }

        static updateQueryString(e, r = !1) {
            let i = new URL(window.location.toString());
            e === "" ? i.searchParams.delete("keyword") : i.searchParams.set("keyword", e), r ? window.history.replaceState("", "", i.toString()) : window.history.pushState("", "", i.toString())
        }

        static render(e) {
            return createElement("article", null,

                createElement("a", {href: e.permalink, target:"_blank"},
                    createElement("div", {class: "article-details"},
                        createElement("h2", {
                            class: "article-title",
                            dangerouslySetInnerHTML: {__html: e.title}
                        }),
                        createTime(e.date),
                        createElement("secion", {
                            class: "article-preview",
                            style: "margin-top: 5px;",
                            dangerouslySetInnerHTML: {__html: e.preview}
                        })),
                    e.image && createElement("div", {class: "article-image"}, createElement("img", {
                        src: e.image,
                        loading: "lazy"
                    }))))
        }
    };
    window.addEventListener("load", () => {
        setTimeout(function () {
            let n = document.querySelector(".search-form"), e = n.querySelector("input"),
                r = document.querySelector(".search-result--list"), i = document.querySelector(".search-result--title");
            new s({form: n, input: e, list: r, resultTitle: i, resultTitleTemplate: window.searchResultTitleTemplate})
        }, 0)
    });
    var v = s;
})();

function createTime(time) {
    let r = document.createElement('footer')
    r.setAttribute('class', 'article-time')
    r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" ' +
        'width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" ' +
        'stroke-linecap="round"     stroke-linejoin="round">     <path stroke="none" d="M0 0h24v24H0z"></path>  ' +
        '<circle cx="12" cy="12" r="9"></circle>     <polyline points="12 7 12 12 15 15"></polyline> </svg>' +
        '<time className="article-time--published">' + time + '</time>'
    return r
}
