roadAVG = function(src,dest){
  src = "" +src;
  dest = ""+dest;
  let road = Road.findOne({src:src,dest:dest});
  if (road!=null){
    if(road.traveled_time.length==0){
      return "n/a";
    }
    let avg=0;
    for(let i=0;i<road.traveled_time.length;i++){
      avg = avg + road.traveled_time[i];
    }
      avg = avg/road.traveled_time.length;
      if(avg<60){
        return avg.toFixed(2)+ " sec";
      }
      else{
        avg=avg/60.0;
        return avg.toFixed(2)+ " min";
      }
  }
  else{
    return null;
  }
}
if (Meteor.isClient) {
  Template.dashboardPage.onRendered(function(){
    let height = $(window).height()-50;
  });
  Template.dashboardPage.helpers({
    'road': function(src,dest,index){
      src = "" +src;
      dest = ""+dest;
      let road = Road.findOne({src:src,dest:dest});
      if (road!=null){
        if(index<=road.traveled_time.length){
          let time  =road.traveled_time[road.traveled_time.length-index].toFixed(2);
          if(time<60){
            return time + " sec";
          }
          else{
            time = (time/60.0).toFixed(2);
            return time + " min";
          }
        }
        else{
          return "n/a";
        }
      }
      else{
        return null;
      }
    },
    'road_avg': function(src,dest){
      return roadAVG(src,dest);
    },
    'color_url': function(src,dest){
      //todo
      try{
        let avg = roadAVG(src,dest);
        if(avg=="n/a" ||avg==null){
          return "/img/"+src+dest+"GR.png";
        }
        else{
          avg = parseFloat(roadAVG(src,dest).substr(0));
          if(roadAVG(src,dest).substr(5)=="min"){
            avg = avg*60;
          }
          if(avg<=5.0){
            return "/img/"+src+dest+"G.png";
          }
          else{
            return "/img/"+src+dest+"R.png";
          }
        }
      }
      catch (err){
        console.log(err);
      }
    }
  });
}
Tracker.autorun(function (c) {
  if(Road.findOne({src:"1",dest:"2"})!=null){
    let road = Road.findOne({src:"1",dest:"2"});
    if(road.traveled_time.length==0) return;
    let time = road.traveled_time[road.traveled_time.length-1];
    if(time !=null && time<=5.00){
      $('#R12').css('background-color',"#8cc63f");
    }
    else{
      $('#R12').css('background-color',"#d4145a");
    }
    Bert.alert({
      title: 'สภาพจราจรล่าสุด',
      message: 'ถ.เพชรบุรี ขาออก ใช้เวลา '+time.toFixed(2)+' นาที',
      type: 'info',
      style: 'fixed-bottom',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R12').css('background-color',"white");
    },2000);
  }
});
Tracker.autorun(function (c) {
  if(Road.findOne({src:"2",dest:"1"})!=null){
    let road = Road.findOne({src:"2",dest:"1"});
    if(road.traveled_time.length==0) return;
    let time = road.traveled_time[road.traveled_time.length-1];
    if(time !=null && time<=5.00){
      $('#R21').css('background-color',"#8cc63f");
    }
    else{
      $('#R21').css('background-color',"#d4145a");
    }
    Bert.alert({
      title: 'สภาพจราจรล่าสุด',
      message: 'ถ.เพชรบุรี ขาเข้า ใช้เวลา '+time.toFixed(2)+' นาที',
      type: 'info',
      style: 'fixed-bottom',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R21').css('background-color',"white");
    },2000);
  }
});
Tracker.autorun(function (c) {
  if(Road.findOne({src:"2",dest:"3"})!=null){
    let road = Road.findOne({src:"2",dest:"3"});
    if(road.traveled_time.length==0) return;
    let time = road.traveled_time[road.traveled_time.length-1];
    if(time !=null && time<=5.00){
      $('#R23').css('background-color',"#8cc63f");
    }
    else{
      $('#R23').css('background-color',"#d4145a");
    }
    Bert.alert({
      title: 'สภาพจราจรล่าสุด',
      message: 'ถ.ราชดำริ ขาออก ใช้เวลา '+time.toFixed(2)+' นาที',
      type: 'info',
      style: 'fixed-bottom',
      icon: 'fa-road'
    });
    setTimeout(function(){
      $('#R23').css('background-color',"white");
    },2000);
  }
});
Tracker.autorun(function (c) {
  if(Road.findOne({src:"3",dest:"2"})!=null){
    let road = Road.findOne({src:"3",dest:"2"});
    if(road.traveled_time.length==0) return;
    let time = road.traveled_time[road.traveled_time.length-1];
    if(time !=null && time<=5.00){
      $('#R32').css('background-color',"#8cc63f");
    }
    else{
      $('#R32').css('background-color',"#d4145a");
    }
    Bert.alert({
      title: 'สภาพจราจรล่าสุด',
      message: 'ถ.ราชดำริ ขาเข้า ใช้เวลา '+time.toFixed(2)+' นาที',
      type: 'info',
      style: 'fixed-bottom',
      icon: 'fa-road'
    });
    setTimeout(function(){
      $('#R32').css('background-color',"white");
    },2000);
  }
});
Car.find().observeChanges({
   added: function (id, fields) {
   },
   changed: function (id, fields) {
     let car = Car.findOne({_id:id});
     let str = "car : "+car.serial;
     switch (car.log[car.log.length-1].tower) {
        case "1":
          $('#tw1-text').text(str);
          $('.tw1-label').css('visibility','visible');
          setTimeout(function(){
            $('.tw1-label').css('visibility','hidden');
          },1500);
          break;
        case "2":
          $('#tw2-text').text(str);
          $('.tw2-label').css('visibility','visible');
          setTimeout(function(){
            $('.tw2-label').css('visibility','hidden');
          },1500);
          break;
        case "3":
          $('#tw3-text').text(str);
          $('.tw3-label').css('visibility','visible');
          setTimeout(function(){
            $('.tw3-label').css('visibility','hidden');
          },1500);
          break;
     }
     console.log("Have updated data with car serial : "+car.serial);
   },
   removed: function (id) {
   }
});
