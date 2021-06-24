import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { apiDocs } from '../shared/api-docs'
import {
  LoginCodeRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  TokenRefreshRequestDto,
  TokenResponseDto,
} from './user.dto'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { GetUser, UserInBody } from '../utils'

@ApiTags('Users & Auth')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiOperation(apiDocs.users.signup.operation)
  @ApiCreatedResponse(apiDocs.users.signup.created)
  @ApiConflictResponse(apiDocs.users.signup.conflict)
  @ApiBadRequestResponse(apiDocs.generic.validationError)
  public async signup(@Body(ValidationPipe) request: SignupRequestDto): Promise<SignupResponseDto> {
    return this.userService.createUser(request)
  }

  @Post('/login-code')
  @ApiOperation(apiDocs.users.loginCode.operation)
  @ApiCreatedResponse(apiDocs.users.loginCode.created)
  @ApiNotFoundResponse(apiDocs.generic.userNotFound)
  @ApiBadRequestResponse(apiDocs.generic.validationError)
  public async getLoginCode(@Body(ValidationPipe) request: LoginCodeRequestDto): Promise<void> {
    await this.userService.requestLoginCode(request)
    return
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation(apiDocs.users.login.operation)
  @ApiOkResponse(apiDocs.users.login.ok)
  @ApiNotFoundResponse(apiDocs.generic.userNotFound)
  @ApiBadRequestResponse(apiDocs.generic.validationError)
  public async login(@Body(ValidationPipe) request: LoginRequestDto): Promise<LoginResponseDto> {
    return this.userService.login(request)
  }

  @Post('/token-refresh')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation(apiDocs.users.tokenRefresh.operation)
  @ApiOkResponse(apiDocs.users.tokenRefresh.ok)
  @ApiNotFoundResponse(apiDocs.generic.userNotFound)
  @ApiBadRequestResponse(apiDocs.generic.validationError)
  @ApiForbiddenResponse(apiDocs.generic.forbidden)
  public async tokenRefresh(
    @Body(ValidationPipe) request: TokenRefreshRequestDto,
    @UserInBody() _user: UserEntity
  ): Promise<TokenResponseDto> {
    return this.userService.refreshToken(request.userId)
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation(apiDocs.users.delete.operation)
  @ApiOkResponse(apiDocs.users.delete.ok)
  @ApiNotFoundResponse(apiDocs.generic.userNotFound)
  public async deleteUser(@GetUser() user: UserEntity): Promise<void> {
    return this.userService.deleteUser(user.id)
  }

  /**
   * Only for testing purposes!
   */
  @Post('/debug/login-code')
  @ApiOperation(apiDocs.users.debugLoginCode.operation)
  @ApiCreatedResponse(apiDocs.users.debugLoginCode.created)
  @ApiNotFoundResponse(apiDocs.generic.userNotFound)
  @ApiBadRequestResponse(apiDocs.generic.validationError)
  public async getDebugLoginCode(
    @Body(ValidationPipe) request: LoginCodeRequestDto
  ): Promise<{ loginCode: string }> {
    if (process.env.PK_ENV !== 'development') {
      throw new ForbiddenException()
    }
    return this.userService.getInstantLoginCode(request)
  }
}
