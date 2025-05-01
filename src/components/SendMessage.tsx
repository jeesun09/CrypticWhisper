"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCompletion } from "ai/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { icons } from "@/constants/icons";
import Image from "next/image";

type Props = {
  username: string;
};

const feelings = [
  {
    label: "none",
  },
  {
    label: "sorry",
    icon: icons.SorryIcon,
  },
  {
    label: "question",
    icon: icons.QuestionIcon,
  },
  {
    label: "request",
    icon: icons.RequestIcon,
  },
  {
    label: "crush",
    icon: icons.CrushIcon,
  },
  {
    label: "angry",
    icon: icons.AngryIcon,
  },
  {
    label: "warning",
    icon: icons.WarningIcon,
  },
  {
    label: "confession",
    icon: icons.ConfessionIcon,
  },
];

const SendMessage = ({ username }: Props) => {
  const [loading, setLoading] = useState(false);
  const [emojiBubbles, setEmojiBubbles] = useState<
    { id: number; icon: string }[]
  >([]);
  const [currentFeeling, setCurrentFeeling] = useState<string | null>("none");
  const { toast } = useToast();

  const initialSuggestMessages =
    "What's your favorite movie?||Do you have any pets?||What's your dream job?";

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        ...data,
        username,
      });
      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    completion,
    complete,
    error,
    isLoading: isSuggestionsLoading,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialSuggestMessages,
  });
  const messageContent = form.watch("content");

  // handle suggest message to content
  const handleSuggestMessageToContent = (message: string) => {
    form.setValue("content", message);
  };

  // parseStringMessages function to parse string messages to array
  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split("||");
  };

  const fetchSuggestMessages = async () => {
    try {
      complete("");
    } catch (error) {
      toast({
        title: "Failed to fetch suggest messages",
        variant: "destructive",
      });
    }
  };

  const handleFeelingClick = (feeling: { label: string; icon?: string }) => {
    setCurrentFeeling(feeling.label);

    if (!feeling.icon) return;

    // Add multiple emoji bubbles
    const newBubbles = Array.from({ length: 20 }, (_, index) => ({
      id: Date.now() + index,
      icon: feeling.icon || "",
    }));

    setEmojiBubbles((prev) => [...prev, ...newBubbles]);

    setTimeout(() => {
      setEmojiBubbles((prev) => prev.slice(newBubbles.length));
    }, 6000);
  };

  return (
    <div className="mx-auto my-4 p-6 bg-gray-400 shadow-lg rounded-lg backdrop-blur-sm bg-opacity-10">
      <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">
        Send an Anonymous Message
      </h1>
      {/* Your additional code here */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">
                  Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 mb-4">
            {feelings.map((feeling, index) => (
              <div
                key={index}
                className={`group flex w-fit items-center mb-2 gap-2 cursor-pointer border-2 border-gray-300 rounded-xl py-1 px-2 hover:bg-gray-200 transition duration-200 ease-in-out ${
                  currentFeeling === feeling.label
                    ? "bg-gray-400 border-blue-400"
                    : ""
                }`}
                onClick={() => handleFeelingClick(feeling)}
              >
                {feeling.icon && (
                  <Image
                    src={feeling.icon}
                    alt="sorry-icon"
                    width={20}
                    height={20}
                    className="group-hover:scale-125 transition-transform duration-200"
                  />
                )}
                {feeling.label.replace(/_/g, " ").toUpperCase()}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button
                disabled
                className="w-full sm:w-auto bg-gray-400 cursor-not-allowed"
              >
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Send
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {emojiBubbles.map((bubble) => (
          <Image
            key={bubble.id}
            src={bubble.icon}
            alt="emoji"
            width={60}
            height={60}
            className="emoji-bubble"
            style={{
              left: `${Math.random() * 90}%`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* <div className="mt-6">
        <Button
          onClick={fetchSuggestMessages}
          className="my-4 w-full"
          disabled={isSuggestionsLoading}
        >
          suggest messages
        </Button>
        <p className="text-center mb-4">
          Click on any message below to select it.
        </p>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestMessageToContent(message)}
                  className="w-full text-left"
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div> */}
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default SendMessage;
