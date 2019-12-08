/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  if (await House.count() == 0) {

    await House.createEach([
      { title: "沙田第一城1,好房急租", ChineseName: "沙田第一城1，好房急租", name: "City One Shatin", gross_area: 11, rent: 11, URL: "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale", bedrooms: 1, tenants: 1, box: true,address:"https://leafletapi.mtchoy.now.sh/index.html?lat=22.38&lng=114.20%E3%80%824&zoom=17&markerLat=22.386389&markerLng=114.203889&markerTitle=City%20One&locate=false" },
      
      { title: "大围名城2，南北通透", ChineseName: "大围名城2，南北通透", name: "Festival City", gross_area: 22, rent: 22, URL: "https://si.wsj.net/public/resources/images/B3-DM067_RIGHTS_IM_20190319162958.jpg", bedrooms: 2, tenants: 2, box: true,address:"https://leafletapi.mtchoy.now.sh/index.html?lat=22.37&lng=114.18%E3%80%824&zoom=17&markerLat=22.3692&markerLng=114.1743&markerTitle=Festival%20City&locate=false" },
      { title: "黄埔花园3，家具齐全", ChineseName: "黄埔花园3，家具齐全", name: "Whampoa Garden", gross_area: 33, rent: 33, URL: "https://imagez.tmz.com/image/e7/4by3/2019/10/09/e79c6d9690ed403ebca905cc2923ee04_md.jpg", bedrooms: 3, tenants: 3, box: true,address:"https://leafletapi.mtchoy.now.sh/index.html?lat=22.30&lng=114.19%E3%80%824&zoom=17&markerLat=22.3041&markerLng=114.1922&markerTitle=Whampoa%20Garden&locate=false" },

      { title: "蓝湾半岛4，三房两厅", ChineseName: "蓝湾半岛4，三房两厅", name: "Island Resort", gross_area: 44, rent: 44, URL: "https://www.listenmoneymatters.com/wp-content/uploads/2018/04/LMM-Cover-Images-2.jpg", bedrooms: 4, tenants: 4, box: true,address:"https://leafletapi.mtchoy.now.sh/index.html?lat=22.26&lng=114.25%E3%80%824&zoom=17&markerLat=22.2655&markerLng=114.2512&markerTitle=Island%20Resort&locate=false" },

    ]);



    return generateUsers();

  }



  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    const hash = await sails.bcrypt.hash('123456', saltRounds);

    await User.createEach([
      { username: "admin", password: hash, role: "admin" },
      { username: "boss", password: hash },
      { username: "client", password: hash },
      { username: "client2", password: hash },
      { username: "client3", password: hash },
      { username: "client4", password: hash },
      { username: "client5", password: hash },
   
      // etc.
    ]);



    const cos = await House.findOne({ name: "City One Shatin" });
    const fc = await House.findOne({ name: "Festival City"});
    const boss = await User.findOne({ username: "boss" });
   
    const client2 = await User.findOne({ username: "client2" });

    await User.addToCollection(boss.id, 'rentto').members(cos.id);
    
    await User.addToCollection(client2.id, 'rentto').members([fc.id, cos.id]);

    // const martin = await House.findOne({ name: "Martin Choy" });
    // const kenny = await House.findOne({ name: "Kenny Cheng" });
    // const admin = await User.findOne({ username: "admin" });
    // const boss = await User.findOne({ username: "boss" });

    // await User.addToCollection(admin.id, 'rentto').members(kenny.id);
    // await User.addToCollection(boss.id, 'rentto').members([martin.id, kenny.id]);

  }



};
