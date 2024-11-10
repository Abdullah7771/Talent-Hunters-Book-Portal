import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/role.guard';
import { HasRoles } from 'src/guards/roles.decorator';
import { ROLES } from 'src/types/roles';
import { ExtendedRequest } from 'src/utils/extendedRequest.interface';
// If you use JWT for authentication

@ApiBearerAuth('jwt')
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get User Profile' })
  @UseGuards(JwtUserGuard, RolesGuard)
  @HasRoles(ROLES.USER)
  @Get('/me')
  @UsePipes(ValidationPipe)
  async getUserDetails(@Req() req: ExtendedRequest) {
    const user = req?.user.toObject();
    delete user.password;
    return user;
  }

  @Get('fetchall')
  @UseGuards(JwtUserGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('books')
  @UseGuards(JwtUserGuard)
  async fetchMyBooks(@Req() req: ExtendedRequest) {
    return this.userService.fetchMyBooks(req?.user);
  }

  @Get('requested-books')
  @UseGuards(JwtUserGuard)
  async myRequestedBooks(@Req() req: ExtendedRequest) {
    return this.userService.fetchMyRequestedBooks(req?.user);
  }

  @Get('ordered-books')
  @UseGuards(JwtUserGuard)
  async myOrderedBooks(@Req() req: ExtendedRequest) {
    return this.userService.fetchMyOrderedBooks(req?.user);
  }

  @Get('donated-books')
  @UseGuards(JwtUserGuard)
  async myDonatedBooks(@Req() req: ExtendedRequest) {
    return this.userService.fetchMyDonatedBooks(req?.user);
  }

  @Get('/by/:id')
  @UseGuards(JwtUserGuard)
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('add')
  @UseGuards(JwtUserGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('update/:id')
  @UseGuards(JwtUserGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtUserGuard)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // Add additional routes for adding books, getting ordered books, etc.
}
