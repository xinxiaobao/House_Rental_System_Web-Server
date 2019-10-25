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

        var model = await House.find(req.params.id);

        if (!model) return res.notFound();
        return res.view('house/admin', { houses: model });
    },



    // action - home
    home: async function (req, res) {

        var models = await House.find({
            where: { box: true },
            sort: 'createdAt desc',
            limit: 4
        });

        if (!models) return res.notFound();
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

        var model = await House.findOne(req.params.id);

        if (!model) return res.notFound();

        return res.view('house/edit', { house: model });

    },

    // action - delete 
    delete: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await House.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();

        return res.ok("House Deleted.");

    },




    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await House.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('house/update', { house: model });

        } else {

            if (!req.body.House)
                return res.badRequest("Form-data not received.");

            var models = await House.update(req.params.id).set({
                title: req.body.House.title,
                name: req.body.House.name,
                gross_area: req.body.House.gross_area,
                rent: req.body.House.rent,
                URL: req.body.House.URL,
                bedrooms: req.body.House.bedrooms,
                tenants: req.body.House.tenants,


            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },




    //action search page

    search: async function (req, res) {



        const qPage = Math.max(req.query.page - 1, 0) || 0;

        const numOfItemsPerPage = 2;

        var params = ""


        if (req.method == "GET") {

            const qName = req.query.name || "";
            const qRent1 = parseInt(req.query.rent1);
            const qRent2 = parseInt(req.query.rent2);
            const qGross_area1 = parseInt(req.query.gross_area1);
            const qGross_area2 = parseInt(req.query.gross_area2);
            const qBedrooms = parseInt(req.query.bedrooms);


            if (!qRent1 && !qRent2 && !qGross_area1 && !qGross_area2 && !qBedrooms && !qName) {

                var numOfPage = Math.ceil(await House.count() / numOfItemsPerPage);

                var models = await House.find({

                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage


                });


            } else if (isNaN(qRent1 || qRent2 || qGross_area1 || qGross_area2 || qBedrooms)) {

                params = req.url.split("?")[1].split("&page")[0] + "&";

                var numOfPage = Math.ceil(await House.count({ name: { contains: qName } }) / numOfItemsPerPage);

                var models = await House.find({
                    where: { name: { contains: qName } },
                    sort: 'name',
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage

                });

            } 
            
            
            else if(isNaN(qBedrooms)){



                params = req.url.split("?")[1].split("&page")[0] + "&";

                var numOfPage = Math.ceil(await House.count({ name: { contains: qName }, rent: { '>=': qRent1 || 0, '<=': qRent2 || 999999 }, gross_area: { '>=': qGross_area1 || 0, '<=': qGross_area2 || 9999 } }) / numOfItemsPerPage);

                var models = await House.find({
                    where: { name: { contains: qName }, rent: { '>=': qRent1 || 0, '<=': qRent2 || 999999 }, gross_area: { '>=': qGross_area1 || 0, '<=': qGross_area2 || 9999 } },
                    sort: 'name',
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage

                });


            }else{

                params = req.url.split("?")[1].split("&page")[0] + "&";

                var numOfPage = Math.ceil(await House.count({ name: { contains: qName }, bedrooms: qBedrooms, rent: { '>=': qRent1 || 0, '<=': qRent2 || 999999 }, gross_area: { '>=': qGross_area1 || 0, '<=': qGross_area2 || 9999 } }) / numOfItemsPerPage);

                var models = await House.find({
                    where: { name: { contains: qName }, bedrooms: qBedrooms, rent: { '>=': qRent1 || 0, '<=': qRent2 || 999999 }, gross_area: { '>=': qGross_area1 || 0, '<=': qGross_area2 || 9999 }},
                    sort: 'name',
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage

                });


            }

        }

        return res.view('house/search', { houses: models, count: numOfPage, params: params });

    },





};

