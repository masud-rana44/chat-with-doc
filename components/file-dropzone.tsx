import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

export default function FileDropzone({
  onChange,
  file,
}: {
  onChange: (file: File) => void;
  file: File | null;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/plane": [".txt"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Document too large",
          description:
            "This document is more than 10 MB. Please upload a document that is less than 10 MB.",
          variant: "destructive",
        });

        return;
      }
      onChange(file);
    },
  });

  return (
    <div
      {...getRootProps({
        className: cn(
          {
            "border-blue-500": isDragActive,
            "border-gray-500": !isDragActive,
          },
          "border-2 border-dashed rounded-lg p-8 text-center"
        ),
      })}
    >
      <input {...getInputProps()} />
      {file ? (
        <p>{file.name}</p>
      ) : (
        <p>Drag & drop a PDF here, or click to select</p>
      )}
    </div>
  );
}
