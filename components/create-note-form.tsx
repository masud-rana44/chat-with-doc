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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import SubmitButton from "./submit-button";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(2).max(2500),
});

export default function CreateNoteForm({ onCreate }: { onCreate: () => void }) {
  const router = useRouter();
  const createNote = useMutation(api.notes.createNote);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const noteId = await createNote({
      text: values.text,
    });

    router.push(`/dashboard/notes/${noteId}`);
    onCreate();
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

        <SubmitButton submittingLabel="Creating..." isSubmitting={isSubmitting}>
          Create
        </SubmitButton>
      </form>
    </Form>
  );
}
