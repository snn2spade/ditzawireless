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
if (Meteor.isClient){
    Template.navbar.events({
        "click #start-s": () =>{
            Meteor.clearInterval(Session.get("intervalId"));
            intervalId = Meteor.setInterval(randomInsertRoadData,4000);
            Session.set("intervalId", intervalId);
            console.log ("Start button clicked.");
        },
        "click #start-q": () =>{
            Meteor.clearInterval(Session.get("intervalId"));
            intervalId = Meteor.setInterval(randomInsertRoadData,2000);
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
