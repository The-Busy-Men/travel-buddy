import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Travel Buddy')
  .setDescription('Travel Buddy API')
  .setVersion('0.1')
  .setContact(
    'Apps Dev Team',
    'https://github.com/orgs/The-Busy-Men/teams/apps-dev',
    null,
  )
  .setExternalDoc(
    'See GitHub Docs',
    'https://github.com/FixFaxt/travel-buddy/blob/ef6ff76ada2a4216755b0e38861fccd5b5f34841/README.md',
  )
  .build();
