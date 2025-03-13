import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    try {
      return await this.prisma.label.create({
        data: createLabelDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create label');
    }
  }

  async findAll(): Promise<Label[]> {
    return await this.prisma.label.findMany();
  }

  async findOne(id: number): Promise<Label> {
    const label = await this.prisma.label.findUnique({
      where: { id },
    });
    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    return label;
  }

  async update(id: number, updateLabelDto: UpdateLabelDto): Promise<Label> {
    try {
      return await this.prisma.label.update({
        where: { id },
        data: updateLabelDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not update label');
    }
  }

  async remove(id: number): Promise<Label> {
    const label = await this.findOne(id);

    if (!label) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }

    try {
      return await this.prisma.label.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not delete label');
    }
  }
}
