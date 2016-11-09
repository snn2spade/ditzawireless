Road = new Mongo.Collection('roads');
if(Meteor.isServer){
  if(Road.findOne()==null){
    Road.insert({src:"1",dest:"2",traveled_time:[]});
    Road.insert({src:"2",dest:"1",traveled_time:[]});
    Road.insert({src:"2",dest:"3",traveled_time:[]});
    Road.insert({src:"3",dest:"2",traveled_time:[]});
  }
}
