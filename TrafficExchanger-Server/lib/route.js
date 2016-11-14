Meteor.methods({
  'insertRoadData': function(src,dest,traveled_time){
    src = ""+src;
    dest = ""+dest;
    let road = Road.findOne({ src: src, dest: dest });
    if (road != null) {
        if (road.traveled_time.length >= 5) {
            road.traveled_time.shift();
        }
        let road_n = road.traveled_time.concat([traveled_time]);
        Road.update(road._id, { $set: { traveled_time: road_n } });
    }
  },
  'insertCarData': function(serial,brand,color,tower){
    let car = Car.findOne({ serial: serial });
    let date = new Date();
    if (car == null) {
        Car.insert({ serial: serial,brand: brand, color: color,  log: [{ tower: tower, date: date }] });
    } else {
        let log_n = car.log;
        log_n = log_n.concat([{ tower: tower, date: date }]);
        if(log_n.length>1000){
          for(let i=0;i<700;i++){
            log_n.shift();
          }
        }
        Car.update(car._id, { $set: { log: log_n, brand: brand, color: color } });
    }
    // insert road data table
    car = Car.findOne({ serial: serial });
    if(car.log.length>=2){
      let src = car.log[car.log.length - 2].tower;
      let pointer = car.log.length - 3;
      while(pointer>=0){
        if(car.log[pointer].tower == src) pointer=pointer-1;
        else break;
      }
      pointer = pointer +1;
      src = car.log[pointer].tower;
      let src_time = car.log[car.log.length - 2].date;
      let dest = car.log[car.log.length - 1].tower;
      let dest_time = car.log[car.log.length - 1].date;
      let traveled_time = (dest_time - src_time) / 1000;
      Meteor.call('insertRoadData',src,dest,traveled_time);
    }
  },
  'removeCarData': function(){
    Car.remove({});
  },
  'removeRoadData': function(){
    let arr = Road.find().fetch()
    for(let i=0;i<arr.length;i++){
      // obj = Road.findOne({_id : arr[i]._id});
      Road.update({_id:arr[i]._id}, { $set: { traveled_time: [] } });
    }
  }
});
Router.configure({
    // the default layout
    layoutTemplate: 'mainLayout',
});
Router.route('/', function() {
    this.render('dashboardPage');
    this.render('navbar', { to: 'navbarsection', data: { page: 'dashboardPage' } });
});
Router.route('/cartracker', function() {
    this.render('cartrackerPage', { data: { name: 'hello' } });
    this.render('navbar', { to: 'navbarsection', data: { page: 'cartrackerPage' } });
});

Router.route("/carreply", { where: "server" })
    .get(function() {
        // If a GET request is made, return the user's profile.
        this.response.end("Please use post method to send data.")
    })
    .post(function() {
        let req = this.request;
        let res = this.response;
        let data = req.body;
        // insert each car data table
        console.log("recieved>tower:"+data.tower + "," + data.serial + "," + data.brand + "," + data.color);
        Meteor.call('insertCarData',data.serial,data.brand,data.color,data.tower);

        //Respond to tower
        // res.writeHead(200, { "Content-Type": "application/json" });
        // var json = JSON.stringify({
        //     traffic: { R12: "N/a", R21: "N/a", R23: "N/a", R32: "N/a" }
        // });
        // json = json + " Recieved server time : " + date;
        res.end("We already recived your json post request.");
        // res.end("Reply from server, We already recieved your request.");
    })
    .put(function() {
        // If a PUT request is made, either update the user's profile or
        // create it if it doesn't already exist.
    })
    .delete(function() {
        // If a DELETE request is made, delete the user's profile.
    });
