"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ThreadForm from "./thread-form";

export default function NewThreadDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="w-75 h-75 hover:bg-dpro-primary/90 px-10 font-bold text-3xl rounded-4xl bg-dpro-primary text-white disabled:pointer-events-none disabled:opacity-50 max-w-none!">
          Start a new thread
        </button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a new thread</DialogTitle>
          <DialogDescription className="text-sm">
            Enter a title and a small description for your new thread
          </DialogDescription>
        </DialogHeader>
        <ThreadForm setOpenDialog={setOpenDialog} />
      </DialogContent>
    </Dialog>
  );
}
