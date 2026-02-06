export interface GoalFilters {
  userId: string;
  search?: string | undefined;
  type?: string | undefined;
  status?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  limit: number;
  offset: number;
}

export interface GetGoalsParams {
  userId: string;
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
