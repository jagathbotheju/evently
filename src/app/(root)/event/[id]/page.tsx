import { getEventById } from "@/actions/event";
import Image from "next/image";
import _ from "lodash";
import { Calendar, Loader2, LocateIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

interface Props {
  params: {
    id: string;
  };
}

const EventDetailsPage = async ({ params }: Props) => {
  const res = await getEventById(params.id);
  const event = res.data;

  if (_.isEmpty(event)) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-700" />
      </div>
    );
  }

  return (
    <section className="flex w-full mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:mx-auto md:container md:max-w-7xl">
        <Image
          src={event.image}
          alt="hero image"
          width={1000}
          height={1000}
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-3xl">{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <Badge className="bg-green-500/60 p-2">
                  <p className="font-semibold text-md text-slate-800">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                </Badge>
                <Badge className="bg-slate-300 p-2">
                  <p className="font-semibold text-md text-slate-800">
                    {event.category.name}
                  </p>
                </Badge>
              </div>

              <div className="">
                by{" "}
                <span className="font-semibold text-primary">
                  {event.user.name}
                </span>
              </div>
            </div>

            {/* checkout button */}
            <div className="flex flex-col gap-5">
              {/* start end date time */}
              <div className="flex gap-2 md:gap-3 items-center">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="gap-1 flex flex-wrap justify-center flex-col">
                  <p>
                    {formatDateTime(event.startDate).dateOnly} -
                    {formatDateTime(event.endDate).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.startDate).dateOnly} -
                    {formatDateTime(event.endDate).timeOnly}
                  </p>
                </div>
              </div>

              {/* location */}
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5" />
                <p>{event.location}</p>
              </div>

              <div className="flex flex-col gap-2 text-slate-800">
                <p className="text-lg font-bold">What you will learn </p>
                <p>{event.description}</p>
                <p className="text-primary">{event.url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
