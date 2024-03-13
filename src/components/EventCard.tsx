import Link from "next/link";
import { EventExt } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Loader from "./Loader";
import _ from "lodash";
import { formatDateTime } from "@/lib/utils";
import { Edit2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  event: EventExt;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  currentUserId: string;
}

const EventCard = ({
  event,
  hasOrderLink,
  hidePrice,
  currentUserId,
}: Props) => {
  const isEventCreator = currentUserId === event.user.id;

  if (_.isEmpty(event) || _.isEmpty(event.category)) {
    return <Loader />;
  }

  return (
    <Card className="hover:drop-shadow-xl w-[320px]">
      <CardHeader className="m-0 p-0 relative">
        <Link href={`/event/${event.id}`} className="relative h-[200px]">
          <Image
            src={event.image}
            alt="event image"
            fill
            className="w-ful h-full object-cover object-center rounded-t-md overflow-hidden"
          />
        </Link>
        {isEventCreator && (
          // edit event
          <div className="absolute top-2 right-2 p-2 bg-slate-100 rounded-lg flex items-center justify-center">
            <Link href={`/event/${event.id}/update`}>
              <FaEdit className="w-4 h-4 text-slate-800" />
            </Link>

            {/* delete event */}
            <AlertDialog>
              <AlertDialogTrigger>
                <MdDelete className="h-5 w-5 text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-2 mt-2 justify-between mb-auto">
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800 w-fit">
              {event.isFree ? "FREE" : `$${event.price}`}
            </Badge>
            <Badge className="bg-slate-100 text-slate-800 w-fit">
              {event.category.name}
            </Badge>
          </div>

          <p className="text-slate-500 text-sm">
            {formatDateTime(event.startDate).dateTime}
          </p>
          <p className="line-clamp-1 text-slate-800 font-semibold">
            {event.title}
          </p>
        </div>

        <div className="flex justify-between rounded-b-md">
          <div className="flex w-full justify-between">
            <p>{event.user.name}</p>
          </div>
          {hasOrderLink && (
            <Link href={`/order/${event.id}`}>
              <p>Order Details</p>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
