import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';
import { LabelsService } from './labels.service';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  findAll(): Promise<Label[]> {
    return this.labelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Label> {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLabelDto: UpdateLabelDto,
  ): Promise<Label> {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Label> {
    return this.labelsService.remove(id);
  }
}
