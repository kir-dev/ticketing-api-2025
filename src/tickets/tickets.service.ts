import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Ticket } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: Prisma.TicketUncheckedCreateInput) {
    try {
      return await this.prisma.ticket.create({
        data: createTicketDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create ticket');
    }
  }

  async findAll(): Promise<Ticket[]> {
    return await this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: Prisma.TicketUncheckedUpdateInput) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.ticket.delete({
      where: { id },
    });
  }

  async assignLabel(ticketId: number, labelId: number) {
    return await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        labels: {
          connect: { id: labelId },
        },
      },
    });
  }

  async removeLabel(ticketId: number, labelId: number) {
    return await this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        labels: {
          disconnect: { id: labelId },
        },
      },
    });
  }
}
