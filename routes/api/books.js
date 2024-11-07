const express = require("express");
const ctrl = require("../../controllers/books");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/book");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addBook)); //validateBody(schemas.addSchema),

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);
//validateBody(schemas.addSchema),

router.patch(
  "/:id/favourite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  ctrlWrapper(ctrl.updateFavourite)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
