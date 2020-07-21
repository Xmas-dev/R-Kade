/**************** universal ****************/ 

// nav bar mechanic
function toggle() {
    let sec = document.getElementById('sec');
    let nav = document.getElementById('navigation');
    sec.classList.toggle('active');
    nav.classList.toggle('active');
  }

// custom scrollbar
$(window).scroll(function() {
    var scroll = $(window).scrollTop(),
    dh = $(document).height(),
    wh = $(window).height();
    scrollPercent = (scroll / (dh-wh)) * 100;
    $('#progressbar').css('height', scrollPercent + '%');
  })
