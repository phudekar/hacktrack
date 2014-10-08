
var clock = $('#countdown').FlipClock({
clockFace: 'DailyCounter',
countdown: true
});

clock.setTime((new Date('2014/11/1 09:00:00') - new Date())/1000);
clock.start();