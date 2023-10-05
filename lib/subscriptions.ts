import { auth } from "@clerk/nextjs"

import prismadb from "./prismadb"


const DAY_IN_MS = 86_400_000



export async function checkSubscription() {

  const { userId } = auth()
  if (!userId) {
    return false
  }

  const userSubscirption = await prismadb.userSubscribtion.findUnique({
    where: {
      userId: userId
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,

    }
  })

  if (!userSubscirption) {
    return false
  }

  const isValid =
    userSubscirption.stripePriceId && userSubscirption.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
  return !!isValid
}