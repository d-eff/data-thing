const routes = require('express').Router();
const file = require('./fileLoader');

routes.get('/', (req, res) => {
  res.render('fileList',
            {
              data: file.flat,
                helpers: {
                    sanitize: function(string) {
                        return string.replace('.json', '');
                    }
                }
            }
  );
});

routes.get('/schemas/:folder/:filename/:id', (req, res) => {
    await file.loadFile(req.params.folder, req.params.filename, (newFile) => {
        res.render('list', { data: newFile });
    });
  res.render('userEvents',
            {
              data: file.data[req.params.filename][req.params.id]
            }
  );
});

routes.get('/schemas/:folder/:filename', async (req, res) => {
    await file.loadFile(req.params.folder, req.params.filename, (newFile) => {
        res.render('list', { data: newFile });
    });
});

module.exports = routes;