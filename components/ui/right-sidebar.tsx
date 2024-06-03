"use client";

import { useActiveRightSidebar } from "@/providers/active-right-sidebar";
import { Button, cn } from "@nextui-org/react";
import { XIcon } from "lucide-react";

const AsideHeader = () => {
  const context = useActiveRightSidebar();

  if (!context) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="text-sm font-medium tracking-[0.48px] text-[#e0e0e0]">
        Friend Activity
      </h1>
      <Button
        isIconOnly
        variant="light"
        aria-label="Close"
        onClick={() => context.onChange("")}
      >
        <XIcon size={20} color="#898989" />
      </Button>
    </div>
  );
};

const Friendlist = () => {
  return (
    <div className="">
      <AsideHeader />
    </div>
  );
};

export default function RightSidebar() {
  const context = useActiveRightSidebar();

  function renderContents(item: string) {
    switch (item) {
      case "Friendlist":
        return <Friendlist />;
    }
  }

  return (
    <aside
      className={cn("w-0 rounded-lg p-0 [grid-area:right-sidebar]", {
        "w-[358px] border border-[#202020] p-5":
          context && context.activeItem !== "",
      })}
    >
      {renderContents(context.activeItem)}
    </aside>
  );
}
