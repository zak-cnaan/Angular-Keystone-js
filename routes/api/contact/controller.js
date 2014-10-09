var nodemailer = require('nodemailer');
var _ = require('underscore');
var sanitizer = require('sanitizer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zak.cnaan@gmail.com',
        pass: 'Qwerty78'
    }
});

exports.contact = function(req, res) {
    console.log(req.body.message);

    var htmlMsg = "<tr><td colspan='2'><h2>You have mail!</h2></td></tr>";
    _.each(req.body, function(value, key) {

        htmlMsg += "<tr><td><b>" +key+ ":</b></td><td>" +value+ "</td></tr>";
    });
    htmlMsg = "<table>"+htmlMsg+"</table>";

    htmlMsg = sanitizer.sanitize(htmlMsg);

    transporter.sendMail({
        from: 'yoursite@gmail.com',
        to: 'zak.cnaan@mail.com',
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
