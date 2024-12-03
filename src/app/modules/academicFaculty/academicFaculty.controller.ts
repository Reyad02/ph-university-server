import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty Created',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesIntoDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully get all Academic Faculties',
    data: result,
  });
});

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Successfully get single academic faculty',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully update Academic Faculty',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
