"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@/libs/material-tailwind";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { EditModal } from "./edit";
import { RemoveModal } from "./remove";

interface ActionButtonProps {
  id?: string;
}

export function ActionButtonsMenu({ id }: ActionButtonProps) {
  const route = useRouter();

  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleGoToDetalhes = () => route.push(`/despesas/${id}`);

  return (
    <>
      <Menu placement="bottom-end">
        <MenuHandler>
          <IconButton
            variant="outlined"
            className="group rounded-full border-green-50 focus:border-none focus:outline-none focus:ring-0"
          >
            <EllipsisVerticalIcon height={24} className="text-gray-500" />
          </IconButton>
        </MenuHandler>
        <MenuList className="w-max border-0">
          <MenuItem
            className="flex items-center gap-3"
            onClick={handleGoToDetalhes}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
              <EyeIcon width={16} className="text-white " />
            </div>
            <Typography variant="small" className="whitespace-nowrap">
              Detalhes
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-3"
            onClick={handleOpenEdit}
          >
            <div className="flex h-6 w-6  items-center  justify-center rounded-full bg-green-600">
              <PencilIcon width={16} className="text-white " />
            </div>
            <Typography variant="small" className="whitespace-nowrap">
              Alterar
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-3"
            onClick={handleOpenRemove}
          >
            <div className="flex h-6 w-6  items-center justify-center rounded-full bg-red-600">
              <XMarkIcon width={16} className="text-white " />
            </div>
            <Typography variant="small" className="whitespace-nowrap">
              Remover
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>

      <EditModal open={openEdit} />
      <RemoveModal open={openEdit} />
    </>
  );
}
