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
      { title: "沙田第一城1", ChineseName: "", name: "City One Shatin", gross_area: 11, rent: 11, URL: "/images/pic1.jpg", bedrooms: 1, tenants: 1, box: true, },
      { title: "大围名城2", ChineseName: "", name: "Festival City", gross_area: 22, rent: 22, URL: "/images/pic2.jpg", bedrooms: 2, tenants: 2, box: true, },
      { title: "黄埔花园3", ChineseName: "", name: "Whampoa Garden", gross_area: 33, rent: 33, URL: "/images/pic3.jpeg", bedrooms: 3, tenants: 3, box: true, },

      { title: "蓝湾半岛4", ChineseName: "", name: "Siu Sai Wan", gross_area: 44, rent: 44, URL: "/images/pic4.jpg", bedrooms: 4, tenants: 4, box: true, },

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
      { username: "boss", password: hash, role:"admin" },
      { username: "client1", password: hash },
      { username: "client2", password: hash },
      { username: "client3", password: hash },
      { username: "client4", password: hash },
      { username: "client5", password: hash },
      { username: "client6", password: hash },
      // etc.
    ]);



    const cos = await House.findOne({ name: "City One Shatin" });
    const fc = await House.findOne({ name: "Festival City"});
    const admin = await User.findOne({ username: "admin" });
    const boss = await User.findOne({ username: "boss" });

    await User.addToCollection(admin.id, 'rentto').members(cos.id);
    await User.addToCollection(boss.id, 'rentto').members([fc.id, cos.id]);

    // const martin = await House.findOne({ name: "Martin Choy" });
    // const kenny = await House.findOne({ name: "Kenny Cheng" });
    // const admin = await User.findOne({ username: "admin" });
    // const boss = await User.findOne({ username: "boss" });

    // await User.addToCollection(admin.id, 'rentto').members(kenny.id);
    // await User.addToCollection(boss.id, 'rentto').members([martin.id, kenny.id]);

  }




};
