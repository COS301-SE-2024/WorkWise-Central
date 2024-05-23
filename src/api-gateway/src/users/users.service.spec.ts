import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {userStub} from "../../test/stubs/user.stub";
import {NotFoundException} from "@nestjs/common";

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot({envFilePath:`.env`}),
        MongooseModule.forRoot(`${process.env.SERVER_LOGIN}`),
        MongooseModule.forFeature([{name:'User', schema:UserSchema}])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a user', function () {
    expect(service.create(userStub())).toBeDefined();
  });

  it('should be able to create a user and remake it', async function () {
    expect(await service.create(userStub())).toStrictEqual("John Doe's account has been created");
  });

  it('should be able to remove a user', async function () {
    //expect(await service.softDelete('')).toThrowError(NotFoundException);
  });
});
