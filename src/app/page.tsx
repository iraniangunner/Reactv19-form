import { NewForm } from "@/components/newForm";
import { OldForm } from "@/components/oldForm";

export default function Home() {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 mt-8">
      <OldForm />
      <NewForm />
    </div>
  );
}
