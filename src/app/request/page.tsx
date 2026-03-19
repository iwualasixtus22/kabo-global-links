import { Metadata } from "next";
import RequestPage from "./RequestPage"; // Renaming the client component file for clarity

export const metadata: Metadata = {
  title: "Book a Service | Kabo Global Links",
  description: "Request professional services in construction, cleaning, IT, and more.",
};

export default function Page() {
  return <RequestPage />;
}
