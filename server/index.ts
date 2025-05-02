import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import { initializeEmailService } from "./email";
import path2 from "path";
import fs from "fs";
import cors from "cors";
import { createServer as createViteServer } from "vite";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configurez les origines autorisées
const allowedOrigins = ["https://services.udi-africa.com"]; // Remplacez par vos domaines
// const allowedOrigins = ["*"]; // Utilisez ceci uniquement pour le développement

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Nécessaire si vous utilisez des cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware pour journaliser les requêtes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Fonction pour servir les fichiers statiques
function serveStaticFiles(app2: express.Application) {
  const indexPath = path2.resolve(__dirname, "../client/index.html");
  const assetsPath = path2.resolve(__dirname, "../client");

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Le fichier index.html est introuvable : ${indexPath}`);
  }

  app2.use(express.static(assetsPath)); // Sert les fichiers statiques
  app2.use("*", (_req, res) => {
    res.sendFile(indexPath); // Sert le fichier index.html
  });
}

async function setupVite(app: express.Application, server: any) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const templatePath = path2.resolve(__dirname, "../client/index.html");
      let template = fs.readFileSync(templatePath, "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

(async () => {
  try {
    const server = await registerRoutes(app);

    // Initialiser le service d'email
    await initializeEmailService();

    // Gestion des erreurs globales
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Erreur serveur :", err);
    });

    // Configuration de Vite en mode développement
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app); // Sert les fichiers directement depuis client
    }

    // Démarrer le serveur sur le port 5000
    const port = 5000;
    server.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`Serving on port ${port}`);
      }
    );
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur :", error);
    process.exit(1);
  }
})();
