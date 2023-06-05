import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { Text, TextDocument } from './entities/text.entity';

@Injectable()
export class TextService {
  constructor(@InjectModel('Text') private text: Model<Text>) {}

  async create(createTextDto: CreateTextDto): Promise<Text> {
    const text = new this.text(createTextDto);

    return await text.save();
  }

  async findAll() {
    return await this.text.find({});
  }

  async findOne(id: ObjectId) {
    console.log(id);
    return await this.text.findById(id);
  }

  async update(id: ObjectId, updateTextDto: UpdateTextDto) {
    return await this.text.findByIdAndUpdate(id, updateTextDto);
  }

  async remove(id: ObjectId) {
    return await this.text.findByIdAndDelete(id);
  }
}
