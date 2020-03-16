class Enlarge {
    constructor(ele) {
        this.ele = ele;
        this.show = this.ele.getElementsByClassName('show')[0];
        this.mask = this.show.getElementsByClassName('mask')[0];
        this.enlarge = this.ele.getElementsByClassName('enlarge')[0];
        this.list = this.ele.getElementsByClassName('list')[0];
        this.p = this.list.children;
        this.init();
    }
    init() {
        this.show.addEventListener('mouseover', () => {
            this.mask.style.display = this.enlarge.style.display = 'block';
            this.setStyle();
            this.move()
        })
        this.show.addEventListener('mouseout', () => {
            this.mask.style.display = this.enlarge.style.display = 'none';
        })
        this.change();

    }
    setStyle() {
        //   求：放大镜的尺寸 = 遮罩层的尺寸 * 背景图的尺寸 / show盒子的尺寸
        // 遮罩层的尺寸
        this.maskWidth = this.mask.offsetWidth;
        this.maksHeight = this.mask.offsetHeight;

        // 获取背景图的尺寸
        let res = getStyle(this.enlarge, 'backgroundSize').split(' ');
        this.bgSizeX = parseInt(res[0]);
        this.bgSizeY = parseInt(res[1]);

        // show盒子的尺寸
        this.showWidth = this.show.offsetWidth;
        this.showHeight = this.show.offsetHeight;

        // 设置放大镜盒子的尺寸
        this.enlarge.style.width = this.maskWidth * this.bgSizeX / this.showWidth + 'px';
        this.enlarge.style.height = this.maksHeight * this.bgSizeY / this.showHeight + 'px';
    }

    // 拖拽mask让右边的放大镜跟着移动
    move() {
        this.show.addEventListener('mousemove', e => {
            let x = e.clientX - this.ele.offsetLeft - this.maskWidth / 2;
            let y = e.clientY - this.ele.offsetTop - this.maksHeight / 2;
            if (x <= 0) {
                x = 0
            }
            if (y <= 0) {
                y = 0;
            }
            if (x >= this.showWidth - this.maskWidth) {
                x = this.showWidth - this.maskWidth;
            }
            if (y >= this.showHeight - this.maksHeight) {
                y = this.showHeight - this.maksHeight
            }
            this.mask.style.left = x + 'px';
            this.mask.style.top = y + 'px';

            // 右边的放大镜
            /* 
                遮罩层的移动距离      背景图移动的距离
                --------------   =  ---------------
                show盒子的尺寸         背景图的尺寸
                背景图的移动距离 = 遮罩层的移动距离 * 背景图的尺寸 / show盒子的尺寸

            */
            let bpX = x * this.bgSizeX / this.showWidth;
            let bpY = y * this.bgSizeY / this.showHeight;
            this.enlarge.style.backgroundPosition = `${-bpX}px ${-bpY}px`;
        })
    }
    change() {
        let _this = this; //_this 保存的是Enlarge这对象
        for (let i = 0; i < _this.p.length; i++) {
            // 不能使用箭头函数
            _this.p[i].addEventListener('click', function (e) {
                // 不使用箭头函数的时候，this指向 点击的那个元素
                // 如果使用箭头函数 this指向 Enlarge
                for (let j = 0; j < _this.p.length; j++) {
                    _this.p[j].classList.remove('active');
                }
                this.classList.add('active');

                let img = this.getElementsByTagName('img')[0];

                let imgs = img.getAttribute('src')


                // 把当前这张图片的中图 给 show下面的img标签
                // img.src = e.target.getAttribute('img1');
                _this.show.getElementsByTagName('img')[0].setAttribute('src', `${imgs}`)
                // img.setAttribute('src', e.target.getAttribute('img1'))
                // 把当前张图片的大图添加 放大镜的背景图
                _this.enlarge.style.backgroundImage = `url(${imgs})`;

            })
        }
    }
}
