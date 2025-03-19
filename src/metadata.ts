/* eslint-disable */
export default async () => {
  const t = {
    ['./labels/entities/label.entity']: await import(
      './labels/entities/label.entity'
    ),
    ['./tickets/entities/ticket.entity']: await import(
      './tickets/entities/ticket.entity'
    ),
    ['./tickets/entities/ticket-with-labels.entity']: await import(
      './tickets/entities/ticket-with-labels.entity'
    ),
    ['./boards/entities/board.entity']: await import(
      './boards/entities/board.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./labels/entities/label.entity'),
          {
            Label: {
              id: { required: true, type: () => Number, minimum: 1 },
              name: { required: true, type: () => String },
              color: {
                required: true,
                type: () => String,
                pattern:
                  '^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$',
              },
            },
          },
        ],
        [
          import('./tickets/entities/ticket.entity'),
          {
            Ticket: {
              id: { required: true, type: () => Number, minimum: 1 },
              name: { required: true, type: () => String },
              description: {
                required: true,
                type: () => String,
                nullable: true,
              },
              ticketPhase: { required: true, type: () => Object },
              boardsId: { required: true, type: () => Number },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./tickets/entities/ticket-with-labels.entity'),
          {
            TicketWithLabels: {
              labels: {
                required: true,
                type: () => [t['./labels/entities/label.entity'].Label],
              },
            },
          },
        ],
        [import('./tickets/dto/create-ticket.dto'), { CreateTicketDto: {} }],
        [
          import('./boards/entities/board.entity'),
          {
            Board: {
              id: { required: true, type: () => Number, minimum: 1 },
              title: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
            },
          },
        ],
        [import('./boards/dto/create-board.dto'), { CreateBoardDto: {} }],
        [import('./labels/dto/create-label.dto'), { CreateLabelDto: {} }],
        [import('./labels/dto/update-label.dto'), { UpdateLabelDto: {} }],
        [import('./boards/dto/update-board.dto'), { UpdateBoardDto: {} }],
        [import('./tickets/dto/update-ticket.dto'), { UpdateTicketDto: {} }],
      ],
      controllers: [
        [
          import('./app.controller'),
          {
            AppController: {
              getHello: { type: String },
              getPersonalizedHello: { type: String },
            },
          },
        ],
        [
          import('./tickets/tickets.controller'),
          {
            TicketsController: {
              create: { type: t['./tickets/entities/ticket.entity'].Ticket },
              findAll: {
                type: [
                  t['./tickets/entities/ticket-with-labels.entity']
                    .TicketWithLabels,
                ],
              },
              findOne: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
              update: { type: t['./tickets/entities/ticket.entity'].Ticket },
              remove: { type: t['./tickets/entities/ticket.entity'].Ticket },
              assignLabel: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
              removeLabel: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
            },
          },
        ],
        [
          import('./boards/boards.controller'),
          {
            BoardsController: {
              create: { type: t['./boards/entities/board.entity'].Board },
              findAll: { type: [t['./boards/entities/board.entity'].Board] },
              findOne: { type: t['./boards/entities/board.entity'].Board },
              update: { type: t['./boards/entities/board.entity'].Board },
              remove: { type: t['./boards/entities/board.entity'].Board },
            },
          },
        ],
        [
          import('./labels/labels.controller'),
          {
            LabelsController: {
              create: { type: t['./labels/entities/label.entity'].Label },
              findAll: { type: [t['./labels/entities/label.entity'].Label] },
              findOne: { type: t['./labels/entities/label.entity'].Label },
              update: { type: t['./labels/entities/label.entity'].Label },
              remove: { type: t['./labels/entities/label.entity'].Label },
            },
          },
        ],
      ],
    },
  };
};
