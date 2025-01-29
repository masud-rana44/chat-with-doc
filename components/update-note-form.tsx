"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import SubmitButton from "./submit-button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  text: z.string().min(2).max(2500),
});

export default function UpdateNoteForm({
  onUpdate,
  note,
}: {
  onUpdate: () => void;
  note: Doc<"notes">;
}) {
  const router = useRouter();
  const UpdateNote = useMutation(api.notes.updateNote);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: note?.text || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await UpdateNote({
      noteId: note._id,
      text: values.text,
    });

    router.push(`/dashboard/notes/${note._id}`);
    onUpdate();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="text"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={8}
                  placeholder="Write your note here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton submittingLabel="Updating..." isSubmitting={isSubmitting}>
          Update
        </SubmitButton>
      </form>
    </Form>
  );
}
