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


};

