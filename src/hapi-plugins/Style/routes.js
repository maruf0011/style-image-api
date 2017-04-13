const fs = require('fs');
const Readable = require('stream').Readable;
const Joi = require('joi');


module.exports = [
  {
    method: 'POST',
    path: '/style',
    config: {
      tags: ['api'],
      description: 'Good testing',
      handler: (request, reply) => {
        reply({ status: 'OK' });
      },
    },
  },
  {
    method: 'POST',
    path: '/submit',
    config: {
      tags: ['api'],
      payload: {
        output: 'stream',
        parse: true,
        uploads: 'up_files',
        timeout: 30034,
        allow: 'multipart/form-data',
        failAction: 'log',
        maxBytes: 3000000,
      },
      validate: {
        payload: Joi.object().keys({
            file: Joi.binary().required(),
            filename: Joi.string()
        })
      },
      handler: function (request, reply) {
          var data = request.payload;
          if (data.file) {
              var name = data.file.hapi.filename;
              var path = __dirname + "/uploads/" + name;
              var file = fs.createWriteStream(path);

              file.on('error', function (err) {
                  console.error(err)
              });

              data.file.pipe(file);

              data.file.on('end', function (err) {
                  var ret = {
                      filename: data.file.hapi.filename,
                  }
                  reply(JSON.stringify(ret));
              })
          }
        }
    }
  }
];
