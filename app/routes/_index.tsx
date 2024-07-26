import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import Layout from "~/components/landingPage/layouts/Layout";
import Advertisement from "~/components/landingPage/sections/advertisement/Advertisement";
import Discover from "~/components/landingPage/sections/discover/Discover";
import FeatureCard from "~/components/landingPage/sections/feature-card/FeatureCard";
import FreeListing from "~/components/landingPage/sections/free-listing/FreeListing";
import HomeBanner from "~/components/landingPage/sections/home-banner/HomeBanner";
import ImageWithList from "~/components/landingPage/sections/image-with-text/ImageWithList";
import Options from "~/components/landingPage/sections/options/Options";
import ResourceSection from "~/components/landingPage/sections/resource-section/ResourceSection";
import SecuritySection from "~/components/landingPage/sections/security-section/SecuritySection";
import Source from "~/components/landingPage/sections/source-section/Source";
import Testimonial from "~/components/landingPage/sections/testimonial/Testimonial";

import { useOptionalUser } from "~/utils";

export let loader: LoaderFunction = async () => {
  return {};
};

export const meta: MetaFunction = () => [{ title: "ALL IN ONE | Home" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <Layout>
      <HomeBanner/>
      <FeatureCard/>
      <Advertisement/>
      <Options/>

      <Discover/>
      <Source/>
      <SecuritySection/>
      <ImageWithList/>
      <Testimonial/>
      <FreeListing/>
      <ResourceSection/>
    </Layout>
  );
}
