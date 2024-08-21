"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import mongoose from "mongoose";

type MessageCardProps = {
    key: string;
    message: Message;
    onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({key, message, onMessageDelete}: MessageCardProps) => {
    const {toast} = useToast();
    const handleDeleteConfirm = async() => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast({
            title: response.data.message,
        })
        onMessageDelete(message._id as string);
    }
    console.log('Message: ', message);
    console.log('message._id: ', message._id);
    
    
  return (
    <Card className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="flex justify-between items-start p-4 border-gray-200">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
            {message.content}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleDateString()}
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="p-1">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white p-6 rounded-lg shadow-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-bold text-gray-900">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600">
                This action cannot be undone. This will permanently delete this
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-4 py-2">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
    </Card>
  );
};

export default MessageCard;







/*
<Card className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="flex justify-between items-start p-4 border-b border-gray-200">
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div>{new Date(message.createdAt).toLocaleDateString()} </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
*/