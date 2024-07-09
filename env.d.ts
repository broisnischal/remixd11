/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

declare module 'virtual:remix/server-build' {
	import { ServerBuild } from '@remix-run/cloudflare';
	export const routes: ServerBuild['routes'];
}
