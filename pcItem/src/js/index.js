require(["./config"], () => {
  require(["swiper", 'template', "header", 'carousel'], (Swiper, template) => {
    class Index {
      constructor() {
        this.loadFOT();
        this.Banner();
        this.getTypeData()
      }

      getTypeData() {
        $.get('http://rap2api.taobao.org/app/mock/241056/QFitemindex', resp => {
          if (resp.code === 200) {
            const { index } = resp.body
            this.renderType(index)
          }
        })
      }

      loadFOT() {
        $("footer").load("../html/footer.html")
      }
      Banner() {
        var swiper = new Swiper(".swiper-container", {
          spaceBetween: 50,
          slidesPerView: 1,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },
          pagination: {
            el: ".swiper-pagination"
          },
          autoplay: true,
          loop: true
        });
      }
      renderType(index) {
        $('#indexBody').html(template('indexTemplate', { index }))
      }
    }
    new Index();
  });
});

