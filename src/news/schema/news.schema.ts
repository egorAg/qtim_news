import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const NewsSchema: SchemaObject = {
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    author: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
      },
    },
    id: {
      type: 'number',
    },
  },
};

export const NewsSchemaArray: SchemaObject = {
  type: 'array',
  items: {
    properties: NewsSchema.properties,
  },
};
