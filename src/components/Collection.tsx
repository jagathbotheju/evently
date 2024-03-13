import { getServerSession } from "next-auth";
import { EventExt } from "../../types";
import EventCard from "./EventCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import _ from "lodash";
import Loader from "./Loader";

interface Props {
  data: EventExt[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: "Events_Organized" | "My_Tickers" | "All_Events";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlPathname?: string;
}

const Collection = async ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages,
  urlPathname,
}: Props) => {
  const session = await getServerSession(authOptions);
  // console.log("Collection", session?.user);
  const user = session?.user as User;

  if (_.isEmpty(user)) return <Loader />;

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickers";
              return (
                <li key={event.id} className="flex justify-center">
                  <EventCard
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                    currentUserId={user.id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px] w-full flex-col gap-3 bg-slate-50 py-28 text-center rounded-md">
          <h3 className="font-bold text-2xl">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
