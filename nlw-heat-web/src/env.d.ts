interface ImportMetaEnv
	extends Readonly<Record<string, string | boolean | undefined>> {
	readonly VITE_GITHUB_CLIENT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
