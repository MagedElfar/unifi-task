import Controller, { APIRoute, Methods } from '../app/controller';

const routes: (controller: Controller) => APIRoute[] = (controller: any) => {

    const r: APIRoute[] = [
        {
            path: "/",
            method: Methods.GET,
            handler: controller.getUserHandler,
            localMiddleware: [],
            auth: true
        }
    ]
    return r;
}


export default routes