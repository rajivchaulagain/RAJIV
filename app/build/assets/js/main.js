$(document).ready(function()
{


if($('.bbb_slider').length)
{
var trendsSlider = $('.bbb_slider');
trendsSlider.owlCarousel(
{
loop:false,
margin:30,
nav:false,
dots:false,
autoplayHoverPause:true,
autoplay:false,
responsive:
{
0:{items:1},
575:{items:2},
991:{items:3}
}
});

trendsSlider.on('click', '.bbb_fav', function (ev)
{
$(ev.target).toggleClass('active');
});

if($('.bbb_prev').length)
{
var prev = $('.bbb_prev');
prev.on('click', function()
{
trendsSlider.trigger('prev.owl.carousel');
});
}

if($('.bbb_next').length)
{
var next = $('.bbb_next');
next.on('click', function()
{
trendsSlider.trigger('next.owl.carousel');
});
}
}


});

var index = 1;
var paused = false;
var slideShow = [];

for (i=0; i<document.getElementsByClassName("slideShow").length; i++) {
  slideShow[i] = document.getElementsByClassName("slideShow")[i];
  slideShow[i].style.display = "none";
}

slideShow[0].style.display = "inline";

var slides = setInterval(function() {
  if (index < slideShow.length) {
    index++;
    showDivs();
  }
  else {
    index = 1;
    showDivs();
  }
},1000);

function control(n) {
  clearInterval(slides);

  if (index+n > slideShow.length) {
    index = 1;
  }
  else if (index+n <= 0) {
    index = slideShow.length;
  }
  else {
    index += n;
  }
  showDivs();
}

function showDivs() {
  //Hide all slideShow elements, and then show only the targeted element
  for (let i=1; i<=slideShow.length; i++) {
    slideShow[i-1].style.display = "none";
  }
  slideShow[index-1].style.display = "inline";
}