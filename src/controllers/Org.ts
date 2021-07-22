import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Tags,
  SuccessResponse,
  Example,
} from "tsoa";
import { equals, contains } from "@aws/dynamodb-expressions";
import { assign, mapper, Org } from "../model";

@Route("/v1/org")
@Tags("orgs")
export class OrgsController extends Controller {
  @Post()
  public async createOrg(@Body() requestBody: { name: string }): Promise<Org> {
    const org = assign(new Org(), requestBody);
    return await mapper.put(org);
  }

  @Get()
  public async getOrgs(@Query() name?: string): Promise<Org[]> {
    const result = await mapper
      .scan(Org, {
        limit: 100,
        filter: name ? { subject: "name", ...contains(name) } : undefined,
      })
      .pages()
      .next();

    return result.value || [];
  }

  @Get("{id}")
  public async getOrg(@Path() id: string): Promise<Org> {
    return await mapper.get(assign(new Org(), { id }));
  }
}
