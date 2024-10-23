import workAccountService from "@/api/workAccountService";
import type { ResWorkAccWithCustomerTypes } from "@/components/types/interfaces/work_account/res-work-acc-with-customer-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { HandCoins, Settings2, SquareUserRound } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCustomer from "../customer-content/AddCustomer";
import AddWorkAccount from "./AddWorkAccount";

const ListWorkAccount: React.FC = () => {
  const [workAccounts, setWorkAccounts] = useState<
    ResWorkAccWithCustomerTypes[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkAccounts = async () => {
      const data = await workAccountService.getBySaleId();

      if (data) {
        setWorkAccounts(data);
      }
    };
    fetchWorkAccounts();
  }, []);

  return (
    <Accordion type="single" collapsible>
      <div className="flex justify-between items-center">
        <p className="flex gap-2 justify-between">
          <SquareUserRound />
          Accounts:
        </p>
        <AddWorkAccount />
      </div>
      {workAccounts.length > 0 ? (
        workAccounts.map((workAccount) => (
          <AccordionItem
            className="border-b-2 border-border"
            value={workAccount.id}
            key={workAccount.id}
          >
            <AccordionTrigger>{workAccount.name}</AccordionTrigger>

            <AccordionContent className="w-full">
              <div className="space-y-2">
                {workAccount.customer.map((item) => (
                  <Link
                    to={`/customer/${item.id}`}
                    key={item.id}
                    className="bg-border p-2 rounded-lg flex gap-2 justify-between"
                  >
                    <div className="flex gap-2">
                      <HandCoins />
                      {item.name}
                    </div>
                    <Settings2 />
                  </Link>
                ))}
              </div>
              <div className="flex w-full justify-end mt-2">
                <Button
                  className="bg-brown ml-[6px] text-black hite py-1 px-[10px] rounded-lg hover:bg-darkBrown mr-[15px] gap-[10px] flex flex-row justify-between items-center"
                  onClick={() =>
                    navigate(`/clients-overview/${workAccount.id}`)
                  }
                >
                  <PersonIcon />
                  Clients Overview
                </Button>
                <AddCustomer accountId={workAccount.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))
      ) : (
        <div className="w-full text-center pt-10">
          You do not have any work accounts yet 💩
        </div>
      )}
    </Accordion>
  );
};

export default ListWorkAccount;
