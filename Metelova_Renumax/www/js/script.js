
// counter
function CountdownTimer(elm,tl,mes){
  this.initialize.apply(this,arguments);
}

CountdownTimer.prototype={
  initialize:function(elm,tl,mes) {
    this.elem = document.getElementById(elm);
    this.tl = tl;
    this.mes = mes;
  },countDown:function(){
    var timer='';
    var today=new Date();
    var hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
    var min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
    var sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
    var me=this;

    if( ( this.tl - today ) > 0 ){
      timer += '<span class="counter__number">'+this.addZero(hour)+'</span><span class="counter__colon">:</span><span class="counter__number">'+this.addZero(min)+'</span><span class="counter__colon">:</span><span class="counter__number">'+this.addZero(sec)+'</span>';
      this.elem.innerHTML = timer;
      tid = setTimeout( function(){me.countDown();},10 );
      }else{
      this.elem.innerHTML = this.mes;
      return;
      }
    },addZero:function(num){ return ('0'+num).slice(-2); }
}

function CDT(elm){

  // Set countdown limit
  var tl = new Date('2018/07/10 00:00:00');

  // You can add time's up message here
  var timer = new CountdownTimer(elm,tl,'<span class="counter__number">00</span><span class="counter__colon">:</span><span class="counter__number">00</span><span class="counter__colon">:</span><span class="counter__number">00</span>');
    timer.countDown();
}

window.onload=function(){
  CDT('CDT');
  CDT('CDT-2');
}


// modal
jQuery.fn.clickToggle = function(a,b) {
    var ab = [b,a];
    return this.on("click", function(){ ab[this._tog^=1].call(this); });
 };

function modal (click, modal) {
  $(click).click(function() {
    $(modal).fadeToggle(400).toggleClass('is-active');
    if ($(modal).hasClass('is-active'))  {
      console.log('hi')
      $('body').css('overflow', 'hidden');
    }
    else {
      $('body').css('overflow', 'initial');
    }
  })
};

modal('.callback', '#callback')
modal('.m-header__cross', '#callback')
modal('.g-modal__bg', '#callback')


// scrolling
$('.js-scrollto').click(function () {
  var elementClick = $(this).attr('href');
  var destination = $(elementClick).offset().top;
  $('html:not(:animated),body:not(:animated)').animate({
    scrollTop: destination}, 800);
  return false;
});

 $('.menu__dots').click(function(e){
    var li = $(this).children('.js-scrollto');
    if (e.target !== li[0]) {
        li.click();
    }
});


// menu-item-selecting-onscroll
var lastId,
  topMenu = $(".js-menu"),
  topMenuHeight = topMenu.outerHeight()+15,
  menuItems = topMenu.find("a"),
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if (item.length) { return item; }
  });


$(window).scroll(function() {
  
  var fromTop = $(this).scrollTop()+topMenuHeight;
  var cur = scrollItems.map(function(){
    if ($(this).offset().top < fromTop)
    return this;
  });
  cur = cur[cur.length-1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    menuItems
    .parent().removeClass("menu__dots--active")
    .end().filter("[href='#"+id+"']").parent().addClass("menu__dots--active");
  }

});
