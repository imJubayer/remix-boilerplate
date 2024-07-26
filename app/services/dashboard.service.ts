import { getDashboard } from "~/models/dashboard.server";
import { ResponseFormat } from "~/types/common";
import { handleResponse } from "~/utils";

class DashboardService {
  async dashboard(): Promise<
    ResponseFormat<{ totalUsers: number; totalBusinessUsers: number }>
  > {
    const { totalUsers, totalBusinessUsers } = await getDashboard();
    return handleResponse({
      success: true,
      msg: "Dashboard data returned",
      data: { totalUsers, totalBusinessUsers },
    });
  }
}

export const dashboardService = new DashboardService();
