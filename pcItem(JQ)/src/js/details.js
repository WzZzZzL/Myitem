require(["./config"], () => {
    require(["swiper", 'template', 'url', "header", 'fly'], (swiper, template, url, header) => {
        class Detail {
            constructor() {
                this.loadFOT();
                this.init().then(() => {
                    this.addToCart()
                    this.addcount()
                    this.subcount()
                })
            }
            loadFOT() {
                $("footer").load("../html/footer.html")
            }
            init() {
                const id = Number(window.location.search.slice(4))
                return new Promise(resolve => {
                    $.get(url.baseUrl + '/detail', { id }, resp => {
                        if (resp.code === 200) {
                            const { detail } = resp.body
                            this.detail = { ...detail, id }
                            const str = template('detailTemplate', {
                                ...this.detail
                            })
                            const str2 = template('detailTemplate2', {
                                ...this.detail
                            })
                            $('#design').html(str)
                            $('#detailsainBanner2').html(str2)
                            this.enlarge();
                            resolve()
                        }
                    })
                })
            }

            addcount() {
                $('#design').on('click', '#details-addbtn', function () {
                    var deadd = $(this).siblings('#details-inp')
                    deadd.val(Number(deadd.val()) + 1)

                })
            }

            subcount() {
                $('#design').on('click', '#details-sub', function () {
                    var deadd = $(this).siblings('#details-inp')
                    deadd.val(Number(deadd.val()) - 1)
                    if (deadd.val() < 0) {
                        deadd.val(0)
                    }
                })
            }

            addToCart() {
                $('#add-to-cart-btn').on('click', e => {
                    this.fly(e)
                    let cart = localStorage.getItem('cart')
                    let num = Number($('#details-inp').val())

                    if (cart) {
                        cart = JSON.parse(cart)
                        const isExist = cart.some(shop => shop.id === this.detail.id)
                        if (isExist) {
                            cart = cart.map(shop => {
                                if (shop.id === this.detail.id) shop.count += num
                                return shop
                            })
                        } else {
                            cart.push({
                                ...this.detail, count: num, check: true
                            })
                        }
                        console.log(num)
                        localStorage.setItem('cart', JSON.stringify(cart))
                    } else {
                        localStorage.setItem('cart', JSON.stringify([{ ...this.detail, count: num, check: true }]))
                    }
                })
            }



            fly(e) {
                $(`<img src="${this.detail.imgs[0]}" style="width: 20px;height: 20px;border-radius:50%">`).fly({
                    start: {
                        left: e.clientX,
                        top: e.clientY,
                    },
                    end: {
                        left: $('#cart').offset().left - $(window).scrollLeft(),
                        top: $('#cart').offset().top - $(window).scrollTop()
                    },
                    speed: 0.4,
                    vertex_Rtop: 100,
                    onEnd: function () {
                        this.destroy()
                        header.calcCartCount()
                    }
                })
            }

            enlarge() {
                let shop = $('.box'),
                    show = $('.show'),
                    mask = $('.mask'),
                    smallImg = $('.list'),
                    lis = $('p'),
                    enlarge = $('.enlarge')
                var cover = $('.active').children().attr('src')
                enlarge.css('background', `url('${cover}')`)
                enlarge.css('background-repeat', 'no-repeat')
                show.hover(
                    function () {
                        mask.show();
                        enlarge.show();

                        $(this).on('mousemove', function (e) {
                            let xx = e.originalEvent.x || e.originalEvent.layerX || 0;
                            let yy = e.originalEvent.y || e.originalEvent.layerY || 0;

                            var x = xx - show.offset().left - mask.width() / 2;
                            var y = yy - show.offset().top - mask.height() / 2;


                            if (x <= 0) { x = 0; }
                            if (y <= 0) { y = 0; }
                            if (x >= show.width() - mask.width()) {
                                x = show.width() - mask.width();
                            }
                            if (y >= show.height() - mask.height()) {
                                y = show.height() - mask.height();
                            }
                            mask.css('left', `${x}px`);
                            mask.css('top', `${y}px`);
                            let f1 = (x / show.width()) * 900;
                            let f2 = y / show.height() * 900;
                            enlarge.css('backgroundPosition', `${-f1}px  ${-f2}px`)
                        })
                    },
                    function () {
                        mask.hide();
                        enlarge.hide();
                    })

                lis.on('click', function () {
                    $(this).addClass('active').siblings().removeClass('active')
                    var tu = $(this).children().attr('src')

                    $('.show img').attr('src', tu)
                    var pian = $('.show img').attr('src')
                    enlarge.css('background', `url('${pian}')`)
                    enlarge.css('background-repeat', 'no-repeat')
                })

            }
        }
        new Detail();

    });
});