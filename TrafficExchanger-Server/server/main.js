import { Meteor } from 'meteor/meteor';

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
Meteor.startup(() => {
  // Meteor.setInterval(randomInsertRoadData, 4000);
});
