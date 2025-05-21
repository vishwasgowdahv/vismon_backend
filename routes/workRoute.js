import express from "express";
import { body, validationResult } from "express-validator";
import validateLogin from "../middleware/validateLogin.js";
import Work from "../models/Work.js";

const router = express();

let sucess = false;

router.get("/fetchallworks", validateLogin, async (req, res) => {
  sucess = false;
  const works = await Work.find({ user: req.user });
  sucess = true;
  res.json({ sucess, works });
});

try {
  router.get("/fetchwork/:id", validateLogin, async (req, res) => {
    sucess = false;
    let tempWork = await Work.findById(req.params.id);
    if (!tempWork) {
      return res.status(400).json({ sucess, error: "Notes not Found" });
    }
    if (!(req.user.toString() === tempWork.user.toString())) {
      return res.status(400).json({ sucess, error: "Not Authorized" });
    }
    const works = await Work.findOne({ _id: req.params.id });
    sucess = true;
    res.json({ sucess, works });
  });
} catch (error) {
  sucess = false;
  res.status(400).json({ sucess, error: error });
}

router.post(
  "/addwork",
  [
    body("companyName", "Company Name shoud be atleast 2 charecters").isLength({
      min: 2,
    }),
  ],
  validateLogin,
  async (req, res) => {
    sucess = false;
    const {
      companyName,
      workStartDate,
      workEndDate,
      startTime,
      endTime,
      tookVehicleToGo,
      tookVehicleToComeBack,
      wagePerHour,
      breakTaken,
    } = req.body;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ sucess, error: results.array() });
    }

    const savedWork = await Work.create({
      user: req.user,
      companyName,
      workStartDate,
      workEndDate,
      startTime,
      endTime,
      tookVehicleToGo,
      tookVehicleToComeBack,
      wagePerHour,
      breakTaken,
    });
    sucess = true;
    res.json({ sucess, savedWork });
  }
);

router.post("/updatework/:id", validateLogin, async (req, res) => {
  sucess = false;
  const {
    companyName,
    workStartDate,
    workEndDate,
    startTime,
    endTime,
    tookVehicleToGo,
    tookVehicleToComeBack,
    wagePerHour,
    breakTaken,
  } = req.body;
  let tempWork = await Work.findById(req.params.id);
  if (!tempWork) {
    return res.status(400).json({ sucess, error: "Notes not Found" });
  }
  if (!(req.user.toString() === tempWork.user.toString())) {
    return res.status(400).json({ sucess, error: "Not Authorized" });
  }
  //   let newWork = {};
  //   if (companyName) {
  //     newWork.companyName = companyName;
  //   }
  //   if (workStartDate) {
  //     newWork.workStartDate = workStartDate;
  //   }
  //   if (workEndDate) {
  //     newWork.workEndDate = workEndDate;
  //   }
  //   if (startTime) {
  //     newWork.startTime = startTime;
  //   }
  //   if (endTime) {
  //     newWork.endTime = endTime;
  //   }
  //   if (tookVehicleToGo) {
  //     newWork.tookVehicleToGo = tookVehicleToGo;
  //   }
  //   if (tookVehicleToComeBack) {
  //     newWork.tookVehicleToComeBack = tookVehicleToComeBack;
  //   }
  //   if (wagePerHour) {
  //     newWork.wagePerHour = wagePerHour;
  //   }
  //   if (breakTaken) {
  //     newWork.breakTaken = breakTaken;
  //   }

  tempWork = await Work.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        companyName,
        workStartDate,
        workEndDate,
        startTime,
        endTime,
        tookVehicleToGo,
        tookVehicleToComeBack,
        wagePerHour,
        breakTaken,
      },
    },
    { new: true }
  );
  sucess = true;
  res.json({ sucess, msg:"Deleted Scuessfully" });
});

/// Delete Work
router.get("/deletework/:id", validateLogin, async (req, res) => {
  sucess = false;
  let tempWork = await Work.findById(req.params.id);
  if (!tempWork) {
    return res.status(400).json({ sucess, error: "Notes not Found" });
  }
  if (!(req.user.toString() === tempWork.user.toString())) {
    return res.status(400).json({ sucess, error: "Not Authorized" });
  }
  tempWork = await Work.findByIdAndDelete(req.params.id);
  sucess = true;
  res.json({ sucess, tempWork });
});
export default router;
