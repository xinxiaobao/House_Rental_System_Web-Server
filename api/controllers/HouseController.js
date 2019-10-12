/**
 * HouseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('house/create');

        if (!req.body.House)
            return res.badRequest("Form-data not received.");

        await House.create(req.body.House);

        return res.ok("Successfully created!");
    },


    // json function
    json: async function (req, res) {

        var houses = await House.find();

        return res.json(houses);
    },


    // action - admin
    admin: async function (req, res) {

        var models = await House.find();
        return res.view('house/admin', { houses: models });

    },

    // action - home
    home: async function (req, res) {

        var models = await House.find();
        return res.view('house/home', { houses: models });

    },

    // action - view
    view: async function (req, res) {

        var model = await House.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('house/view', { house: model });

    },

    // action - edit
    edit: async function (req, res) {

        var model1 = await House.findOne(req.params.id);

        if (!model1) return res.notFound();

        return res.view('house/edit', { house: model1 });

    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await House.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("House Deleted.");

    },

    //action search page

    search: async function (req, res) {

        var model = await House.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('house/search', { house: model });

    },








    // search function
// search: async function (req, res) {

//     const qEstate = req.query.estate || "";
//     const qBedroom = parseInt(req.query.bedroom);

//     if (isNaN(qEstate)) {

//         var models = await House.find({
//             where: { estate: { contains: qEstate} },
//             sort: 'estate'
//         });

//     } else {

//         var models = await House.find({
//             where: { estate: { contains: qEstate }, bedroom: qBedroom },
//             sort: 'estate'
//         });

//     }

//     return res.view('house/search', { houses: models });
// },


//















};

