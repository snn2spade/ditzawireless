Router.route( "/carreply", function() {
      let req = this.request;
      let res = this.response;
      let data = req.body;
      let date = new Date();
      // insert each car data table
      console.log(data.tower+","+data.serial+","+data.brand+","+data.color+","+date);
      let car = Car.findOne({serial:data.serial})
      if(car==null){
        Car.insert({brand:data.brand,color:data.color,serial:data.serial,log:[{tower:data.tower,date:date}]});
      }
      else{
        let log_n = car.log;
        log_n = log_n.concat([{tower:data.tower,date:date}]);
        Car.update(car._id,{$set:{log:log_n,brand:data.brand,color:data.color}});
      }
      // insert road data table
      let src = car.log[car.log.length-1].tower;
      let src_time = car.log[car.log.length-1].date;
      let dest = data.tower;
      let dest_time = date;
      let road = Road.findOne({src:src,dest:dest});
      if( road !=null){
        if(road.traveled_time.length>=5){
          road.traveled_time.shift();
        }
        let traveled_time = (dest_time - src_time)/60000;
        let road_n = road.traveled_time.concat([traveled_time]);
        Road.update(road._id,{$set:{traveled_time:road_n}});
      }
      //Respond to tower
      res.writeHead(200, {"Content-Type": "application/json"});
      var json = JSON.stringify({
        traffic:{R12:"N/a",R21:"N/a",R23:"N/a",R32:"N/a"}
      });
      res.end(json);
      // res.end("Reply from server, We already recieved your request.");
}, { where: "server" });
