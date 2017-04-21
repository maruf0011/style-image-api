const fs = require('fs');
const Readable = require('stream').Readable;
const Joi = require('joi');
const sys = require('sys');
const exec = require('child_process').exec;
module.exports = [
  {
    method: 'POST',
    path: '/style',
    config: {
      tags: ['api'],
      description: 'Good testing',
      handler: (request, reply) => {
        const child = exec("pwd", (err, stdout, stderr) => {
          sys.print("stdout " + stdout);
          sys.print("stdin" + stderr);
          if(err) {
            console.log("error " + err);
          }
        })
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
      handler: function (request, reply) {
        console.log('bokkor');
          console.log(request);
          var data = request.payload.file;
          if (data) {
            console.log('HERE');
              var name = data.hapi.filename;
              var path = __dirname + "/../../../uploads/" + name;
              console.log('path', path);
              var file = fs.createWriteStream(path);

              file.on('error', function (err) {
                  console.error(err)
              });

              data.pipe(file);

              data.on('end', function (err) {
                  console.log('end');
                  var ret = {
                      filename: data.hapi.filename,
                  }
                  reply(JSON.stringify(ret));
              });
          } else {
            console.log('fuck');
          }
        }
    }
  }
];
