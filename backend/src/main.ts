import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix("api");
    app.enableCors({ origin: "http://localhost:3000", credentials: true });
    app.use(cookieParser()); // FIXME: add a secret in here

    const port = config.get<number>("PORT") || 4000;
    await app.listen(port);
}
bootstrap();
