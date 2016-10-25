export default {
    render(req, res) {
        res.render('index.html');
    },
    session(req, res){
        res.json({ user: req.user });
    }
}