import { z } from "zod";
import React from "react";
import { Input } from "./ui/input";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import SubmitButton from "./submit-button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { SendHorizonalIcon } from "lucide-react";

const formSchema = z.object({
  query: z.string().min(2).max(250),
});

export default function QuestionForm({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.aksQuestion);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await askQuestion({
      question: values.query,
      documentId,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          name="query"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Ask any question over this document"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          submittingLabel=""
          isSubmitting={form.formState.isSubmitting}
        >
          <SendHorizonalIcon />
        </SubmitButton>
      </form>
    </Form>
  );
}
