require(["./config"], () => {
    require(["swiper", 'template', "header"], (swiper, template) => {
        class Index {
            constructor() {
                this.loadFOT();
                this.getTypeData()
            }
            loadFOT() {
                $("footer").load("../html/footer.html")
            }
            getTypeData() {
                $.get('http://rap2.taobao.org:38080/app/mock/241056/QFitem1list', resp => {
                    if (resp.code === 200) {
                        const { list } = resp.body
                        this.renderType(list)
                        this.paixu(list)
                    }
                })
            }

            paixu(list) {
                let _this = this
                $('.shoplistBan').on('click', '#listPaixu', function () {
                    list.sort(function (a, b) {
                        return a.price - b.price
                    })
                    _this.renderType(list)
                })

            }
            renderType(list) {
                $('#categoryList').html(template('typeTemplate', { list }))
            }
        }
        new Index();
    });
});