export const APP_CONFIG_SERVICE = 'APP CONFIG SERVICE';
export interface IAppConfigService {
	get databaseUrl(): string;
	get githubClientSecret(): string;
	get githubClientID(): string;
	get secretHash(): string;
}
