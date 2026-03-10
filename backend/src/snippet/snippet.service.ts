import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UpdateSnippetDto } from './dto/update-snippet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet, SnippetDocument } from 'src/schemas/snippet.schema';
import { Model } from 'mongoose';
import { SearchSnippetDto } from './dto/search-snippet.dto';

type Response = {
  snippet: SnippetDocument | SnippetDocument[];
};

type PaginatedResponse = Response & {
  page: number;
  totalPages: number;
  total: number;
};

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<Response> {
    const snippet = new this.snippetModel(createSnippetDto);
    const result = await snippet.save();
    return {
      snippet: result,
    };
  }

  async findOne(id: string): Promise<Response> {
    const snippet = await this.snippetModel.findById(id).exec();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return { snippet };
  }

  async findAll(
    searchSnippetDto: SearchSnippetDto,
  ): Promise<PaginatedResponse> {
    const { q, tag, page = 1, limit = 10 } = searchSnippetDto;

    const filter: any = {};

    if (q) {
      filter.$text = { $search: q };
    }

    if (tag) {
      filter.$tag = tag;
    }

    const skip = (page - 1) * limit;

    const [snippets, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).exec(),
      this.snippetModel.countDocuments(filter),
    ]);

    return {
      snippet: snippets,
      page: page,
      totalPages: Math.ceil(total / limit),
      total: total,
    };
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<Response> {
    const snippet = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!snippet) {
      throw new NotFoundException('Snippet with that id doesnt exist');
    }

    return {
      snippet: snippet,
    };
  }

  async remove(id: string): Promise<Response> {
    const snippet = await this.snippetModel.findByIdAndDelete(id).exec();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return { snippet: snippet };
  }
}
