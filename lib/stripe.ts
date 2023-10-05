import Stripe from 'stripe';

const stripeAPI = process.env.STRIPE_API_KEY!
export const stripe = new Stripe(stripeAPI, {

  apiVersion: '2023-08-16',
  typescript: true
});