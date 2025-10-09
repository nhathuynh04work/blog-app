import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodType<any>) {}

    transform(value: any) {
        const result = this.schema.safeParse(value);

        if (!result.success) {
            throw new BadRequestException("Data is not in the right format");
        }

        return result.data;
    }
}
