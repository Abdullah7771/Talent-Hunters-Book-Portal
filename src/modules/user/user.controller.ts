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
} from '@nestjs/common';
import { JwtUserGuard } from 'src/guards/jwt-user.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
// If you use JWT for authentication

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('fetchall')
  @UseGuards(JwtUserGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtUserGuard)
  async findAdmins() {
    return this.userService.findAll(); // Modify to return admins
  }

  @Get('user')
  async findUsers() {
    return this.userService.findAll(); // Modify to return users
  }

  @Get('name')
  async findByName(@Query('name') name: string) {
    return this.userService.findByName(name);
  }

  @Get('familyname')
  async findByFamilyName(@Query('familyname') familyName: string) {
    return this.userService.findByFamilyName(familyName);
  }

  @Get(':id')
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
