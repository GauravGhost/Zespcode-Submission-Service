async function pingRequest(req, res) {
    // console.log(await this.testService.pingCheck())
    const response = await this.testService.pingCheck();
    return res.send({data: response});
}


module.exports = pingRequest