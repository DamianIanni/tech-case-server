import { Request, Response } from "express";
import { seedDatabase } from "../../db/seed";

/**
 * Controller to handle database seeding via cron job
 * @param req Express request object
 * @param res Express response object
 */
export const seedDatabaseController = async (req: Request, res: Response) => {
  try {
    const result = await seedDatabase();
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error("Error in seedDatabaseController:", error);
    return res.status(500).json({
      success: false,
      message: `Failed to seed database: ${error instanceof Error ? error.message : String(error)}`
    });
  }
};
