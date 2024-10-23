import type React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CirclePlus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import reportService from "../../../api/reportService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import customerService from "@/api/customerService";
import type { ResCustomerTypes } from "@/components/types/interfaces/customer/res-customer-types";
import assignService from "@/api/assignService";

const formSchema = z.object({
  startWork: z.string().min(2, {
    message: "End time is required",
  }),
  endWork: z.string().min(2, {
    message: "End time is required",
  }),
  customerId: z.string(),
  track: z.string().min(1, {
    message: "Track is required",
  }),
  report: z.string().min(10, {
    message: "Min 10 characters",
  }),
  date: z.string().min(10, {
    message: "Min 1 characters",
  }),
});

const AddReport: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [customers, setCustomers] = useState<ResCustomerTypes[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await assignService.findAssignByDeveloper();
      const customers = [];

      for (let i = 0; i < data.data.length; i++) {
        let customer = await customerService.getById(data.data[i].customerId);

        if (customer) {
          customers.push(customer);
        }
      }

      setCustomers(customers);
    }
    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await reportService.create(values);
    window.location.reload();

    if (error) {
      console.error("Error creating report:", error);
    } else {
      console.log("Report created successfully:", data);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger className="py-2 px-4 rounded-xl  mx-auto flex gap-2 bg-brown w-fit">
        Add report <CirclePlus className=" bg-brown" />
      </DrawerTrigger>
      <DrawerContent className=" bg-main h-fit">
        <DrawerHeader>
          <DrawerTitle className="text-[#4f4c45]">
            Fill out the report form.
          </DrawerTitle>
          <DrawerDescription className="text-brown">
            Make sure everything is correct
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-5 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startWork"
                  render={({ field }) => (
                    <FormItem className=" items-center flex flex-col">
                      <FormLabel>Start work</FormLabel>
                      <FormControl>
                        <Input
                          className="justify-center"
                          type="time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endWork"
                  render={({ field }) => (
                    <FormItem className=" items-center flex flex-col">
                      <FormLabel>End work</FormLabel>
                      <FormControl>
                        <Input
                          className="justify-center"
                          type="time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-900" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-center">
                      Customer
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val)}
                      value={field.value}
                    >
                      <FormControl className="w-full justify-center">
                        <SelectTrigger className="bg-brown rounded-md p-1">
                          <SelectValue placeholder="Select customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px] overflow-y-auto bg-border rounded-md p-2 gap-2">
                        {customers.length === 0 ? (
                          <p className="w-[85vw] text-center">
                            No customers found
                          </p>
                        ) : (
                          customers.map((customer) => (
                            <SelectItem
                              className="w-[85vw] text-center"
                              value={customer.id}
                              key={customer.id}
                            >
                              {customer.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="flex justify-center text-red-900" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="track"
                render={({ field }) => (
                  <FormItem className="items-center flex flex-col">
                    <FormLabel>Track time</FormLabel>
                    <FormControl>
                      <Input className="text-center" type="number" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-900" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="report"
                render={({ field }) => (
                  <FormItem className="items-center flex flex-col">
                    <FormLabel>Report</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the tasks you worked on today"
                        className="resize-none h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-900" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className=" items-center flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        className="justify-center"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-900" />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter>
              <Button type="submit" className="bg-brown">
                Submit
              </Button>
              <DrawerClose>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddReport;
