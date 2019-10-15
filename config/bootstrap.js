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

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)



   if (await House.count() > 0) {
      return;
   }
  
   await House.createEach([
     { title:"沙田第一城", ChineseName:"", name:"City One Shatin", gross_are:11, rent:11, URL :"/images/pic1.jpg",bedrooms:1, tenants:1,},
     { title:"大围名城", ChineseName:"", name:"Tai Wai", gross_are:22, rent:22, URL :"/images/pic2.jpg",bedrooms:2, tenants:2,},  
     { title:"黄埔花园",ChineseName:"", name:"Hung Hom", gross_are:33, rent:33, URL :"/images/pic3.jpeg",bedrooms:3, tenants:3,},  // ```
     
     { title:"蓝湾半岛",ChineseName:"", name:"Siu Sai Wan", gross_are:44, rent:44, URL :"/images/pic4.jpg",bedrooms:4, tenants:4,},
    ]);

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
};
