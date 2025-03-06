import { Injectable } from '@nestjs/common';
import { Boards, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: Prisma.BoardsCreateInput) {
    return await this.prisma.boards.create({
      data: createBoardDto,
    });
  }

  async findAll(): Promise<Boards[]> {
    return await this.prisma.boards.findMany();
  }

  async findOne(id: number): Promise<Boards | null> {
    return await this.prisma.boards.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateBoardDto: Prisma.BoardsUpdateInput,
  ): Promise<Boards> {
    return await this.prisma.boards.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  async remove(id: number): Promise<Boards> {
    return await this.prisma.boards.delete({
      where: { id },
    });
  }
}
