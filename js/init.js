//==============================================================================
function initCountdown() {
  
  var start = getNextEventDate();    
  
  setInterval(function() {
    var t = start - new Date();
    var days, hours, mins, secs;        
    days = Math.floor(t / (24 * 3600000));
    t -= days * 24 * 3600000;
    hours = Math.floor(t / 3600000);
    t -= hours * 3600000;
    mins = Math.floor(t / 60000);
    t -= mins * 60000;
    secs = Math.floor(t / 1000);
    $('#countdown-text').html('Rendez-vous dans '
      + days + (days > 1 ? ' jours ' : ' jour ') 
      + hours + (hours > 1 ? ' heures ' : ' heure ')
      + mins + (mins > 1 ? ' minutes ' : ' minute ')
      + secs + (secs > 1 ? ' secondes' : ' seconde')
    );
  }, 1000);
  
  $('#nextdate').html(getNextEventDateString());

}

//==============================================================================
function initCountdownCN(year, month, day, hour) {
  
  var start = new Date(year, month - 1, day, hour);      
  
  setInterval(function() {
    var t = start - new Date();
    var days, hours, mins, secs;        
    days = Math.floor(t / (24 * 3600000));
    t -= days * 24 * 3600000;
    hours = Math.floor(t / 3600000);
    t -= hours * 3600000;
    mins = Math.floor(t / 60000);
    t -= mins * 60000;
    secs = Math.floor(t / 1000);
    $('#countdown-text').html('离活动开始还有 '
      + days + '天 '
      + hours + '小时 '
      + mins + '分钟 '
      + secs + '秒'
    );
  }, 1000);
  
}

//==============================================================================
function initMenuScrollAnimation() {
  
  var SCROLL_TIME = {
    '#about': 800, 
    '#whenwhere': 1200, 
    '#faq': 1400, 
    '#contact': 1800
  };
  
  $('nav a').click(function() {        
    var sectionId;
    if (/(#[^#]+)$/.test(this.href)) {
      sectionId = RegExp.$1;
      $('html, body').animate({        
        scrollTop: $(sectionId).offset().top
      }, SCROLL_TIME[sectionId]);  
    }      
  });
  
}

var getEventDate = function(now) {
  var day = now.getDay();
  var date = now.getDate();
  var newDate = new Date(now.getTime());
  newDate.setDate(1);

  var firstDayOfMonth = newDate.getDay();
  var eventDate = new Date(now.getTime());
  
  if(firstDayOfMonth > 4) {
    eventDate.setDate((7 - firstDayOfMonth) + 5);
  } else {
    eventDate.setDate(5 - firstDayOfMonth);
  }
  
  return eventDate;
};

var getNextEventDate = function(d) {
  var now = d || new Date();
  var eventDate = getEventDate(now);
  if(now.getDate() > eventDate.getDate()) {
    now.setMonth(now.getMonth() + 1);
    now.setDate(1);
    eventDate = getEventDate(now);
  }

  eventDate.setHours(19);
  eventDate.setMinutes(00);

  return eventDate;
};

var getNextEventDateString = function() {
  var date = getNextEventDate();
  var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  return 'Jeudi ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' 19h00'; 
};