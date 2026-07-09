import type { Metadata } from "next";
import LandingPage from "./components/landing-page";

export const metadata: Metadata = {
  title: "Arachnotech Health-Hub",
  description:
    "A premium enterprise hospital management SaaS for admissions, records, finance, and secure operational control.",
};

export default function Home() {
  return <LandingPage />;
}
