"use client";
import { EventSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CategoryIds from "./CategoryIds";
import { Textarea } from "./ui/textarea";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";
import { Checkbox } from "./ui/checkbox";
import { Link } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Event } from "@prisma/client";
import { createEvent } from "@/actions/event";
import { toast } from "sonner";

interface Props {
  type: "Create" | "Update";
  userId: string;
}

const EventForm = ({ type, userId }: Props) => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      image: "",
      startDate: new Date(),
      endDate: new Date(),
      price: "",
      isFree: false,
      url: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof EventSchema>) => {
    let uploadedImageUrl = data.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
      data.image = uploadedImageUrl;
    }

    console.log("new event", data);

    if (type === "Create") {
      try {
        createEvent({ event: data, userId, path: "/profile" })
          .then((res: any) => {
            if (res.success) {
              form.reset();
              const newEvent = res.data as Event;
              router.push(`/event/${newEvent.id}`);
              return toast.success("New Event created Successfully");
            } else {
              return toast.error(res.error);
            }
          })
          .catch((err: any) => {
            toast.error("Internal Server Error, try again later");
          });
      } catch (error) {
        return toast.error("Internal Server Error, try again later");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Event Title"
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* category id*/}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CategoryIds value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 h-full mb-8">
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-60">
                  <Textarea
                    {...field}
                    placeholder="description"
                    className="rounded-xl h-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* image */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full md:max-w-[30%]">
                <FormControl className="h-60">
                  <FileUploader
                    onFileChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex-center input-field overflow-hidden pl-3">
                  <ImLocation2 className="w-5 h-5 text-slate-500 relative" />
                  <Input
                    placeholder="Location"
                    {...field}
                    className="input-field"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-5 w-full text-slate-500 flex-center">
          {/* start date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <div className="flex-center w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 input-field">
                    <p className="whitespace-nowrap text-grey-600 px-5 ml-6">
                      Start Date :
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-gray-100 cursor-pointer focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* end date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <div className="flex-center w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 input-field">
                    <p className="whitespace-nowrap text-grey-600 px-5 ml-6">
                      End Date :
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-gray-100 cursor-pointer focus:outline-none"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 w-full flex-center">
          {/* price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-start w-full rounded-full px-4 input-field">
                    <PiCurrencyCircleDollarBold className="w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="Price"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isFree */}
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-start input-field overflow-hidden pl-3 py-[10px] w-full">
                    <Checkbox
                      id="isFree"
                      className="mx-2"
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                    <label
                      htmlFor="isFree"
                      className="whitespace-no-wrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-500"
                    >
                      Free Ticket
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* url */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex-center input-field overflow-hidden pl-3">
                  <Link className="w-5 h-5 text-slate-500 relative" />
                  <Input placeholder="URL" {...field} className="input-field" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          type="submit"
          className="w-fit"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
