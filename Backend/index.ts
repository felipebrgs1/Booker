import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import swaggerFile from "./swagger-output.json";

app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(cors());

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
	console.log(
		`Documentação do Swagger disponível em http://localhost:${PORT}/docs`,
	);
});
