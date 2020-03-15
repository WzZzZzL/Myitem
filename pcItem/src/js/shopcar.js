require(["./config"], () => {
    require(['template', "header"], (template, header) => {
        class Shopcar {
            constructor() {
                this.loadFOT();
                this.init()
            }
            loadFOT() {
                $("footer").load("../html/footer.html")
            }
            init() {
                let cart = localStorage.getItem('cart')
                if (cart) {
                    this.cart = JSON.parse(cart)
                    this.render()
                    this.checksChange()
                    this.calcTotalMoney()
                    this.addcount()
                    this.subcount()
                    this.delet()
                    this.allchoose()
                    $('#cart-empty').hide()
                    $('#scUl').show()
                } else {
                    $('#scUl').hide()
                    $('#cart-empty').show()
                }
            }
            render() { $('#scUl').html(template('scTemplate', { cartList: this.cart })) }

            setAllcheckStatus() {
                $('#all-check').prop('checked', this.cart.every(shop => shop.check))
            }

            checksChange() {
                const _this = this
                $('.checks').on('change', function () {
                    const id = Number($(this).parents('li').attr('data-id'))
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            shop.check = $(this).prop('checked')
                        }

                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.calcTotalMoney()
                    _this.setAllcheckStatus()
                })
            }

            calcTotalMoney() {
                const money = this.cart.reduce((sum, shop) => {
                    if (shop.check) {
                        sum += shop.price * shop.count
                    }
                    return sum
                }, 0)

                $('#Paymoney').html(money)
                $('#SUMmoney').html(money)
            }

            addcount() {
                const _this = this
                $('#scUl').on('click', '.addcount', function () {
                    const id = Number($(this).parents('li').attr('data-id'))
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id == id) {
                            var add = $(this).siblings('.addcount-inp')
                            add.val(Number(add.val()) + 1)
                            shop.count = Number(add.val())
                            var littlesum = $(this).siblings('.littlesum')
                            let sum = shop.price * shop.count
                            console.log(shop)
                            $('#sumcount').html(sum)
                            $('#SUMmoney').html(sum)
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    // _this.render()
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })
            }

            subcount() {
                const _this = this
                $('#scUl').on('click', '.subcount', function () {
                    const id = Number($(this).parents('li').attr('data-id'))
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id == id) {
                            var add = $(this).siblings('.addcount-inp')
                            add.val(Number(add.val()) - 1)
                            shop.count = Number(add.val())
                            if (shop.count <= 0) {
                                shop.count = 0
                                add.val(0)
                            }
                            let sum = shop.price * shop.count
                            $('#sumcount').html(sum)
                            $('#SUMmoney').html(sum)
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))

                    // _this.render()
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })

            }

            delet() {
                const _this = this
                $('#scUl').on('click', '.del-btn', function () {
                    const id = Number($(this).parents('li').attr('data-id'))
                    _this.cart = _this.cart.filter(shop => shop.id != id)
                    $(this).parents('.scMainli').remove()
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    if (_this.cart.length == 0) {
                        window.localStorage.clear()
                        $('#scUl').hide()
                        $('#cart-empty').show()
                    }
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })
            }

            allchoose() {
                $('#all-check').on('click', () => {
                    if ($('#all-check').prop('checked')) {
                        $.each(this.cart, function (index, item) {
                            $('.checks').prop('checked', 'checked');
                            item.check = true;
                        })
                    } else {
                        $.each(this.cart, function (index, item) {
                            $('.checks').prop('checked', '');
                            item.check = false;
                        })
                    }
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                    this.checksChange();
                    this.calcTotalMoney();
                })
            }


            renderType(shopcar) {
                $('#scUl').html(template('scTemplate', { shopcar }))
            }
        }
        new Shopcar();
    });
});