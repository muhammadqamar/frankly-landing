import React from "react";
import { Accordion } from "react-bootstrap";

const Index = () => {
  return (
    <div className="main-faq-cantaner">
      <h1 className="main-heading">Top Q&apos;s from our Swaypayers</h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How does Frankly work?</Accordion.Header>
          <Accordion.Body>
            Buy stuff from your favourite Frankly partner brands. Once you’ve made your purchase,
            post a creative Instagram Reel featuring what you bought & submit your Reel link in the
            Frankly app. That’s it!
            <br />
            We’ll then grade your post and pay you based on performance. You will get paid straight
            into your UPI or PayTm Wallet!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Who can use Frankly?</Accordion.Header>
          <Accordion.Body>
            Anyone with a public profile on Instagram. There’s no minimum follower count
            requirement.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What are the Post guidelines? </Accordion.Header>
          <Accordion.Body>
            Here are some things to keep in mind:
            <br />
            - Good vibes only. This is about your favorite brands showing you love for showing them
            love.
            <br />
            - All posts must feature items purchased from one of our participating brands. The
            product MUST be the centerpiece of your post.
            <br />
            - One brand, one Reel. (Avoid having multiple brands in one post) & don’t forget to tag
            the brand and add #Frankly in the caption of the reel.
            <br />
            - No quick 1 second product flashes. Hauls, try-ons, and reviews are highly recommended
            (but you can have fun with your videos!)
            <br />
            - No blasting individuals or brands or bullying of any kind will be tolerated.
            <br />
            - Reels must be clear and high quality - good lighting is key.
            <br />
            - Reactions Videos: React! Don’t just stare at the camera
            <br />
            -- Your videos must be CREATIVE! Frankly is not a quick cash grab. We’re looking to
            reward quality, well thought out, fun, and creative content.
            <br />- Your videos must follow Instagram’s Community Guidelines and general policies.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>When do I get paid? </Accordion.Header>
          <Accordion.Body>
            It takes about 48 hours for the cash out to be processed after your reel is approved.
            The money would show up in your PayTm or UPI wallet and you’ll also receive a text
            notification for the same.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Who owns the rights to the content I create? </Accordion.Header>
          <Accordion.Body>
            When you create content for an eligible Frankly order, you grant Frankly a license to
            the content, and you also retain a license to the content. Our license allows Frankly to
            sublicense the content to the brand on your behalf.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>How many followers should I have to use Frankly? </Accordion.Header>
          <Accordion.Body>
            You can use Frankly no matter how many followers you have. However:
            <br />
            <ul>
              <li>Your Instagram account needs to be public.</li>
              <li>
                Your post needs to hit the minimum view count threshold which varies from brand to
                brand
              </li>
              <li>
                Your post must follow Instagram’s policies, our brand guidelines, and Frankly rules.
              </li>
              <li>Creators with at least 2k followers get the most out of Frankly.</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Is there a maximum amount I can earn on my content?</Accordion.Header>
          <Accordion.Body>
            Nope! There’s no cap on how much you can Earn. The better your video performs in the
            first 48 hours, the more you get paid! As content gets more views the price per view
            goes down gradually to ensure a fair return for you and the brand. The standard Frankly
            payout starts at Rs 50 per 100 views, but can vary from brand to brand.
            <br />
            <br />
            Just focus on creating authentic, creative content and we&apos;ll take care of the rest!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>What if I don&apos;t like the product?</Accordion.Header>
          <Accordion.Body>
            Frankly speaking, not every purchase we make is our favourite. If that&apos;s the case
            with a purchase that&apos;s eligible for Frankly, then its not a video for Frankly. You
            are free to share your review! We aren&apos;t here to tell you what to post. We&apos;re
            here to help you get paid when you share products you love and help your favourite
            brands grow. We’re democratizing influencer marketing for you, the real customers.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>Where can I post content for Frankly?</Accordion.Header>
          <Accordion.Body>
            Instagram is our one true home for now, but we&apos;re looking into jumping into more
            socials super soon!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>How many times can I post? </Accordion.Header>
          <Accordion.Body>
            One purchase, one Instagram Reel. <br />
            You MUST submit your reels in the web app to get paid.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Index;
