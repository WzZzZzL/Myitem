define(["bootstrap", 'cookie', 'utils'], () => {
  class Header {
    constructor() {
      this.loadHTML().then(() => {
        this.calcCartCount()
        this.setcookie()
        this.getcookie()
        this.islogin()
        this.zhuxiao()
        // this.search()
      })
    }

    loadHTML() {
      return new Promise(resolve => {
        $('header').load('/html/header.html', () => {
          resolve()
        })
      })
    }

    calcCartCount() {
      let cart = localStorage.getItem('cart')
      let count = 0
      if (cart) {
        cart = JSON.parse(cart)
        count = cart.reduce((sum, shop) => {
          sum += shop.count
          return sum
        }, 0)
      }
      $('.headerCartCun,.CartSum').html(count)
    }

    setcookie() {
      $('#btnregist').on('click', function () {
        let registuser = $('.registuser').val()
        let registpassword = $('.registpassword').val()
        
        if ($.cookie('registuser') !== '' && $.cookie('registpassword') !== '') {
          $('.registsuccsess').html('注册成功')
          $.cookie('user', JSON.stringify({ registuser, registpassword }), { path: '/', expires: 7 });
          
          setTimeout(() => {
            $('#yourModalA').modal('hide')
          }, 1200)
        } else {
          $('.registsuccsess').html('注册失败')
        }
      })
    }

    getcookie() {
      $('.welcome').hide()
      $('#btnlogin').on('click', function () {
        let loginuser = $('.loginuser').val()
        let loginpassword = $('.loginpassword').val()
        $.cookie('login', JSON.stringify({ loginuser, loginpassword }), { path: '/', expires: 7 });
        let username = JSON.parse($.cookie('user')).registuser
        let userpassword = JSON.parse($.cookie('user')).registpassword
        if (loginuser === username && loginpassword === userpassword ) {
          $.cookie('islog', true, { path: '/', expires: 7 });
          setTimeout(() => {
            $('#myModalA').modal('hide')
          }, 1300)
          $('.loginsuccsess').html('登录成功')
          $('.welcome').show()
          $('.loginreg').hide()
          $('.logSuc').html(loginuser)

        } else {
          $('.loginsuccsess').html('登录失败')
          $('.welcome').hide()
          $('.loginreg').show()
        }
      }
      )
    }

    islogin() {
      if ($.cookie('islog')) {
        $('.welcome').show()
        $('.loginreg').hide()
        $('.logSuc').html(JSON.parse($.cookie('login')).loginuser)
      } else {
        $('.welcome').hide()
        $('.loginreg').show()
      }
    }

    zhuxiao() {
      $('#zhuxiao').on('click', function () {
        $.cookie('login', '', { path: '/', expires: -1 })
        $.cookie('islog', '', { path: '/', expires: -1 })
        $('.welcome').hide()
        $('.loginreg').show()
      })
    }

    // search() {
    //   const ul = document.querySelector('#search-UL')
    //   const input = document.querySelector('#search-inp')
    //   $('#search-UL').on('mousedown', function (e) {
    //     var target = e.target || e.srcElement
    //     if (target.tagName === 'LI') {
    //       $('#search-inp').val(target.innerHTML)
    //     }

    //   })
    //   $('#search-inp').on('blur', function () {
    //     $('#search-UL').val('')
    //   })
    //   function fn1(resp) {
    //     console.log(resp)
    //     const s = resp.s
    //     $('#search-UL').val('')
    //     s.forEach(item => {
    //       let li = document.createElement('li');
    //       li.innerHTML = item
    //       ul.appendChild(li)
    //     })

    //   }
    //   input.onkeyup = function () {
    //     let wd = this.value
    //     jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', 'fn1', { wd })
    //   }
    // }
  }
  return new Header()
});
