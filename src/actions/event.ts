"use server";
import prisma from "@/lib/prismadb";
import { EventSchema } from "@/lib/schema";
import { Event } from "@prisma/client";
import { z } from "zod";

/************************************DELETE EVENT*/
/************************************GET ALL EVENTS*/
/************************************GET EVENT BY ID */
/************************************CREATE EVENT */

/************************************DELETE EVENT*/
export const deleteEvent = async ({
  eventId,
  path,
}: {
  eventId: string;
  path: string;
}) => {
  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    if (deletedEvent) {
      return {
        success: "",
      };
    }

    return {
      success: false,
      error: "Could not delete Event, try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, try again later",
    };
  }
};

/************************************GET ALL EVENTS*/
export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: {
  query: string;
  limit: number;
  page: number;
  category: string;
}) => {
  try {
    const eventCount = await prisma.event.count();
    const events = await prisma.event.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
        user: true,
      },
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            category: {
              name: category,
            },
          },
        ],
      },
    });

    if (events) {
      return {
        success: true,
        data: { events, pages: Math.ceil(eventCount / limit) },
      };
    }

    return {
      success: false,
      error: "Could not get events, try again later",
    };
  } catch (error) {
    return {
      success: false,
      error: "Internal Server Error, try again later",
    };
  }
};

/************************************GET EVENT BY ID */
export const getEventById = async (eventId: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        category: true,
        user: true,
      },
    });

    if (event) {
      return {
        success: true,
        data: event,
      };
    }

    return {
      success: false,
      error: "Could not find event, try again later",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error,try again later...",
    };
  }
};

/************************************CREATE EVENT */
export const createEvent = async ({
  event,
  userId,
  path,
}: {
  event: z.infer<typeof EventSchema>;
  userId: string;
  path: string;
}) => {
  try {
    const organizer = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!organizer) {
      return {
        success: false,
        error: "Could not create Event, no organizer found.",
      };
    }

    const newEvent = await prisma.event.create({
      data: {
        ...event,
        organizer: userId,
      },
    });

    if (newEvent) {
      return {
        success: true,
        data: newEvent,
      };
    }

    return {
      success: false,
      error: "Could not create event, try again later.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Internal Server Error, try again later...",
    };
  }
};
