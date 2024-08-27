import {  Metadata } from "next";
import SendMessage from "@/components/SendMessage";

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const username = params.username;

  // Fetch or generate dynamic content for OG tags here
  const ogTitle = `Send an anonymous message to ${username}`;
  const ogDescription = `Share your thoughts with ${username} anonymously.`;
  const ogUrl = `https://https://crypticwhisper.vercel.app/u/${username}`;
  const ogImage = `https://github.com/jeesun09/CrypticWhisper/blob/main/public/apple-touch-icon.png?raw=true`;

  return {
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: ogUrl,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: "Cryptic Whisper" },
      ],
      siteName: "Cryptic Whisper",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
      site: "@JeesunSk",
    },
  };
}


const UserPage = ({ params } : PageProps) => {
  const {username} = params;
  return (
    <>
    <SendMessage username={username} />
    </>
  )
}

export default UserPage;
