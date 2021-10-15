/* eslint-disable class-methods-use-this */
class FormsController {
  send(req, res) {
    const { country, convertQuantity } = req.body;

    return res.json({ country, convertQuantity, test: 'testValue' });
  }
}

module.exports = FormsController;
