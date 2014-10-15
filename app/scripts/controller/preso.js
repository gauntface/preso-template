'use strict';

function PresoController() {
  this.CLASSNAME_CURRENT_SLIDE = 'current';

  //var ORIGIN = location.protocol + '//' + location.host;
  var currentSlide = 0;
  //var previousSlide = 0;
  var slides = document.querySelectorAll('slide');

  this.setCurrentSlideIndex = function(index) {
    currentSlide = index;
  };

  this.getCurrentSlideIndex = function() {
    return currentSlide;
  };

  this.getSlides = function() {
    return slides;
  };

  this.getSlideAtIndex = function(index) {
    if (index < 0 || index >= slides.length) {
      return null;
    }

    return slides[index];
  };

  this.atEndOfPreso = function() {
    return currentSlide >= slides.length - 1;
  };

  this.atStartOfPreso = function() {
    return currentSlide <= 0;
  };

  this.initialiseSlides();
}

PresoController.prototype.initialiseSlides = function() {
  console.log('Init Slides');
  this.moveToSlide(this.getCurrentSlideIndex());
  this.setUpEventListeners();
};

PresoController.prototype.setUpEventListeners = function() {
  document.addEventListener('stepforward',
    function() {
      console.log('Need to handle step forward');
      this.stepForward();
    }.bind(this));
  document.addEventListener('stepbackward',
    function() {
      console.log('Need to handle step backward');
      this.stepBackward();
    }.bind(this));
};

PresoController.prototype.moveToSlide = function(index) {
  // Remove any old current slides
  var currentSlides = document.querySelectorAll('.' + this.CLASSNAME_CURRENT_SLIDE);
  for (var i = 0; i < currentSlides.length; i++) {
    currentSlides[i].classList.remove(this.CLASSNAME_CURRENT_SLIDE);
  }

  this.setCurrentSlideIndex(index);

  // Set up the new current slide
  var newCurrentSlide = this.getSlideAtIndex(this.getCurrentSlideIndex());
  newCurrentSlide.classList.add(this.CLASSNAME_CURRENT_SLIDE);
};

PresoController.prototype.stepForward = function() {
  // TODO: Check for steps

  if (this.atEndOfPreso()) {
    return;
  }
  this.moveToSlide(this.getCurrentSlideIndex() + 1);
};

PresoController.prototype.stepBackward = function() {
  // TODO: Check for steps

  if (this.atStartOfPreso()) {
    return;
  }
  this.moveToSlide(this.getCurrentSlideIndex() - 1);
};

window.addEventListener('load', function() {
  window.PresoController = new PresoController();
});
