import type { CreateWorkAccountTypes } from "@/components/types/interfaces/work_account/create-work-account-types";
import type { ResWorkAccWithCustomerTypes } from "@/components/types/interfaces/work_account/res-work-acc-with-customer-types";
import type { ResWorkAccountTypes } from "@/components/types/interfaces/work_account/res-work-account";
import apiClient from "@/interceptors/interceptors-auth";
import userService from "./userService";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/workaccounts`;

class WorkAccountService {
  async create(body: CreateWorkAccountTypes): Promise<ResWorkAccountTypes> {
    try {
      const data = await userService.getMy();

      body.saleId = data.data.sale.id;
      const userResponse = await apiClient.post(BASE_URL, body);
      return userResponse.data.data;
    } catch (error) {
      console.error("Error creating work account:", error);
      throw new Error("Error inserting work account");
    }
  }

  async getAll(): Promise<ResWorkAccWithCustomerTypes[]> {
    try {
      const data = await apiClient.get(`${BASE_URL}`);

      return data.data.data;
    } catch (error) {
      console.error("Error fetching work accounts:", error);
      throw new Error("Error fetching work accounts");
    }
  }

  async getBySaleId(): Promise<ResWorkAccWithCustomerTypes[]> {
    try {
      const data = await userService.getMy();
      const response = await apiClient.get(
        `${BASE_URL}/sale/${data.data.sale.id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching work accounts by sale ID:", error);
      throw new Error("Error fetching work accounts by sale ID");
    }
  }
}

const workAccountService = new WorkAccountService();

export default workAccountService;
