import express from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  editTask,
  getAllTask,
} from "../controllers/todoContoller.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/getall", getAllTask);
router.delete("/delete", deleteTask);
router.post("/complete", completeTask);
router.post("/edit", editTask);

export default router;
