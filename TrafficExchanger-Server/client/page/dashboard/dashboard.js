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
  });
}
