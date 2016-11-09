module.exports = {
  servers: {
    one: {
      host: '188.166.248.22',
      username: 'root',
       password: 'shadowfiend38'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'trafficExchanger',
    path: '..',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    docker: {
      //image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base' // use this image if using Meteor 1.4+
    },
    env: {
      // ROOT_URL: 'app.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },


};
