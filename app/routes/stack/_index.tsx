import { Link } from '@remix-run/react';
import { KBD } from '~/components/KBD';
import { Highlight } from '../_landing.about/route';

export default function Page() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-bricolage text-3xl font-bold">Lovely Stack</h1>

			<p className="secondary font-avenir">
				Just listing the stack that is close to me. Do not look for any deep
				ideas in this. It just lists the usual stack for me, nothing unusual. A
				few points - something I just plan to get acquainted with.
			</p>

			{data.map(category => (
				<div
					key={category.category}
					className="flex flex-col items-start gap-4  md:flex-row"
				>
					<h2 className="text-secondary-foreground">{category.category} :</h2>
					{/* <KBD>{category.category}</KBD> */}
					<ul className="flex flex-wrap gap-3">
						{category.items.map(item => (
							<Link
								key={item.link}
								to={item.link}
								rel="noopener noreferrer"
								target="_blank"
							>
								{/* <li className="underline hover:text-primary" key={item.link}> */}
								<Highlight className="font-bricolage">{item.name}</Highlight>

								{/* </li> */}
							</Link>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

let data = [
	{
		category: 'Frameworks',
		items: [
			{
				name: 'remix',
				link: 'https://remix.run/',
			},
			{
				name: 'nuxt',
				link: 'https://nuxtjs.org/',
			},
			{
				name: 'astro',
				link: 'https://astro.build/',
			},
		],
	},
	{
		category: 'Languages',
		items: [
			{
				name: 'typescript',
				link: 'https://www.typescriptlang.org/',
			},
			{
				name: 'go',
				link: 'https://go.dev/',
			},
			{
				name: 'python',
				link: 'https://www.python.org/',
			},
			{
				name: 'rust',
				link: 'https://www.rust-lang.org/',
			},
		],
	},
	{
		category: 'Automation',
		items: [
			{
				name: 'n8n',
				link: 'https://n8n.io/',
			},
		],
	},
	{
		category: 'Databases',
		items: [
			{
				name: 'postgres',
				link: 'https://www.postgresql.org/',
			},
			{
				name: 'sqlite',
				link: 'https://www.sqlite.org/',
			},
			{
				name: 'dragonfly',
				link: 'https://dragonflydb.io/',
			},
			{
				name: 'nocodb',
				link: 'https://www.nocodb.com/',
			},
		],
	},
	{
		category: 'Containerization',
		items: [
			{
				name: 'docker',
				link: 'https://www.docker.com/',
			},
			{
				name: 'docker swarm',
				link: 'https://docs.docker.com/engine/swarm/',
			},
			{
				name: 'cloud run',
				link: 'https://cloud.google.com/run',
			},
		],
	},
	{
		category: 'Network & routing',
		items: [
			{
				name: 'traefik',
				link: 'https://traefik.io/',
			},
			{
				name: 'nginx',
				link: 'https://nginx.org/',
			},
			{
				name: 'wireguard',
				link: 'https://www.wireguard.com/',
			},
			{
				name: 'mikrotik',
				link: 'https://mikrotik.com/',
			},
			{
				name: 'pivpn',
				link: 'https://pivpn.io/',
			},
			{
				name: 'pi-hole',
				link: 'https://pi-hole.net/',
			},
		],
	},
	{
		category: 'Dashboard',
		items: [
			{
				name: 'portainer',
				link: 'https://www.portainer.io/',
			},
			{
				name: 'grafana',
				link: 'https://grafana.com/',
			},
			{
				name: 'heimdall',
				link: 'https://heimdall.site/',
			},
		],
	},
	{
		category: 'Monitor',
		items: [
			{
				name: 'prometheus',
				link: 'https://prometheus.io/',
			},
			{
				name: 'promtail',
				link: 'https://grafana.com/docs/loki/latest/clients/promtail/',
			},
			{
				name: 'cadvisor',
				link: 'https://github.com/google/cadvisor',
			},
			{
				name: 'sentry',
				link: 'https://sentry.io/',
			},
			{
				name: 'logstash',
				link: 'https://www.elastic.co/logstash',
			},
		],
	},
	{
		category: 'SaaS',
		items: [
			{
				name: 'firebase',
				link: 'https://firebase.google.com/',
			},
		],
	},
	{
		category: 'Blogging',
		items: [
			{
				name: 'ghost',
				link: 'https://ghost.org/',
			},
			{
				name: 'isso',
				link: 'https://posativ.org/isso/',
			},
			{
				name: 'dicebear',
				link: 'https://dicebear.com/',
			},
		],
	},
	{
		category: 'Media',
		items: [
			{
				name: 'radarr',
				link: 'https://radarr.video/',
			},
			{
				name: 'sonarr',
				link: 'https://sonarr.tv/',
			},
			{
				name: 'jackett',
				link: 'https://github.com/Jackett/Jackett',
			},
			{
				name: 'plex',
				link: 'https://www.plex.tv/',
			},
		],
	},
];
