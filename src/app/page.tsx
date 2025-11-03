"use client"
import BestSellers from '@/components/BestSellers/BestSellers'
import Collection from '@/components/Collection/Collection'
import Hero from '@/components/Hero/Hero'
import NewsletterBanner from '@/components/NewsLetterBanner/NewsLetterBanner'

import React from 'react'

const page = () => {
  return (
    <div>
        <Hero/>
        <Collection/>
        <BestSellers/>
        <NewsletterBanner/>
    </div>
  )
}

export default page
