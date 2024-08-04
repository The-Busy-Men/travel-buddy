import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Travel Buddy')
  .setDescription('Travel Buddy API')
  .setVersion('0.1')
  .setContact('Tim Fuchs', 'https://github.com/FixFaxt', null)
  .setExternalDoc(
    'See GitHub Docs',
    'https://github.com/FixFaxt/travel-buddy/blob/ef6ff76ada2a4216755b0e38861fccd5b5f34841/README.md',
  )
  .build();
