/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 'HouseController.home',




  'GET /house/home/:id': 'HouseController.home',
  'GET /house/admin/:id': 'HouseController.admin',
  'GET /house/view/:id': 'HouseController.view',

  'GET /house/edit/:id': 'HouseController.edit',

 

  'POST /house/delete/:id': 'HouseController.delete',

  'POST /house/update/:id': 'HouseController.update',

  'GET /house/update/:id': 'HouseController.update',



 'GET /house/search/:id': 'HouseController.search',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
