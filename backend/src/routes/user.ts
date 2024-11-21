import { Hono } from 'hono'
import { z } from 'zod'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { JWTPayload } from 'hono/utils/jwt/types'
import { signupInput, signinInput } from '@aswin-04/medium-blog_common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET:string
  },

  Variables: {
    userId: JWTPayload[string]
  }

}>()


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body)

    if(!success) {
      return c.json({message: "invalid inputs"}, 411)
    }

    await prisma.$connect()
    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })
    const jwt = await sign({id: newUser.id}, c.env.JWT_SECRET)

    return c.json({message: "User singed up successfully", token: jwt, newUser}, 201)
  }

  catch(err) {
    if(err instanceof z.ZodError) {
      return c.json({message: "Validate error", error: err}, 400)
    }
    return c.json({message: "Failed to sign up", error: err}, 500)
  } 

})


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    const body = await c.req.json()
    const {success} = signinInput.safeParse(body)
    
    if(!success) {
      return c.json({message: "invalid inputs"}, 411)
    }

    await prisma.$connect();
    const user = await prisma.users.findUnique({
      where: {
        email: body.email,
      }
    })

    if(!user || body.password !== user.password) return c.json({error: 'Invalid email or password'}, 401)
    const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    
    return c.json({message: "User signed in successfully", token: jwt}, 200)
  }

  catch(err) {
    if(err instanceof z.ZodError) {
      return c.json({message: "Validate error", error: err}, 400)
    }

    return c.json({message: "Failed to sign in", error: err}, 500)
  }
})
