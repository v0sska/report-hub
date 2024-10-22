import assignService from "@/api/assignService";
import developerService from "@/api/developerService";
import salesService from "@/api/salesService";
import type { ResCustomerTypes } from "@/components/types/interfaces/customer/res-customer-types";
import { EditReportTypes } from "@/components/types/interfaces/dev/edit-types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  BriefcaseBusinessIcon,
  Clock2,
  ContactRound,
  FolderOpenDot,
  HandCoins,
  SquareUserRound,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  developerId: z.string(),
});

interface MainCustomerInfoProps {
  customer: ResCustomerTypes;
}

interface Developer {
  id: string;
  name: string;
}

const MainCustomerInfo: React.FC<MainCustomerInfoProps> = ({ customer }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [assigned, setAssigned] = useState(true);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchAssignedDeveloper = async () => {
    const data = await assignService.findAssignByCustomer(customer.id);

    if (data.data.length === 1 && data.data.length !== 0) {
      setAssigned(true);
      return data.data[0].developerId;
    } else {
      setAssigned(false);
    }
    return data.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAssignedDeveloper();

      if (response) {
        const dev = await developerService.findById(response);
        setDeveloper(dev.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDevelopers = async () => {
      const response = await developerService.findAll();

      if (!assigned) {
        setDevelopers(response.data);
      }
    };

    fetchDevelopers();
  }, [assigned]);

  const handleDeveloperSelection = (developerId: string) => {
    const selectedDeveloper = developers.find((dev) => dev.id === developerId);
    if (selectedDeveloper) {
      setDeveloper(selectedDeveloper);
      setAssigned(true);
      if (developer && !isEdit) {
        salesService.assignDeveloper(customer.id, developerId);
      }
    }
  };

  const upWork = customer.isOnUpwork ? "yes" : "no";

  async function editClient({
    developerId,
    customerId,
    newDeveloperId,
  }: EditReportTypes) {
    await assignService.updateAssing(customerId, newDeveloperId, developerId);
  }

  return (
    <div className="flex gap-2 my-5 border-b-2 border-brown pb-2">
      <div className="space-y-2 pr-2 border-r-2 border-brown w-[65%]">
        <p>
          <SquareUserRound />
          Name : <span className="font-extrabold">{customer?.name}</span>
        </p>
        <p>
          <FolderOpenDot />
          Project name :{" "}
          <span className="font-extrabold">{customer?.nameProject}</span>
        </p>
        <p className="flex items-center gap-2">
          <ContactRound />
          <span className="font-extrabold">Developer:</span>
          <span className="font-extrabold flex items-center">
            {assigned ? (
              <span>{developer?.name}</span>
            ) : (
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="developerId"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <Select
                        onValueChange={(val) => {
                          if (isEdit) {
                            editClient({
                              developerId: developer?.id,
                              customerId: customer.id,
                              newDeveloperId: val,
                            });
                            handleDeveloperSelection(val);
                          } else {
                            field.onChange(val);
                            handleDeveloperSelection(val);
                          }
                        }}
                        value={field.value}
                      >
                        <FormControl className="w-auto">
                          <SelectTrigger className="bg-brown rounded-md p-1 min-w-[100px]">
                            <SelectValue placeholder="Developer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px] overflow-y-auto bg-border rounded-md p-2 gap-2">
                          {developers.length === 0 ? (
                            <p className="w-[85vw] text-center">
                              No developers found
                            </p>
                          ) : (
                            developers.map((developer) => (
                              <SelectItem
                                className="w-[85vw] text-center"
                                value={developer.id}
                                key={developer.id}
                              >
                                {developer.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage className="flex justify-center text-red-900" />
                    </FormItem>
                  )}
                />
              </Form>
            )}
            {assigned && (
              <Button
                className="bg-brown ml-[6px] text-black py-1 px-[10px] rounded-lg hover:bg-darkBrown w-[75px] flex flex-row justify-between items-center"
                onClick={() => {
                  setIsEdit(true);
                  setAssigned(false);
                }}
              >
                <Pencil1Icon />
                Edit
              </Button>
            )}
          </span>
        </p>
      </div>
      <div className="space-y-2">
        <p>
          <HandCoins />
          Rate: {customer?.rate}
        </p>

        <p>
          <Clock2 />
          Track: {customer?.trackInWeek}
        </p>

        <p>
          <BriefcaseBusinessIcon />
          UpWork: {upWork}
        </p>
      </div>
    </div>
  );
};

export default MainCustomerInfo;
