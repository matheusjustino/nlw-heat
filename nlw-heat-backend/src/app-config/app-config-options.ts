import { join } from 'path';

const configPath = join(process.cwd(), '.env');

export const configOptions = {
	isGlobal: true,
	envFilePath: configPath,
};
