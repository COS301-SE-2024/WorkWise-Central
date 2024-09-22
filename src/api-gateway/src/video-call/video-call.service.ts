import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { VideoCall } from './entities/video-call.entity';
import { VideoCallRepository } from './video-call.repository';
import { Types } from 'mongoose';
import { CreateVideoCallDto } from './dto/create-video-call.dto';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { ValidationResult } from '../auth/entities/validationResult.entity';
import { UpdateVideoCallDto } from './dto/update-video-call.dto';

@Injectable()
export class VideoCallService {
  constructor(
    @Inject(forwardRef(() => VideoCallRepository))
    private videoCallRepository: VideoCallRepository,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
    @Inject(forwardRef(() => EmployeeService))
    private employeeService: EmployeeService,
  ) {}

  async validateCreateVideoCall(createVideoCallDto: CreateVideoCallDto) {
    //checking that the company exists
    if (!(await this.companyService.companyIdExists(createVideoCallDto.companyId))) {
      return new ValidationResult(false, `Company not found`);
    }
    //checking that the participants exist
    for (const participantId of createVideoCallDto.participants) {
      if (!(await this.employeeService.employeeExistsForCompany(participantId, createVideoCallDto.companyId))) {
        return new ValidationResult(false, `Participant not found`);
      }
    }
  }

  async validateUpdateVideoCall(updateVideoCallDto: UpdateVideoCallDto) {
    //checking that the participants exist
    if (updateVideoCallDto.participants) {
      for (const participantId of updateVideoCallDto.participants) {
        if (!(await this.employeeService.employeeExists(participantId))) {
          return new ValidationResult(false, `Participant not found`);
        }
      }
    }
  }

  async create(createVideoCallDto: CreateVideoCallDto) {
    const validation = await this.validateCreateVideoCall(createVideoCallDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }

    const videoCall = new VideoCall();
    videoCall.title = createVideoCallDto.title;
    videoCall.scheduledTime = createVideoCallDto.scheduledTime;
    videoCall.participants = createVideoCallDto.participants;
    videoCall.details = createVideoCallDto.details;
    videoCall.companyId = createVideoCallDto.companyId;
    videoCall.roomId = await this.generateRoomId();
    return await this.videoCallRepository.save(videoCall);
  }

  async generateRoomId() {
    //generating id using uuid
    let id = crypto.randomUUID();

    //checking if the id already exists
    while (await this.roomIdExists(id)) {
      id = crypto.randomUUID();
    }
    return '';
  }

  async roomIdExists(roomId: string) {
    return this.videoCallRepository.exists(roomId);
  }

  async findAll() {
    return this.videoCallRepository.findAll();
  }

  async findById(identifier: Types.ObjectId) {
    const result = await this.videoCallRepository.findById(identifier);
    return result;
  }

  async findAllInCompany(identifier: Types.ObjectId) {
    const result = await this.videoCallRepository.findAllInCompany(identifier);
    return result;
  }

  async findAllForEmployee(identifier: Types.ObjectId) {
    const result = await this.videoCallRepository.findAllForEmployee(identifier);
    return result;
  }

  async update(id: Types.ObjectId, updateVideoCallDto: UpdateVideoCallDto) {
    const validation = await this.validateUpdateVideoCall(updateVideoCallDto);
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    return this.videoCallRepository.update(id, updateVideoCallDto);
  }

  async remove(id: Types.ObjectId): Promise<boolean> {
    //checking if the team exists
    if (!(await this.findById(id))) {
      throw new Error('Video call not found');
    }
    return this.videoCallRepository.remove(id);
  }
}
