import { Global, Module } from '@nestjs/common';
import { GlobalModuleProvider } from './global-module.provider';

@Global()
@Module({ providers: [GlobalModuleProvider], exports: [GlobalModuleProvider] })
export class GlobalModuleModule {}
