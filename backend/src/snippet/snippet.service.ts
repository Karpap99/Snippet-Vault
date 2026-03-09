import { Injectable } from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet, SnippetDocument } from 'src/schemas/snippet.schema';
import { DeleteResult, Model, UpdateResult } from 'mongoose';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private SnippetModel: Model<Snippet>,
  ) {}

  create(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const snippet = new this.SnippetModel(createSnippetDto);
    return snippet.save();
  }

  findAll(): Promise<Snippet[]> {
    return this.SnippetModel.find().exec();
  }

  findOne(id: string): Promise<SnippetDocument | null> {
    return this.SnippetModel.findOne({ _id: id }).exec();
  }

  update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<UpdateResult> {
    return this.SnippetModel.updateOne({ _id: id }, updateSnippetDto).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.SnippetModel.deleteOne({ _id: id }).exec();
  }
}
