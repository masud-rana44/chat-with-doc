import CreateNote from "@/components/create-note";

export default function NotesPage() {
  return (
    <div className="container mx-auto px-6 sm:px-0">
      <div className="flex items-center justify-between mb-20">
        <h1 className="text-4xl font-bold">All Notes</h1>
        <CreateNote />
      </div>
    </div>
  );
}
