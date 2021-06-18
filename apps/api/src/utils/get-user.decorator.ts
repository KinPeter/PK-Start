import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserEntity } from 'src/users/user.entity'

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest()
    return req.user
  }
)
