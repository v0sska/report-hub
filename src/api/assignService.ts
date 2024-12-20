import apiClient from "@/interceptors/interceptors-auth";
import userService from "./userService";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/assign`;

class AssignService {
  async findAssignByDeveloper() {
    try {
      const data = await userService.getMy();
      const id = data.data.developer.id;
      const response = await apiClient.get(
        `${BASE_URL}/developer?developer-id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching developer by ID:", error);
      return null;
    }
  }

  async findAssignByCustomer(id: string) {
    try {
      const response = await apiClient.get(
        `${BASE_URL}/customer?customer-id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching developer by ID:", error);
      return null;
    }
  }

  async updateAssing(
    customerId: string,
    newDeveloperId: string,
    developerId?: string
  ) {
    try {
      const response = await apiClient.patch(
        `${BASE_URL}?customer-id=${customerId}&developer-id=${developerId}`,
        {
          developerId: newDeveloperId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating assign:", error);
      throw new Error("Unable to update assign");
    }
  }
}

const assignService = new AssignService();

export default assignService;
