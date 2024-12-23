import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course is created successfully !',
      data: result,
    });
  });

  export const OfferedCourseControllers = {
    createOfferedCourse,
    // getAllOfferedCourses,
    // getSingleOfferedCourses,
    // updateOfferedCourse,
    // deleteOfferedCourseFromDB,
  };