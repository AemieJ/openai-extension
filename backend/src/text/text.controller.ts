import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TextService } from './text.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Summary } from './openai/summary.ai';
import { Category } from './openai/category.ai';

@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  async create(@Body() createTextDto: CreateTextDto) {
    // We use openai to generate summary and categorize the text, we then add the additional category in
    // addition to the ones provided. Priority will be default 1
    // request: "text": "some text", "summary": "", "priority": 1, "tags": []

    let validation = await this.checkExistence(createTextDto['text']);
    if (validation.length === 0) {
      createTextDto['summary'] = await new Summary().summary(
        createTextDto['text'],
      );
      let categories = await new Category().categorize(createTextDto['text']);
      categories.forEach((category) => {
        createTextDto['tags'].push(category);
      });

      console.log(createTextDto);
      return await this.textService.create(createTextDto);
    } else {
      // we return the same data back with updated priority
      return await this.findOne(validation[0]['_id']);
    }
  }

  @Get()
  async findAll() {
    // returns the list of the text and their summaries within the "text" table
    // it could be used to filter out the texts with the same tags and sort it by
    // priority in descending order
    return await this.textService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    // if this particular article is referred again, we increase its priority by 1
    let original = await this.textService.findOne(id);
    await this.update(id, {
      priority: original['priority'] + 1,
    });
    return await this.textService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateTextDto: UpdateTextDto) {
    return await this.textService.update(id, updateTextDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    return await this.textService.remove(id);
  }

  async checkExistence(text: string) {
    let results = await this.findAll();
    results = results.filter((obj) => {
      return obj['text'] === text;
    });

    return results;
  }
}
