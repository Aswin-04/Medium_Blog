import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { JWTPayload } from 'hono/utils/jwt/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET:string
  },

  Variables: {
    userId: JWTPayload[string]
  }

}>()

app.use('/*', cors())


app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app