/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    // action login
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            req.session.userid = user.id;

            req.session.role = user.role;
            

            sails.log("[Session] ", req.session);

            return res.ok("Login successfully.");

        });

    },


    //action logout
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            // return res.ok("Log out successfully.");

            // alert("Log out successfully.");

            return res.redirect("/");
        });
    },


    //action populate
    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("rentto");

        if (!model) return res.notFound();

        return res.json(model);

    },

    // action add
    add: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatHouse = await House.findOne(req.params.fk).populate("rentfrom", { id: req.params.id });

        if (!thatHouse) return res.notFound();

        if (thatHouse.rentfrom.length)
            return res.status(409).send("Already added.");   // conflict

        await User.addToCollection(req.params.id, "rentto").members(req.params.fk);

        return res.ok('Operation completed.');

    },


    //action remove
    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatHouse = await House.findOne(req.params.fk).populate("rentfrom", { id: req.params.id });

        if (!thatHouse) return res.notFound();

        if (!thatHouse.rentfrom.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.params.id, "rentto").members(req.params.fk);

        return res.ok('Operation completed.');

    },

    myrentals: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("rentto");

        if (!model) return res.notFound();

        return res.view('user/myrentals', { houses: model });

    },









};

