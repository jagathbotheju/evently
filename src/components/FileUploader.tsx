"use client";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FiUploadCloud } from "react-icons/fi";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "./ui/button";
import Image from "next/image";
// import { useUploadThing } from "@/utils/uploadthing";

interface Props {
  imageUrl: string;
  onFileChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const FileUploader = ({ imageUrl, onFileChange, setFiles }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFileChange(URL.createObjectURL(acceptedFiles[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50 border-2 border-dashed"
    >
      <input {...getInputProps()} />

      {imageUrl ? (
        <>
          <div className="flex h-full w-full flex-1 justify-center">
            <Image
              src={imageUrl}
              alt="image"
              width={250}
              height={250}
              className="w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex-center flex-col py-5 text-grey-500 text-slate-500">
            <FiUploadCloud className="h-10 w-10" />
            <h3 className="mb-2 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
            <Button type="button" className="rounded-full">
              Select from computer
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
