"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const data = {
  heading: "Unforgettable experiences, hosted by amazing locals.",
  description:
    "Discover and book one-of-a-kind travel experiences, guided by locals who truly know their world.",
  button: {
    text: "Discover Local Guides",
    url: "#",
  },
  testimonial: {
    quote: "Can’t wait for the next adventure!",
    author: "Jane Smith",
    role: "Traveler",
    avatars: [
      {
        image: "https://shadcnblocks.com/images/block/avatar-1.webp",
        fallback: "AB",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-2.webp",
        fallback: "CD",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-3.webp",
        fallback: "EF",
      },
    ],
  },
  images: {
    first:
      "https://plus.unsplash.com/premium_photo-1714839367938-066e8fba6a38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuYyVDMyVCQW4lMkMlMjBxdWludGFuYSUyMHJvbyUyQyUyMG1leGljb3xlbnwwfHwwfHx8MA%3D%3D?v=1",
    second:
      "https://images.unsplash.com/photo-1520974822564-9b91874afe9c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?v=1",
    third:
      "https://images.unsplash.com/photo-1501855901885-8b29fa615daf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbmMlQzMlQkFuJTJDJTIwcXVpbnRhbmElMjByb28lMkMlMjBtZXhpY298ZW58MHx8MHx8fDA%3D?v=1",
    fourth:
      "https://images.pexels.com/photos/3264721/pexels-photo-3264721.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
};

export default function Hero1() {
  return (
    <section className="py-12 px-8 lg:px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col gap-4 lg:gap-8">
              {/* <h1 className="max-w-[80%] text-4xl font-semibold leading-tight lg:text-5xl xl:text-7xl"> */}
              <h1 className="text-3xl font-extrabold lg:text-6xl">
                {data.heading}
              </h1>
              <p className="text-2xl font-extrabold leading-relaxed text-muted-foreground xl:text-3xl">
                {data.description}
              </p>
            </div>
            <div className="my-6 lg:my-10">
              <Button
                asChild
                size="lg"
                className="px-6 py-3 text-xl font-semibold"
              >
                <a href={data.button.url}>{data.button.text}</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex -space-x-[1.5rem]">
                {data.testimonial.avatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`relative z-${
                      index + 1
                    }0 flex h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover`}
                  >
                    <AvatarImage src={avatar.image.first} alt="" />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="mb-1 text-sm italic text-muted2-foreground">
                  &quot;{data.testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-muted2-foreground">
                  {data.testimonial.author}, {data.testimonial.role}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="w-full max-w-[50rem]">
              <AspectRatio ratio={1 / 1} className="h-full w-full">
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]">
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={data.images.first}
                      alt=""
                      className="object-cover h-full w-full object-center"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={data.images.second}
                      alt=""
                      className="object-cover h-full w-full object-center"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={data.images.third}
                      alt=""
                      className="object-cover h-full w-full object-center"
                    />
                  </div>
                  <div className="overflow-hidden rounded-[5.2%] border border-muted bg-muted">
                    <img
                      src={data.images.fourth}
                      alt=""
                      className="object-cover h-full w-full object-center"
                    />
                  </div>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
