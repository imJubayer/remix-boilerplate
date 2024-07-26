import { MetaFunction } from '@remix-run/node'
import React from 'react'
import Layout from '~/components/landingPage/layouts/Layout'
import AboutBanner from '~/components/landingPage/sections/about-banner/AboutBanner'
import CountList from '~/components/landingPage/sections/count-list/CountList'
import ImageText from '~/components/landingPage/sections/image-text/ImageText'
import ListText from '~/components/landingPage/sections/list-text/ListText'

export const meta: MetaFunction = () => [{ title: "ALL IN ONE | About" }];

export default function About() {
  return (
    <Layout>
        <AboutBanner/>
        <CountList/>
        <ListText/>
        <ImageText/>
    </Layout>
  )
}
