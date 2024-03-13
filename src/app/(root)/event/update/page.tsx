import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/EventForm";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const EventUpdatePage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!user) redirect("/sign-in");

  return (
    <section className="w-full">
      <div className="bg-slate-100 py-5 md:py-10">
        <h3 className="font-bold text-3xl text-center sm:text-left container max-w-7xl mx-auto">
          Create Event
        </h3>
      </div>

      <div className="max-w-7xl container mx-auto py-5">
        <EventForm type="Update" userId={user.id} />
      </div>
    </section>
  );
};

export default EventUpdatePage;
