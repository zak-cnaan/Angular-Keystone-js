var qt = {},
    fs = require('fs'),
    path = require('path'),
    _ = require('underscore'),
    lwip = require('lwip');

exports.qt = qt;

// express 4 deprecation support
function sendfile(res, file) {
    res[ res.sendFile ? 'sendFile' : 'sendfile' ](file);
}

qt.static = function (root, options) {
    root = path.normalize(root);

    options = options || ( options = {} );
    options.type = options.type || ( options.type = 'crop' );
    options.cacheDir = options.cacheDir || ( options.cacheDir = path.join(root, '.cache') );
    return function (req, res, next) {
        var file = decodeURI(req.url.replace(/\?.*/, '')),
            orig = path.normalize(root + file),
            cachedir = options.cacheDir;

        function send_if_exists(file, callback) {
            fs.exists(file, function (exists) {
                if (!exists) {
                    return callback();
                }
                fs.stat(file, function (err, stats) {
                    if (err) {
                        callback(err);
                    }
                    else if (stats.isFile()) {
                        return sendfile(res, file);
                    }
                    callback();
                });
            });
        }

        if (_.isEmpty(req.query)) {
            // query empty
            // send original

            return send_if_exists(orig, next);
        }
        else {
            // has params

            lwip.open(orig, function (err, image) {
                if (err) return console.log(err);

                var imgWidth = image.width();
                var imgHeight = image.height();
                var batch = image.batch();

                function write_file_and_send(p) {

                    batch.writeFile(p, function (err) {
                        if (err) return console.log(err);
                        sendfile(res, p);
                    });

                }


                function fixed_width_no_crop(w) {

                    var prefix = '_fixed_width_no_crop_' + w + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        batch.scale(w / imgWidth);
                        write_file_and_send(p);

                    });

                }

                function fixed_height_no_crop(h) {

                    var prefix = '_fixed_height_no_crop_' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        batch.scale(h / imgHeight);
                        write_file_and_send(p);

                    });

                }

                function fixed_width_and_fixed_height(w, h) {

                    var prefix = '_fixed_width_and_fixed_height_' + w + 'x' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        batch.resize(w * 1, h * 1);
                        write_file_and_send(p);

                    });

                }

                function fixed_width_crop_height(w, h) {

                    var prefix = '_fixed_width_crop_height_' + w + 'x' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        var calcHeight = w / imgWidth * imgHeight;
                        console.log(calcHeight);
                        batch.scale(w / imgWidth);

                        if (calcHeight > h) {
                            batch.crop(w * 1, h * 1);
                        }
                        write_file_and_send(p);

                    });

                }

                function fixed_height_crop_width(h, w) {

                    var prefix = '_fixed_height_crop_width_' + w + 'x' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        var calcWidth = h / imgHeight * imgWidth;
                        console.log(calcWidth);
                        batch.scale(h / imgHeight);

                        if (calcWidth > w) {
                            batch.crop(w * 1, h * 1);
                        }
                        write_file_and_send(p);

                    });

                }

                function max_width_no_crop(w) {

                    var prefix = '_max_width_no_crop_' + w + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        if (image.width() > w) {
                            batch.scale(w / imgWidth);

                        }

                        write_file_and_send(p);

                    });

                }

                function max_height_no_crop(h) {

                    var prefix = '_max_height_no_crop_' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        if (image.height() > h) {
                            batch.scale(h / imgHeight);

                        }

                        write_file_and_send(p);

                    });

                }

                function max_width_crop_height(w, h, name) {

                    name = name || '_max_width_crop_height_';

                    var prefix = name + w + 'x' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        var calcHeight;
                        var calcWidth;

                        if (image.width() > w) {
                            batch.scale(w / imgWidth);
                            calcHeight = w / imgWidth * imgHeight;
                            calcWidth = w / imgWidth * imgWidth;
                        }
                        else {
                            calcHeight = imgHeight;
                            calcWidth = imgWidth;
                        }

                        if (calcHeight > h) {
                            batch.crop(calcWidth, h * 1);
                        }
                        write_file_and_send(p);

                    });
                }

                function max_height_crop_width(w, h, name) {

                    name = name || '_max_height_crop_width_';

                    var prefix = name + w + 'x' + h + '.';
                    var fileName = file.replace('.', prefix);
                    var p = path.join(cachedir, fileName);

                    send_if_exists(p, function () {
                        var calcHeight;
                        var calcWidth;

                        if (image.height() > h) {
                            batch.scale(h / imgHeight);
                            calcHeight = h / imgHeight * imgHeight;
                            calcWidth = h / imgHeight * imgWidth;
                        }
                        else {
                            calcHeight = image.height();
                            calcWidth = image.width();
                        }

                        if (calcWidth > w) {
                            batch.crop(w * 1, calcHeight);
                        }
                        write_file_and_send(p);

                    });
                }


                function max_width_and_height(w, h) {

                    var name = '_max_width_and_height_';


                    var R1 = imgWidth / imgHeight,
                        R2 = w / h;

                    if (R1 > R2) {
                        max_height_crop_width(w, h, name);
                    }

                    else {
                        max_width_crop_height(w, h, name);
                    }


                }


                if (req.query.width && !req.query.height && !req.query.cropheight) {
                    fixed_width_no_crop(req.query.width);
                }
                if (req.query.height && !req.query.width && !req.query.cropwidth) {
                    fixed_height_no_crop(req.query.height);
                }
                if (req.query.width && req.query.height) {
                    fixed_width_and_fixed_height(req.query.width, req.query.height);
                }
                if (req.query.width && req.query.cropheight) {
                    fixed_width_crop_height(req.query.width, req.query.cropheight);
                }
                if (req.query.height && req.query.cropwidth) {
                    fixed_height_crop_width(req.query.height, req.query.cropwidth);
                }
                if (req.query.maxwidth && !req.query.maxheight && !req.query.cropheight) {
                    max_width_no_crop(req.query.maxwidth);
                }
                if (req.query.maxheight && !req.query.maxwidth && !req.query.cropwidth) {
                    max_height_no_crop(req.query.maxheight);
                }
                if (req.query.maxwidth && req.query.cropheight) {
                    max_width_crop_height(req.query.maxwidth, req.query.cropheight);
                }
                if (req.query.maxheight && req.query.cropwidth) {
                    max_height_crop_width(req.query.cropwidth, req.query.maxheight);
                }
                if (req.query.maxwidth && req.query.maxheight) {
                    max_width_and_height(req.query.maxwidth, req.query.maxheight);
                }


            });


        }

    };
};
