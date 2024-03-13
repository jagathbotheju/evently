import { Event, User, Category } from "@prisma/client";

export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

type EventExt = Event & {
  user: User;
  category: Category;
};
