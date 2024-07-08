// import { Ratelimit } from '@upstash/ratelimit';
// import { Redis } from '@upstash/redis';

// const ratelimit = new Ratelimit({
// 	redis: new Redis({
// 		token: process.env.UPSTASH_REDIS_REST_TOKEN,
// 		url: process.env.UPSTASH_REDIS_REST_URL,
// 	}),
// 	limiter: Ratelimit.fixedWindow(10, '60 s'),
// 	analytics: true,
// });

// export default ratelimit;
