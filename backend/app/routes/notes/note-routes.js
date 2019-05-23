module.exports = function(app, db) {
    let dataBase = db.db('users');
    app.post('/users/notes', (req, res) => {
        const note = {title: req.body.title, text: req.body.body};
        dataBase.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result.ops[0])
            }
        })
    })
}