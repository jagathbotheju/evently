import { getAllEvents } from "@/actions/event";
import Collection from "@/components/Collection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { EventExt } from "../../../types";

export default async function Home() {
  const res = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  const eventDetails = res.data;
  const events = eventDetails?.events as EventExt[];

  return (
    <div className="flex flex-col">
      <div className="bg-slate-50">
        <section className="py-5 md:py-10 container w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="font-bold text-4xl">
                Host, Connect, Celebrate : Your Events, Our Platform!
              </h1>
              <p className="">
                Book and learn helpful tips from 3,168+ mentors in world-class
                companies with our global community.
              </p>
              <Button asChild className="w-full sm:w-fit rounded-full">
                <Link href="#events">Explore Now</Link>
              </Button>
            </div>

            <Image
              src="/assets/images/hero.png"
              width={1000}
              height={1000}
              alt="hero"
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </section>
      </div>

      <section className="container w-full max-w-7xl flex flex-col my-8 gap-8 md:gap-8">
        <h2 className="font-bold text-2xl">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex flex-col md:flex-row gap-5">
          Search Category Filter
        </div>

        <Collection
          data={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </div>
  );
}
