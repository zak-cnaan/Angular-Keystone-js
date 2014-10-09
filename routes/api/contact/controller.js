var nodemailer = require('nodemailer');
var _ = require('underscore');
var sanitizer = require('sanitizer');
require('dotenv').load();


var transporter = nodemailer.createTransport(
    JSON.parse(process.env.GMAIL_SERVICE)
);

exports.contact = function(req, res) {




    var htmlMsg = "<tr><td colspan='2'><h2>You have mail!</h2></td></tr>";
    _.each(req.body, function(value, key) {

        htmlMsg += "<tr><td><b>" +key+ ":</b></td><td>" +value+ "</td></tr>";
    });
    htmlMsg = "<table>"+htmlMsg+"</table>";

    htmlMsg = sanitizer.sanitize(htmlMsg);

    transporter.sendMail({
        from: 'yoursite@gmail.com',
        to: process.env.ADMIN_MAIL,
        subject: 'Contact message',
        html: htmlMsg
    },
        function(error, info) {
        if (error) {
            res.apiResponse({data: error.message});
        }
            res.apiResponse({data: info});
    });


};
