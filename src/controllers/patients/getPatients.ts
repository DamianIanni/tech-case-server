import { Request, Response } from "express";
import {
  getPatientService,
  getAllPatientsService,
} from "../../services/patient";
import { asyncHandler } from "../../utils/asyncHandler";
import { getPaginationOrFilteredPatientsService } from "../../services/patient/getPatients";
import { sendSuccess, sendError } from "../../handler/responseHandler";
import { AppErrorCode } from "../../constants/errorCodes";

export const getPatientController = asyncHandler(
  async (req: Request, res: Response) => {
    const { patient_id } = req.params;
    const center_id = req.user!.center_id!;

    const patient = await getPatientService(patient_id, center_id);

    if (!patient) {
      return sendError(res, "Patient not found", 404, AppErrorCode.PATIENT_NOT_FOUND);
    }

    sendSuccess(res, patient);
  }
);

export const getAllPatientsController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const patients = await getAllPatientsService(center_id);

    if (!patients.length) {
      return sendSuccess(res, []);
    }

    sendSuccess(res, patients);
  }
);

export const getPaginationOrFilteredPatientsController = asyncHandler(
  async (req: Request, res: Response) => {
    const center_id = req.user!.center_id!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.searchTerm as string) || "";

    const result = await getPaginationOrFilteredPatientsService(
      center_id,
      page,
      limit,
      searchTerm
    );

    sendSuccess(res, result);
  }
);
