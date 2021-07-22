import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Tags,
  Response,
} from "tsoa";
import { equals, contains, AndExpression } from "@aws/dynamodb-expressions";
import { assign, mapper, Service } from "../model";

@Route("/v1/services")
@Tags("services")
export class ServicesController extends Controller {
  @Post()
  public async createService(
    @Body() requestBody: { name: string; org: string }
  ): Promise<Service> {
    const service = assign(new Service(), requestBody);
    return await mapper.put(service);
  }

  @Get()
  public async getServices(
    @Query() org?: string,
    @Query() name?: string
  ): Promise<Service[]> {
    const nameFilter = name
      ? { subject: "name", ...contains(name) }
      : undefined;
    const orgFilter = org ? { subject: "org", ...equals(org) } : undefined;
    const filter =
      nameFilter && orgFilter
        ? ({
            type: "And",
            conditions: [nameFilter, orgFilter] as any[],
          } as const)
        : nameFilter || orgFilter;

    const result = await mapper
      .scan(Service, {
        limit: 100,
        filter,
      })
      .pages()
      .next();

    return result.value || [];
  }

  @Get("{id}")
  public async getService(@Path() id: string): Promise<Service> {
    return await mapper.get(assign(new Service(), { id }));
  }
}
