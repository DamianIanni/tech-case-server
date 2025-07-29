import { Router } from "express";
import { validateSchemaMiddleware } from "../../middlewares/validateSchema";
import { centerPatientIdSchema } from "../../validations/idsSchema";
import {
  createNoteSchema,
  updateNotesSchema,
} from "../../validations/noteSchema";
import {
  createNoteController,
  updateNoteController,
} from "../../controllers/notes";

const noteRouter = Router({ mergeParams: true });

noteRouter.put(
  "/",
  validateSchemaMiddleware(centerPatientIdSchema, "params"),
  validateSchemaMiddleware(createNoteSchema, "body"),
  createNoteController
);

noteRouter.patch(
  "/:note_id",
  validateSchemaMiddleware(centerPatientIdSchema, "params"),
  validateSchemaMiddleware(updateNotesSchema, "body"),
  updateNoteController
);

export default noteRouter;
