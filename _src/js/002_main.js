var jPLA = (function jasonPatrickLydonActions() {
  var _toggleContactForm = function(evt){
    console.log("_toggleContactForm", typeof evt, cE.contactFormOpen, cE.contactFormOpen);
    if(cE.navOpen){
      _toggleFooterNav("close");
    }
    var closeForm = function(){
      document.body.classList.remove("showing-contact-form");    
      Velocity(cE.contactForm, "slideUp");
      cE.contactFormOpen = false;      
    };
    var openForm = function(){
      document.body.classList.add("showing-contact-form");    
      Velocity(cE.contactForm, "slideDown");
      cE.contactFormOpen = true;
    };
    switch(typeof evt){
      case "object":
        if(cE.contactFormOpen){
          closeForm();
        } else {
          openForm();
        }
        evt.preventDefault();
        break;
      case "string":
        if(cE.contactFormOpen && evt === "close"){
          closeForm();
        } else {
          openForm();
        }
        break;
      default:
        // do nothing
    }
  }
  var _submitContactForm = function(evt){
    var thisForm = evt.target,
        request = new XMLHttpRequest(),
        yourData = new FormData(thisForm);
    request.onload = function(){
      if(request.responseText !== null && request.status === 200){
        console.log("MUCH SUCCESS");
      } else {
        console.log("THERE IS AN ERROR!")
      }
    }
    request.open('POST', '/public/actions/contact.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(yourData);
    evt.preventDefault();
  }
  var _toggleFooterNav = function(evt){
    console.log("_toggleFooterNav", typeof evt, cE.navOpen, cE.contactFormOpen);
    if( cE.contactFormOpen ){
      _toggleContactForm("close");
    }
    var closeNav = function(){
      Velocity(cE.footerNav, "slideUp");
      document.body.classList.remove("showing-footer-nav");
      cE.navOpen = false;
    }
    var openNav = function(){
      Velocity(cE.footerNav, "slideDown");
      document.body.classList.add("showing-footer-nav");
      cE.navOpen = true;
    }
    switch(typeof evt){
      case "object":
        if(cE.navOpen){
          closeNav();
        } else {
          openNav();
        }
        evt.preventDefault();
        break;
      case "string":
        if(cE.navOpen && evt === "close"){
          closeNav();
        } else {
          openNav();
        }
        break;
      default:
        // do nothing
    }
  }
  var _rEL = function registerEventListeners(){
    var i = 0,
        count = 0;
    count = cE.openContactButtons.length;
    for(i = 0; i < count; i++ ){
      cE.openContactButtons[i].addEventListener("click", _toggleContactForm, false);
    }

    count = cE.closeContactButtons.length;
    for(i = 0; i < count; i++ ){
      cE.closeContactButtons[i].addEventListener("click", _toggleContactForm, false);
    }
    cE.toggleNavButton.addEventListener("click", _toggleFooterNav, false);
    cE.contactForm.addEventListener("submit", _submitContactForm, false);
  }
  var init = function initializeObject(){
    _rEL();
  }
  var cE = {
    // cache elements
    openContactButtons: document.querySelectorAll('[data-cta="toggle-contact"]') || null,
    contactForm: document.querySelector(".template-contact-form"),
    closeContactButtons: document.querySelectorAll('[data-cta="close-contact"]'),
    contactFormOpen: false,
    toggleNavButton: document.querySelector('[data-cta="toggle-menu"]'),
    navOpen: false,
    footerNav: document.querySelectorAll('footer nav')
  }
  return {
    init: init
  };
})();
jPLA.init();