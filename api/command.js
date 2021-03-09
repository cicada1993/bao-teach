
module.exports = (req, res) => {
    console.log('收到请求', req)
    const date = new Date().toString();
    res.status(200).send(date);
}