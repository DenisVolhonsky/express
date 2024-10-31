const express = require("express");
const ctrl = require("../../controllers/books");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/book");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.addBook)); //validateBody(schemas.addSchema),

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);
//validateBody(schemas.addSchema),

router.patch(
    "/:id/favourite",
    isValidId,
    validateBody(schemas.updateFavouriteSchema),
    ctrlWrapper(ctrl.updateFavourite)
  );

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
