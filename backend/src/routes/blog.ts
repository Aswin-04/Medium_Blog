import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from '@aswin-04/medium-blog_common'
import { string } from 'zod'

export const  blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET:string
  },

  Variables: {
    userId: string,
  }
}>()

blogRouter.use('/*', async (c, next) => {

  try {
    const authHeader = c.req.header("authorization") || ""
    const token = authHeader.split(" ")[1]
    const payload = await verify(token, c.env.JWT_SECRET)

    if(!payload || !payload.id) {
      return c.json({error: "unauthorized"}, 403)
    }

    c.set('userId', String(payload.id))
    await next()

  } catch(err) {
      return c.json({error: err}, 400)
  }
})


blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    
    if(!success) {
      return c.json({message: "invalid inputs"}, 411)
    }

    const authorId = c.get('userId')
    const blog = await prisma.blogs.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      }
    })

    return c.json({message: "Blog posted successfully", id: blog.id}, 200)
  }

  catch (e) {
    return c.json({error: e}, 400)
  }

})

blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    
    const body = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
    
    if(!success) {
      return c.json({message: "invalid inputs"}, 411)
    }
    const blog = await prisma.blogs.update({

      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })

    return c.json({message: "Blog updated successfully", id: blog.id}, 200)
  }

  catch (e) {
    return c.json({error: e}, 400)
  }

})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogs = await prisma.blogs.findMany(
    {
      select: {
        id: true,
        content: true,
        title: true,
        author: {
          select: {
            name: true
          }
        }
      }
    }
  );

  return c.json({blogs}, 200)
})


blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try {
    
    const blog = await prisma.blogs.findFirst({
      where: {
        id: id
      },

      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            name: true
          }
        }

      }
    })

    return c.json({blog}, 200)
  }

  catch (e) {
    return c.json({error: "error while fetching blog post"}, 411)
  }
})


