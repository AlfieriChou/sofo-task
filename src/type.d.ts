export type Middleware = (ctx: Koa.Context, next?: any) => any | Promise<any>
