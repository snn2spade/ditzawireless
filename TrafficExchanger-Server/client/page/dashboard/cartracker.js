function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
}
Template.cartrackerPage.helpers({
  'cars': function(){
    return Car.find().fetch();
  }
});
Template.cartrackerPage.events({
  'click .car-btn': function(e){
    //change tower tracker
    let car = Car.findOne({serial:e.target.id});
    $('#car-body > tr').remove();
    for(let i=0;i<car.log.length;i++){
      let date = moment(car.log[i].date);
      $('#car-body').append('<tr><td>'+car.log[i].tower+'</td><td>'+date.format('DD MMM YY')+'</td><td>'+date.format('h:mm:ss a')+'</td></tr>');
    }
    //change car label
    $('#car-label > p').remove();
    $('#car-label').append('<p>Serial : '+car.serial+'</p>');
    $('#car-label').append('<p>Brand : '+car.brand+'</p>');
    $('#car-label').append('<p>Color : '+car.color+'</p>');
    //create color car label
    let hash = intToRGB(hashCode(car.serial));
    let r = parseInt(hash.substr(0,2),16);
    let g = parseInt(hash.substr(2,2),16);
    let b = parseInt(hash.substr(4,2),16);
    if(r<100) r=r+120;
    if(g<100) g=g+120;
    if(b<100) b=b+120;
    $('#car-label').css('background-color',"rgba("+r+","+g+","+b+",1)");
  }
});
