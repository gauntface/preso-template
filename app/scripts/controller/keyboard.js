'use strict';

function KeyBoardController() {
  this.EVENT_STEP_FORWARD = 'stepforward';
  this.EVENT_STEP_BACKWARD = 'stepbackward';

  document.addEventListener('keydown', this.onKeyDown.bind(this), false);
}

KeyBoardController.prototype.onKeyDown = function(evt) {
  if (/^(input|textarea)$/i.test(evt.target.nodeName) ||
      evt.target.isContentEditable) {
    return;
  }

  switch (evt.keyCode) {
    case 13: // Enter
      break;

    case 39: // right arrow
    case 32: // space
    case 34: // PgDn
    case 38: // up arrow
      this.fireEvent(this.EVENT_STEP_FORWARD);
      evt.preventDefault();
      break;

    case 37: // left arrow
    case 8: // Backspace
    case 33: // PgUp
    case 40: // down arrow
      this.fireEvent(this.EVENT_STEP_BACKWARD);
      evt.preventDefault();
      break;

    //case 72: // H: Toggle code highlighting
    //  document.body.classList.toggle('highlight-code');
    //  break;

    //case 79: // O: Toggle overview
    //  this.toggleOverview();
    //  break;

    //case 80: // P
    //  if (this.controller && this.controller.isPopup) {
    //    document.body.classList.toggle('with-notes');
    //  } else if (this.controller && !this.controller.popup) {
    //    document.body.classList.toggle('with-notes');
    //  }
    //  break;

    //case 27: // ESC: Hide notes and highlighting
    //  document.body.classList.remove('with-notes');
    //  document.body.classList.remove('highlight-code');
    //
    //  if (document.body.classList.contains('overview')) {
    //    this.toggleOverview();
    //  }
    //  break;

    //case 70: // F: Toggle fullscreen
    //   // Only respect 'f' on body. Don't want to capture keys from an <input>.
    //   // Also, ignore browser's fullscreen shortcut (cmd+shift+f) so we don't
    //   // get trapped in fullscreen!
    //  if (evt.target === document.body && !(evt.shiftKey && evt.metaKey)) {
    //    if (document.mozFullScreen !== undefined && !document.mozFullScreen) {
    //      document.body.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    //    } else if (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
    //      document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    //    } else {
    //      document.cancelFullScreen();
    //    }
    //  }
    //  break;

    //case 87: // W: Toggle widescreen
    //  // Only respect 'w' on body. Don't want to capture keys from an <input>.
    //  if (evt.target === document.body && !(evt.shiftKey && evt.metaKey)) {
    //    this.container.classList.toggle('layout-widescreen');
    //  }
    //  break;
  }
};

KeyBoardController.prototype.fireEvent = function(eventName) {
  var event = new window.Event(eventName);
  document.dispatchEvent(event);
};

window.addEventListener('load', function() {
  window.KeyBoardController = new KeyBoardController();
});
