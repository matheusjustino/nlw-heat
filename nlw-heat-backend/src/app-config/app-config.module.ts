import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// OPTIONS
import { configOptions } from './app-config-options';

// SERVICE
import { AppConfigService } from './app-config.service';

// INTERFACES
import { APP_CONFIG_SERVICE } from './interfaces/app-config-service.interface';

@Global()
@Module({
	imports: [ConfigModule.forRoot(configOptions)],
	providers: [
		{
			useClass: AppConfigService,
			provide: APP_CONFIG_SERVICE,
		},
	],
	exports: [
		{
			useClass: AppConfigService,
			provide: APP_CONFIG_SERVICE,
		},
	],
})
export class AppConfigModule {}
