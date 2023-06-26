export default function expressJsCallback(controller: Function) {
    return function (req: Request, res: Response) {
      //Create httpRequest object with req parameter and import important items in that object;
      const httpRequest: httpRequestInterface = {
        body: req.body,
        query: req.query,
        params: req.params,
        signedCookies: req.signedCookies,
        cookies: req.cookies,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          "Content-Type": req.get("Content-Type"),
          Referer: req.get("Referer"),
          "User-Agent": req.get("User-Agent"),
          Authorization: req.get("Authorization"),
        },
      };
  
      //Make Controller Response
      controller(httpRequest)
        .then((httpResponse: httpResponseInterface) => {
          //Here is what we get from controller returns
          //Note in controller return object you can add cookie - clearCookie - headers
          //For Example :
          // {
          //   cookie : {
          //     name : "test",
          //     value : "test",
          //     options : {
          //       expire : "1d"
          //     }
          //   },
          //   clearCookie : "test",
          //   headers : {
          //     "Content-type" : "anything",
          //   }
          // }
          if (httpResponse.cookie) {
            const { name, value, options } = httpResponse.cookie;
            res.cookie(name, value, options);
          }
          if (httpResponse.clearCookie) {
            const cookieName = httpResponse.clearCookie;
            res.clearCookie(cookieName);
          }
          if (httpResponse.headers) {
            res.set(httpResponse.headers);
          }
          res.type("json");
          res.status(httpResponse.statusCode).json(httpResponse.body);
        })
        .catch((err: any) => {
          //Here is where we handle errors
          res.status(err?.statusCode || 500).json({
            success: false,
            error: {
              message: err?.message || "Internal Error",
            },
          });
        });
    };
  }
  
  //Interfaces
  import { Request, Response } from "express";
  
  interface httpResponseInterface {
    headers: {};
    statusCode: number;
    body: {
      [key: string]: any;
    };
    cookie?: {
      name: string;
      value: string;
      options: {};
    };
    clearCookie?: string;
  }
  
  interface httpRequestInterface {
    body: {
      [key: string]: any;
    };
    query: {};
    params: {
      [key: string]: any;
    };
    signedCookies: {};
    cookies: {};
    ip: string;
    method: string;
    path: string;
    headers: {
      "Content-Type": string | undefined;
      Referer: string | undefined;
      "User-Agent": string | undefined;
      Authorization: string | undefined;
    };
  }
  
  export { httpRequestInterface, httpResponseInterface };
  