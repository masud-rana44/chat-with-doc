"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import React from "react";
import { Input } from "./ui/input";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import SubmitButton from "./submit-button";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  query: z.string().min(2).max(250),
});

export default function SearchForm({
  setResults,
}: {
  setResults: (results: typeof api.search.searchAction._returnType) => void;
}) {
  const searchAction = useAction(api.search.searchAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const results = await searchAction({ query: values.query });
    console.log({ results });
    setResults(results);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-2"
      >
        <FormField
          name="query"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Search over all your notes and documents using vector searching"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          submittingLabel="Searching..."
          isSubmitting={isSubmitting}
        >
          Search
        </SubmitButton>
      </form>
    </Form>
  );
}
