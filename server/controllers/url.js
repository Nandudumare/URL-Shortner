const urlModel = require("../models/url");

const generate = async (req, res) => {
  const { url, custom } = req.body;
  try {
    if (custom) {
      const newUrl = new urlModel({
        originalUrl: url,
        shortUrl: `https://minebitly.herokuapp.com/${custom}`,
      });
      await newUrl.save();

      return res.send(newUrl);
    } else {
      const randomStr = (len) => {
        const big = "abcdefghijklmnopqrstuvwxyz";
        let ans = "";
        for (let i = 0; i < len; i++) {
          ans += big[Math.floor(Math.random() * big.length)];
        }
        return ans;
      };
      const str = randomStr(5);

      const newUrl = new urlModel({
        originalUrl: url,
        shortUrl: `https://minebitly.herokuapp.com/${str}`,
      });
      await newUrl.save();
      return res.send(newUrl);
    }
  } catch (err) {
    return res.status(401).send("Something went wrong");
  }
};

const redirect = async (req, res) => {
  const { str } = req.params;
  const Str = `https://minebitly.herokuapp.com/${str}`;
  const model = await urlModel.findOne({ shortUrl: Str });
  if (model) {
    return res.redirect(model.originalUrl);
  } else {
    return res.send(
      "Short Url Expired Or Website Link is not valid, Make a New short url"
    );
  }
};

module.exports = { generate, redirect };
