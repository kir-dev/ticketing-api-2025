import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Boards, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBoardDto: Prisma.BoardsCreateInput) {
    try {
      return await this.prisma.boards.create({
        data: createBoardDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create board');
    }
  }

  async findAll(): Promise<Boards[]> {
    return await this.prisma.boards.findMany();
  }

  async findOne(id: number): Promise<Boards> {
    const board = await this.prisma.boards.findUnique({
      where: { id },
    });

    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    return board;
  }

  async update(
    id: number,
    updateBoardDto: Prisma.BoardsUpdateInput,
  ): Promise<Boards> {
    try {
      return await this.prisma.boards.update({
        where: { id },
        data: updateBoardDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not update board with id ${id}`);
    }
  }

  async remove(id: number): Promise<Boards> {
    try {
      return await this.prisma.boards.delete({
        where: { id },
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException(`Could not delete board with id ${id}`);
    }
  }
}
