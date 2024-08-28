"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import whyCW from "@/messages.json";
import { CircleCheckBig, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Main */}
      <main className="h-screen flex-grow flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-12 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Explore the Realm of Anonymous Messaging
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Cryptic Whisper - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel */}
        <Carousel
          className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {whyCW.map((message, index) => (
              <CarouselItem key={index}>
                <Card className="border border-gray-700">
                  <CardHeader>
                    <CardTitle>Why Cryptic Whisper?</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
                    <CircleCheckBig className="text-xl flex-shrink-0" />
                    <div>
                      <p className="text-sm md:text-base">{message.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 Cryptic Whisper.
      </footer>
    </>
  );
}
