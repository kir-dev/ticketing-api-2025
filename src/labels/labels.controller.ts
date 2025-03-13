import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { Prisma } from '@prisma/client';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(@Body() createLabelDto: Prisma.LabelCreateInput) {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  findAll() {
    return this.labelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelDto: Prisma.LabelUpdateInput,
  ) {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.labelsService.remove(id);
  }
}
