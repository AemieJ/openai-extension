import { Test, TestingModule } from '@nestjs/testing';

import { TextController } from './text.controller';
import { TextService } from './text.service';
import { Text, TextSchema } from './entities/text.entity';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import { Connection, connect, Model } from 'mongoose';

describe('TextController', () => {
  let mongod: MongoMemoryServer;
  let textController: TextController;
  let textService: TextService;
  let mongoConnection: Connection;
  let textModel: Model<Text>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    textModel = mongoConnection.model('Text', TextSchema);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TextController],
      providers: [
        TextService,
        { provide: getModelToken('Text'), useValue: textModel },
      ],
    }).compile();

    textService = moduleRef.get<TextService>(TextService);
    textController = moduleRef.get<TextController>(TextController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('postText', () => {
    it('should return the saved object', async () => {
      let data = {
        text: 'Long Text',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };

      const text = await textController.create(data);
      expect(text.text).toBe(data.text);
      expect(text.tags.length).toBe(3);
    });
  });

  describe('getAllTexts', () => {
    it('should return all the saved objects', async () => {
      let data1 = {
        text: 'Long Text 1',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };
      let data2 = {
        text: 'Long Text 2',
        summary: '',
        priority: 1,
        tags: ['first', 'second', 'third'],
        link: 'Link2',
      };

      await textController.create(data1);
      await textController.create(data2);

      const allTexts = await textController.findAll();

      expect(allTexts.length).toBe(2);
    });
  });

  describe('getTextById', () => {
    it('should return the object by id', async () => {
      let data1 = {
        text: 'Long Text 1',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };
      let savedText = await textController.create(data1);

      const getTextById = await textController.findOne(savedText['_id']);

      expect(getTextById.text).toBe('Long Text 1');
    });
  });

  describe('updateTextById', () => {
    it('should update text', async () => {
      let data1 = {
        text: 'Long Text 1',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };
      let savedText = await textController.create(data1);
      let currTags = savedText['tags'];
      currTags.push('new_tag');

      const updateTextById = await textController.update(savedText['_id'], {
        tags: currTags,
      });

      let savedValue = await textController.findOne(savedText['_id']);
      expect(savedValue.tags.length).toBe(4);
    });
  });

  describe('deleteextById', () => {
    it('should delete Data 1', async () => {
      let data1 = {
        text: 'Long Text 1',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };

      let data2 = {
        text: 'Long Text 2',
        summary: '',
        priority: 1,
        tags: ['first', 'second'],
        link: 'Link',
      };

      let res1 = await textController.create(data1);
      let res2 = await textController.create(data2);

      await textController.remove(res1['_id']);

      let getAllTexts = await textController.findAll();
      expect(getAllTexts.length).toBe(1);
    });
  });
});
