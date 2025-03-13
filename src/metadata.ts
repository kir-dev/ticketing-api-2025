/* eslint-disable */
export default async () => {
  const t = {
    ['./boards/entities/board.entity']: await import(
      './boards/entities/board.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
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
        [import('./boards/dto/update-board.dto'), { UpdateBoardDto: {} }],
        [import('./labels/dto/create-label.dto'), { CreateLabelDto: {} }],
        [import('./labels/dto/update-label.dto'), { UpdateLabelDto: {} }],
        [import('./labels/entities/label.entity'), { Label: {} }],
        [import('./tickets/dto/create-ticket.dto'), { CreateTicketDto: {} }],
        [import('./tickets/dto/update-ticket.dto'), { UpdateTicketDto: {} }],
        [import('./tickets/entities/ticket.entity'), { Ticket: {} }],
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
              create: {},
              findAll: {},
              findOne: {},
              update: {},
              remove: {},
              assignLabel: {},
              removeLabel: {},
            },
          },
        ],
        [
          import('./boards/boards.controller'),
          {
            BoardsController: {
              create: { type: t['./boards/entities/board.entity'].Board },
              findAll: { type: [t['./boards/entities/board.entity'].Board] },
              findOne: { type: Object },
              update: { type: t['./boards/entities/board.entity'].Board },
              remove: { type: t['./boards/entities/board.entity'].Board },
            },
          },
        ],
        [
          import('./labels/labels.controller'),
          {
            LabelsController: {
              create: {},
              findAll: {},
              findOne: { type: String },
              update: {},
              remove: { type: String },
            },
          },
        ],
      ],
    },
  };
};
