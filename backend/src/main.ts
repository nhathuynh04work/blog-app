import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.enableCors({
        origin: config.get<string>("FRONTEND_URL")?.split(",") || [
            "http://localhost:3000",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    });

    const port = config.get<number>("PORT") || 4000;
    await app.listen(port);
}
bootstrap();
