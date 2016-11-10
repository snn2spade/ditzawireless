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
      return avg.toFixed(2)+ " min";
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
          return road.traveled_time[road.traveled_time.length-index].toFixed(2)+ " min";
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
      try{
        let avg = roadAVG(src,dest);
        if(avg=="n/a" ||avg==null){
          return "/img/"+src+dest+"GR.png";
        }
        else{
          avg = parseFloat(roadAVG(src,dest).substr(0,4));
          if(avg<=5.00){
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
      style: 'growl-bottom-right',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R12').css('background-color',"white");
    },500);
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
      style: 'growl-bottom-right',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R21').css('background-color',"white");
    },500);
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
      style: 'growl-bottom-right',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R23').css('background-color',"white");
    },500);
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
      style: 'growl-bottom-right',
      icon: 'fa-road'
    });
    Meteor.setTimeout(function(){
      $('#R32').css('background-color',"white");
    },500);
  }
});
