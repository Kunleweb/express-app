const Tour = require("./models/tourmodels");
const APIfeatures = require('./utils/apiFeatures')

exports.aliastoptours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-price";
  next();
};





exports.getalltours = async (req, res) => {

  const features = new APIfeatures(Tour.find(), req.query).filter().sort().limit().pagination();
  const tours = await features.query;

  res
    .status(200)
    .json({status: "success", results:tours.length, data:tours});
};

exports.gettours = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({ status: "sucess", data: { tour } });
};

exports.createtour = (req, res) => {
  const new_ID = tours[tours.length - 1].id + 1;
  const new_tour = Object.assign({ id: new_ID }, req.body);
  tours.push(new_tour);
  fs.writeFile(`./tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({ status: "success", data: { tours: new_tour } });
  });
};

exports.deletetour = async (req, res) => {
  try {
    const tour = await Tour.findOneAndDelete({ _id: id });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
