"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast({
        title: "Account verified",
        description: response.data.message,
        duration: 5000,
      });
      setLoading(false);
      router.replace("/sign-in");
    } catch (error) {
      console.error("error during sign-up", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Sign Up failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
        duration: 5000,
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 py-8 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl mb-4">
            Verify Your Account
          </h1>
          <p className="text-gray-600">
            Enter the verification code sent to your email to activate your
            account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Check your email for the one-time password and enter it
                    above.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  <span>Verifying...</span>
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyAccount;
