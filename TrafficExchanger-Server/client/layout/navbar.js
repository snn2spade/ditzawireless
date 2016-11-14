Template.navbar.helpers({
  isEqual: (page1,page2) => {
    return page1 == page2
  },
  isContain: (string,substring) => {
    return string.indexOf(substring) != -1
  }
});
randomInsertRoadData = function(){
  let rand = parseInt(Math.random()*4);
  switch (rand) {
    case 0:
      Meteor.call('insertRoadData',1,2,Math.random()*10);
      break;
    case 1:
      Meteor.call('insertRoadData',2,1,Math.random()*10);
      break;
    case 2:
      Meteor.call('insertRoadData',2,3,Math.random()*10);
      break;
    case 3:
      Meteor.call('insertRoadData',3,2,Math.random()*10);
      break;
  }
  console.log("trigger randomInsertRoadData Dice:"+rand);
}
randomInsertCarData = function(){
  //todo
  let rand = parseInt(Math.random()*3);
  let car_log;
  let last_tw;
  if (Car.findOne({"serial":"AB9999"})!=null){
    car_log = Car.findOne({"serial":"AB9999"}).log;
    last_tw = car_log[car_log.length-1].tower;
  }
  else{
    last_tw =1;
  }
  let next_tw="";
  if(last_tw==1) next_tw =2;
  else if(last_tw==2){
    let rand = parseInt(Math.random()*2);
    console.log("trigger randomInsertCarData Dice:"+rand);
    if( rand==1) next_tw=1;
    else next_tw=3;
  }
  else next_tw=2;
  setTimeout(function(){
    Meteor.call('insertCarData',"AB9999","toyota","red",""+next_tw);
  },Math.random()*2000);
}
if (Meteor.isClient){
    Template.navbar.events({
        "click #start-s": () =>{
            Meteor.clearInterval(Session.get("intervalId"));
            intervalId = Meteor.setInterval(randomInsertCarData,5000);
            Session.set("intervalId", intervalId);
            console.log ("Start button clicked.");
        },
        "click #start-q": () =>{
            Meteor.clearInterval(Session.get("intervalId"));
            intervalId = Meteor.setInterval(randomInsertCarData,7000);
            Session.set("intervalId", intervalId);
            console.log ("Start button clicked.");
        },
        "click #stop": ()=>{
            Meteor.clearInterval(Session.get("intervalId"));
            console.log("Pause button clicked.");
        },
        "click #clean": ()=>{
            Meteor.call('removeCarData');
          Meteor.call('removeRoadData');
        },
    })
}
