//--------------------------------------------------------------------------------------------------------------------------------|Variables
var screenW = window.innerWidth;
var screenH = window.innerHeight;


const images = {
  current: 0,
  array: [
    './assets/image0.jpg',
    './assets/image1.jpg',
    './assets/image2.jpg',
    './assets/image3.jpg',
    './assets/image4.jpg',
  ],
  cycle: function() {
    if(this.current >= this.array.length - 1) {
      this.current = 0;
      this.update();
      return;
    }
    this.current += 1;
    this.update();
  },
  update: function() {
    $('#theImg').css('backgroundImage', "url('" + this.array[this.current] + "')");
  }
};


const text = {
  current: 0,
  array: [
    'Test Text - 0',
    'Test Text - 1',
    'Test Text - 2',
    'Test Text - 3',
  ],
  cycle: function() {
    if(this.current >= this.array.length - 1) {
      this.current = 0;
      this.update();
      return;
    }
    this.current += 1;
    this.update();
  },
  update: function() {
    $('#floatingText').text(this.array[this.current]);
  }
};


//--------------------------------------------------------------------------------------------------------------------------------|Initialization
$(document).ready( setTimeout(init,5) );

function init() {
  //$('div').css('background-color', '#888');
  $('div').css('color', '#aaa');

  $('#theImg').css('backgroundImage', "url('./assets/image0.jpg')");
  $('#floatingText').text('Test Text - 0');


  //console.log($('div'));

  $('#btn').click(function() {
    $('div').toggle();
    //$(this).hide();
    // $(this).animate({bottom: '62%'}, 'slow', function() {
    //   $(this).animate({bottom: '2%'}, 'slow', function() {
    //     $('div').toggle();
    //   });
    // });
    $(this).animate({bottom: '62%'}, 'slow').animate({bottom: '2%'}, 'slow').fadeOut('slow').fadeIn('slow', function() {
      $('div').toggle();
    });
  });


  imgFading();
  textTransition();
  //moveShape();
  shape1.init();
  moveShape2();
}


//--------------------------------------------------------------------------------------------------------------------------------|Image Fading
function imgFading() {
  $('#theImg').fadeOut(1500, function() {
    images.cycle();
    //$('#theImg').fadeIn(1500, function() {imgFading()} );
  }).fadeIn(1500, function() {imgFading()} );
}


function textTransition() {
  $('#floatingText').animate({left: (screenW-130) + 'px'}, 4000, function() {
    text.cycle();
  }).animate({top: (screenH-30)+  'px'}, 4000, function() {
    text.cycle();
  }).animate({left: '10px'}, 4000, function() {
    text.cycle();
  }).animate({top: '10px'}, 4000, function() {
    text.cycle();
    textTransition();
  });
}



const shape1 = {
  loops: 0,
  shape: 0,
  x: 0,
  y: 0,
  w: $('#floatingShape').css('width'),
  h: $('#floatingShape').css('height'),
  init: function() {
    this.w = this.w.replace('px', '');
    this.h = this.h.replace('px', '');
    this.move();
  },

  move: function() {
    this.x = Math.round( Math.random() * (screenW - this.w) );
    this.y = Math.round( Math.random() * (screenH - this.h) );

    if (this.x > screenW - this.w) {
      this.x = screenW - this.w;
    } else if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > screenH - this.h) {
      this.y = screenH - this.h;
    } else if (this.y < 0) {
      this.y = 0;
    }
    // console.log(this.x + " - " + this.y);

    $('#floatingShape').css('transform', 'translate(' + this.x + 'px, ' + this.y + 'px)');
    // Evidently you can't animate the transform property with jQuery,
    // so I just had to use a CSS transition.

    this.loops += 1;
    if (this.loops % 2 == 0) {
      setTimeout(() => {
        $('#floatingShape').fadeOut(400);
        this.changeShape();
      }, 4040);
      return;
    }
    setTimeout(() => { this.move() }, 4040);
  },

  changeShape: function() {
    $('#floatingShape').removeClass('shape0 shape1 circle triangle-up');

    this.shape = this.shape >= 3 ? 0 : this.shape + 1;

    if (this.shape == 0) {
      $('#floatingShape').addClass('shape0');
    } else if (this.shape == 1) {
      $('#floatingShape').addClass('shape1');
    } else if (this.shape == 2) {
      $('#floatingShape').addClass('circle');
    } else {
      $('#floatingShape').addClass('triangle-up');
    }

    this.w = $('#floatingShape').css('width'),
    this.h = $('#floatingShape').css('height'),
    this.w = this.w.replace('px', '');
    this.h = this.h.replace('px', '');

    $('#floatingShape').fadeIn(400);
    this.move();
  }
}



var shape2X = 0;
var shape2Y = 0;
var w2 = $('#floatingTriangle').css('width');
w2 = w2.replace('px', '');
var h2 = $('#floatingTriangle').css('height');
h2 = h2.replace('px', '');

function moveShape2() {
  shape2X = Math.round( Math.random() * (screenW - w2) );
  shape2Y = Math.round( Math.random() * (screenH - h2) );

  if (shape2X > screenW - w2) {
    shape2X = screenW - w2;
  } else if (shape2X < 0) {
    shape2X = 0;
  }
  if (shape2Y > screenH - h2) {
    shape2Y = screenH - h2;
  } else if (shape2Y < 0) {
    shape2Y = 0;
  }
  //console.log(shape2X + " - " + shape2Y);

  $('#floatingTriangle').css('transform', 'translate(' + shape2X + 'px, ' + shape2Y + 'px)');

  //rotateShape2();
  setTimeout(rotateShape2, 4040);
}

// Evidently you can't change two seperate transform properties with jQuery,
// and the only solution I found online was to simply use vanilla JavaScript.
function rotateShape2() {
  var rotation = Math.round((Math.random() * 720) - 360);
  // console.log(rotation);

  $('#floatingTriangle').css('transform', 'rotate(' + rotation + 'deg)');

  setTimeout(moveShape2, 4040);
}


// function rotateShape2() {
//   $('#floatingTriangle').animate({borderSpacing: Math.random() * 360}, {
//     step: function(now, fx) {
//       $(this).css('transform','rotate(' + now + 'deg)');
//       //$(this).css('transform','translate(' + now + 'px, 0px)');
//     },
//     duration: 4000
//   }, 'linear').animate({borderSpacing: Math.random() * -360}, {
//     step: function(now, fx) {
//       $(this).css('transform','rotate(' + now + 'deg)');
//       //$(this).css('transform','translate(0px, ' + now + 'px)');
//     },
//     duration: 4000,
//   }, 'linear');
//
// setTimeout(moveShape2, 4040);
// }


window.addEventListener('resize', windowSizeChange);

function windowSizeChange() {
  screenW = window.innerWidth;
  screenH = window.innerHeight;
}
