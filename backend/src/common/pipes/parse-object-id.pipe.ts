import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ObjectId } from "mongodb";

export class ParseObjectIdPipe implements PipeTransform {
    transform(value: string) {
        if (!ObjectId.isValid(value)) {
            throw new BadRequestException(`Invalid ObjectId: ${value}`);
        }

        return new ObjectId(value);
    }
}
