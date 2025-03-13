import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLabelDto: Prisma.LabelCreateInput) {
    return await this.prisma.label.create({
      data: createLabelDto,
    });
  }

  findAll() {
    return this.prisma.label.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} label`;
  }

  async update(id: number, updateLabelDto: Prisma.LabelUpdateInput) {
    return await this.prisma.label.update({
      where: { id },
      data: updateLabelDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} label`;
  }
}
