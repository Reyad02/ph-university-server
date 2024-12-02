import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Is Created Successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
