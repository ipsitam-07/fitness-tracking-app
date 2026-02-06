export interface WorkoutFilters {
  userId: string;
  limit: number;
  offset: number;
  search?: string | undefined;
  type?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}

export interface GetWorkoutsParams {
  userId: string;
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}
