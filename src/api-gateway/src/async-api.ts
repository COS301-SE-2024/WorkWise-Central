/*
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

const DOC_RELATIVE_PATH = '/ws-documentation';

export const createAsyncapiDocs = async (app: any) => {
  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('Documentation of websockets in the WorkWise API-GATEWAY')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .build();

  const asyncapiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions);

  await AsyncApiModule.setup(DOC_RELATIVE_PATH, app, asyncapiDocument);
};
*/
