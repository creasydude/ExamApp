import { Request, Response } from "express";
import { getMockReq, getMockRes } from '@jest-mock/express'
import expressJsCallback, {
  httpRequestInterface,
  httpResponseInterface,
} from "../../src/framework-callback-adapter/expressjs";

describe("expressJsCallback", () => {
  it("should call the controller with the correct httpRequest object and return the httpResponse object", async () => {
    // Define a mock controller function that returns a httpResponse object
    const mockController = jest.fn().mockResolvedValue({
      headers: {},
      statusCode: 200,
      body: { message: "Hello World!" },
      cookie: {
        name: "test",
        value: "test",
        options: { expire: "1d" },
      },
      clearCookie: "test",
    });

    // Define mock request and response objects
    const mockHeaders = {
      "Content-Type": "",
      Referer: "",
      "User-Agent": "",
      Authorization: "",
    };
    const mockRequest = {
      body: {},
      query: {},
      params: {},
      signedCookies: {},
      cookies: {},
      ip: "",
      method: "",
      path: "",
      get: (value: keyof typeof mockHeaders) => {
        return mockHeaders[value];
      },
    } as Request;
    const mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      set: jest.fn(),
      type: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    // Call the expressJsCallback function with the mock controller and mock request and response objects
    await expressJsCallback(mockController)(mockRequest, mockResponse);

    // Check that the controller was called with the correct httpRequest object
    const expectedHttpRequest: httpRequestInterface = {
      body: {},
      query: {},
      params: {},
      signedCookies: {},
      cookies: {},
      ip: "",
      method: "",
      path: "",
      headers: {
        "Content-Type": "",
        Referer: "",
        "User-Agent": "",
        Authorization: "",
      },
    };
    expect(mockController).toHaveBeenCalledWith(expectedHttpRequest);

    // Check that the response object was updated with the correct values from the httpResponse object
    expect(mockResponse.cookie).toHaveBeenCalledWith("test", "test", {
      expire: "1d",
    });
    expect(mockResponse.clearCookie).toHaveBeenCalledWith("test");
    expect(mockResponse.set).toHaveBeenCalledWith({});
    expect(mockResponse.type).toHaveBeenCalledWith("json");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Hello World!" });
  });

  it("should set the httpResponse headers, status, and body based on the controller response", async () => {
    const mockController = jest.fn().mockResolvedValue({
      statusCode: 200,
      body: { message: "Success" },
      headers: {
        "Content-Type": "",
      },
    });
    const mockHeaders = {
      "Content-Type": "",
      Referer: "",
      "User-Agent": "",
      Authorization: "",
    };
    const mockRequest = {
      body: {},
      query: {},
      params: {},
      signedCookies: {},
      cookies: {},
      ip: "",
      method: "",
      path: "",
      get: (value: keyof typeof mockHeaders) => {
        return mockHeaders[value];
      },
    } as Request;
    const mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      set: jest.fn(),
      type: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Call the expressJsCallback function with the mock controller and mock request and response objects
    await expressJsCallback(mockController)(mockRequest, mockResponse);

    expect(mockResponse.cookie).not.toHaveBeenCalled();
    expect(mockResponse.clearCookie).not.toHaveBeenCalled();
    expect(mockResponse.set).toHaveBeenCalledWith({ "Content-Type": "" });
    expect(mockResponse.type).toHaveBeenCalledWith("json");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Success" });
  });

  it("should set a cookie if the controller response includes a cookie object", async () => {
    const mockController = jest.fn().mockResolvedValue({
      statusCode: 200,
      body: { message: "Success" },
      cookie: {
        name: "test",
        value: "test",
        options: {
          expire: "1d",
        },
      },
    });
    const mockHeaders = {
      "Content-Type": "",
      Referer: "",
      "User-Agent": "",
      Authorization: "",
    };
    const mockRequest = {
      body: {},
      query: {},
      params: {},
      signedCookies: {},
      cookies: {},
      ip: "",
      method: "",
      path: "",
      get: (value: keyof typeof mockHeaders) => {
        return mockHeaders[value];
      },
    } as Request;
    const mockResponse = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
      set: jest.fn(),
      type: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // Call the expressJsCallback function with the mock controller and mock request and response objects
    await expressJsCallback(mockController)(mockRequest, mockResponse);

    expect(mockResponse.cookie).toHaveBeenCalledWith("test", "test", {
      expire: "1d",
    });
    expect(mockResponse.clearCookie).not.toHaveBeenCalled();
    expect(mockResponse.type).toHaveBeenCalledWith("json");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Success" });
  });
});
